import ConstructionArt, {
  ConstructionVariant,
} from "./illustrations/ConstructionArt";
import Reveal from "./Reveal";

/**
 * PORTAFOLIO — imágenes referenciales
 * -----------------------------------
 * Las tarjetas de abajo usan ilustraciones vectoriales como marcador de
 * posición mientras se recopilan las fotos reales de los proyectos de Jireh
 * Contractor. Cuando el cliente entregue el material fotográfico:
 *   1. Reemplazar <ConstructionArt variant="..." /> por <Image src="..." />
 *      (next/image) con la foto real del proyecto.
 *   2. Mantener el mismo `aspect-[4/3]` en el contenedor para conservar el
 *      grid uniforme.
 */
const projects: {
  variant: ConstructionVariant;
  title: string;
  category: string;
}[] = [
  { variant: "house-frame", title: "Vivienda nueva — estructura", category: "Residencial" },
  { variant: "interior", title: "Remodelación de cocina", category: "Remodelación" },
  { variant: "commercial", title: "Local comercial", category: "Comercial" },
  { variant: "renovation", title: "Remodelación en proceso", category: "Remodelación" },
  { variant: "blueprint", title: "Planificación de proyecto", category: "Diseño" },
  { variant: "skyline", title: "Obra en construcción", category: "Residencial" },
];

export default function Portfolio() {
  return (
    <section id="proyectos" className="scroll-mt-20 bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-terracotta-600">
              Proyectos
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-navy-950 sm:text-4xl">
              Un vistazo a nuestro trabajo
            </h2>
            <p className="mt-4 text-lg text-navy-600">
              Imágenes referenciales — próximamente reemplazadas por
              fotografías reales de nuestros proyectos.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.title} delayMs={(i % 3) * 100}>
              <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-navy-900">
                <ConstructionArt
                  variant={project.variant}
                  id={`portfolio-${i}`}
                  className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-terracotta-300">
                    {project.category}
                  </span>
                  <p className="mt-1 font-heading text-lg font-semibold text-white">
                    {project.title}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
