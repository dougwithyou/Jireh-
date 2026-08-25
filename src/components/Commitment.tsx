import { ImageOff } from "lucide-react";
import Reveal from "./Reveal";

const points = [
  { value: "20+", label: "Años de experiencia en construcción y remodelación" },
  { value: "150+", label: "Proyectos completados en Virginia" },
  { value: "Clara", label: "Comunicación en cada etapa del proyecto" },
  { value: "Firme", label: "Cumplimiento de los plazos acordados" },
];

export default function Commitment() {
  return (
    <section className="bg-charcoal-900 py-24">
      <div className="mx-auto grid max-w-[1320px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:px-16">
        <Reveal>
          <span className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-400">
            Nuestro compromiso
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-[-0.02em] text-white sm:text-4xl">
            Hacer las cosas bien, sin atajos
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-charcoal-300">
            Cada proyecto —desde una vivienda construida desde cero hasta la
            remodelación más pequeña— se maneja con la misma disciplina:
            presupuestos claros, materiales de calidad y un equipo que
            responde cuando lo necesitás.
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-6">
            {points.map((point) => (
              <div key={point.label} className="border-l-2 border-amber-400 pl-4">
                <dt className="font-display text-2xl font-extrabold text-white">
                  {point.value}
                </dt>
                <dd className="mt-1 text-sm text-charcoal-300">{point.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delayMs={100}>
          {/*
            PLACEHOLDER — reemplazar por foto real del equipo en obra
            (idealmente con casco/chaleco, luz natural, estilo documental).
          */}
          <div className="relative aspect-[4/5] w-full border-2 border-dashed border-charcoal-600 bg-charcoal-850">
            <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
              <ImageOff size={40} className="text-charcoal-500" strokeWidth={1.5} />
              <p className="font-display text-sm font-semibold text-charcoal-300">
                [REEMPLAZAR: foto del equipo en obra]
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
