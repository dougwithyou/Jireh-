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
    <section className="bg-navy-50 py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-terracotta-600">
              Testimonios
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-navy-950 sm:text-4xl">
              Lo que dicen nuestros clientes
            </h2>
            <p className="mt-4 text-lg text-navy-600">
              Espacio reservado para reseñas reales — el cliente reemplazará
              este contenido de ejemplo.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name + i} delayMs={i * 100}>
              <div className="flex h-full flex-col rounded-2xl border border-dashed border-navy-300 bg-white p-7">
                <Quote className="mb-4 text-terracotta-400" size={28} strokeWidth={1.5} />
                <p className="flex-1 text-sm italic leading-relaxed text-navy-600">
                  {t.quote}
                </p>
                <div className="mt-6 border-t border-navy-100 pt-4">
                  <p className="font-heading text-sm font-semibold text-navy-900">
                    {t.name}
                  </p>
                  <p className="text-xs text-navy-500">{t.location}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
