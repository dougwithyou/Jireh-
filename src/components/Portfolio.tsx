"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import ConstructionArt, {
  ConstructionVariant,
} from "./illustrations/ConstructionArt";
import Reveal from "./Reveal";
import type { SiteContent } from "@/lib/site-content/types";

const categories = ["Todos", "Residencial", "Remodelación", "Comercial", "Diseño"] as const;

// Ilustración placeholder por posición, usada mientras content.projects[i].imageUrl
// esté vacío. El super admin solo edita título/categoría/foto, no esta variante.
const illustrationVariants: ConstructionVariant[] = [
  "house-frame",
  "interior",
  "commercial",
  "renovation",
  "blueprint",
  "skyline",
];

export default function Portfolio({ content }: { content: SiteContent["portfolio"] }) {
  const [filter, setFilter] = useState<(typeof categories)[number]>("Todos");

  const projects = content.projects.map((project, i) => ({
    ...project,
    variant: illustrationVariants[i] ?? "skyline",
  }));

  const filtered = useMemo(
    () =>
      filter === "Todos" ? projects : projects.filter((p) => p.category === filter),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filter, content]
  );

  return (
    <section id="proyectos" className="scroll-mt-20 bg-concrete-100 py-24">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-16">
        <Reveal>
          <span className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-600">
            {content.eyebrow}
          </span>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold uppercase tracking-[-0.02em] text-charcoal-900 sm:text-4xl">
            {content.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-charcoal-500">{content.intro}</p>
        </Reveal>

        <div className="mt-10 flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`shrink-0 px-4 py-2 font-display text-xs font-semibold uppercase tracking-wide transition-colors ${
                filter === cat
                  ? "bg-amber-400 text-charcoal-900"
                  : "bg-transparent text-charcoal-500 hover:text-charcoal-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.title + i}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35 }}
                className={i === 0 ? "sm:col-span-2 lg:col-span-2" : ""}
              >
                <div className="group relative aspect-[4/3] overflow-hidden bg-charcoal-900">
                  {project.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element -- fuente dinámica (Supabase Storage)
                    <img
                      src={project.imageUrl}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <ConstructionArt
                      variant={project.variant}
                      id={`portfolio-${project.title}-${i}`}
                      className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(19,20,22,0.9) 0%, transparent 55%)",
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 translate-y-2 p-6 transition-transform duration-400 group-hover:translate-y-0">
                    <span className="font-display text-[11px] uppercase tracking-[0.2em] text-amber-300">
                      {project.category}
                    </span>
                    <h3 className="mt-2 font-display text-xl font-semibold uppercase text-white">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
