import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminHomePage() {
  const supabase = await createClient();
  const { data: businesses } = await supabase
    .from("businesses")
    .select("id, name, business_type, status, plan, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-neutral-900">Negocios</h1>
        <Link
          href="/admin/businesses/new"
          className="rounded-md bg-neutral-900 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-800"
        >
          + Nuevo negocio
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-neutral-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 text-neutral-500">
            <tr>
              <th className="px-4 py-3 font-medium">Nombre</th>
              <th className="px-4 py-3 font-medium">Tipo</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 font-medium">Plan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {businesses?.length ? (
              businesses.map((b) => (
                <tr key={b.id}>
                  <td className="px-4 py-3 font-medium text-neutral-900">
                    {b.name}
                  </td>
                  <td className="px-4 py-3 text-neutral-600">
                    {b.business_type}
                  </td>
                  <td className="px-4 py-3 text-neutral-600">{b.status}</td>
                  <td className="px-4 py-3 text-neutral-600">{b.plan}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-neutral-400">
                  Todavía no hay negocios cargados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
