import { Award, Building2, HardHat, MapPin } from "lucide-react";
import CountUp from "./CountUp";

const stats = [
  {
    icon: Award,
    value: <CountUp value={20} suffix="+" />,
    label: "Años de experiencia",
  },
  {
    icon: HardHat,
    value: <CountUp value={150} suffix="+" />,
    label: "Proyectos completados",
  },
  {
    icon: Building2,
    value: <CountUp value={3} />,
    label: "Residencial, remodelación y comercial",
  },
  {
    icon: MapPin,
    value: "Virginia",
    label: "Zona de cobertura",
  },
];

export default function TrustBar() {
  return (
    <section className="bg-charcoal-850">
      <div className="mx-auto grid max-w-[1320px] grid-cols-2 divide-x divide-y divide-charcoal-700 border-charcoal-700 sm:divide-y-0 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
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
