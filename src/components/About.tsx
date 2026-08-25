import { ImageOff } from "lucide-react";
import Reveal from "./Reveal";
import type { SiteContent } from "@/lib/site-content/types";

export default function About({ content }: { content: SiteContent["about"] }) {
  return (
    <section id="nosotros" className="scroll-mt-20 bg-charcoal-850 py-24">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-16">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            {content.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element -- fuente dinámica (Supabase Storage)
              <img
                src={content.imageUrl}
                alt=""
                className="mx-auto aspect-[4/5] w-full max-w-sm object-cover"
              />
            ) : (
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
            )}
          </Reveal>

          <Reveal delayMs={100}>
            <span className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-400">
              {content.eyebrow}
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-[-0.02em] text-white sm:text-4xl">
              {content.heading}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-charcoal-200">
              {content.paragraph1}
            </p>
            <p className="mt-4 text-lg leading-relaxed text-charcoal-200">
              {content.paragraph2}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
