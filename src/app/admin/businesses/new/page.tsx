"use client";

import { useActionState } from "react";
import Link from "next/link";
import { createBusiness, type CreateBusinessState } from "../actions";

const initialState: CreateBusinessState = {};

export default function NewBusinessPage() {
  const [state, formAction, pending] = useActionState(
    createBusiness,
    initialState
  );

  if (state.success) {
    return (
      <div className="max-w-lg">
        <h1 className="text-xl font-semibold text-neutral-900">
          Negocio creado
        </h1>
        <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-sm text-emerald-900">
            Compartí estas credenciales con el dueño por un canal seguro
            (no quedan guardadas en ningún lado, solo se muestran una vez).
          </p>
          <dl className="mt-3 space-y-1 text-sm">
            <div className="flex gap-2">
              <dt className="font-medium text-emerald-900">Correo:</dt>
              <dd className="font-mono text-emerald-800">
                {state.success.ownerEmail}
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-medium text-emerald-900">Contraseña temporal:</dt>
              <dd className="font-mono text-emerald-800">
                {state.success.tempPassword}
              </dd>
            </div>
          </dl>
        </div>
        <Link
          href="/admin"
          className="mt-6 inline-block text-sm font-medium text-neutral-900 underline"
        >
          Volver a negocios
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-xl font-semibold text-neutral-900">Nuevo negocio</h1>
      <form action={formAction} className="mt-6 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-neutral-700">
            Nombre del negocio
          </label>
          <input
            id="name"
            name="name"
            required
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="business_type"
            className="block text-sm font-medium text-neutral-700"
          >
            Tipo de negocio
          </label>
          <input
            id="business_type"
            name="business_type"
            placeholder="Construcción, fotografía, salón de belleza…"
            required
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="primary_contact"
            className="block text-sm font-medium text-neutral-700"
          >
            Quién lo atiende (opcional)
          </label>
          <input
            id="primary_contact"
            name="primary_contact"
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="owner_email"
            className="block text-sm font-medium text-neutral-700"
          >
            Correo del dueño
          </label>
          <input
            id="owner_email"
            name="owner_email"
            type="email"
            required
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
          />
          <p className="mt-1 text-xs text-neutral-500">
            Se crea una cuenta con contraseña temporal para que inicie sesión
            en /login.
          </p>
        </div>

        {state.error && <p className="text-sm text-red-600">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-neutral-900 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-50"
        >
          {pending ? "Creando…" : "Crear negocio"}
        </button>
      </form>
    </div>
  );
}
