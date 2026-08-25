"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import ConstructionArt from "./illustrations/ConstructionArt";

const headlineLines = ["CONSTRUIMOS PARA", "QUE DURE."];

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex h-screen min-h-[640px] items-end overflow-hidden bg-charcoal-900"
    >
      {/*
        Imagen de fondo referencial. Reemplazar por fotografía real de un
        proyecto insignia de Jireh Contractor: obra activa al atardecer o
        estructura terminada, horizontal, alta resolución.
      */}
      <ConstructionArt
        variant="skyline"
        id="hero"
        className="absolute inset-0 h-full w-full"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(19,20,22,0.97) 0%, rgba(19,20,22,0.55) 50%, rgba(19,20,22,0.35) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-5 pb-16 sm:px-8 lg:px-16 lg:pb-20">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-400">
            Virginia, EE. UU. · Construcción y remodelación · 20+ años
          </span>

          <h1 className="mt-6 font-display text-[clamp(2.75rem,7vw,5rem)] font-extrabold uppercase leading-[0.96] tracking-[-0.02em] text-white">
            {headlineLines.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ clipPath: "inset(0 0 100% 0)" }}
                  animate={{ clipPath: "inset(0 0 0% 0)" }}
                  transition={{ duration: 0.85, delay: i * 0.1, ease: "easeOut" }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-charcoal-100 sm:text-xl"
          >
            Construcción de vivienda desde cero, remodelaciones residenciales
            y proyectos comerciales, con la solidez de dos décadas de
            experiencia liderados por Nicolás y su equipo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#contacto"
              className="inline-flex items-center justify-center gap-2 bg-amber-400 px-7 py-4 font-display text-base font-bold uppercase tracking-wide text-charcoal-900 transition-colors hover:bg-amber-300"
            >
              Solicitar presupuesto
              <ArrowRight size={20} />
            </a>
            <a
              href="#proyectos"
              className="inline-flex items-center justify-center gap-2 border border-white/30 px-7 py-4 font-display text-base font-bold uppercase tracking-wide text-white transition-colors hover:bg-white/10"
            >
              Ver proyectos
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
