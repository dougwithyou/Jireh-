import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser, isSuperAdmin } from "@/lib/auth/session";
import { signOut } from "@/lib/auth/actions";

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const superAdmin = await isSuperAdmin();
  if (!superAdmin) redirect("/app");

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/admin" className="text-sm font-semibold text-neutral-900">
            Super Admin
          </Link>
          <nav className="flex items-center gap-4 text-sm text-neutral-600">
            <Link href="/admin" className="hover:text-neutral-900">
              Negocios
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
      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
    </div>
  );
}
