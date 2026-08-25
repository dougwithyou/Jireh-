import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const sourceLabels: Record<string, string> = {
  whatsapp: "WhatsApp",
  web_form: "Formulario web",
  manual: "Manual",
};

export default async function ClientDetailPage({
  params,
}: PageProps<"/app/clients/[clientId]">) {
  const { clientId } = await params;
  const supabase = await createClient();

  const { data: client } = await supabase
    .from("clients")
    .select("*")
    .eq("id", clientId)
    .maybeSingle();

  if (!client) notFound();

  const { data: submissions } = await supabase
    .from("form_submissions")
    .select("id, data, created_at, forms(name)")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-xl font-semibold text-neutral-900">
        {client.full_name || "(sin nombre)"}
      </h1>

      <dl className="mt-4 grid grid-cols-1 gap-4 rounded-lg border border-neutral-200 bg-white p-5 sm:grid-cols-3">
        <div>
          <dt className="text-xs text-neutral-500">Correo</dt>
          <dd className="text-sm text-neutral-900">{client.email || "—"}</dd>
        </div>
        <div>
          <dt className="text-xs text-neutral-500">Teléfono</dt>
          <dd className="text-sm text-neutral-900">{client.phone || "—"}</dd>
        </div>
        <div>
          <dt className="text-xs text-neutral-500">Origen</dt>
          <dd className="text-sm text-neutral-900">
            {sourceLabels[client.source] ?? client.source}
          </dd>
        </div>
      </dl>

      <h2 className="mt-8 text-sm font-semibold text-neutral-900">
        Envíos de formulario
      </h2>
      <div className="mt-2 space-y-3">
        {submissions?.length ? (
          submissions.map((s) => (
            <div
              key={s.id}
              className="rounded-lg border border-neutral-200 bg-white p-4 text-sm"
            >
              <p className="font-medium text-neutral-900">
                {s.forms?.name ?? "Formulario"}
              </p>
              <p className="text-xs text-neutral-400">
                {new Date(s.created_at).toLocaleString("es")}
              </p>
              <dl className="mt-2 space-y-1">
                {Object.entries((s.data as Record<string, unknown>) ?? {}).map(
                  ([key, value]) => (
                    <div key={key} className="flex gap-2">
                      <dt className="text-neutral-500">{key}:</dt>
                      <dd className="text-neutral-900">{String(value)}</dd>
                    </div>
                  )
                )}
              </dl>
            </div>
          ))
        ) : (
          <p className="text-sm text-neutral-400">Sin envíos todavía.</p>
        )}
      </div>

      <p className="mt-8 text-sm text-neutral-400">
        Conversaciones, presupuestos, contratos y facturas se suman en las
        próximas fases.
      </p>
    </div>
  );
}
