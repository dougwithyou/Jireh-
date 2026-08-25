import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

const BUCKET = "site-images";
const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

/**
 * Sube una imagen al bucket público site-images y devuelve su URL pública.
 * Solo debe llamarse después de confirmar is_super_admin() — no vuelve a
 * chequearlo (usa el cliente service_role, que no pasa por RLS).
 */
export async function uploadSiteImage(file: File, pathPrefix: string): Promise<string> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Formato de imagen no soportado (usá JPG, PNG, WEBP o AVIF).");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("La imagen no puede pesar más de 5 MB.");
  }

  const admin = createAdminClient();
  const extension = file.type.split("/")[1];
  const path = `${pathPrefix}-${Date.now()}.${extension}`;

  const { error } = await admin.storage.from(BUCKET).upload(path, file, {
    contentType: file.type,
    upsert: false,
  });

  if (error) throw new Error(`No se pudo subir la imagen: ${error.message}`);

  const { data } = admin.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
