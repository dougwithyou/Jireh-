# Jireh Contractor — Sitio Web (Fase 1: MVP)

Sitio web corporativo de presentación para Jireh Contractor, empresa de
construcción y remodelación en Virginia. Este es el MVP de la Fase 1: una
página única con navegación por anclas, pensada para presentarse al cliente
y avanzar luego a la Fase 2 (sistema de presupuestos por WhatsApp + IA).

Este repositorio evoluciona hacia una **plataforma SaaS multi-tenant de CRM
+ IA para negocios de servicios** (no solo construcción), de la cual Jireh
Contractor es el primer negocio (tenant). Ver la arquitectura, el esquema de
base de datos y el plan de desarrollo por fases en
[`docs/plataforma/`](./docs/plataforma/ARQUITECTURA.md).

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [lucide-react](https://lucide.dev) para íconos de línea

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # build de producción
npm run lint    # eslint
```

## Estructura

```
src/
  app/
    layout.tsx      # fuentes, metadata SEO, favicon
    page.tsx         # composición de la página (una sección por componente)
    globals.css       # paleta navy/terracotta y animación de scroll (Reveal)
  components/
    Header.tsx        # nav sticky + menú móvil
    Hero.tsx
    TrustBar.tsx       # franja de credenciales (años, proyectos, cobertura)
    Services.tsx
    Portfolio.tsx       # galería de proyectos
    About.tsx           # sección de Nicolás / la empresa
    Testimonials.tsx
    Contact.tsx + ContactForm.tsx  # formulario con validación de frontend
    Footer.tsx
    Reveal.tsx           # wrapper de fade-in al hacer scroll
    illustrations/ConstructionArt.tsx  # ilustraciones SVG referenciales
```

## Contenido pendiente de reemplazar por el cliente

Antes de pasar a producción, reemplazar:

- **Fotos de proyectos**: `Portfolio.tsx` usa ilustraciones SVG
  (`ConstructionArt`) como marcador de posición. Reemplazar cada tarjeta por
  `next/image` con la foto real del proyecto (mismo `aspect-[4/3]`).
- **Foto de Nicolás**: `About.tsx` tiene un placeholder marcado
  `[REEMPLAZAR: foto de Nicolás]`, listo para la foto de su sesión
  profesional.
- **Testimonios**: `Testimonials.tsx` tiene 3 tarjetas con texto de ejemplo
  entre corchetes, a reemplazar por reseñas reales de clientes.
- **Datos de contacto y redes sociales**: teléfono, correo y enlaces de
  Facebook/Instagram en `Footer.tsx` son placeholders.
- **Logo gráfico**: por ahora el header/footer usan el nombre en texto
  ("Jireh Contractor"); reemplazar por el logo cuando esté disponible.

## Formulario de contacto (Fase 2 pendiente)

`ContactForm.tsx` valida los campos en el frontend y simula el envío
(estado "enviado" tras ~1.2s), sin backend real todavía. En la Fase 2, el
envío del formulario notificará automáticamente al WhatsApp de Nicolás — el
punto de integración está marcado con un comentario `FASE 2` dentro del
`handleSubmit`.
