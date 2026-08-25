"use server";

import { randomBytes } from "node:crypto";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSuperAdmin } from "@/lib/auth/session";

export type CreateBusinessState = {
  error?: string;
  success?: {
    businessId: string;
    ownerEmail: string;
    tempPassword: string;
  };
};

function generateTempPassword() {
  return randomBytes(9).toString("base64url");
}

export async function createBusiness(
  _prevState: CreateBusinessState,
  formData: FormData
): Promise<CreateBusinessState> {
  if (!(await isSuperAdmin())) {
    return { error: "No autorizado." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const businessType = String(formData.get("business_type") ?? "").trim();
  const primaryContact = String(formData.get("primary_contact") ?? "").trim();
  const ownerEmail = String(formData.get("owner_email") ?? "")
    .trim()
    .toLowerCase();

  if (!name || !businessType || !ownerEmail) {
    return { error: "Nombre, tipo de negocio y correo del dueño son obligatorios." };
  }

  const supabase = await createClient();
  const admin = createAdminClient();

  const { data: business, error: businessError } = await supabase
    .from("businesses")
    .insert({
      name,
      business_type: businessType,
      primary_contact: primaryContact || null,
    })
    .select("id")
    .single();

  if (businessError || !business) {
    return { error: `No se pudo crear el negocio: ${businessError?.message}` };
  }

  const tempPassword = generateTempPassword();

  const { data: createdUser, error: userError } =
    await admin.auth.admin.createUser({
      email: ownerEmail,
      password: tempPassword,
      email_confirm: true,
    });

  if (userError || !createdUser.user) {
    // Ya insertamos el negocio; el super admin puede reintentar invitar al
    // dueño desde el detalle del negocio en una fase posterior. Por ahora
    // reportamos el error para que reintente manualmente.
    return {
      error: `El negocio se creó, pero no se pudo crear la cuenta del dueño: ${userError?.message}`,
    };
  }

  const { error: memberError } = await supabase.from("business_members").insert({
    business_id: business.id,
    user_id: createdUser.user.id,
    role: "owner",
  });

  if (memberError) {
    return {
      error: `El negocio y el usuario se crearon, pero no se pudo vincularlos: ${memberError.message}`,
    };
  }

  await supabase.from("audit_logs").insert({
    business_id: business.id,
    actor_type: "super_admin",
    action: "business.created",
    entity_type: "business",
    entity_id: business.id,
    metadata: { owner_email: ownerEmail },
  });

  return {
    success: {
      businessId: business.id,
      ownerEmail,
      tempPassword,
    },
  };
}
