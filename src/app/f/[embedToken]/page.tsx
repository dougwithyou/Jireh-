import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { EmbedForm } from "./embed-form";

export default async function EmbedFormPage({
  params,
}: PageProps<"/f/[embedToken]">) {
  const { embedToken } = await params;
  const admin = createAdminClient();

  const { data: form } = await admin
    .from("forms")
    .select("id, name, is_active")
    .eq("embed_token", embedToken)
    .maybeSingle();

  if (!form || !form.is_active) notFound();

  const { data: fields } = await admin
    .from("form_fields")
    .select("id, label, field_type, is_required, options, sort_order")
    .eq("form_id", form.id)
    .order("sort_order", { ascending: true });

  return (
    <main className="min-h-screen bg-white p-6">
      <h1 className="text-lg font-semibold text-neutral-900">{form.name}</h1>
      <EmbedForm embedToken={embedToken} fields={fields ?? []} />
    </main>
  );
}
