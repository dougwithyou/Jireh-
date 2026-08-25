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
    <section id="servicios" className="scroll-mt-20 bg-charcoal-900 py-24">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-16">
        <Reveal>
          <span className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-400">
            Qué construimos
          </span>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold uppercase tracking-[-0.02em] text-white sm:text-4xl">
            Servicios
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-charcoal-300">
            Desde una vivienda nueva hasta la remodelación de un espacio
            comercial, contamos con la experiencia para llevar tu proyecto a
            buen término.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Reveal key={service.title} delayMs={i * 100}>
              <div className="group h-full border-l-4 border-amber-400 bg-charcoal-850 p-7 transition-[border-width] duration-300 hover:border-l-8">
                <service.icon
                  size={28}
                  className="text-amber-400"
                  strokeWidth={1.6}
                />
                <h3 className="mt-5 font-display text-lg font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal-300">
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
