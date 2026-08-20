import { Award, Building2, HardHat, MapPin } from "lucide-react";
import Reveal from "./Reveal";

const stats = [
  {
    icon: Award,
    value: "20+",
    label: "Años de experiencia",
  },
  {
    icon: HardHat,
    value: "150+",
    label: "Proyectos completados",
  },
  {
    icon: Building2,
    value: "3",
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
    <section className="border-b border-navy-100 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delayMs={i * 100}>
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <stat.icon className="mb-3 text-terracotta-500" size={30} strokeWidth={1.6} />
                <p className="font-heading text-3xl font-bold text-navy-900 sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-navy-600 sm:text-base">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
