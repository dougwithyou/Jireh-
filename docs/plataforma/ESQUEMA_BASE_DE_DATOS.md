# Esquema de base de datos — Plataforma SaaS de CRM + IA

Motor: **Supabase Postgres**, aislamiento multi-tenant por fila (`business_id`)
con **Row Level Security**. La migración completa está en
[`supabase/migrations/20260824000000_init_platform_schema.sql`](../../supabase/migrations/20260824000000_init_platform_schema.sql).
Este documento es el mapa de lectura del esquema, no repite cada columna.

## Principios

1. **`businesses` es el tenant raíz.** Casi toda tabla de negocio cuelga de
   `business_id` con `on delete cascade`.
2. **RLS en todas las tablas.** Patrón estándar: super admin (`is_super_admin()`)
   tiene acceso total; miembros del negocio (`is_member_of(business_id)`)
   tienen acceso total a su propio tenant; nadie más ve nada.
3. **Las páginas de link único no dependen de RLS para anónimos.** `quotes`,
   `contracts`, `invoices` y `forms` tienen un `public_token`/`embed_token`
   opaco (`gen_random_bytes` en hex), pero el acceso público pasa por Route
   Handlers server-side con la `service_role key`, que valida el token y
   aplica sus propias reglas de negocio (ej. no permitir pago si el contrato
   no está firmado). Así el modelo de amenaza no depende de que un token
   filtrado en RLS sea la única barrera.
4. **Todo lo que la IA consume o cuesta dinero queda auditado**:
   `ai_usage_logs` (consumo por evento) y `ai_credit_ledger` (saldo) son
   *insert-only* desde el cliente (solo el backend con `service_role`
   escribe), de solo lectura para miembros del negocio.

## Grupos de tablas

| Grupo | Tablas | Propósito |
|---|---|---|
| Plataforma | `super_admins`, `businesses`, `business_members`, `ai_reference_documents`, `platform_subscriptions` | Tenants, quién los administra, documentos de referencia para estilo de IA, suscripción SaaS del negocio a la plataforma. |
| CRM central | `clients` | Ficha unificada de cliente por negocio. |
| Formularios | `forms`, `form_fields`, `form_submissions` | Constructor embebible y sus respuestas, que crean/actualizan `clients`. |
| WhatsApp + chat | `whatsapp_connections`, `conversations`, `messages` | Conexión por negocio, hilo por cliente, mensajes multimodal (texto/audio/imagen) de cliente, staff o IA. |
| Presupuestos | `quotes`, `quote_items`, `quote_events` | Presupuesto versionado con link único; `quote_events` es el log de tracking (visto, aprobado, ajuste pedido). |
| Contratos | `contracts` | Contenido generado por IA, firma digital, referencia al `quote_id` de origen. |
| Facturación y pago | `invoices`, `payments` | Factura que se desbloquea al firmar (`unlocked_at`), pagos vía Stripe con el payload crudo del webhook. |
| Email marketing | `email_templates`, `client_segments`, `client_segment_members`, `email_sequences`, `email_sequence_steps`, `email_sends` | Plantillas, segmentación y secuencias automáticas, con estado de entrega/apertura vía Resend. |
| IA / costos | `ai_usage_logs`, `ai_credit_ledger` | Consumo por feature (tokens, costo) y ledger de créditos por negocio, para el monitoreo del super admin. |
| Auditoría | `audit_logs` | Trazabilidad de acciones sensibles (creación de negocio, aprobación de presupuesto, firma de contrato, pago), con `actor_type` para distinguir super admin / staff / cliente / sistema / IA. |

## Flujos clave modelados

- **Presupuesto híbrido**: `quotes.status` transiciona
  `draft → sent → viewed → approved` (o `adjustment_requested` y vuelve a
  `sent` tras nueva versión). Cada cambio de link queda en `quote_events`,
  y el PDF se regenera on-demand cacheando `pdf_url`.
- **Contrato → factura → pago secuencial**: `contracts.signed_at` se
  completa al firmar; el Route Handler de firma es el único que puede poner
  `invoices.status = 'unlocked'` y `unlocked_at`, referenciando el
  `contract_id`. El pago vía Stripe llega por webhook y crea una fila en
  `payments`, actualizando `invoices.status` a `partially_paid` o `paid`.
- **Créditos de IA**: cada llamada a un feature de IA (generar presupuesto,
  transcribir audio, analizar foto, responder chat) inserta en
  `ai_usage_logs` y descuenta de `businesses.ai_credit_balance` vía una fila
  en `ai_credit_ledger` con el saldo resultante (`balance_after`), para que
  el super admin pueda auditar consumo y costo por cuenta sin recalcular.

## Pendiente de decidir en fases posteriores

- **Cifrado de secretos**: `whatsapp_connections.access_token_secret`
  actualmente es una referencia textual; se recomienda Supabase Vault (o un
  secret manager externo) en vez de guardar el token en claro, aunque esté
  detrás de RLS.
- **Vencimiento de `quotes`**: existe el estado `expired` pero la política de
  cuándo expira (días desde `sent`) se define en la Fase 3.
- **Auto-segmentación** (`client_segments.rules`): el MVP puede empezar con
  segmentos manuales (`client_segment_members`) y añadir reglas automáticas
  después.
