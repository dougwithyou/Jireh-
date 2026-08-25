import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { createForm } from "./actions";

export default async function FormsPage() {
  const supabase = await createClient();
  const { data: forms } = await supabase
    .from("forms")
    .select("id, name, is_active, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-xl font-semibold text-neutral-900">Formularios</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Creá un formulario, definí sus preguntas y pegá el snippet en
        cualquier sitio web. Cada envío entra al CRM como cliente nuevo.
      </p>

      <form
        action={createForm}
        className="mt-6 flex max-w-md gap-2 rounded-lg border border-neutral-200 bg-white p-4"
      >
        <input
          name="name"
          required
          placeholder="Nombre del formulario (ej. Contacto sitio web)"
          className="flex-1 rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-md bg-neutral-900 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-800"
        >
          Crear
        </button>
      </form>

      <div className="mt-6 overflow-hidden rounded-lg border border-neutral-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 text-neutral-500">
            <tr>
              <th className="px-4 py-3 font-medium">Nombre</th>
              <th className="px-4 py-3 font-medium">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {forms?.length ? (
              forms.map((f) => (
                <tr key={f.id}>
                  <td className="px-4 py-3">
                    <Link
                      href={`/app/forms/${f.id}`}
                      className="font-medium text-neutral-900 hover:underline"
                    >
                      {f.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-neutral-600">
                    {f.is_active ? "Activo" : "Inactivo"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="px-4 py-8 text-center text-neutral-400">
                  Todavía no creaste ningún formulario.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
