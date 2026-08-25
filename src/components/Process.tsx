"use client";

import { useRef } from "react";
import { motion, useInView, useScroll } from "motion/react";
import Reveal from "./Reveal";
import type { SiteContent } from "@/lib/site-content/types";

export default function Process({ content }: { content: SiteContent["process"] }) {
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
            {content.eyebrow}
          </span>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold uppercase tracking-[-0.02em] text-charcoal-900 sm:text-4xl">
            {content.heading}
          </h2>
        </Reveal>

        <div ref={ref} className="relative mt-16 max-w-2xl pl-14 sm:pl-16">
          <div className="absolute left-4 top-0 h-full w-[3px] bg-charcoal-200 sm:left-6" />
          <motion.div
            className="absolute left-4 top-0 w-[3px] origin-top bg-amber-400 sm:left-6"
            style={{ height: "100%", scaleY: scrollYProgress }}
          />

          <div className="space-y-12">
            {content.phases.map((phase, i) => (
              <PhaseNode key={i} number={i + 1} phase={phase} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PhaseNode({
  number,
  phase,
}: {
  number: number;
  phase: SiteContent["process"]["phases"][number];
}) {
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
        {String(number).padStart(2, "0")}
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
