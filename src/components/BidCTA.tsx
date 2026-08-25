import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

export default function BidCTA() {
  return (
    <section className="bg-amber-400 py-20">
      <div className="mx-auto max-w-[1320px] px-5 text-center sm:px-8 lg:px-16">
        <Reveal>
          <h2 className="font-display text-3xl font-bold uppercase tracking-[-0.02em] text-charcoal-900 sm:text-5xl">
            ¿Tenés planos o una idea?
            <br />
            Contanos.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-charcoal-800">
            Contanos sobre tu proyecto —una vivienda nueva, una remodelación o
            un espacio comercial— y te contactamos para conversar los
            detalles.
          </p>
          <a
            href="#contacto"
            className="mt-8 inline-flex items-center justify-center gap-2 bg-charcoal-900 px-8 py-4 font-display text-base font-bold uppercase tracking-wide text-white transition-colors hover:bg-charcoal-800"
          >
            Solicitar presupuesto
            <ArrowRight size={20} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
