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

## Árbol de carpetas (real, implementado desde la Fase 2)

`src/app/page.tsx` (marketing de Jireh Contractor) ya ocupa la ruta raíz
`/`, así que el panel del negocio y el super admin viven bajo prefijos
propios en vez del esquema original de route groups sin prefijo — evita el
conflicto y es el patrón típico de un SaaS (marketing en `/`, producto en
`/app`).

También: esta versión de Next.js **deprecó `middleware.ts` en favor de
`proxy.ts`** (mismo comportamiento, archivo y función renombrados). Todo el
código nuevo usa `proxy.ts`.

```
src/
  app/
    page.tsx                        # marketing de Jireh Contractor (Fase 1, sin tocar)
    login/page.tsx                  # login (correo + contraseña, sin auto-registro)

    admin/                          # super admin, requiere is_super_admin()
      layout.tsx                    # guard + nav
      page.tsx                      # listado de negocios
      businesses/
        actions.ts                  # 'use server' createBusiness (crea negocio + owner + membership)
        new/page.tsx                # alta manual de negocio

    app/                            # panel del negocio (dueño/staff), requiere business_members
      layout.tsx                    # guard + resuelve el negocio activo (1 negocio por usuario en Fase 2)
      page.tsx                      # inicio (conteos; ingresos/embudo llegan en Fase 6)
      clients/
        page.tsx                    # listado de clientes
        [clientId]/page.tsx         # ficha: datos + envíos de formulario
      forms/
        actions.ts                  # 'use server' createForm/addField/deleteField/toggleFormActive
        page.tsx                    # listado + alta de formularios
        [formId]/page.tsx           # preguntas del formulario + snippet embebible

    f/[embedToken]/                 # página pública del formulario (para <iframe>), sin auth
      page.tsx                      # Server Component: valida token con service_role
      embed-form.tsx                # Client Component: captura respuestas y hace POST

    api/
      forms/[embedToken]/submit/route.ts   # crea/actualiza cliente + guarda el envío

  lib/
    supabase/
      browser.ts                    # cliente para Client Components
      server.ts                     # cliente para Server Components/Actions (cookies, RLS)
      admin.ts                      # cliente service_role — solo en código server, nunca al cliente
    auth/
      session.ts                    # getCurrentUser / isSuperAdmin / getActiveBusinessMembership
      actions.ts                    # 'use server' signOut

  types/
    database.ts                     # tipos generados desde Supabase (mcp__Supabase__generate_typescript_types)

  proxy.ts                          # refresca la cookie de sesión de Supabase en cada request

supabase/
  migrations/                       # migraciones SQL versionadas (fuente de verdad del esquema)

docs/
  plataforma/
    ARQUITECTURA.md                 # este documento
    ESQUEMA_BASE_DE_DATOS.md
    PLAN_DE_DESARROLLO.md
```

### Pendiente para fases siguientes

El árbol de arriba es lo ya construido (Fase 2: fundaciones multi-tenant +
formularios embebibles). Las fases 3-6 agregan, sin romper lo anterior:

- `app/app/conversations/` (WhatsApp + chat interno), `api/webhooks/whatsapp/`
- `app/app/quotes/`, `app/app/contracts/`, `app/app/invoices/`
- `app/q/[token]/`, `app/c/[token]/` (páginas públicas de presupuesto/contrato/factura)
- `app/app/email-marketing/`
- `lib/ai/`, `lib/whatsapp/`, `lib/stripe/`, `lib/resend/`, `lib/pdf/`, `lib/credits/`, `lib/audit/`
- `api/webhooks/stripe/`, `api/webhooks/resend/`, `api/ai/*`, `api/cron/email-sequences/`

## Notas sobre el sitio actual (Jireh Contractor)

El sitio de marketing de Jireh Contractor que ya existe en `src/app/page.tsx`
y `src/components/*` se mantiene como está: es contenido de marketing de un
negocio específico, no parte del panel multi-tenant. Cuando se implemente la
plataforma, Jireh Contractor pasa a ser **el primer negocio (tenant)**
cargado por el super admin, y su formulario de contacto (`ContactForm.tsx`,
marcado `FASE 2`) se conecta al endpoint `api/forms/[embedToken]/submit` en
lugar de simularse en el cliente.
