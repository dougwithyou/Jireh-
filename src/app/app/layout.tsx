import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser, getActiveBusinessMembership, isSuperAdmin } from "@/lib/auth/session";
import { signOut } from "@/lib/auth/actions";

export default async function DashboardLayout({
  children,
}: LayoutProps<"/app">) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const membership = await getActiveBusinessMembership();

  if (!membership) {
    if (await isSuperAdmin()) redirect("/admin");

    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
        <div className="max-w-sm text-center">
          <p className="text-sm text-neutral-600">
            Tu cuenta ({user.email}) no está asociada a ningún negocio
            todavía. Pedile al administrador que te agregue.
          </p>
          <form action={signOut} className="mt-4">
            <button
              type="submit"
              className="text-sm font-medium text-neutral-900 underline"
            >
              Salir
            </button>
          </form>
        </div>
      </div>
    );
  }

  const business = membership.businesses;

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-sm font-semibold text-neutral-900">
              {business?.name ?? "Panel"}
            </p>
            <p className="text-xs text-neutral-500">{business?.business_type}</p>
          </div>
          <nav className="flex items-center gap-4 text-sm text-neutral-600">
            <Link href="/app" className="hover:text-neutral-900">
              Inicio
            </Link>
            <Link href="/app/clients" className="hover:text-neutral-900">
              Clientes
            </Link>
            <Link href="/app/forms" className="hover:text-neutral-900">
              Formularios
            </Link>
            <span className="text-neutral-300">|</span>
            <span>{user.email}</span>
            <form action={signOut}>
              <button type="submit" className="hover:text-neutral-900">
                Salir
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}
