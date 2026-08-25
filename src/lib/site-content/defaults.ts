import type { SiteContent } from "./types";

/**
 * Debe reflejar exactamente la fila sembrada por la migración
 * `supabase/migrations/20260825010000_site_content.sql`. Sirve de resguardo
 * si la fila todavía no existe (o falla la lectura) para que el sitio nunca
 * se quede sin contenido.
 */
export const defaultSiteContent: SiteContent = {
  hero: {
    eyebrow: "Virginia, EE. UU. · Construcción y remodelación · 20+ años",
    headlineLine1: "CONSTRUIMOS PARA",
    headlineLine2: "QUE DURE.",
    subline:
      "Construcción de vivienda desde cero, remodelaciones residenciales y proyectos comerciales, con la solidez de dos décadas de experiencia liderados por Nicolás y su equipo.",
    ctaPrimaryLabel: "Solicitar presupuesto",
    ctaSecondaryLabel: "Ver proyectos",
    backgroundImageUrl: null,
  },
  trustBar: {
    stat1Value: 20,
    stat1Suffix: "+",
    stat1Label: "Años de experiencia",
    stat2Value: 150,
    stat2Suffix: "+",
    stat2Label: "Proyectos completados",
    stat3Value: 3,
    stat3Suffix: "",
    stat3Label: "Residencial, remodelación y comercial",
    stat4Value: "Virginia",
    stat4Label: "Zona de cobertura",
  },
  services: {
    eyebrow: "Qué construimos",
    heading: "Servicios",
    intro:
      "Desde una vivienda nueva hasta la remodelación de un espacio comercial, contamos con la experiencia para llevar tu proyecto a buen término.",
    items: [
      {
        title: "Construcción de vivienda desde cero",
        description:
          "Diseñamos y construimos tu casa desde los cimientos, acompañándote en cada etapa del proceso con planificación clara y control de calidad.",
      },
      {
        title: "Remodelaciones residenciales",
        description:
          "Cocinas, baños, ampliaciones y remodelaciones completas que renuevan tu hogar sin sacrificar la calidad ni los plazos acordados.",
      },
      {
        title: "Proyectos comerciales",
        description:
          "Construcción y adecuación de espacios comerciales, con la experiencia necesaria para cumplir normativas y tiempos de entrega.",
      },
      {
        title: "Otros servicios",
        description:
          "Espacio configurable: agrega aquí servicios adicionales como reparaciones, mantenimiento o proyectos especializados.",
      },
    ],
  },
  portfolio: {
    eyebrow: "Trabajo seleccionado",
    heading: "Proyectos",
    intro:
      "Imágenes referenciales — próximamente reemplazadas por fotografías reales de nuestros proyectos.",
    projects: [
      { title: "Vivienda nueva — estructura", category: "Residencial", imageUrl: null },
      { title: "Remodelación de cocina", category: "Remodelación", imageUrl: null },
      { title: "Local comercial", category: "Comercial", imageUrl: null },
      { title: "Remodelación en proceso", category: "Remodelación", imageUrl: null },
      { title: "Planificación de proyecto", category: "Diseño", imageUrl: null },
      { title: "Obra en construcción", category: "Residencial", imageUrl: null },
    ],
  },
  process: {
    eyebrow: "Cómo trabajamos",
    heading: "De la consulta a la entrega",
    phases: [
      {
        title: "Consulta inicial",
        duration: "Primer contacto",
        description:
          "Visitamos el sitio o revisamos tus planos y conversamos sobre alcance, ideas y presupuesto aproximado.",
      },
      {
        title: "Presupuesto",
        duration: "Antes de iniciar",
        description:
          "Preparamos un presupuesto detallado y por escrito, para que sepas exactamente qué estás contratando.",
      },
      {
        title: "Planificación",
        duration: "Antes de iniciar",
        description:
          "Coordinamos permisos, materiales y cronograma antes de mover una sola pala en el sitio.",
      },
      {
        title: "Construcción",
        duration: "Según alcance del proyecto",
        description:
          "Nuestro equipo ejecuta el trabajo con supervisión constante y comunicación frecuente sobre el avance.",
      },
      {
        title: "Control de calidad",
        duration: "En cada etapa",
        description:
          "Revisamos el trabajo antes de avanzar a la siguiente etapa, para que el resultado cumpla lo acordado.",
      },
      {
        title: "Entrega y garantía",
        duration: "Etapa final",
        description: "Hacemos un recorrido final junto a vos y respaldamos el trabajo realizado.",
      },
    ],
  },
  commitment: {
    eyebrow: "Nuestro compromiso",
    heading: "Hacer las cosas bien, sin atajos",
    paragraph:
      "Cada proyecto —desde una vivienda construida desde cero hasta la remodelación más pequeña— se maneja con la misma disciplina: presupuestos claros, materiales de calidad y un equipo que responde cuando lo necesitás.",
    imageUrl: null,
    points: [
      { value: "20+", label: "Años de experiencia en construcción y remodelación" },
      { value: "150+", label: "Proyectos completados en Virginia" },
      { value: "Clara", label: "Comunicación en cada etapa del proyecto" },
      { value: "Firme", label: "Cumplimiento de los plazos acordados" },
    ],
  },
  about: {
    eyebrow: "Quién construye",
    heading: "20 años construyendo relaciones tan sólidas como nuestras obras",
    paragraph1:
      "Nicolás fundó Jireh Contractor con una idea simple: hacer las cosas bien, sin atajos. Dos décadas después, ese mismo compromiso guía cada proyecto, desde una vivienda construida desde cero hasta la remodelación más pequeña.",
    paragraph2:
      "Con un equipo experimentado y un enfoque cercano con cada cliente, Jireh Contractor se ha ganado la confianza de familias y negocios en toda Virginia, proyecto tras proyecto.",
    imageUrl: null,
  },
  testimonials: {
    eyebrow: "Testimonios",
    heading: "Lo que dicen nuestros clientes",
    intro:
      "Espacio reservado para reseñas reales — el cliente reemplazará este contenido de ejemplo.",
    items: [
      {
        quote:
          "[Testimonio placeholder: describe brevemente la experiencia del cliente con Jireh Contractor y el resultado del proyecto.]",
        name: "[Nombre del cliente]",
        location: "[Ciudad, Virginia]",
      },
      {
        quote:
          "[Testimonio placeholder: describe brevemente la experiencia del cliente con Jireh Contractor y el resultado del proyecto.]",
        name: "[Nombre del cliente]",
        location: "[Ciudad, Virginia]",
      },
      {
        quote:
          "[Testimonio placeholder: describe brevemente la experiencia del cliente con Jireh Contractor y el resultado del proyecto.]",
        name: "[Nombre del cliente]",
        location: "[Ciudad, Virginia]",
      },
    ],
  },
  bidCta: {
    headlineLine1: "¿Tenés planos o una idea?",
    headlineLine2: "Contanos.",
    paragraph:
      "Contanos sobre tu proyecto —una vivienda nueva, una remodelación o un espacio comercial— y te contactamos para conversar los detalles.",
    buttonLabel: "Solicitar presupuesto",
  },
  contact: {
    eyebrow: "Contacto",
    heading: "Solicitá tu presupuesto",
    paragraph: "Contanos sobre tu proyecto y te contactaremos a la brevedad para conversar los detalles.",
  },
  footer: {
    description:
      "20 años de experiencia en construcción y remodelación, sirviendo con confianza a clientes en toda Virginia.",
    phone: "(000) 000-0000",
    email: "info@jirehcontractor.com",
    address: "Virginia, EE. UU.",
    facebookUrl: "#",
    instagramUrl: "#",
  },
};
