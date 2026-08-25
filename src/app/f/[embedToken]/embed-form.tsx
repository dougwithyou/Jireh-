"use client";

import { useState } from "react";

type Field = {
  id: string;
  label: string;
  field_type: string;
  is_required: boolean;
  options: unknown;
};

export function EmbedForm({
  embedToken,
  fields,
}: {
  embedToken: string;
  fields: Field[];
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    const fullName = String(formData.get("full_name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();

    if (!email && !phone) {
      setStatus("error");
      return;
    }

    const answers: Record<string, string> = {};
    for (const field of fields) {
      const value = formData.get(`field_${field.id}`);
      if (value != null) answers[field.label] = String(value);
    }

    try {
      const res = await fetch(`/api/forms/${embedToken}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, phone, answers }),
      });

      if (!res.ok) throw new Error("submit failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="mt-6 text-sm text-neutral-700">
        ¡Gracias! Recibimos tu mensaje y te vamos a contactar pronto.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-neutral-700">
          Nombre
        </label>
        <input
          name="full_name"
          required
          className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-neutral-700">
            Correo
          </label>
          <input
            name="email"
            type="email"
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700">
            Teléfono
          </label>
          <input
            name="phone"
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
          />
        </div>
      </div>
      <p className="text-xs text-neutral-400">
        Dejá al menos correo o teléfono para que te podamos contactar.
      </p>

      {fields.map((field) => (
        <div key={field.id}>
          <label className="block text-sm font-medium text-neutral-700">
            {field.label}
            {field.is_required && " *"}
          </label>
          <FieldInput field={field} />
        </div>
      ))}

      {status === "error" && (
        <p className="text-sm text-red-600">
          No pudimos enviar el formulario. Revisá los datos e intentá de
          nuevo.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-md bg-neutral-900 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-50"
      >
        {status === "sending" ? "Enviando…" : "Enviar"}
      </button>
    </form>
  );
}

function FieldInput({ field }: { field: Field }) {
  const name = `field_${field.id}`;
  const options = Array.isArray(field.options) ? (field.options as string[]) : [];

  switch (field.field_type) {
    case "textarea":
      return (
        <textarea
          name={name}
          required={field.is_required}
          rows={3}
          className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
        />
      );
    case "select":
      return (
        <select
          name={name}
          required={field.is_required}
          defaultValue=""
          className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
        >
          <option value="" disabled>
            Seleccioná una opción
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );
    case "checkbox":
      return (
        <input type="checkbox" name={name} className="mt-1 rounded" />
      );
    case "date":
      return (
        <input
          type="date"
          name={name}
          required={field.is_required}
          className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
        />
      );
    case "email":
      return (
        <input
          type="email"
          name={name}
          required={field.is_required}
          className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
        />
      );
    case "phone":
      return (
        <input
          type="tel"
          name={name}
          required={field.is_required}
          className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
        />
      );
    case "file":
      return <input type="file" name={name} className="mt-1 text-sm" />;
    default:
      return (
        <input
          name={name}
          required={field.is_required}
          className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
        />
      );
  }
}
