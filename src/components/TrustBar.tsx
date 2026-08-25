import { Award, Building2, HardHat, MapPin } from "lucide-react";
import CountUp from "./CountUp";
import type { SiteContent } from "@/lib/site-content/types";

export default function TrustBar({ content }: { content: SiteContent["trustBar"] }) {
  const stats = [
    {
      icon: Award,
      value: <CountUp value={content.stat1Value} suffix={content.stat1Suffix} />,
      label: content.stat1Label,
    },
    {
      icon: HardHat,
      value: <CountUp value={content.stat2Value} suffix={content.stat2Suffix} />,
      label: content.stat2Label,
    },
    {
      icon: Building2,
      value: <CountUp value={content.stat3Value} suffix={content.stat3Suffix} />,
      label: content.stat3Label,
    },
    {
      icon: MapPin,
      value: content.stat4Value,
      label: content.stat4Label,
    },
  ];

  return (
    <section className="bg-charcoal-850">
      <div className="mx-auto grid max-w-[1320px] grid-cols-2 divide-x divide-y divide-charcoal-700 border-charcoal-700 sm:divide-y-0 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="flex flex-col items-start gap-3 border-charcoal-700 px-6 py-10 sm:px-8 lg:py-14"
          >
            <stat.icon className="text-amber-400" size={26} strokeWidth={1.6} />
            <p className="font-display text-4xl font-extrabold text-white">
              {stat.value}
            </p>
            <p className="text-sm text-charcoal-300">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
