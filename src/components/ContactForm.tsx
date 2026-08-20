"use client";

import { useState, FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

type FormState = {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  city: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  projectType: "",
  city: "",
  message: "",
};

type Errors = Partial<Record<keyof FormState, string>>;

const projectTypes = [
  { value: "", label: "Selecciona el tipo de proyecto" },
  { value: "vivienda-nueva", label: "Construcción de vivienda desde cero" },
  { value: "remodelacion", label: "Remodelación residencial" },
  { value: "comercial", label: "Proyecto comercial" },
  { value: "otro", label: "Otro" },
];

function validate(form: FormState): Errors {
  const errors: Errors = {};

  if (!form.name.trim()) errors.name = "Ingresa tu nombre.";

  if (!form.phone.trim()) {
    errors.phone = "Ingresa un teléfono de contacto.";
  } else if (!/^[\d\s()+-]{7,}$/.test(form.phone.trim())) {
    errors.phone = "Ingresa un teléfono válido.";
  }

  if (!form.email.trim()) {
    errors.email = "Ingresa tu correo electrónico.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Ingresa un correo válido.";
  }

  if (!form.projectType) errors.projectType = "Selecciona el tipo de proyecto.";
  if (!form.city.trim()) errors.city = "Ingresa tu ciudad o zona.";

  if (!form.message.trim()) {
    errors.message = "Cuéntanos brevemente sobre tu proyecto.";
  } else if (form.message.trim().length < 10) {
    errors.message = "Agrega un poco más de detalle (mínimo 10 caracteres).";
  }

  return errors;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");

  function handleChange(
    field: keyof FormState
  ): (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void {
    return (e) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");

    /*
     * FASE 2 (pendiente): al enviar el formulario, este bloque llamará a un
     * endpoint del backend que notificará automáticamente al WhatsApp de
     * Nicolás con los datos de la solicitud. Por ahora solo se simula el
     * envío en el frontend, sin conexión a un backend real.
     */
    window.setTimeout(() => {
      setStatus("sent");
    }, 1200);
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-navy-100 bg-white p-10 text-center shadow-sm">
        <CheckCircle2 className="mb-4 text-terracotta-500" size={48} strokeWidth={1.5} />
        <h3 className="font-heading text-xl font-semibold text-navy-950">
          ¡Solicitud enviada!
        </h3>
        <p className="mt-2 max-w-sm text-navy-600">
          Gracias por contactar a Jireh Contractor. El equipo de Nicolás
          revisará tu solicitud y se pondrá en contacto contigo pronto.
        </p>
        <button
          type="button"
          onClick={() => {
            setForm(initialState);
            setStatus("idle");
          }}
          className="mt-6 text-sm font-semibold text-navy-700 underline underline-offset-4 hover:text-terracotta-600"
        >
          Enviar otra solicitud
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nombre completo" error={errors.name}>
          <input
            type="text"
            value={form.name}
            onChange={handleChange("name")}
            placeholder="Tu nombre"
            className={inputClass(!!errors.name)}
          />
        </Field>

        <Field label="Teléfono" error={errors.phone}>
          <input
            type="tel"
            value={form.phone}
            onChange={handleChange("phone")}
            placeholder="(555) 555-5555"
            className={inputClass(!!errors.phone)}
          />
        </Field>

        <Field label="Correo electrónico" error={errors.email}>
          <input
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            placeholder="tucorreo@ejemplo.com"
            className={inputClass(!!errors.email)}
          />
        </Field>

        <Field label="Ciudad / Zona" error={errors.city}>
          <input
            type="text"
            value={form.city}
            onChange={handleChange("city")}
            placeholder="Ej. Arlington, VA"
            className={inputClass(!!errors.city)}
          />
        </Field>

        <Field label="Tipo de proyecto" error={errors.projectType} className="sm:col-span-2">
          <select
            value={form.projectType}
            onChange={handleChange("projectType")}
            className={inputClass(!!errors.projectType)}
          >
            {projectTypes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="Cuéntanos sobre tu proyecto"
          error={errors.message}
          className="sm:col-span-2"
        >
          <textarea
            value={form.message}
            onChange={handleChange("message")}
            placeholder="Describe brevemente lo que necesitas..."
            rows={4}
            className={inputClass(!!errors.message)}
          />
        </Field>
      </div>

      <p className="mt-6 text-sm text-navy-500">
        Al enviar este formulario, el equipo de Jireh Contractor se pondrá en
        contacto contigo pronto.
      </p>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-terracotta-500 px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-terracotta-600 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send size={20} />
            Solicitar presupuesto
          </>
        )}
      </button>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-lg border bg-white px-4 py-3 text-navy-950 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-terracotta-400 ${
    hasError ? "border-red-400" : "border-navy-200"
  }`;
}

function Field({
  label,
  error,
  children,
  className = "",
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-medium text-navy-800">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-sm text-red-500">{error}</span>}
    </label>
  );
}
