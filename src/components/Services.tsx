import { Hammer, Home, Building2, Settings } from "lucide-react";
import Reveal from "./Reveal";

const services = [
  {
    icon: Home,
    title: "Construcción de vivienda desde cero",
    description:
      "Diseñamos y construimos tu casa desde los cimientos, acompañándote en cada etapa del proceso con planificación clara y control de calidad.",
  },
  {
    icon: Hammer,
    title: "Remodelaciones residenciales",
    description:
      "Cocinas, baños, ampliaciones y remodelaciones completas que renuevan tu hogar sin sacrificar la calidad ni los plazos acordados.",
  },
  {
    icon: Building2,
    title: "Proyectos comerciales",
    description:
      "Construcción y adecuación de espacios comerciales, con la experiencia necesaria para cumplir normativas y tiempos de entrega.",
  },
  {
    icon: Settings,
    title: "Otros servicios",
    description:
      "Espacio configurable: agrega aquí servicios adicionales como reparaciones, mantenimiento o proyectos especializados.",
  },
];

export default function Services() {
  return (
    <section id="servicios" className="scroll-mt-20 bg-navy-50 py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-terracotta-600">
              Servicios
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-navy-950 sm:text-4xl">
              Todo tipo de proyectos de construcción
            </h2>
            <p className="mt-4 text-lg text-navy-600">
              Desde una vivienda nueva hasta la remodelación de un espacio
              comercial, contamos con la experiencia para llevar tu proyecto
              a buen término.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Reveal key={service.title} delayMs={i * 100}>
              <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-7 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900">
                  <service.icon size={24} className="text-terracotta-400" strokeWidth={1.7} />
                </div>
                <h3 className="font-heading text-lg font-semibold text-navy-950">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-600">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
