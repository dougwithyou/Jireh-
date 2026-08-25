import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const sourceLabels: Record<string, string> = {
  whatsapp: "WhatsApp",
  web_form: "Formulario web",
  manual: "Manual",
};

export default async function ClientsPage() {
  const supabase = await createClient();
  const { data: clients } = await supabase
    .from("clients")
    .select("id, full_name, email, phone, source, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-xl font-semibold text-neutral-900">Clientes</h1>

      <div className="mt-6 overflow-hidden rounded-lg border border-neutral-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 text-neutral-500">
            <tr>
              <th className="px-4 py-3 font-medium">Nombre</th>
              <th className="px-4 py-3 font-medium">Contacto</th>
              <th className="px-4 py-3 font-medium">Origen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {clients?.length ? (
              clients.map((c) => (
                <tr key={c.id}>
                  <td className="px-4 py-3">
                    <Link
                      href={`/app/clients/${c.id}`}
                      className="font-medium text-neutral-900 hover:underline"
                    >
                      {c.full_name || "(sin nombre)"}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-neutral-600">
                    {c.email || c.phone || "—"}
                  </td>
                  <td className="px-4 py-3 text-neutral-600">
                    {sourceLabels[c.source] ?? c.source}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-neutral-400">
                  Todavía no hay clientes. Van a aparecer acá cuando lleguen
                  por un formulario o por WhatsApp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
