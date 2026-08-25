import { Quote } from "lucide-react";
import Reveal from "./Reveal";
import type { SiteContent } from "@/lib/site-content/types";

export default function Testimonials({ content }: { content: SiteContent["testimonials"] }) {
  return (
    <section className="bg-concrete-100 py-24">
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

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((t, i) => (
            <Reveal key={i} delayMs={i * 100}>
              <div className="flex h-full flex-col border border-dashed border-charcoal-300 bg-white p-7">
                <Quote className="mb-4 text-amber-500" size={26} strokeWidth={1.5} />
                <p className="flex-1 text-sm italic leading-relaxed text-charcoal-500">
                  {t.quote}
                </p>
                <div className="mt-6 border-t border-charcoal-200 pt-4">
                  <p className="font-display text-sm font-semibold text-charcoal-900">
                    {t.name}
                  </p>
                  <p className="text-xs text-charcoal-400">{t.location}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
