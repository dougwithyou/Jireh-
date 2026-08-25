"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import ConstructionArt from "./illustrations/ConstructionArt";
import type { SiteContent } from "@/lib/site-content/types";

export default function Hero({ content }: { content: SiteContent["hero"] }) {
  const headlineLines = [content.headlineLine1, content.headlineLine2];

  return (
    <section
      id="inicio"
      className="relative flex h-screen min-h-[640px] items-end overflow-hidden bg-charcoal-900"
    >
      {content.backgroundImageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element -- fuente dinámica (Supabase Storage), sin dominios fijos para next/image
        <img
          src={content.backgroundImageUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <ConstructionArt
          variant="skyline"
          id="hero"
          className="absolute inset-0 h-full w-full"
        />
      )}
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
            {content.eyebrow}
          </span>

          <h1 className="mt-6 font-display text-[clamp(2.75rem,7vw,5rem)] font-extrabold uppercase leading-[0.96] tracking-[-0.02em] text-white">
            {headlineLines.map((line, i) => (
              <span key={i} className="block overflow-hidden">
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
            {content.subline}
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
              {content.ctaPrimaryLabel}
              <ArrowRight size={20} />
            </a>
            <a
              href="#proyectos"
              className="inline-flex items-center justify-center gap-2 border border-white/30 px-7 py-4 font-display text-base font-bold uppercase tracking-wide text-white transition-colors hover:bg-white/10"
            >
              {content.ctaSecondaryLabel}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
