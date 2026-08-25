import { createClient } from "@/lib/supabase/server";
import { defaultSiteContent } from "./defaults";
import type { SiteContent } from "./types";

const SITE_ID = "jireh-contractor";

export async function getSiteContent(): Promise<SiteContent> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("site_content")
    .select("content")
    .eq("id", SITE_ID)
    .maybeSingle();

  if (!data?.content) return defaultSiteContent;

  // La fila siempre se escribe completa desde el editor (ver actions.ts),
  // así que un objeto parcial solo puede venir de una migración vieja;
  // el spread cubre esa fila con los valores por defecto.
  return { ...defaultSiteContent, ...(data.content as Partial<SiteContent>) };
}
