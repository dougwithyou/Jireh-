"use client";

import { useRef } from "react";
import { motion, useInView, useScroll } from "motion/react";
import Reveal from "./Reveal";

const phases = [
  {
    number: "01",
    title: "Consulta inicial",
    duration: "Primer contacto",
    description:
      "Visitamos el sitio o revisamos tus planos y conversamos sobre alcance, ideas y presupuesto aproximado.",
  },
  {
    number: "02",
    title: "Presupuesto",
    duration: "Antes de iniciar",
    description:
      "Preparamos un presupuesto detallado y por escrito, para que sepas exactamente qué estás contratando.",
  },
  {
    number: "03",
    title: "Planificación",
    duration: "Antes de iniciar",
    description:
      "Coordinamos permisos, materiales y cronograma antes de mover una sola pala en el sitio.",
  },
  {
    number: "04",
    title: "Construcción",
    duration: "Según alcance del proyecto",
    description:
      "Nuestro equipo ejecuta el trabajo con supervisión constante y comunicación frecuente sobre el avance.",
  },
  {
    number: "05",
    title: "Control de calidad",
    duration: "En cada etapa",
    description:
      "Revisamos el trabajo antes de avanzar a la siguiente etapa, para que el resultado cumpla lo acordado.",
  },
  {
    number: "06",
    title: "Entrega y garantía",
    duration: "Etapa final",
    description:
      "Hacemos un recorrido final junto a vos y respaldamos el trabajo realizado.",
  },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.65", "end 0.4"],
  });

  return (
    <section id="proceso" className="scroll-mt-20 bg-concrete-100 py-24">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-16">
        <Reveal>
          <span className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-600">
            Cómo trabajamos
          </span>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold uppercase tracking-[-0.02em] text-charcoal-900 sm:text-4xl">
            De la consulta a la entrega
          </h2>
        </Reveal>

        <div ref={ref} className="relative mt-16 max-w-2xl pl-14 sm:pl-16">
          <div className="absolute left-4 top-0 h-full w-[3px] bg-charcoal-200 sm:left-6" />
          <motion.div
            className="absolute left-4 top-0 w-[3px] origin-top bg-amber-400 sm:left-6"
            style={{ height: "100%", scaleY: scrollYProgress }}
          />

          <div className="space-y-12">
            {phases.map((phase) => (
              <PhaseNode key={phase.number} phase={phase} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PhaseNode({ phase }: { phase: (typeof phases)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="relative -ml-14 pl-14 sm:-ml-16 sm:pl-16"
    >
      <span className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center bg-amber-400 font-display text-xs font-bold text-charcoal-900 sm:h-11 sm:w-11">
        {phase.number}
      </span>
      <h3 className="font-display text-lg font-bold uppercase text-charcoal-900 sm:text-xl">
        {phase.title}
      </h3>
      <p className="mt-1 font-display text-[11px] font-semibold uppercase tracking-[0.15em] text-amber-600">
        {phase.duration}
      </p>
      <p className="mt-2 max-w-lg text-sm leading-relaxed text-charcoal-500">
        {phase.description}
      </p>
    </motion.div>
  );
}
