import { ImageOff } from "lucide-react";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="nosotros" className="scroll-mt-20 bg-charcoal-850 py-24">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-16">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            {/*
              PLACEHOLDER — reemplazar por la foto real de Nicolás
              (sesión de fotos profesional) cuando esté disponible.
            */}
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm border-2 border-dashed border-charcoal-600 bg-charcoal-900">
              <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
                <ImageOff size={40} className="text-charcoal-500" strokeWidth={1.5} />
                <p className="font-display text-sm font-semibold text-charcoal-300">
                  [REEMPLAZAR: foto de Nicolás]
                </p>
                <p className="text-xs text-charcoal-500">
                  Espacio reservado para la foto de la sesión profesional
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delayMs={100}>
            <span className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-400">
              Quién construye
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-[-0.02em] text-white sm:text-4xl">
              20 años construyendo relaciones tan sólidas como nuestras obras
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-charcoal-200">
              Nicolás fundó Jireh Contractor con una idea simple: hacer las
              cosas bien, sin atajos. Dos décadas después, ese mismo
              compromiso guía cada proyecto, desde una vivienda construida
              desde cero hasta la remodelación más pequeña.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-charcoal-200">
              Con un equipo experimentado y un enfoque cercano con cada
              cliente, Jireh Contractor se ha ganado la confianza de familias
              y negocios en toda Virginia, proyecto tras proyecto.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
