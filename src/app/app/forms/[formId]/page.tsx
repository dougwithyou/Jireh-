import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { addField, deleteField, toggleFormActive } from "../actions";

const fieldTypeLabels: Record<string, string> = {
  text: "Texto corto",
  textarea: "Texto largo",
  email: "Correo",
  phone: "Teléfono",
  select: "Selección",
  checkbox: "Casilla",
  date: "Fecha",
  file: "Archivo",
};

export default async function EditFormPage({
  params,
}: PageProps<"/app/forms/[formId]">) {
  const { formId } = await params;
  const supabase = await createClient();

  const { data: form } = await supabase
    .from("forms")
    .select("id, name, embed_token, is_active")
    .eq("id", formId)
    .maybeSingle();

  if (!form) notFound();

  const { data: fields } = await supabase
    .from("form_fields")
    .select("id, label, field_type, is_required, sort_order")
    .eq("form_id", formId)
    .order("sort_order", { ascending: true });

  const headerList = await headers();
  const host = headerList.get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  const embedUrl = `${protocol}://${host}/f/${form.embed_token}`;
  const snippet = `<iframe src="${embedUrl}" style="width:100%;max-width:480px;height:640px;border:0" title="${form.name}"></iframe>`;

  const addFieldWithId = addField.bind(null, formId);
  const deleteFieldWithId = deleteField.bind(null, formId);
  const toggleActiveOn = toggleFormActive.bind(null, formId, !form.is_active);

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-neutral-900">{form.name}</h1>
        <form action={toggleActiveOn}>
          <button
            type="submit"
            className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-100"
          >
            {form.is_active ? "Desactivar" : "Activar"}
          </button>
        </form>
      </div>

      <section className="mt-6 rounded-lg border border-neutral-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-neutral-900">
          Código para pegar en cualquier sitio web
        </h2>
        <pre className="mt-2 overflow-x-auto rounded-md bg-neutral-900 p-3 text-xs text-neutral-100">
          {snippet}
        </pre>
        <p className="mt-2 text-xs text-neutral-500">
          También podés compartir el link directo: {embedUrl}
        </p>
      </section>

      <section className="mt-6 rounded-lg border border-neutral-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-neutral-900">Preguntas</h2>
        <ul className="mt-3 divide-y divide-neutral-100">
          {fields?.length ? (
            fields.map((f) => (
              <li key={f.id} className="flex items-center justify-between py-2 text-sm">
                <span>
                  {f.label}{" "}
                  <span className="text-neutral-400">
                    ({fieldTypeLabels[f.field_type] ?? f.field_type}
                    {f.is_required ? ", obligatorio" : ""})
                  </span>
                </span>
                <form action={deleteFieldWithId.bind(null, f.id)}>
                  <button
                    type="submit"
                    className="text-xs text-red-600 hover:underline"
                  >
                    Eliminar
                  </button>
                </form>
              </li>
            ))
          ) : (
            <li className="py-2 text-sm text-neutral-400">
              Todavía no agregaste preguntas.
            </li>
          )}
        </ul>

        <form action={addFieldWithId} className="mt-4 space-y-3 border-t border-neutral-100 pt-4">
          <div className="flex gap-2">
            <input
              name="label"
              required
              placeholder="Pregunta (ej. ¿Qué proyecto tenés en mente?)"
              className="flex-1 rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
            />
            <select
              name="field_type"
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
              defaultValue="text"
            >
              {Object.entries(fieldTypeLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <input
            name="options"
            placeholder="Opciones separadas por coma (solo para Selección)"
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
          />
          <label className="flex items-center gap-2 text-sm text-neutral-600">
            <input type="checkbox" name="is_required" className="rounded" />
            Obligatorio
          </label>
          <button
            type="submit"
            className="rounded-md bg-neutral-900 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-800"
          >
            Agregar pregunta
          </button>
        </form>
      </section>
    </div>
  );
}
