import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardHomePage() {
  const supabase = await createClient();

  const [{ count: clientsCount }, { count: formsCount }] = await Promise.all([
    supabase.from("clients").select("*", { count: "exact", head: true }),
    supabase.from("forms").select("*", { count: "exact", head: true }),
  ]);

  return (
    <div>
      <h1 className="text-xl font-semibold text-neutral-900">Inicio</h1>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          href="/app/clients"
          className="rounded-lg border border-neutral-200 bg-white p-5 hover:border-neutral-300"
        >
          <p className="text-sm text-neutral-500">Clientes</p>
          <p className="mt-1 text-2xl font-semibold text-neutral-900">
            {clientsCount ?? 0}
          </p>
        </Link>

        <Link
          href="/app/forms"
          className="rounded-lg border border-neutral-200 bg-white p-5 hover:border-neutral-300"
        >
          <p className="text-sm text-neutral-500">Formularios</p>
          <p className="mt-1 text-2xl font-semibold text-neutral-900">
            {formsCount ?? 0}
          </p>
        </Link>
      </div>

      <p className="mt-8 text-sm text-neutral-400">
        Presupuestos, contratos, facturas e ingresos del mes llegan en la
        Fase 4 del plan de desarrollo.
      </p>
    </div>
  );
}
