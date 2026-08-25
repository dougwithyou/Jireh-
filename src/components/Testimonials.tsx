import { Quote } from "lucide-react";
import Reveal from "./Reveal";

/*
  TESTIMONIOS — contenido placeholder
  Reemplazar el texto y el nombre/ubicación de cada tarjeta por reseñas
  reales de clientes cuando estén disponibles.
*/
const testimonials = [
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
];

export default function Testimonials() {
  return (
    <section className="bg-concrete-100 py-24">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-16">
        <Reveal>
          <span className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-600">
            Testimonios
          </span>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold uppercase tracking-[-0.02em] text-charcoal-900 sm:text-4xl">
            Lo que dicen nuestros clientes
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-charcoal-500">
            Espacio reservado para reseñas reales — el cliente reemplazará
            este contenido de ejemplo.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name + i} delayMs={i * 100}>
              <div className="flex h-full flex-col border border-dashed border-charcoal-300 bg-white p-7">
                <Quote className="mb-4 text-amber-500" size={26} strokeWidth={1.5} />
                <p className="flex-1 text-sm italic leading-relaxed text-charcoal-500">
                  {t.quote}
                </p>
                <div className="mt-6 border-t border-charcoal-200 pt-4">
                  <p className="font-display text-sm font-semibold text-charcoal-900">
                    {t.name}
                  </p>
                  <p className="text-xs text-charcoal-400">{t.location}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
