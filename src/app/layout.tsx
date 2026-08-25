import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const siteUrl = "https://jirehcontractor.com";
const siteTitle = "Jireh Contractor | Construcción y Remodelación en Virginia";
const siteDescription =
  "Jireh Contractor: 20 años construyendo con confianza en Virginia. Construcción de vivienda desde cero, remodelaciones residenciales y proyectos comerciales.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "contractor Virginia",
    "construcción Virginia",
    "remodelación residencial",
    "construcción comercial",
    "Jireh Contractor",
  ],
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Jireh Contractor",
    locale: "es_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-charcoal-900">
        {children}
      </body>
    </html>
  );
}
