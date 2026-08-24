# Arquitectura — Plataforma SaaS de CRM + IA para negocios de servicios

> Este documento describe la arquitectura propuesta para evolucionar el
> repositorio (hoy un sitio de presentación de un solo negocio, Jireh
> Contractor) hacia la plataforma SaaS multi-tenant descrita en el prompt del
> producto. Es la base de diseño para las fases del
> [plan de desarrollo](./PLAN_DE_DESARROLLO.md); el esquema de datos completo
> está en [`ESQUEMA_BASE_DE_DATOS.md`](./ESQUEMA_BASE_DE_DATOS.md) y en la
> migración SQL `supabase/migrations/20260824000000_init_platform_schema.sql`.

## Decisiones de arquitectura

- **Un solo proyecto Next.js (App Router)**, no un monorepo. El dominio no
  justifica separar en paquetes todavía; se separa por *route groups* y por
  capas dentro de `src/`.
- **Multi-tenancy por fila** (`business_id` + RLS de Postgres), no por
  esquema ni por base de datos separada. Es el patrón recomendado de
  Supabase para SaaS de este tamaño y permite queries cross-tenant baratas
  para el panel de super admin.
- **Resolución de tenant**: cada usuario autenticado (dueño/staff de un
  negocio) pertenece a un `business_id` vía `business_members`. No se usa
  subdominio por negocio en el MVP (se evalúa en fases posteriores si se
  necesita white-labeling); el tenant activo se resuelve del JWT/sesión, no
  de la URL.
- **Páginas públicas de link único** (presupuesto, contrato, factura,
  formulario embebido) son rutas *sin autenticación de Supabase*: el server
  valida un token opaco contra la tabla correspondiente usando la
  `service_role key` en un Route Handler o Server Component, nunca
  exponiendo las tablas a `anon` vía RLS directa. Esto evita depender de RLS
  para el aislamiento de datos sensibles frente a clientes finales.
- **IA y proveedores externos viven en `lib/`**, detrás de interfaces
  delgadas, para poder cambiar de proveedor (transcripción, visión, LLM) sin
  tocar rutas ni componentes.

## Árbol de carpetas propuesto

```
src/
  app/
    (marketing)/                    # sitio público de la plataforma (landing, precios)
      page.tsx
      layout.tsx

    (super-admin)/
      admin/
        layout.tsx                  # guard: requiere is_super_admin()
        page.tsx                    # dashboard de super admin
        businesses/
          page.tsx                  # listado de negocios
          new/page.tsx              # alta manual de negocio + carga de docs de referencia
          [businessId]/
            page.tsx                # detalle: config, uso de IA, créditos, docs de referencia
            usage/page.tsx          # costos y consumo de IA por cuenta

    (dashboard)/                    # panel del negocio (dueño/staff), requiere sesión + business_members
      layout.tsx                    # resuelve business_id activo, sidebar del CRM
      page.tsx                      # Dashboard principal (ingresos, embudo, accesos directos)
      clients/
        page.tsx                    # listado + búsqueda de clientes
        [clientId]/page.tsx         # ficha de cliente: historial, mensajes, docs, pagos
      conversations/
        page.tsx                    # bandeja de conversaciones (whatsapp + interno)
        [conversationId]/page.tsx   # hilo + chat de IA
      quotes/
        page.tsx
        [quoteId]/page.tsx          # editor/preview interno del presupuesto
      contracts/
        page.tsx
        [contractId]/page.tsx
      invoices/
        page.tsx
      forms/
        page.tsx                    # constructor de formularios
        [formId]/edit/page.tsx
      email-marketing/
        templates/page.tsx
        segments/page.tsx
        sequences/page.tsx
        sequences/[sequenceId]/page.tsx
      settings/
        whatsapp/page.tsx           # conexión de WhatsApp Business
        billing/page.tsx            # plan/suscripción de la plataforma
        team/page.tsx               # invitar staff

    (portal)/                       # páginas públicas de link único, sin auth de Supabase
      q/[token]/page.tsx            # ver presupuesto, aprobar/ajustar, descargar PDF
      c/[token]/page.tsx            # leer y firmar contrato -> desbloquea factura -> pago Stripe
      f/[embedToken]/page.tsx       # formulario embebible (para <iframe>) 

    api/
      webhooks/
        whatsapp/route.ts           # verificación + recepción de mensajes de WhatsApp Cloud API
        stripe/route.ts             # eventos de pago/suscripción
        resend/route.ts             # eventos de entrega/apertura/click de email
      ai/
        quote/route.ts              # generación de presupuesto (texto/voz/foto -> IA)
        chat/route.ts               # turno de chat interno o desde WhatsApp
        contract/route.ts           # generación de contrato a partir del presupuesto aprobado
      forms/
        [embedToken]/submit/route.ts
      portal/
        quotes/[token]/route.ts     # acciones del cliente: aprobar / pedir ajuste
        contracts/[token]/sign/route.ts
        invoices/[token]/pay/route.ts
      cron/
        email-sequences/route.ts    # despacho de pasos de secuencias vencidas

  components/
    admin/                          # UI exclusiva del panel de super admin
    dashboard/                      # UI del CRM (sidebar, tablas, cards de embudo)
    portal/                         # UI de las páginas públicas de link único
    forms/                          # renderer de formularios (constructor + embebido)
    chat/                           # burbujas de chat, input multimodal (texto/audio/foto)
    shared/                         # botones, layout, primitives compartidos

  lib/
    supabase/
      server.ts                     # cliente server (RLS, cookies de sesión)
      admin.ts                      # cliente con service_role (solo en Route Handlers)
      middleware.ts
    ai/
      provider.ts                   # interfaz LLM (texto + visión)
      transcription.ts              # interfaz Whisper-like
      guardrails.ts                 # límites de dominio/anti-jailbreak por negocio
      prompts/
        quote.ts
        contract.ts
        chat.ts
    whatsapp/
      client.ts                     # envío de mensajes vía Cloud API
      webhook-verify.ts
    stripe/
      client.ts
      checkout.ts                   # invoice -> payment intent / checkout session
    resend/
      client.ts
      sequences.ts                  # motor de envío de secuencias
    pdf/
      render-quote.ts
      render-contract.ts
    credits/
      ledger.ts                     # débito/crédito de créditos de IA + registro en ai_usage_logs
    audit/
      log.ts                        # helper para insertar en audit_logs
    tokens.ts                       # generación/validación de tokens de link único

  types/
    database.ts                    # tipos generados desde Supabase (mcp__Supabase__generate_typescript_types)
    domain.ts                      # tipos de dominio (Quote, Contract, Invoice, ...)

supabase/
  migrations/                      # migraciones SQL versionadas (fuente de verdad del esquema)

docs/
  plataforma/
    ARQUITECTURA.md                 # este documento
    ESQUEMA_BASE_DE_DATOS.md
    PLAN_DE_DESARROLLO.md
```

## Notas sobre el sitio actual (Jireh Contractor)

El sitio de marketing de Jireh Contractor que ya existe en `src/app/page.tsx`
y `src/components/*` se mantiene como está: es contenido de marketing de un
negocio específico, no parte del panel multi-tenant. Cuando se implemente la
plataforma, Jireh Contractor pasa a ser **el primer negocio (tenant)**
cargado por el super admin, y su formulario de contacto (`ContactForm.tsx`,
marcado `FASE 2`) se conecta al endpoint `api/forms/[embedToken]/submit` en
lugar de simularse en el cliente.
