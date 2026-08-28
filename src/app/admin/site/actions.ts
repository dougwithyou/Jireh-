"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isSuperAdmin } from "@/lib/auth/session";
import { uploadSiteImage } from "@/lib/site-content/upload";
import { getSiteContent } from "@/lib/site-content/get";
import type {
  ServiceIconName,
  PortfolioIllustration,
  SiteContent,
  SiteContentSection,
} from "@/lib/site-content/types";

export type SiteEditorState = { error?: string; success?: boolean };

const SITE_ID = "jireh-contractor";

async function saveSection<K extends SiteContentSection>(
  section: K,
  value: SiteContent[K]
): Promise<SiteEditorState> {
  if (!(await isSuperAdmin())) return { error: "No autorizado." };

  const current = await getSiteContent();
  const next: SiteContent = { ...current, [section]: value };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("site_content")
    .upsert({ id: SITE_ID, content: next, updated_by: user?.id ?? null });

  if (error) return { error: `No se pudo guardar: ${error.message}` };

  revalidatePath("/");
  revalidatePath("/admin/site");
  return { success: true };
}

async function resolveImage(
  formData: FormData,
  fileField: string,
  currentUrlField: string,
  removeField: string,
  pathPrefix: string
): Promise<string | null> {
  const file = formData.get(fileField);
  if (file instanceof File && file.size > 0) {
    return uploadSiteImage(file, pathPrefix);
  }
  if (formData.get(removeField) === "on") return null;
  const current = formData.get(currentUrlField);
  return typeof current === "string" && current ? current : null;
}

function str(formData: FormData, field: string): string {
  return String(formData.get(field) ?? "").trim();
}

function num(formData: FormData, field: string): number {
  return Number(formData.get(field) ?? 0) || 0;
}

export async function updateHero(
  _prev: SiteEditorState,
  formData: FormData
): Promise<SiteEditorState> {
  try {
    const backgroundImageUrl = await resolveImage(
      formData,
      "backgroundImage",
      "currentBackgroundImageUrl",
      "removeBackgroundImage",
      "hero"
    );
    return saveSection("hero", {
      eyebrow: str(formData, "eyebrow"),
      headlineLine1: str(formData, "headlineLine1"),
      headlineLine2: str(formData, "headlineLine2"),
      subline: str(formData, "subline"),
      ctaPrimaryLabel: str(formData, "ctaPrimaryLabel"),
      ctaSecondaryLabel: str(formData, "ctaSecondaryLabel"),
      backgroundImageUrl,
    });
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Error al subir la imagen." };
  }
}

export async function updateTrustBar(
  _prev: SiteEditorState,
  formData: FormData
): Promise<SiteEditorState> {
  return saveSection("trustBar", {
    stat1Value: num(formData, "stat1Value"),
    stat1Suffix: str(formData, "stat1Suffix"),
    stat1Label: str(formData, "stat1Label"),
    stat2Value: num(formData, "stat2Value"),
    stat2Suffix: str(formData, "stat2Suffix"),
    stat2Label: str(formData, "stat2Label"),
    stat3Value: num(formData, "stat3Value"),
    stat3Suffix: str(formData, "stat3Suffix"),
    stat3Label: str(formData, "stat3Label"),
    stat4Value: str(formData, "stat4Value"),
    stat4Label: str(formData, "stat4Label"),
  });
}

export async function updateServices(
  _prev: SiteEditorState,
  formData: FormData
): Promise<SiteEditorState> {
  const count = num(formData, "itemCount");
  return saveSection("services", {
    eyebrow: str(formData, "eyebrow"),
    heading: str(formData, "heading"),
    intro: str(formData, "intro"),
    items: Array.from({ length: count }, (_, i) => ({
      title: str(formData, `item${i}Title`),
      description: str(formData, `item${i}Description`),
      iconName: str(formData, `item${i}Icon`) as ServiceIconName,
    })),
  });
}

export async function addServiceItem() {
  if (!(await isSuperAdmin())) return;
  const current = await getSiteContent();
  return saveSection("services", {
    ...current.services,
    items: [
      ...current.services.items,
      { title: "Nuevo servicio", description: "", iconName: "Settings" },
    ],
  });
}

export async function removeServiceItem(index: number) {
  if (!(await isSuperAdmin())) return;
  const current = await getSiteContent();
  return saveSection("services", {
    ...current.services,
    items: current.services.items.filter((_, i) => i !== index),
  });
}

export async function updatePortfolio(
  _prev: SiteEditorState,
  formData: FormData
): Promise<SiteEditorState> {
  try {
    const count = num(formData, "projectCount");
    const projects = await Promise.all(
      Array.from({ length: count }, (_, i) => i).map(async (i) => ({
        title: str(formData, `project${i}Title`),
        category: str(
          formData,
          `project${i}Category`
        ) as SiteContent["portfolio"]["projects"][number]["category"],
        illustrationVariant: str(
          formData,
          `project${i}Illustration`
        ) as PortfolioIllustration,
        imageUrl: await resolveImage(
          formData,
          `project${i}Image`,
          `project${i}CurrentImageUrl`,
          `project${i}RemoveImage`,
          `portfolio-${i}`
        ),
      }))
    );

    return saveSection("portfolio", {
      eyebrow: str(formData, "eyebrow"),
      heading: str(formData, "heading"),
      intro: str(formData, "intro"),
      projects,
    });
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Error al subir una imagen." };
  }
}

export async function addPortfolioItem() {
  if (!(await isSuperAdmin())) return;
  const current = await getSiteContent();
  return saveSection("portfolio", {
    ...current.portfolio,
    projects: [
      ...current.portfolio.projects,
      {
        title: "Nuevo proyecto",
        category: "Residencial",
        imageUrl: null,
        illustrationVariant: "skyline",
      },
    ],
  });
}

export async function removePortfolioItem(index: number) {
  if (!(await isSuperAdmin())) return;
  const current = await getSiteContent();
  return saveSection("portfolio", {
    ...current.portfolio,
    projects: current.portfolio.projects.filter((_, i) => i !== index),
  });
}

export async function updateProcess(
  _prev: SiteEditorState,
  formData: FormData
): Promise<SiteEditorState> {
  return saveSection("process", {
    eyebrow: str(formData, "eyebrow"),
    heading: str(formData, "heading"),
    phases: [0, 1, 2, 3, 4, 5].map((i) => ({
      title: str(formData, `phase${i}Title`),
      duration: str(formData, `phase${i}Duration`),
      description: str(formData, `phase${i}Description`),
    })) as SiteContent["process"]["phases"],
  });
}

export async function updateCommitment(
  _prev: SiteEditorState,
  formData: FormData
): Promise<SiteEditorState> {
  try {
    const imageUrl = await resolveImage(
      formData,
      "image",
      "currentImageUrl",
      "removeImage",
      "commitment"
    );
    return saveSection("commitment", {
      eyebrow: str(formData, "eyebrow"),
      heading: str(formData, "heading"),
      paragraph: str(formData, "paragraph"),
      imageUrl,
      points: [0, 1, 2, 3].map((i) => ({
        value: str(formData, `point${i}Value`),
        label: str(formData, `point${i}Label`),
      })) as SiteContent["commitment"]["points"],
    });
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Error al subir la imagen." };
  }
}

export async function updateAbout(
  _prev: SiteEditorState,
  formData: FormData
): Promise<SiteEditorState> {
  try {
    const imageUrl = await resolveImage(
      formData,
      "image",
      "currentImageUrl",
      "removeImage",
      "about"
    );
    return saveSection("about", {
      eyebrow: str(formData, "eyebrow"),
      heading: str(formData, "heading"),
      paragraph1: str(formData, "paragraph1"),
      paragraph2: str(formData, "paragraph2"),
      imageUrl,
    });
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Error al subir la imagen." };
  }
}

export async function updateTestimonials(
  _prev: SiteEditorState,
  formData: FormData
): Promise<SiteEditorState> {
  const count = num(formData, "itemCount");
  return saveSection("testimonials", {
    eyebrow: str(formData, "eyebrow"),
    heading: str(formData, "heading"),
    intro: str(formData, "intro"),
    items: Array.from({ length: count }, (_, i) => ({
      quote: str(formData, `item${i}Quote`),
      name: str(formData, `item${i}Name`),
      location: str(formData, `item${i}Location`),
    })),
  });
}

export async function addTestimonialItem() {
  if (!(await isSuperAdmin())) return;
  const current = await getSiteContent();
  return saveSection("testimonials", {
    ...current.testimonials,
    items: [
      ...current.testimonials.items,
      { quote: "[Nueva reseña]", name: "[Nombre del cliente]", location: "[Ciudad, Virginia]" },
    ],
  });
}

export async function removeTestimonialItem(index: number) {
  if (!(await isSuperAdmin())) return;
  const current = await getSiteContent();
  return saveSection("testimonials", {
    ...current.testimonials,
    items: current.testimonials.items.filter((_, i) => i !== index),
  });
}

export async function updateBidCta(
  _prev: SiteEditorState,
  formData: FormData
): Promise<SiteEditorState> {
  return saveSection("bidCta", {
    headlineLine1: str(formData, "headlineLine1"),
    headlineLine2: str(formData, "headlineLine2"),
    paragraph: str(formData, "paragraph"),
    buttonLabel: str(formData, "buttonLabel"),
  });
}

export async function updateContact(
  _prev: SiteEditorState,
  formData: FormData
): Promise<SiteEditorState> {
  return saveSection("contact", {
    eyebrow: str(formData, "eyebrow"),
    heading: str(formData, "heading"),
    paragraph: str(formData, "paragraph"),
  });
}

export async function updateNav(
  _prev: SiteEditorState,
  formData: FormData
): Promise<SiteEditorState> {
  return saveSection("nav", {
    inicioLabel: str(formData, "inicioLabel"),
    serviciosLabel: str(formData, "serviciosLabel"),
    proyectosLabel: str(formData, "proyectosLabel"),
    procesoLabel: str(formData, "procesoLabel"),
    nosotrosLabel: str(formData, "nosotrosLabel"),
    contactoLabel: str(formData, "contactoLabel"),
    ctaLabel: str(formData, "ctaLabel"),
  });
}

export async function updateNotifications(
  _prev: SiteEditorState,
  formData: FormData
): Promise<SiteEditorState> {
  return saveSection("notifications", {
    notificationEmail: str(formData, "notificationEmail"),
  });
}

export async function updateFooter(
  _prev: SiteEditorState,
  formData: FormData
): Promise<SiteEditorState> {
  return saveSection("footer", {
    description: str(formData, "description"),
    phone: str(formData, "phone"),
    email: str(formData, "email"),
    address: str(formData, "address"),
    facebookUrl: str(formData, "facebookUrl"),
    instagramUrl: str(formData, "instagramUrl"),
  });
}
