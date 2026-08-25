import "server-only";
import { createClient } from "@/lib/supabase/server";

export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function isSuperAdmin() {
  const supabase = await createClient();
  const { data } = await supabase.rpc("is_super_admin");
  return data === true;
}

/**
 * Returns the first business the current user belongs to. Fase 2 assumes
 * one business per staff/owner account — a business switcher for users in
 * multiple businesses is out of scope until it's actually needed.
 */
export async function getActiveBusinessMembership() {
  const supabase = await createClient();
  const { data: membership } = await supabase
    .from("business_members")
    .select("business_id, role, businesses(id, name, business_type, status)")
    .limit(1)
    .maybeSingle();

  return membership;
}
