# Plan de desarrollo por fases — Plataforma SaaS de CRM + IA

Cada fase produce algo demostrable y desplegable; ninguna fase depende de
funcionalidad que no exista aún en una fase anterior. La Fase 1 (sitio de
Jireh Contractor) ya está completa en este repositorio.

## Fase 1 — Sitio de presentación (✅ completa)

Landing de un solo negocio (Jireh Contractor) para validar el pitch inicial
con el cliente. Next.js + Tailwind, formulario de contacto simulado en
frontend.

## Fase 2 — Fundaciones multi-tenant

**Objetivo**: tener el esqueleto de la plataforma funcionando con datos
reales, sin IA todavía.

- Aplicar la migración inicial (`supabase/migrations/20260824000000_init_platform_schema.sql`)
  a un proyecto Supabase.
- Supabase Auth + tabla `business_members`; guards de ruta para
  `(super-admin)` vs `(dashboard)`.
- Panel de super admin mínimo: alta manual de negocio (`businesses`),
  invitar al primer `owner`, subir documentos de referencia
  (`ai_reference_documents`) a Storage.
- CRM básico: CRUD de `clients`, ficha de cliente vacía (sin historial de
  conversaciones todavía).
- Constructor de formularios (`forms`, `form_fields`) + snippet embebible +
  endpoint de submit que crea/actualiza `clients` desde `form_submissions`.
- Migrar `Jireh Contractor` como el primer tenant real; conectar
  `ContactForm.tsx` al formulario embebido en vez de simular el envío.

**Criterio de salida**: un negocio de prueba puede recibir un lead por
formulario web y verlo aparecer como cliente en el CRM.

## Fase 3 — WhatsApp + chat de IA

**Objetivo**: conversaciones reales entrando al CRM y un asistente de IA
capaz de responder con contexto del negocio.

- Conexión de WhatsApp Business por negocio (`whatsapp_connections`) +
  webhook de recepción (texto, nota de voz, foto) → `conversations` /
  `messages`.
- Transcripción de audio (Whisper-like) y análisis de fotos (LLM con
  visión) al ingerir mensajes.
- Chat interno en el CRM sobre la misma tabla `conversations` (canal
  `internal`), con guardarraíles de dominio (`lib/ai/guardrails.ts`) para
  mantener a la IA dentro del negocio del tenant y evitar jailbreaks.
- Registro de todo consumo de IA en `ai_usage_logs` + descuento en
  `ai_credit_ledger`; vista de uso/costo en el panel de super admin.

**Criterio de salida**: un cliente final escribe por WhatsApp y el mensaje
(incluyendo audio/foto) queda visible con su interpretación en el CRM.

## Fase 4 — Presupuestos, contratos, factura y pago

**Objetivo**: el flujo híbrido completo, de cotización a cobro.

- Generación de presupuesto por IA (desde el chat interno o desde WhatsApp),
  usando `ai_reference_documents` como referencia de estilo → `quotes` +
  `quote_items`.
- Página pública de link único (`/q/[token]`): ver, aprobar, pedir ajuste,
  descargar PDF; tracking en `quote_events`.
- Ajustes vía chat regeneran el mismo `quote` (nueva versión), sin reenviar
  archivo.
- Generación de contrato por IA a partir del presupuesto aprobado →
  `contracts`; página pública `/c/[token]` con firma digital.
- Desbloqueo de `invoices` tras la firma; integración con Stripe
  (Payment Intent o Checkout) en la misma página; webhook de Stripe
  actualiza `payments` e `invoices`.
- Todo el estado (visto, firmado, pagado) se refleja en el dashboard del
  negocio en tiempo real (Supabase Realtime o polling).

**Criterio de salida**: un negocio de prueba puede llevar un cliente de
"presupuesto pedido por WhatsApp" a "factura pagada" sin salir de la
plataforma.

## Fase 5 — Email marketing

**Objetivo**: retención y seguimiento post-venta.

- CRUD de `email_templates`.
- Segmentación manual de clientes (`client_segments`,
  `client_segment_members`); reglas automáticas quedan para una iteración
  posterior si se necesita.
- Constructor de secuencias (`email_sequences`, `email_sequence_steps`) y
  motor de despacho (`api/cron/email-sequences`) vía Resend.
- Tracking de entregas/aperturas/clics (`email_sends`) alimentado por el
  webhook de Resend.

**Criterio de salida**: un negocio arma una secuencia de bienvenida y los
clientes nuevos la reciben automáticamente.

## Fase 6 — Dashboard, billing de la plataforma y endurecimiento

**Objetivo**: la plataforma queda lista para operar con varios negocios de
pago simultáneamente.

- Dashboard principal con ingresos del mes, embudo de ventas por proyecto
  (`quotes`/`contracts`/`invoices` agregados) y accesos directos a
  conversaciones.
- Suscripción SaaS por negocio (`platform_subscriptions`) vía Stripe
  Billing; límites de plan (número de créditos de IA, conexiones de
  WhatsApp, etc.).
- Auditoría completa (`audit_logs`) en todas las acciones sensibles ya
  implementadas en fases anteriores.
- Revisión de seguridad: secretos de WhatsApp/Stripe en Vault, rate
  limiting en endpoints públicos (`/q`, `/c`, `/f`), pruebas de guardarraíles
  de IA contra prompts adversarios.

**Criterio de salida**: la plataforma es vendible a un segundo y tercer
negocio (fotografía, salón de belleza) sin cambios de código, solo alta
desde el panel de super admin.

## Fuera de alcance del MVP (evaluar después)

- White-labeling con subdominio propio por negocio.
- App móvil nativa (el dashboard es responsive web).
- Auto-segmentación de clientes basada en reglas/IA.
- Multi-idioma de la plataforma (el contenido generado por IA sí puede
  adaptarse al idioma del cliente final desde el inicio).
