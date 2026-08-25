import { getSiteContent } from "@/lib/site-content/get";
import { SiteEditor } from "./SiteEditor";

export default async function SiteContentEditorPage() {
  const content = await getSiteContent();

  return (
    <div>
      <h1 className="text-xl font-semibold text-neutral-900">
        Editor del sitio web
      </h1>
      <p className="mt-1 max-w-2xl text-sm text-neutral-500">
        Editá cada texto e imagen del sitio público de Jireh Contractor. Los
        cambios se ven en{" "}
        <a href="/" target="_blank" className="underline">
          jireh-crm.vercel.app
        </a>{" "}
        apenas guardás cada sección.
      </p>

      <div className="mt-8">
        <SiteEditor content={content} />
      </div>
    </div>
  );
}
