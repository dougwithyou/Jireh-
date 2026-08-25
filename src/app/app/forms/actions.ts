"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type FormFieldTypeOption =
  | "text"
  | "textarea"
  | "email"
  | "phone"
  | "select"
  | "checkbox"
  | "date"
  | "file";

export async function createForm(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;

  const supabase = await createClient();
  const { data: membership } = await supabase
    .from("business_members")
    .select("business_id")
    .limit(1)
    .maybeSingle();

  if (!membership) return;

  const { data: form, error } = await supabase
    .from("forms")
    .insert({ business_id: membership.business_id, name })
    .select("id")
    .single();

  if (error || !form) return;

  redirect(`/app/forms/${form.id}`);
}

export async function addField(formId: string, formData: FormData) {
  const label = String(formData.get("label") ?? "").trim();
  const fieldType = String(formData.get("field_type") ?? "text") as FormFieldTypeOption;
  const isRequired = formData.get("is_required") === "on";
  const optionsRaw = String(formData.get("options") ?? "").trim();

  if (!label) return;

  const supabase = await createClient();

  const { count } = await supabase
    .from("form_fields")
    .select("*", { count: "exact", head: true })
    .eq("form_id", formId);

  await supabase.from("form_fields").insert({
    form_id: formId,
    label,
    field_type: fieldType,
    is_required: isRequired,
    sort_order: count ?? 0,
    options:
      fieldType === "select" && optionsRaw
        ? optionsRaw.split(",").map((o) => o.trim()).filter(Boolean)
        : [],
  });

  revalidatePath(`/app/forms/${formId}`);
}

export async function deleteField(formId: string, fieldId: string) {
  const supabase = await createClient();
  await supabase.from("form_fields").delete().eq("id", fieldId);
  revalidatePath(`/app/forms/${formId}`);
}

export async function toggleFormActive(formId: string, isActive: boolean) {
  const supabase = await createClient();
  await supabase.from("forms").update({ is_active: isActive }).eq("id", formId);
  revalidatePath(`/app/forms/${formId}`);
  revalidatePath("/app/forms");
}
