import { ImageOff } from "lucide-react";
import Reveal from "./Reveal";
import type { SiteContent } from "@/lib/site-content/types";

export default function Commitment({ content }: { content: SiteContent["commitment"] }) {
  return (
    <section className="bg-charcoal-900 py-24">
      <div className="mx-auto grid max-w-[1320px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:px-16">
        <Reveal>
          <span className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-400">
            {content.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-[-0.02em] text-white sm:text-4xl">
            {content.heading}
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-charcoal-300">
            {content.paragraph}
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-6">
            {content.points.map((point, i) => (
              <div key={i} className="border-l-2 border-amber-400 pl-4">
                <dt className="font-display text-2xl font-extrabold text-white">
                  {point.value}
                </dt>
                <dd className="mt-1 text-sm text-charcoal-300">{point.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delayMs={100}>
          {content.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- fuente dinámica (Supabase Storage)
            <img
              src={content.imageUrl}
              alt=""
              className="aspect-[4/5] w-full object-cover"
            />
          ) : (
            <div className="relative aspect-[4/5] w-full border-2 border-dashed border-charcoal-600 bg-charcoal-850">
              <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
                <ImageOff size={40} className="text-charcoal-500" strokeWidth={1.5} />
                <p className="font-display text-sm font-semibold text-charcoal-300">
                  [REEMPLAZAR: foto del equipo en obra]
                </p>
              </div>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
