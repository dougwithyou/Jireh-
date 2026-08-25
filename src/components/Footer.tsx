import { Mail, MapPin, Phone } from "lucide-react";
import type { SiteContent } from "@/lib/site-content/types";

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path d="M14 9h2.5V6H14c-1.66 0-3 1.34-3 3v2H9v3h2v6h3v-6h2.5l.5-3H14V9z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <circle cx="12" cy="12" r="3.4" />
      <circle cx="16.2" cy="7.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

const quickLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#proceso", label: "Proceso" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
];

export default function Footer({ content }: { content: SiteContent["footer"] }) {
  const year = new Date().getFullYear();
  const socialLinks = [
    { icon: FacebookIcon, href: content.facebookUrl, label: "Facebook" },
    { icon: InstagramIcon, href: content.instagramUrl, label: "Instagram" },
  ];

  return (
    <footer className="border-t-[3px] border-amber-400 bg-charcoal-950 text-charcoal-300">
      <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:px-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-xl font-extrabold text-white">
              JIREH <span className="text-amber-400">CONTRACTOR</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-charcoal-400">
              {content.description}
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Enlaces rápidos
            </h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-charcoal-400 transition-colors hover:text-amber-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Contacto
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-charcoal-400">
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="shrink-0 text-amber-400" />
                <span>{content.phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="shrink-0 text-amber-400" />
                <span>{content.email}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin size={16} className="shrink-0 text-amber-400" />
                <span>{content.address}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Síguenos
            </h3>
            <div className="mt-4 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center bg-charcoal-800 text-charcoal-300 transition-colors hover:bg-amber-400 hover:text-charcoal-900"
                >
                  <social.icon width={18} height={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-charcoal-800 pt-6 text-center text-xs text-charcoal-500">
          © {year} Jireh Contractor. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
