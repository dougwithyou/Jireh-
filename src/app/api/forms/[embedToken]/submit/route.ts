import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ embedToken: string }> }
) {
  const { embedToken } = await params;
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Cuerpo inválido." }, { status: 400 });
  }

  const fullName = String(body.fullName ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const phone = String(body.phone ?? "").trim();
  const answers = body.answers && typeof body.answers === "object" ? body.answers : {};

  if (!email && !phone) {
    return NextResponse.json(
      { error: "Se necesita correo o teléfono." },
      { status: 400 }
    );
  }

  const admin = createAdminClient();

  const { data: form } = await admin
    .from("forms")
    .select("id, business_id, is_active")
    .eq("embed_token", embedToken)
    .maybeSingle();

  if (!form || !form.is_active) {
    return NextResponse.json({ error: "Formulario no disponible." }, { status: 404 });
  }

  // Deduplicar por correo o teléfono dentro del mismo negocio.
  let existingClientQuery = admin
    .from("clients")
    .select("id")
    .eq("business_id", form.business_id);

  existingClientQuery = email
    ? existingClientQuery.eq("email", email)
    : existingClientQuery.eq("phone", phone);

  const { data: existingClient } = await existingClientQuery.maybeSingle();

  let clientId = existingClient?.id;

  if (clientId) {
    await admin
      .from("clients")
      .update({
        full_name: fullName || undefined,
        email: email || undefined,
        phone: phone || undefined,
      })
      .eq("id", clientId);
  } else {
    const { data: newClient, error: clientError } = await admin
      .from("clients")
      .insert({
        business_id: form.business_id,
        full_name: fullName || null,
        email: email || null,
        phone: phone || null,
        source: "web_form",
      })
      .select("id")
      .single();

    if (clientError || !newClient) {
      return NextResponse.json(
        { error: "No se pudo registrar el cliente." },
        { status: 500 }
      );
    }
    clientId = newClient.id;
  }

  await admin.from("form_submissions").insert({
    form_id: form.id,
    business_id: form.business_id,
    client_id: clientId,
    data: answers,
  });

  await admin.from("audit_logs").insert({
    business_id: form.business_id,
    actor_type: "client",
    actor_id: clientId,
    action: "form.submitted",
    entity_type: "form",
    entity_id: form.id,
    metadata: { via: "embed" },
  });

  return NextResponse.json({ ok: true });
}
