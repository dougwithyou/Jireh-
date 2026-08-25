-- El linter de seguridad de Supabase marca las funciones sin search_path fijo
-- como riesgo (search path hijacking). set_updated_at no necesitaba
-- security definer (solo escribe en NEW, no consulta otras tablas), así que
-- de paso se baja a security invoker.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
