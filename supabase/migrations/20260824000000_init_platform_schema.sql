-- =============================================================================
-- Plataforma SaaS de CRM + IA para negocios de servicios
-- Migración inicial: esquema completo multi-tenant con Row Level Security
-- =============================================================================
-- Convenciones:
--   * Todo id es uuid (gen_random_uuid()).
--   * Aislamiento multi-tenant vía columna business_id + RLS.
--   * Las páginas públicas de link único (presupuesto/contrato/factura) NO se
--     leen directo desde el cliente con anon key: los API routes del server
--     validan el token y usan la service_role key. Por eso esas tablas no
--     tienen policy de lectura anónima; solo policies para miembros del
--     negocio y super admins.
--   * Todos los timestamps en timestamptz, default now().
-- =============================================================================

create extension if not exists "pgcrypto";

-- -----------------------------------------------------------------------------
-- Función utilitaria: updated_at automático
-- -----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- =============================================================================
-- 1. SUPER ADMIN / PLATAFORMA
-- =============================================================================

-- Dueños de la plataforma (yo). No hay auto-registro: se inserta manualmente.
create table public.super_admins (
  user_id     uuid primary key references auth.users(id) on delete cascade,
  created_at  timestamptz not null default now()
);

create or replace function public.is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.super_admins where user_id = auth.uid()
  );
$$;

-- =============================================================================
-- 2. NEGOCIOS (TENANTS) Y MIEMBROS
-- =============================================================================

create type public.business_status as enum ('active', 'suspended', 'trial');
create type public.business_plan as enum ('starter', 'pro', 'scale');
create type public.member_role as enum ('owner', 'staff');

create table public.businesses (
  id                  uuid primary key default gen_random_uuid(),
  name                text not null,
  business_type       text not null,            -- fotografía, construcción, salón de belleza, etc.
  status              public.business_status not null default 'trial',
  plan                public.business_plan not null default 'starter',
  primary_contact     text,                       -- quién atiende la cuenta
  ai_credit_balance   numeric(12,4) not null default 0,
  stripe_customer_id  text,                       -- cliente de Stripe para la suscripción SaaS
  branding            jsonb not null default '{}'::jsonb,  -- logo, colores, etc.
  created_by          uuid references auth.users(id),      -- super admin que la creó
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create trigger trg_businesses_updated_at
  before update on public.businesses
  for each row execute function public.set_updated_at();

-- Vínculo usuario auth <-> negocio (owner/staff del negocio)
create table public.business_members (
  id           uuid primary key default gen_random_uuid(),
  business_id  uuid not null references public.businesses(id) on delete cascade,
  user_id      uuid not null references auth.users(id) on delete cascade,
  role         public.member_role not null default 'staff',
  created_at   timestamptz not null default now(),
  unique (business_id, user_id)
);

create or replace function public.is_member_of(p_business_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.business_members
    where business_id = p_business_id and user_id = auth.uid()
  );
$$;

-- Documentos de referencia cargados por el super admin al crear la cuenta
-- (presupuestos, contratos, facturas anteriores) para que la IA imite estilo.
create type public.reference_doc_type as enum ('quote', 'contract', 'invoice', 'other');

create table public.ai_reference_documents (
  id            uuid primary key default gen_random_uuid(),
  business_id   uuid not null references public.businesses(id) on delete cascade,
  doc_type      public.reference_doc_type not null,
  file_url      text not null,               -- Supabase Storage path
  notes         text,
  uploaded_by   uuid references auth.users(id),
  created_at    timestamptz not null default now()
);

-- =============================================================================
-- 3. CLIENTES (CRM)
-- =============================================================================

create type public.client_source as enum ('whatsapp', 'web_form', 'manual');

create table public.clients (
  id             uuid primary key default gen_random_uuid(),
  business_id    uuid not null references public.businesses(id) on delete cascade,
  full_name      text,
  email          text,
  phone          text,
  whatsapp_id    text,                        -- wa_id de WhatsApp Cloud API
  source         public.client_source not null default 'manual',
  tags           text[] not null default '{}',
  notes          text,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index idx_clients_business on public.clients(business_id);
create index idx_clients_whatsapp on public.clients(business_id, whatsapp_id);

create trigger trg_clients_updated_at
  before update on public.clients
  for each row execute function public.set_updated_at();

-- =============================================================================
-- 4. FORMULARIOS EMBEBIBLES
-- =============================================================================

create table public.forms (
  id            uuid primary key default gen_random_uuid(),
  business_id   uuid not null references public.businesses(id) on delete cascade,
  name          text not null,
  embed_token   text not null unique default encode(gen_random_bytes(16), 'hex'),
  is_active     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create trigger trg_forms_updated_at
  before update on public.forms
  for each row execute function public.set_updated_at();

create type public.form_field_type as enum ('text', 'textarea', 'email', 'phone', 'select', 'checkbox', 'date', 'file');

create table public.form_fields (
  id            uuid primary key default gen_random_uuid(),
  form_id       uuid not null references public.forms(id) on delete cascade,
  label         text not null,
  field_type    public.form_field_type not null default 'text',
  options       jsonb not null default '[]'::jsonb,  -- para select
  is_required   boolean not null default false,
  sort_order    int not null default 0
);

create index idx_form_fields_form on public.form_fields(form_id);

create table public.form_submissions (
  id            uuid primary key default gen_random_uuid(),
  form_id       uuid not null references public.forms(id) on delete cascade,
  business_id   uuid not null references public.businesses(id) on delete cascade,
  client_id     uuid references public.clients(id) on delete set null,
  data          jsonb not null default '{}'::jsonb,
  created_at    timestamptz not null default now()
);

create index idx_form_submissions_business on public.form_submissions(business_id);

-- =============================================================================
-- 5. WHATSAPP
-- =============================================================================

create table public.whatsapp_connections (
  id                  uuid primary key default gen_random_uuid(),
  business_id         uuid not null unique references public.businesses(id) on delete cascade,
  phone_number_id     text not null,          -- id de WhatsApp Cloud API
  display_phone       text,
  access_token_secret text not null,          -- referencia a secreto cifrado (Vault), no el token en claro
  webhook_verify_token text not null default encode(gen_random_bytes(16), 'hex'),
  status              text not null default 'disconnected',
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create trigger trg_whatsapp_updated_at
  before update on public.whatsapp_connections
  for each row execute function public.set_updated_at();

-- =============================================================================
-- 6. CONVERSACIONES Y MENSAJES (WhatsApp + chat interno de IA)
-- =============================================================================

create type public.conversation_channel as enum ('whatsapp', 'internal');
create type public.conversation_status as enum ('open', 'pending_ai', 'closed');

create table public.conversations (
  id              uuid primary key default gen_random_uuid(),
  business_id     uuid not null references public.businesses(id) on delete cascade,
  client_id       uuid not null references public.clients(id) on delete cascade,
  channel         public.conversation_channel not null,
  status          public.conversation_status not null default 'open',
  last_message_at timestamptz,
  created_at      timestamptz not null default now()
);

create index idx_conversations_business on public.conversations(business_id);
create index idx_conversations_client on public.conversations(client_id);

create type public.message_sender as enum ('client', 'staff', 'ai', 'system');
create type public.message_content_type as enum ('text', 'audio', 'image', 'document');

create table public.messages (
  id              uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  business_id     uuid not null references public.businesses(id) on delete cascade,
  sender_type     public.message_sender not null,
  sender_user_id  uuid references auth.users(id),   -- si sender_type = staff
  content_type    public.message_content_type not null default 'text',
  body            text,                              -- texto o transcripción (audio) o análisis (imagen)
  media_url       text,                               -- Supabase Storage path del audio/foto/doc original
  whatsapp_message_id text,
  created_at      timestamptz not null default now()
);

create index idx_messages_conversation on public.messages(conversation_id, created_at);
create index idx_messages_business on public.messages(business_id);

-- =============================================================================
-- 7. PRESUPUESTOS / COTIZACIONES
-- =============================================================================

create type public.quote_status as enum (
  'draft', 'sent', 'viewed', 'adjustment_requested', 'approved', 'expired'
);

create table public.quotes (
  id              uuid primary key default gen_random_uuid(),
  business_id     uuid not null references public.businesses(id) on delete cascade,
  client_id       uuid not null references public.clients(id) on delete cascade,
  conversation_id uuid references public.conversations(id) on delete set null,
  status          public.quote_status not null default 'draft',
  public_token    text not null unique default encode(gen_random_bytes(20), 'hex'),
  currency        text not null default 'USD',
  subtotal        numeric(12,2) not null default 0,
  tax             numeric(12,2) not null default 0,
  total           numeric(12,2) not null default 0,
  version         int not null default 1,
  pdf_url         text,                                -- último PDF generado (cache)
  generated_by    public.message_sender not null default 'ai',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  approved_at     timestamptz
);

create index idx_quotes_business on public.quotes(business_id);
create index idx_quotes_client on public.quotes(client_id);

create trigger trg_quotes_updated_at
  before update on public.quotes
  for each row execute function public.set_updated_at();

create table public.quote_items (
  id          uuid primary key default gen_random_uuid(),
  quote_id    uuid not null references public.quotes(id) on delete cascade,
  description text not null,
  quantity    numeric(10,2) not null default 1,
  unit_price  numeric(12,2) not null default 0,
  total       numeric(12,2) not null default 0,
  sort_order  int not null default 0
);

create index idx_quote_items_quote on public.quote_items(quote_id);

-- Tracking del link único (abierto, aprobado, ajuste solicitado, etc.)
create type public.quote_event_type as enum ('viewed', 'pdf_downloaded', 'approved', 'adjustment_requested');

create table public.quote_events (
  id           uuid primary key default gen_random_uuid(),
  quote_id     uuid not null references public.quotes(id) on delete cascade,
  business_id  uuid not null references public.businesses(id) on delete cascade,
  event_type   public.quote_event_type not null,
  metadata     jsonb not null default '{}'::jsonb,   -- ip, user agent, comentario del ajuste
  occurred_at  timestamptz not null default now()
);

create index idx_quote_events_quote on public.quote_events(quote_id, occurred_at);

-- =============================================================================
-- 8. CONTRATOS
-- =============================================================================

create type public.contract_status as enum ('draft', 'sent', 'signed', 'void');

create table public.contracts (
  id              uuid primary key default gen_random_uuid(),
  business_id     uuid not null references public.businesses(id) on delete cascade,
  client_id       uuid not null references public.clients(id) on delete cascade,
  quote_id        uuid references public.quotes(id) on delete set null,
  status          public.contract_status not null default 'draft',
  public_token    text not null unique default encode(gen_random_bytes(20), 'hex'),
  content_html    text not null,                 -- contenido generado por IA, editable
  pdf_url         text,
  signer_name     text,
  signature_data  text,                           -- imagen base64 o texto de firma
  signer_ip       text,
  signed_at       timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index idx_contracts_business on public.contracts(business_id);

create trigger trg_contracts_updated_at
  before update on public.contracts
  for each row execute function public.set_updated_at();

-- =============================================================================
-- 9. FACTURACIÓN Y PAGOS (Stripe)
-- =============================================================================

create type public.invoice_status as enum ('locked', 'unlocked', 'partially_paid', 'paid', 'void');
create type public.invoice_amount_type as enum ('full', 'deposit');

create table public.invoices (
  id                    uuid primary key default gen_random_uuid(),
  business_id           uuid not null references public.businesses(id) on delete cascade,
  client_id             uuid not null references public.clients(id) on delete cascade,
  contract_id           uuid references public.contracts(id) on delete set null,
  quote_id              uuid references public.quotes(id) on delete set null,
  status                public.invoice_status not null default 'locked',
  amount_type           public.invoice_amount_type not null default 'full',
  amount_due            numeric(12,2) not null,
  amount_paid           numeric(12,2) not null default 0,
  currency              text not null default 'USD',
  public_token          text not null unique default encode(gen_random_bytes(20), 'hex'),
  stripe_payment_intent_id text,
  unlocked_at           timestamptz,           -- se desbloquea al firmar el contrato
  paid_at               timestamptz,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create index idx_invoices_business on public.invoices(business_id);

create trigger trg_invoices_updated_at
  before update on public.invoices
  for each row execute function public.set_updated_at();

create type public.payment_status as enum ('pending', 'succeeded', 'failed', 'refunded');

create table public.payments (
  id                    uuid primary key default gen_random_uuid(),
  invoice_id            uuid not null references public.invoices(id) on delete cascade,
  business_id           uuid not null references public.businesses(id) on delete cascade,
  stripe_payment_intent_id text,
  amount                numeric(12,2) not null,
  currency              text not null default 'USD',
  status                public.payment_status not null default 'pending',
  raw_event             jsonb,                  -- payload crudo del webhook de Stripe
  created_at            timestamptz not null default now()
);

create index idx_payments_invoice on public.payments(invoice_id);
create index idx_payments_business on public.payments(business_id);

-- Suscripción SaaS del negocio a la plataforma (billing de la plataforma, no del cliente final)
create type public.subscription_status as enum ('trialing', 'active', 'past_due', 'canceled');

create table public.platform_subscriptions (
  id                      uuid primary key default gen_random_uuid(),
  business_id             uuid not null unique references public.businesses(id) on delete cascade,
  stripe_subscription_id  text,
  plan                    public.business_plan not null default 'starter',
  status                  public.subscription_status not null default 'trialing',
  current_period_end      timestamptz,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);

create trigger trg_platform_subscriptions_updated_at
  before update on public.platform_subscriptions
  for each row execute function public.set_updated_at();

-- =============================================================================
-- 10. EMAIL MARKETING
-- =============================================================================

create table public.email_templates (
  id            uuid primary key default gen_random_uuid(),
  business_id   uuid not null references public.businesses(id) on delete cascade,
  name          text not null,
  subject       text not null,
  body_html     text not null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create trigger trg_email_templates_updated_at
  before update on public.email_templates
  for each row execute function public.set_updated_at();

create table public.client_segments (
  id            uuid primary key default gen_random_uuid(),
  business_id   uuid not null references public.businesses(id) on delete cascade,
  name          text not null,               -- ej. "clientes nuevos", "clientes antiguos"
  rules         jsonb not null default '{}'::jsonb,  -- criterios opcionales de auto-segmentación
  created_at    timestamptz not null default now()
);

create table public.client_segment_members (
  segment_id    uuid not null references public.client_segments(id) on delete cascade,
  client_id     uuid not null references public.clients(id) on delete cascade,
  added_at      timestamptz not null default now(),
  primary key (segment_id, client_id)
);

create type public.sequence_status as enum ('draft', 'active', 'paused', 'archived');

create table public.email_sequences (
  id            uuid primary key default gen_random_uuid(),
  business_id   uuid not null references public.businesses(id) on delete cascade,
  name          text not null,
  segment_id    uuid references public.client_segments(id) on delete set null,
  status        public.sequence_status not null default 'draft',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create trigger trg_email_sequences_updated_at
  before update on public.email_sequences
  for each row execute function public.set_updated_at();

create table public.email_sequence_steps (
  id            uuid primary key default gen_random_uuid(),
  sequence_id   uuid not null references public.email_sequences(id) on delete cascade,
  template_id   uuid not null references public.email_templates(id) on delete restrict,
  delay_days    int not null default 0,      -- días desde el paso anterior (o desde el ingreso al segmento)
  sort_order    int not null default 0
);

create index idx_sequence_steps_sequence on public.email_sequence_steps(sequence_id, sort_order);

create type public.email_send_status as enum ('queued', 'sent', 'delivered', 'opened', 'clicked', 'bounced', 'failed');

create table public.email_sends (
  id                  uuid primary key default gen_random_uuid(),
  business_id         uuid not null references public.businesses(id) on delete cascade,
  client_id           uuid not null references public.clients(id) on delete cascade,
  template_id         uuid references public.email_templates(id) on delete set null,
  sequence_step_id    uuid references public.email_sequence_steps(id) on delete set null,
  resend_email_id     text,                    -- id devuelto por Resend
  status              public.email_send_status not null default 'queued',
  scheduled_for       timestamptz,
  sent_at             timestamptz,
  created_at          timestamptz not null default now()
);

create index idx_email_sends_business on public.email_sends(business_id);
create index idx_email_sends_client on public.email_sends(client_id);

-- =============================================================================
-- 11. CRÉDITOS Y CONSUMO DE IA
-- =============================================================================

create type public.ai_feature as enum (
  'quote_generation', 'contract_generation', 'chat_reply',
  'audio_transcription', 'vision_analysis', 'other'
);

create table public.ai_usage_logs (
  id              uuid primary key default gen_random_uuid(),
  business_id     uuid not null references public.businesses(id) on delete cascade,
  feature         public.ai_feature not null,
  model           text,                        -- ej. "claude-sonnet-5"
  input_tokens    int,
  output_tokens   int,
  credits_used    numeric(12,4) not null default 0,
  cost_usd        numeric(12,6) not null default 0,
  related_entity_type text,                    -- 'quote' | 'contract' | 'message' | ...
  related_entity_id   uuid,
  created_at      timestamptz not null default now()
);

create index idx_ai_usage_business on public.ai_usage_logs(business_id, created_at);

-- Ledger de créditos (recargas, consumos, ajustes manuales del super admin)
create table public.ai_credit_ledger (
  id            uuid primary key default gen_random_uuid(),
  business_id   uuid not null references public.businesses(id) on delete cascade,
  delta         numeric(12,4) not null,        -- positivo = recarga, negativo = consumo
  reason        text not null,
  balance_after numeric(12,4) not null,
  created_by    uuid references auth.users(id),
  created_at    timestamptz not null default now()
);

create index idx_ai_credit_ledger_business on public.ai_credit_ledger(business_id, created_at);

-- =============================================================================
-- 12. AUDIT LOGS
-- =============================================================================

create type public.actor_type as enum ('super_admin', 'staff', 'client', 'system', 'ai');

create table public.audit_logs (
  id            uuid primary key default gen_random_uuid(),
  business_id   uuid references public.businesses(id) on delete cascade,  -- null = evento a nivel plataforma
  actor_type    public.actor_type not null,
  actor_id      uuid,                          -- auth.users.id o client_id, según actor_type
  action        text not null,                 -- ej. "quote.approved", "contract.signed", "business.created"
  entity_type   text,
  entity_id     uuid,
  metadata      jsonb not null default '{}'::jsonb,
  created_at    timestamptz not null default now()
);

create index idx_audit_logs_business on public.audit_logs(business_id, created_at);

-- =============================================================================
-- ROW LEVEL SECURITY
-- =============================================================================
-- Regla general: super admin ve todo; miembros de un negocio (business_members)
-- ven/editan solo las filas de su business_id. Las tablas de link único
-- (quotes/contracts/invoices) permiten SELECT a miembros del negocio para el
-- panel del CRM; el acceso público por token se hace server-side con
-- service_role y no depende de estas policies.

alter table public.super_admins enable row level security;
alter table public.businesses enable row level security;
alter table public.business_members enable row level security;
alter table public.ai_reference_documents enable row level security;
alter table public.clients enable row level security;
alter table public.forms enable row level security;
alter table public.form_fields enable row level security;
alter table public.form_submissions enable row level security;
alter table public.whatsapp_connections enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.quotes enable row level security;
alter table public.quote_items enable row level security;
alter table public.quote_events enable row level security;
alter table public.contracts enable row level security;
alter table public.invoices enable row level security;
alter table public.payments enable row level security;
alter table public.platform_subscriptions enable row level security;
alter table public.email_templates enable row level security;
alter table public.client_segments enable row level security;
alter table public.client_segment_members enable row level security;
alter table public.email_sequences enable row level security;
alter table public.email_sequence_steps enable row level security;
alter table public.email_sends enable row level security;
alter table public.ai_usage_logs enable row level security;
alter table public.ai_credit_ledger enable row level security;
alter table public.audit_logs enable row level security;

-- super_admins: solo super admins se ven entre sí
create policy "super_admins_select_self_or_admin"
  on public.super_admins for select
  using (user_id = auth.uid() or public.is_super_admin());

-- businesses: super admin CRUD total; miembros solo SELECT de su propio negocio
create policy "businesses_super_admin_all"
  on public.businesses for all
  using (public.is_super_admin())
  with check (public.is_super_admin());

create policy "businesses_member_select"
  on public.businesses for select
  using (public.is_member_of(id));

-- business_members: super admin todo; miembro ve compañeros de su mismo negocio
create policy "business_members_super_admin_all"
  on public.business_members for all
  using (public.is_super_admin())
  with check (public.is_super_admin());

create policy "business_members_self_select"
  on public.business_members for select
  using (public.is_member_of(business_id));

-- Patrón repetido para el resto de tablas con business_id directo:
-- super admin: acceso total. Miembro del negocio: acceso total a su tenant.

create policy "ai_reference_documents_tenant_all" on public.ai_reference_documents for all
  using (public.is_super_admin() or public.is_member_of(business_id))
  with check (public.is_super_admin() or public.is_member_of(business_id));

create policy "clients_tenant_all" on public.clients for all
  using (public.is_super_admin() or public.is_member_of(business_id))
  with check (public.is_super_admin() or public.is_member_of(business_id));

create policy "forms_tenant_all" on public.forms for all
  using (public.is_super_admin() or public.is_member_of(business_id))
  with check (public.is_super_admin() or public.is_member_of(business_id));

create policy "form_fields_tenant_all" on public.form_fields for all
  using (public.is_super_admin() or exists (
    select 1 from public.forms f where f.id = form_fields.form_id and public.is_member_of(f.business_id)
  ))
  with check (public.is_super_admin() or exists (
    select 1 from public.forms f where f.id = form_fields.form_id and public.is_member_of(f.business_id)
  ));

create policy "form_submissions_tenant_all" on public.form_submissions for all
  using (public.is_super_admin() or public.is_member_of(business_id))
  with check (public.is_super_admin() or public.is_member_of(business_id));

create policy "whatsapp_connections_tenant_all" on public.whatsapp_connections for all
  using (public.is_super_admin() or public.is_member_of(business_id))
  with check (public.is_super_admin() or public.is_member_of(business_id));

create policy "conversations_tenant_all" on public.conversations for all
  using (public.is_super_admin() or public.is_member_of(business_id))
  with check (public.is_super_admin() or public.is_member_of(business_id));

create policy "messages_tenant_all" on public.messages for all
  using (public.is_super_admin() or public.is_member_of(business_id))
  with check (public.is_super_admin() or public.is_member_of(business_id));

create policy "quotes_tenant_all" on public.quotes for all
  using (public.is_super_admin() or public.is_member_of(business_id))
  with check (public.is_super_admin() or public.is_member_of(business_id));

create policy "quote_items_tenant_all" on public.quote_items for all
  using (public.is_super_admin() or exists (
    select 1 from public.quotes q where q.id = quote_items.quote_id and public.is_member_of(q.business_id)
  ))
  with check (public.is_super_admin() or exists (
    select 1 from public.quotes q where q.id = quote_items.quote_id and public.is_member_of(q.business_id)
  ));

create policy "quote_events_tenant_all" on public.quote_events for all
  using (public.is_super_admin() or public.is_member_of(business_id))
  with check (public.is_super_admin() or public.is_member_of(business_id));

create policy "contracts_tenant_all" on public.contracts for all
  using (public.is_super_admin() or public.is_member_of(business_id))
  with check (public.is_super_admin() or public.is_member_of(business_id));

create policy "invoices_tenant_all" on public.invoices for all
  using (public.is_super_admin() or public.is_member_of(business_id))
  with check (public.is_super_admin() or public.is_member_of(business_id));

create policy "payments_tenant_all" on public.payments for all
  using (public.is_super_admin() or public.is_member_of(business_id))
  with check (public.is_super_admin() or public.is_member_of(business_id));

create policy "platform_subscriptions_tenant_select" on public.platform_subscriptions for select
  using (public.is_super_admin() or public.is_member_of(business_id));

create policy "platform_subscriptions_super_admin_write" on public.platform_subscriptions for all
  using (public.is_super_admin())
  with check (public.is_super_admin());

create policy "email_templates_tenant_all" on public.email_templates for all
  using (public.is_super_admin() or public.is_member_of(business_id))
  with check (public.is_super_admin() or public.is_member_of(business_id));

create policy "client_segments_tenant_all" on public.client_segments for all
  using (public.is_super_admin() or public.is_member_of(business_id))
  with check (public.is_super_admin() or public.is_member_of(business_id));

create policy "client_segment_members_tenant_all" on public.client_segment_members for all
  using (public.is_super_admin() or exists (
    select 1 from public.client_segments s where s.id = client_segment_members.segment_id and public.is_member_of(s.business_id)
  ))
  with check (public.is_super_admin() or exists (
    select 1 from public.client_segments s where s.id = client_segment_members.segment_id and public.is_member_of(s.business_id)
  ));

create policy "email_sequences_tenant_all" on public.email_sequences for all
  using (public.is_super_admin() or public.is_member_of(business_id))
  with check (public.is_super_admin() or public.is_member_of(business_id));

create policy "email_sequence_steps_tenant_all" on public.email_sequence_steps for all
  using (public.is_super_admin() or exists (
    select 1 from public.email_sequences seq where seq.id = email_sequence_steps.sequence_id and public.is_member_of(seq.business_id)
  ))
  with check (public.is_super_admin() or exists (
    select 1 from public.email_sequences seq where seq.id = email_sequence_steps.sequence_id and public.is_member_of(seq.business_id)
  ));

create policy "email_sends_tenant_all" on public.email_sends for all
  using (public.is_super_admin() or public.is_member_of(business_id))
  with check (public.is_super_admin() or public.is_member_of(business_id));

-- ai_usage_logs / ai_credit_ledger: solo lectura para miembros (el consumo lo
-- escribe el backend con service_role), CRUD completo para super admin.
create policy "ai_usage_logs_tenant_select" on public.ai_usage_logs for select
  using (public.is_super_admin() or public.is_member_of(business_id));

create policy "ai_usage_logs_super_admin_write" on public.ai_usage_logs for insert
  with check (public.is_super_admin());

create policy "ai_credit_ledger_tenant_select" on public.ai_credit_ledger for select
  using (public.is_super_admin() or public.is_member_of(business_id));

create policy "ai_credit_ledger_super_admin_write" on public.ai_credit_ledger for insert
  with check (public.is_super_admin());

-- audit_logs: solo lectura, nunca editable desde el cliente
create policy "audit_logs_tenant_select" on public.audit_logs for select
  using (public.is_super_admin() or (business_id is not null and public.is_member_of(business_id)));

create policy "audit_logs_super_admin_write" on public.audit_logs for insert
  with check (public.is_super_admin());
