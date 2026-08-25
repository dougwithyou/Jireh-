"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import type { SiteContent } from "@/lib/site-content/types";

export default function Header({ content }: { content: SiteContent["nav"] }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "#inicio", label: content.inicioLabel },
    { href: "#servicios", label: content.serviciosLabel },
    { href: "#proyectos", label: content.proyectosLabel },
    { href: "#proceso", label: content.procesoLabel },
    { href: "#nosotros", label: content.nosotrosLabel },
    { href: "#contacto", label: content.contactoLabel },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b-[3px] bg-charcoal-900/95 backdrop-blur transition-[border-color] duration-400 ${
        scrolled ? "border-amber-400" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[78px] max-w-[1320px] items-center justify-between px-5 sm:px-8 lg:px-16">
        <a href="#inicio" className="flex items-center gap-2.5">
          <span className="font-display text-lg font-extrabold tracking-[-0.02em] text-white">
            JIREH
          </span>
          <span className="h-1.5 w-1.5 bg-amber-400" aria-hidden />
          <span className="font-sans text-[9px] font-medium tracking-[0.25em] text-charcoal-300">
            CONTRACTOR
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-sm font-medium text-charcoal-200 transition-colors hover:text-amber-400"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contacto"
          className="hidden bg-amber-400 px-5 py-2.5 font-display text-sm font-bold uppercase tracking-wide text-charcoal-900 transition-colors hover:bg-amber-300 lg:inline-block"
        >
          {content.ctaLabel}
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="text-white lg:hidden"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-charcoal-700 bg-charcoal-900 px-5 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-3 py-3 font-display text-xl uppercase tracking-tight text-charcoal-100 hover:text-amber-400"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setMenuOpen(false)}
              className="mt-2 bg-amber-400 px-5 py-3 text-center font-display text-sm font-bold uppercase tracking-wide text-charcoal-900 hover:bg-amber-300"
            >
              {content.ctaLabel}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
