import { ImageOff, ShieldCheck } from "lucide-react";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="nosotros" className="scroll-mt-20 bg-navy-950 py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            {/*
              PLACEHOLDER — reemplazar por la foto real de Nicolás
              (sesión de fotos profesional) cuando esté disponible.
            */}
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border-2 border-dashed border-navy-700 bg-navy-900">
              <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
                <ImageOff size={40} className="text-navy-500" strokeWidth={1.5} />
                <p className="font-heading text-sm font-semibold text-navy-300">
                  [REEMPLAZAR: foto de Nicolás]
                </p>
                <p className="text-xs text-navy-500">
                  Espacio reservado para la foto de la sesión profesional
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delayMs={100}>
            <span className="text-sm font-semibold uppercase tracking-wider text-terracotta-400">
              Sobre nosotros
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-white sm:text-4xl">
              20 años construyendo relaciones tan sólidas como nuestras obras
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-navy-200">
              Nicolás fundó Jireh Contractor con una idea simple: hacer las
              cosas bien, sin atajos. Dos décadas después, ese mismo
              compromiso guía cada proyecto, desde una vivienda construida
              desde cero hasta la remodelación más pequeña.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-navy-200">
              Con un equipo experimentado y un enfoque cercano con cada
              cliente, Jireh Contractor se ha ganado la confianza de familias
              y negocios en toda Virginia, proyecto tras proyecto.
            </p>

            <div className="mt-8 flex items-start gap-3 rounded-xl border border-navy-800 bg-navy-900/60 p-5">
              <ShieldCheck className="mt-0.5 shrink-0 text-terracotta-400" size={24} />
              <p className="text-sm leading-relaxed text-navy-200">
                <span className="font-semibold text-white">
                  Nuestro compromiso:
                </span>{" "}
                calidad de construcción, comunicación clara y cumplimiento de
                los plazos acordados, en cada etapa del proyecto.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
