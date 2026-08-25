import { Hammer, Home, Building2, Settings, Wrench, Ruler, ClipboardList, ShieldCheck } from "lucide-react";
import Reveal from "./Reveal";
import type { ServiceIconName, SiteContent } from "@/lib/site-content/types";

const icons: Record<ServiceIconName, typeof Home> = {
  Home,
  Hammer,
  Building2,
  Settings,
  Wrench,
  Ruler,
  ClipboardList,
  ShieldCheck,
};

export default function Services({ content }: { content: SiteContent["services"] }) {
  return (
    <section id="servicios" className="scroll-mt-20 bg-charcoal-900 py-24">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-16">
        <Reveal>
          <span className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-400">
            {content.eyebrow}
          </span>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold uppercase tracking-[-0.02em] text-white sm:text-4xl">
            {content.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-charcoal-300">{content.intro}</p>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.items.map((service, i) => {
            const Icon = icons[service.iconName] ?? Settings;
            return (
              <Reveal key={i} delayMs={i * 100}>
                <div className="group h-full border-l-4 border-amber-400 bg-charcoal-850 p-7 transition-[border-width] duration-300 hover:border-l-8">
                  <Icon size={28} className="text-amber-400" strokeWidth={1.6} />
                  <h3 className="mt-5 font-display text-lg font-semibold text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal-300">
                    {service.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
