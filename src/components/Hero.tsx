import { ArrowRight } from "lucide-react";
import ConstructionArt from "./illustrations/ConstructionArt";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center overflow-hidden bg-navy-950 pt-24"
    >
      {/*
        Imagen de fondo referencial. Reemplazar por fotografía real de un
        proyecto insignia de Jireh Contractor (idealmente una obra terminada
        o en construcción avanzada, orientación horizontal, alta resolución).
      */}
      <ConstructionArt
        variant="skyline"
        id="hero"
        className="absolute inset-0 h-full w-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/80 to-navy-950/40" />
      <div className="absolute inset-0 bg-navy-950/30" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-20 sm:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full border border-terracotta-400/40 bg-terracotta-500/10 px-4 py-1.5 text-sm font-medium text-terracotta-300">
            20+ años construyendo en Virginia
          </span>

          <h1 className="mt-6 font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            20 años construyendo con confianza en Virginia
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-navy-100 sm:text-xl">
            Construcción de vivienda desde cero, remodelaciones residenciales
            y proyectos comerciales, con la solidez de dos décadas de
            experiencia liderados por Nicolás y su equipo.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#contacto"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-terracotta-500 px-7 py-4 text-base font-semibold text-white shadow-lg shadow-terracotta-900/30 transition-colors hover:bg-terracotta-600"
            >
              Solicitar presupuesto
              <ArrowRight size={20} />
            </a>
            <a
              href="#proyectos"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Ver proyectos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/*
  Variaciones de copy sugeridas para el título principal (a elección del cliente):
  1. "20 años construyendo con confianza en Virginia"
  2. "Dos décadas construyendo los proyectos en los que Virginia confía"
  3. "Construcción sólida, resultados que duran 20 años"
*/
