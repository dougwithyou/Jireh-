import { NextResponse, type NextRequest } from "next/server";
import { getSiteContent } from "@/lib/site-content/get";

type ContactPayload = {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  city: string;
  message: string;
};

const projectTypeLabels: Record<string, string> = {
  "vivienda-nueva": "Construcción de vivienda desde cero",
  remodelacion: "Remodelación residencial",
  comercial: "Proyecto comercial",
  otro: "Otro",
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function validate(body: unknown): ContactPayload | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;
  if (
    !isNonEmptyString(b.name) ||
    !isNonEmptyString(b.phone) ||
    !isNonEmptyString(b.email) ||
    !isNonEmptyString(b.projectType) ||
    !isNonEmptyString(b.city) ||
    !isNonEmptyString(b.message)
  ) {
    return null;
  }
  return {
    name: b.name.trim(),
    phone: b.phone.trim(),
    email: b.email.trim(),
    projectType: b.projectType.trim(),
    city: b.city.trim(),
    message: b.message.trim(),
  };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const payload = validate(body);

  if (!payload) {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY no está configurada.");
    return NextResponse.json(
      { error: "El envío de notificaciones no está configurado todavía." },
      { status: 503 }
    );
  }

  const content = await getSiteContent();
  const to = content.notifications.notificationEmail;
  const projectTypeLabel = projectTypeLabels[payload.projectType] ?? payload.projectType;

  const html = `
    <h2>Nueva solicitud de presupuesto — Jireh Contractor</h2>
    <p><strong>Nombre:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Teléfono:</strong> ${escapeHtml(payload.phone)}</p>
    <p><strong>Correo:</strong> ${escapeHtml(payload.email)}</p>
    <p><strong>Ciudad / Zona:</strong> ${escapeHtml(payload.city)}</p>
    <p><strong>Tipo de proyecto:</strong> ${escapeHtml(projectTypeLabel)}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${escapeHtml(payload.message).replace(/\n/g, "<br>")}</p>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Jireh Contractor <onboarding@resend.com>",
      to: [to],
      reply_to: payload.email,
      subject: `Nueva solicitud de presupuesto — ${payload.name}`,
      html,
    }),
  });

  if (!res.ok) {
    const errorBody = await res.text().catch(() => "");
    console.error("Resend error:", res.status, errorBody);
    return NextResponse.json(
      { error: "No se pudo enviar la notificación." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
