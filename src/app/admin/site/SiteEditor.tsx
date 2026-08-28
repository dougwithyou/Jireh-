"use client";

import { useActionState } from "react";
import { PORTFOLIO_ILLUSTRATIONS, SERVICE_ICONS, type SiteContent } from "@/lib/site-content/types";
import {
  addPortfolioItem,
  addServiceItem,
  addTestimonialItem,
  removePortfolioItem,
  removeServiceItem,
  removeTestimonialItem,
  updateAbout,
  updateBidCta,
  updateCommitment,
  updateContact,
  updateFooter,
  updateHero,
  updateNav,
  updateNotifications,
  updatePortfolio,
  updateProcess,
  updateServices,
  updateTestimonials,
  updateTrustBar,
  type SiteEditorState,
} from "./actions";

const initialState: SiteEditorState = {};
const PORTFOLIO_CATEGORIES = ["Residencial", "Remodelación", "Comercial", "Diseño"];

export function SiteEditor({ content }: { content: SiteContent }) {
  return (
    <div className="space-y-6">
      <NavSection content={content.nav} />
      <HeroSection content={content.hero} />
      <TrustBarSection content={content.trustBar} />
      <ServicesSection key={`services-${content.services.items.length}`} content={content.services} />
      <PortfolioSection key={`portfolio-${content.portfolio.projects.length}`} content={content.portfolio} />
      <ProcessSection content={content.process} />
      <CommitmentSection content={content.commitment} />
      <AboutSection content={content.about} />
      <TestimonialsSection
        key={`testimonials-${content.testimonials.items.length}`}
        content={content.testimonials}
      />
      <BidCtaSection content={content.bidCta} />
      <ContactSection content={content.contact} />
      <NotificationsSection content={content.notifications} />
      <FooterSection content={content.footer} />
    </div>
  );
}

function SectionCard({
  title,
  description,
  state,
  pending,
  children,
}: {
  title: string;
  description?: string;
  state: SiteEditorState;
  pending: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-neutral-200 bg-white p-6">
      <h2 className="text-base font-semibold text-neutral-900">{title}</h2>
      {description && <p className="mt-1 text-sm text-neutral-500">{description}</p>}

      <div className="mt-5 space-y-5">{children}</div>

      <div className="mt-5 flex items-center gap-3 border-t border-neutral-100 pt-4">
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-50"
        >
          {pending ? "Guardando…" : "Guardar sección"}
        </button>
        {state.success && <span className="text-sm text-emerald-600">Guardado.</span>}
        {state.error && <span className="text-sm text-red-600">{state.error}</span>}
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  defaultValue,
  className = "",
}: {
  label: string;
  name: string;
  defaultValue: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-medium text-neutral-600">{label}</span>
      <input
        name={name}
        defaultValue={defaultValue}
        className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
      />
    </label>
  );
}

function TextAreaField({
  label,
  name,
  defaultValue,
  rows = 3,
  className = "",
}: {
  label: string;
  name: string;
  defaultValue: string;
  rows?: number;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-medium text-neutral-600">{label}</span>
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
      />
    </label>
  );
}

function NumberField({
  label,
  name,
  defaultValue,
  className = "",
}: {
  label: string;
  name: string;
  defaultValue: number;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-medium text-neutral-600">{label}</span>
      <input
        type="number"
        name={name}
        defaultValue={defaultValue}
        className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  defaultValue,
  options,
  className = "",
}: {
  label: string;
  name: string;
  defaultValue: string;
  options: string[];
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-medium text-neutral-600">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue}
        className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

function ImageField({
  label,
  fileFieldName,
  currentUrlFieldName,
  removeFieldName,
  currentUrl,
  className = "",
}: {
  label: string;
  fileFieldName: string;
  currentUrlFieldName: string;
  removeFieldName: string;
  currentUrl: string | null;
  className?: string;
}) {
  return (
    <div className={className}>
      <span className="mb-1 block text-xs font-medium text-neutral-600">{label}</span>
      {currentUrl && (
        // eslint-disable-next-line @next/next/no-img-element -- preview de una URL dinámica de Storage
        <img
          src={currentUrl}
          alt=""
          className="mb-2 h-24 w-32 rounded-md border border-neutral-200 object-cover"
        />
      )}
      <input type="hidden" name={currentUrlFieldName} value={currentUrl ?? ""} />
      <input
        type="file"
        name={fileFieldName}
        accept="image/png,image/jpeg,image/webp,image/avif"
        className="block w-full text-sm text-neutral-600 file:mr-3 file:rounded-md file:border-0 file:bg-neutral-100 file:px-3 file:py-1.5 file:text-sm file:font-medium hover:file:bg-neutral-200"
      />
      {currentUrl && (
        <label className="mt-1.5 flex items-center gap-1.5 text-xs text-neutral-500">
          <input type="checkbox" name={removeFieldName} className="rounded" />
          Quitar imagen (vuelve al placeholder)
        </label>
      )}
    </div>
  );
}

function AddItemButton({ label, formAction }: { label: string; formAction: () => void }) {
  return (
    <button
      type="submit"
      formAction={formAction}
      className="w-full border border-dashed border-neutral-300 py-2.5 text-sm font-medium text-neutral-600 hover:border-neutral-400 hover:text-neutral-900"
    >
      {label}
    </button>
  );
}

function RemoveItemButton({ formAction }: { formAction: () => void }) {
  return (
    <button
      type="submit"
      formAction={formAction}
      className="text-xs font-medium text-red-600 hover:underline"
    >
      Eliminar
    </button>
  );
}

function NavSection({ content }: { content: SiteContent["nav"] }) {
  const [state, action, pending] = useActionState(updateNav, initialState);
  return (
    <form action={action}>
      <SectionCard
        title="Menú de navegación"
        description="Los textos del menú y del botón de acción. Los destinos de cada link quedan fijos (apuntan a cada sección del sitio)."
        state={state}
        pending={pending}
      >
        <div className="grid grid-cols-3 gap-4">
          <Field label="Inicio" name="inicioLabel" defaultValue={content.inicioLabel} />
          <Field label="Servicios" name="serviciosLabel" defaultValue={content.serviciosLabel} />
          <Field label="Proyectos" name="proyectosLabel" defaultValue={content.proyectosLabel} />
          <Field label="Proceso" name="procesoLabel" defaultValue={content.procesoLabel} />
          <Field label="Nosotros" name="nosotrosLabel" defaultValue={content.nosotrosLabel} />
          <Field label="Contacto" name="contactoLabel" defaultValue={content.contactoLabel} />
        </div>
        <Field label="Botón de acción (navbar)" name="ctaLabel" defaultValue={content.ctaLabel} />
      </SectionCard>
    </form>
  );
}

function HeroSection({ content }: { content: SiteContent["hero"] }) {
  const [state, action, pending] = useActionState(updateHero, initialState);
  return (
    <form action={action}>
      <SectionCard title="Hero" state={state} pending={pending}>
        <Field label="Eyebrow" name="eyebrow" defaultValue={content.eyebrow} />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Título — línea 1" name="headlineLine1" defaultValue={content.headlineLine1} />
          <Field label="Título — línea 2" name="headlineLine2" defaultValue={content.headlineLine2} />
        </div>
        <TextAreaField label="Bajada" name="subline" defaultValue={content.subline} />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Botón principal" name="ctaPrimaryLabel" defaultValue={content.ctaPrimaryLabel} />
          <Field label="Botón secundario" name="ctaSecondaryLabel" defaultValue={content.ctaSecondaryLabel} />
        </div>
        <ImageField
          label="Imagen de fondo"
          fileFieldName="backgroundImage"
          currentUrlFieldName="currentBackgroundImageUrl"
          removeFieldName="removeBackgroundImage"
          currentUrl={content.backgroundImageUrl}
        />
      </SectionCard>
    </form>
  );
}

function TrustBarSection({ content }: { content: SiteContent["trustBar"] }) {
  const [state, action, pending] = useActionState(updateTrustBar, initialState);
  return (
    <form action={action}>
      <SectionCard title="Banda de estadísticas" state={state} pending={pending}>
        <div className="grid grid-cols-3 gap-3 border-b border-neutral-100 pb-4">
          <NumberField label="Valor 1" name="stat1Value" defaultValue={content.stat1Value} />
          <Field label="Sufijo 1" name="stat1Suffix" defaultValue={content.stat1Suffix} />
          <Field label="Etiqueta 1" name="stat1Label" defaultValue={content.stat1Label} />
        </div>
        <div className="grid grid-cols-3 gap-3 border-b border-neutral-100 pb-4">
          <NumberField label="Valor 2" name="stat2Value" defaultValue={content.stat2Value} />
          <Field label="Sufijo 2" name="stat2Suffix" defaultValue={content.stat2Suffix} />
          <Field label="Etiqueta 2" name="stat2Label" defaultValue={content.stat2Label} />
        </div>
        <div className="grid grid-cols-3 gap-3 border-b border-neutral-100 pb-4">
          <NumberField label="Valor 3" name="stat3Value" defaultValue={content.stat3Value} />
          <Field label="Sufijo 3" name="stat3Suffix" defaultValue={content.stat3Suffix} />
          <Field label="Etiqueta 3" name="stat3Label" defaultValue={content.stat3Label} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Valor 4 (texto)" name="stat4Value" defaultValue={content.stat4Value} />
          <Field label="Etiqueta 4" name="stat4Label" defaultValue={content.stat4Label} />
        </div>
      </SectionCard>
    </form>
  );
}

function ServicesSection({ content }: { content: SiteContent["services"] }) {
  const [state, action, pending] = useActionState(updateServices, initialState);
  return (
    <form action={action}>
      <input type="hidden" name="itemCount" value={content.items.length} />
      <SectionCard title="Servicios" state={state} pending={pending}>
        <Field label="Eyebrow" name="eyebrow" defaultValue={content.eyebrow} />
        <Field label="Título" name="heading" defaultValue={content.heading} />
        <TextAreaField label="Intro" name="intro" defaultValue={content.intro} />
        {content.items.map((item, i) => (
          <div key={i} className="space-y-2 border-t border-neutral-100 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-500">
                Servicio {i + 1}
              </span>
              <RemoveItemButton formAction={removeServiceItem.bind(null, i)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Título" name={`item${i}Title`} defaultValue={item.title} />
              <SelectField
                label="Ícono"
                name={`item${i}Icon`}
                defaultValue={item.iconName}
                options={[...SERVICE_ICONS]}
              />
            </div>
            <TextAreaField
              label="Descripción"
              name={`item${i}Description`}
              defaultValue={item.description}
              rows={2}
            />
          </div>
        ))}
        <AddItemButton label="+ Agregar servicio" formAction={addServiceItem} />
      </SectionCard>
    </form>
  );
}

function PortfolioSection({ content }: { content: SiteContent["portfolio"] }) {
  const [state, action, pending] = useActionState(updatePortfolio, initialState);
  return (
    <form action={action}>
      <input type="hidden" name="projectCount" value={content.projects.length} />
      <SectionCard
        title="Proyectos"
        description="Si no subís foto, se usa la ilustración de referencia elegida."
        state={state}
        pending={pending}
      >
        <Field label="Eyebrow" name="eyebrow" defaultValue={content.eyebrow} />
        <Field label="Título" name="heading" defaultValue={content.heading} />
        <TextAreaField label="Intro" name="intro" defaultValue={content.intro} rows={2} />
        {content.projects.map((project, i) => (
          <div key={i} className="grid grid-cols-2 gap-4 border-t border-neutral-100 pt-4">
            <div className="col-span-2 flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-500">
                Proyecto {i + 1}
              </span>
              <RemoveItemButton formAction={removePortfolioItem.bind(null, i)} />
            </div>
            <Field label="Título" name={`project${i}Title`} defaultValue={project.title} />
            <SelectField
              label="Categoría"
              name={`project${i}Category`}
              defaultValue={project.category}
              options={PORTFOLIO_CATEGORIES}
            />
            <SelectField
              label="Ilustración de referencia (si no hay foto)"
              name={`project${i}Illustration`}
              defaultValue={project.illustrationVariant}
              options={[...PORTFOLIO_ILLUSTRATIONS]}
              className="col-span-2"
            />
            <ImageField
              label="Foto"
              fileFieldName={`project${i}Image`}
              currentUrlFieldName={`project${i}CurrentImageUrl`}
              removeFieldName={`project${i}RemoveImage`}
              currentUrl={project.imageUrl}
              className="col-span-2"
            />
          </div>
        ))}
        <AddItemButton label="+ Agregar proyecto" formAction={addPortfolioItem} />
      </SectionCard>
    </form>
  );
}

function ProcessSection({ content }: { content: SiteContent["process"] }) {
  const [state, action, pending] = useActionState(updateProcess, initialState);
  return (
    <form action={action}>
      <SectionCard title="Proceso" state={state} pending={pending}>
        <Field label="Eyebrow" name="eyebrow" defaultValue={content.eyebrow} />
        <Field label="Título" name="heading" defaultValue={content.heading} />
        {content.phases.map((phase, i) => (
          <div key={i} className="space-y-2 border-t border-neutral-100 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <Field label={`Etapa ${i + 1} — título`} name={`phase${i}Title`} defaultValue={phase.title} />
              <Field label="Momento" name={`phase${i}Duration`} defaultValue={phase.duration} />
            </div>
            <TextAreaField
              label="Descripción"
              name={`phase${i}Description`}
              defaultValue={phase.description}
              rows={2}
            />
          </div>
        ))}
      </SectionCard>
    </form>
  );
}

function CommitmentSection({ content }: { content: SiteContent["commitment"] }) {
  const [state, action, pending] = useActionState(updateCommitment, initialState);
  return (
    <form action={action}>
      <SectionCard title="Nuestro compromiso" state={state} pending={pending}>
        <Field label="Eyebrow" name="eyebrow" defaultValue={content.eyebrow} />
        <Field label="Título" name="heading" defaultValue={content.heading} />
        <TextAreaField label="Párrafo" name="paragraph" defaultValue={content.paragraph} />
        <ImageField
          label="Foto"
          fileFieldName="image"
          currentUrlFieldName="currentImageUrl"
          removeFieldName="removeImage"
          currentUrl={content.imageUrl}
        />
        {content.points.map((point, i) => (
          <div key={i} className="grid grid-cols-2 gap-3 border-t border-neutral-100 pt-4">
            <Field label={`Dato ${i + 1} — valor`} name={`point${i}Value`} defaultValue={point.value} />
            <Field label="Etiqueta" name={`point${i}Label`} defaultValue={point.label} />
          </div>
        ))}
      </SectionCard>
    </form>
  );
}

function AboutSection({ content }: { content: SiteContent["about"] }) {
  const [state, action, pending] = useActionState(updateAbout, initialState);
  return (
    <form action={action}>
      <SectionCard title="Nosotros" state={state} pending={pending}>
        <Field label="Eyebrow" name="eyebrow" defaultValue={content.eyebrow} />
        <Field label="Título" name="heading" defaultValue={content.heading} />
        <TextAreaField label="Párrafo 1" name="paragraph1" defaultValue={content.paragraph1} />
        <TextAreaField label="Párrafo 2" name="paragraph2" defaultValue={content.paragraph2} />
        <ImageField
          label="Foto de Nicolás"
          fileFieldName="image"
          currentUrlFieldName="currentImageUrl"
          removeFieldName="removeImage"
          currentUrl={content.imageUrl}
        />
      </SectionCard>
    </form>
  );
}

function TestimonialsSection({ content }: { content: SiteContent["testimonials"] }) {
  const [state, action, pending] = useActionState(updateTestimonials, initialState);
  return (
    <form action={action}>
      <input type="hidden" name="itemCount" value={content.items.length} />
      <SectionCard title="Testimonios" state={state} pending={pending}>
        <Field label="Eyebrow" name="eyebrow" defaultValue={content.eyebrow} />
        <Field label="Título" name="heading" defaultValue={content.heading} />
        <TextAreaField label="Intro" name="intro" defaultValue={content.intro} rows={2} />
        {content.items.map((item, i) => (
          <div key={i} className="space-y-2 border-t border-neutral-100 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-500">
                Testimonio {i + 1}
              </span>
              <RemoveItemButton formAction={removeTestimonialItem.bind(null, i)} />
            </div>
            <TextAreaField label="Reseña" name={`item${i}Quote`} defaultValue={item.quote} rows={2} />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Nombre" name={`item${i}Name`} defaultValue={item.name} />
              <Field label="Ubicación" name={`item${i}Location`} defaultValue={item.location} />
            </div>
          </div>
        ))}
        <AddItemButton label="+ Agregar testimonio" formAction={addTestimonialItem} />
      </SectionCard>
    </form>
  );
}

function NotificationsSection({ content }: { content: SiteContent["notifications"] }) {
  const [state, action, pending] = useActionState(updateNotifications, initialState);
  return (
    <form action={action}>
      <SectionCard
        title="Notificaciones"
        description="A este correo llega un aviso cada vez que alguien completa el formulario de contacto. Mientras no haya un dominio verificado en Resend, solo va a recibir el correo de la cuenta de Resend usada para enviar — cualquier otro destinatario no recibirá el mail aunque quede guardado acá."
        state={state}
        pending={pending}
      >
        <Field
          label="Correo que recibe cada lead"
          name="notificationEmail"
          defaultValue={content.notificationEmail}
        />
      </SectionCard>
    </form>
  );
}

function BidCtaSection({ content }: { content: SiteContent["bidCta"] }) {
  const [state, action, pending] = useActionState(updateBidCta, initialState);
  return (
    <form action={action}>
      <SectionCard title="CTA amarillo" state={state} pending={pending}>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Título — línea 1" name="headlineLine1" defaultValue={content.headlineLine1} />
          <Field label="Título — línea 2" name="headlineLine2" defaultValue={content.headlineLine2} />
        </div>
        <TextAreaField label="Párrafo" name="paragraph" defaultValue={content.paragraph} rows={2} />
        <Field label="Botón" name="buttonLabel" defaultValue={content.buttonLabel} />
      </SectionCard>
    </form>
  );
}

function ContactSection({ content }: { content: SiteContent["contact"] }) {
  const [state, action, pending] = useActionState(updateContact, initialState);
  return (
    <form action={action}>
      <SectionCard title="Contacto" state={state} pending={pending}>
        <Field label="Eyebrow" name="eyebrow" defaultValue={content.eyebrow} />
        <Field label="Título" name="heading" defaultValue={content.heading} />
        <TextAreaField label="Párrafo" name="paragraph" defaultValue={content.paragraph} rows={2} />
      </SectionCard>
    </form>
  );
}

function FooterSection({ content }: { content: SiteContent["footer"] }) {
  const [state, action, pending] = useActionState(updateFooter, initialState);
  return (
    <form action={action}>
      <SectionCard title="Footer" state={state} pending={pending}>
        <TextAreaField label="Descripción" name="description" defaultValue={content.description} rows={2} />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Teléfono" name="phone" defaultValue={content.phone} />
          <Field label="Correo" name="email" defaultValue={content.email} />
        </div>
        <Field label="Dirección" name="address" defaultValue={content.address} />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Link de Facebook" name="facebookUrl" defaultValue={content.facebookUrl} />
          <Field label="Link de Instagram" name="instagramUrl" defaultValue={content.instagramUrl} />
        </div>
      </SectionCard>
    </form>
  );
}
