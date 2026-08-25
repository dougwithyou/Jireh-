import ContactForm from "./ContactForm";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contacto" className="scroll-mt-20 bg-white py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal>
          <div className="text-center">
            <span className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-600">
              Contacto
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-[-0.02em] text-charcoal-900 sm:text-4xl">
              Solicitá tu presupuesto
            </h2>
            <p className="mt-4 text-lg text-charcoal-500">
              Contanos sobre tu proyecto y te contactaremos a la brevedad
              para conversar los detalles.
            </p>
          </div>
        </Reveal>

        <Reveal delayMs={100} className="mt-12">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
