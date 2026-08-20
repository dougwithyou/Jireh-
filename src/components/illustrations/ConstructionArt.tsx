/**
 * Ilustraciones vectoriales referenciales con temática de construcción.
 * Se usan como reemplazo temporal de fotografía real mientras el cliente
 * entrega las fotos de sus proyectos (ver Portfolio.tsx y Hero.tsx).
 * No requieren imágenes externas, así que no hay riesgo de enlaces rotos.
 */

export type ConstructionVariant =
  | "skyline"
  | "house-frame"
  | "blueprint"
  | "renovation"
  | "commercial"
  | "interior";

const gradients: Record<string, [string, string]> = {
  navy: ["#1b3352", "#0a1220"],
  terracotta: ["#e28347", "#b25121"],
};

function Sky({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`sky-${id}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#23456d" />
        <stop offset="100%" stopColor="#0a1220" />
      </linearGradient>
      <linearGradient id={`accent-${id}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={gradients.terracotta[0]} />
        <stop offset="100%" stopColor={gradients.terracotta[1]} />
      </linearGradient>
    </defs>
  );
}

function Skyline({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" preserveAspectRatio="xMidYMax slice">
      <Sky id={id} />
      <rect width="400" height="300" fill={`url(#sky-${id})`} />
      <g opacity="0.9">
        <rect x="30" y="150" width="46" height="130" fill="#152840" />
        <rect x="86" y="110" width="40" height="170" fill="#1b3352" />
        <rect x="136" y="170" width="36" height="110" fill="#152840" />
        <rect x="230" y="90" width="50" height="190" fill="#1b3352" />
        <rect x="290" y="140" width="42" height="140" fill="#152840" />
        <rect x="340" y="180" width="34" height="100" fill="#1b3352" />
        {Array.from({ length: 6 }).map((_, row) =>
          Array.from({ length: 3 }).map((_, col) => (
            <rect
              key={`w-${row}-${col}`}
              x={238 + col * 14}
              y={104 + row * 24}
              width="8"
              height="12"
              fill="#e28347"
              opacity={0.5}
            />
          ))
        )}
      </g>
      {/* Grúa de construcción */}
      <g stroke="#e28347" strokeWidth="3" fill="none" strokeLinecap="round">
        <line x1="180" y1="280" x2="180" y2="40" />
        <line x1="180" y1="40" x2="330" y2="55" />
        <line x1="180" y1="40" x2="150" y2="60" />
        <line x1="180" y1="70" x2="245" y2="47" />
        <line x1="245" y1="47" x2="245" y2="110" />
      </g>
      <rect x="150" y="270" width="60" height="10" fill="#152840" />
    </svg>
  );
}

function HouseFrame({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" preserveAspectRatio="xMidYMax slice">
      <Sky id={id} />
      <rect width="400" height="300" fill={`url(#sky-${id})`} />
      <g stroke="#f5c8a8" strokeWidth="4" fill="none" strokeLinejoin="round">
        <polygon points="60,190 200,90 340,190" />
        <line x1="60" y1="190" x2="60" y2="270" />
        <line x1="340" y1="190" x2="340" y2="270" />
        <line x1="60" y1="270" x2="340" y2="270" />
        <line x1="200" y1="90" x2="200" y2="270" />
        <line x1="130" y1="140" x2="130" y2="270" />
        <line x1="270" y1="140" x2="270" y2="270" />
        <line x1="90" y1="270" x2="90" y2="200" />
        <line x1="310" y1="270" x2="310" y2="200" />
      </g>
      <rect x="170" y="210" width="60" height="60" fill="url(#accent-navy)" opacity="0" />
      <rect x="170" y="200" width="60" height="70" fill="#e28347" opacity="0.85" />
    </svg>
  );
}

function Blueprint({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id={`grid-${id}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2a5686" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="400" height="300" fill="#152840" />
      <rect width="400" height="300" fill={`url(#grid-${id})`} />
      <g stroke="#f2f6fa" strokeWidth="2" fill="none">
        <rect x="60" y="60" width="200" height="140" />
        <line x1="160" y1="60" x2="160" y2="200" />
        <line x1="60" y1="130" x2="260" y2="130" />
        <circle cx="300" cy="90" r="26" />
        <line x1="300" y1="64" x2="300" y2="116" />
        <line x1="274" y1="90" x2="326" y2="90" />
      </g>
      <g stroke="#e28347" strokeWidth="2" strokeDasharray="6 4" fill="none">
        <line x1="60" y1="220" x2="260" y2="220" />
        <line x1="60" y1="215" x2="60" y2="225" />
        <line x1="260" y1="215" x2="260" y2="225" />
      </g>
    </svg>
  );
}

function Renovation({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" preserveAspectRatio="xMidYMax slice">
      <Sky id={id} />
      <rect width="400" height="300" fill="#1b3352" />
      <rect x="0" y="0" width="200" height="300" fill="#101d30" />
      <g stroke="#93b6d4" strokeWidth="3" fill="none">
        <line x1="230" y1="30" x2="230" y2="270" />
        <line x1="270" y1="30" x2="270" y2="270" />
      </g>
      {/* escalera */}
      <g stroke="#f5c8a8" strokeWidth="4" fill="none" strokeLinecap="round">
        <line x1="100" y1="270" x2="140" y2="90" />
        <line x1="150" y1="270" x2="190" y2="90" />
        {Array.from({ length: 6 }).map((_, i) => (
          <line
            key={i}
            x1={100 + i * 8}
            y1={260 - i * 30}
            x2={150 + i * 8}
            y2={260 - i * 30}
          />
        ))}
      </g>
      {/* rodillo de pintura */}
      <g stroke="#e28347" strokeWidth="5" strokeLinecap="round">
        <line x1="290" y1="150" x2="330" y2="110" />
      </g>
      <rect x="325" y="95" width="34" height="20" rx="4" fill="#e28347" />
    </svg>
  );
}

function Commercial({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" preserveAspectRatio="xMidYMax slice">
      <Sky id={id} />
      <rect width="400" height="300" fill={`url(#sky-${id})`} />
      <rect x="80" y="60" width="240" height="220" fill="#152840" />
      {Array.from({ length: 7 }).map((_, row) =>
        Array.from({ length: 8 }).map((_, col) => (
          <rect
            key={`${row}-${col}`}
            x={94 + col * 27}
            y={76 + row * 27}
            width="18"
            height="18"
            fill={(row + col) % 3 === 0 ? "#e28347" : "#3970a1"}
            opacity={(row + col) % 3 === 0 ? 0.8 : 0.5}
          />
        ))
      )}
      <rect x="170" y="240" width="60" height="40" fill="#0a1220" />
    </svg>
  );
}

function Interior() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" preserveAspectRatio="xMidYMax slice">
      <rect width="400" height="300" fill="#f2f6fa" />
      <rect x="0" y="180" width="400" height="120" fill="#e2eaf3" />
      <rect x="40" y="40" width="150" height="140" fill="#c3d6e8" opacity="0.6" />
      <rect x="220" y="70" width="140" height="110" fill="#1b3352" opacity="0.9" />
      <rect x="250" y="100" width="80" height="50" fill="#e28347" opacity="0.85" />
      <g stroke="#23456d" strokeWidth="3">
        <line x1="40" y1="180" x2="360" y2="180" />
      </g>
      {/* caja de herramientas */}
      <rect x="60" y="200" width="70" height="40" rx="4" fill="#d0672c" />
      <rect x="80" y="188" width="30" height="16" rx="3" fill="#d0672c" />
    </svg>
  );
}

const registry: Record<ConstructionVariant, (props: { id: string }) => React.ReactElement> = {
  skyline: Skyline,
  "house-frame": HouseFrame,
  blueprint: Blueprint,
  renovation: Renovation,
  commercial: Commercial,
  interior: Interior,
};

export default function ConstructionArt({
  variant,
  id,
  className = "",
}: {
  variant: ConstructionVariant;
  id: string;
  className?: string;
}) {
  const Art = registry[variant];
  return (
    <div className={className} aria-hidden="true">
      <Art id={id} />
    </div>
  );
}
