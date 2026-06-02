import { cn } from "@/lib/utils";
import type { Motif } from "@/lib/products";

const motifPaths: Record<Motif, string> = {
  // Stylized silhouettes drawn in a 0–100 viewBox space.
  fish: "M20 50 C35 30 60 30 75 42 L88 32 L84 50 L88 68 L75 58 C60 70 35 70 20 50 Z M70 46 a2.5 2.5 0 1 0 0.1 0 Z",
  coral: "M50 92 V60 M50 70 C40 64 38 50 44 40 M50 66 C60 60 64 46 58 36 M50 60 C50 46 50 36 50 26 M44 40 C40 36 40 30 44 26 M58 36 C62 32 62 26 58 22 M50 26 C46 22 46 16 50 12 C54 16 54 22 50 26",
  shell: "M50 22 C72 22 86 42 84 64 C72 60 62 60 50 64 C38 60 28 60 16 64 C14 42 28 22 50 22 Z M50 30 V62 M40 31 L34 60 M60 31 L66 60",
  light:
    "M50 16 V26 M50 74 V84 M16 50 H26 M74 50 H84 M27 27 L34 34 M73 27 L66 34 M27 73 L34 66 M73 73 L66 66 M50 34 a16 16 0 1 0 0.1 0 Z",
  pump: "M50 28 a22 22 0 1 0 0.1 0 Z M50 40 a10 10 0 1 0 0.1 0 Z M50 30 L54 44 M50 30 L46 44 M70 50 L56 54 M70 50 L56 46 M50 70 L46 56 M50 70 L54 56 M30 50 L44 46 M30 50 L44 54",
  wave: "M8 56 C20 44 28 44 40 56 C52 68 60 68 72 56 C84 44 92 44 92 56 M8 40 C20 28 28 28 40 40 C52 52 60 52 72 40 C84 28 92 28 92 40",
};

export function AquaImage({
  hue,
  motif,
  className,
  bubbles = true,
}: {
  hue: number;
  motif: Motif;
  className?: string;
  bubbles?: boolean;
}) {
  const id = `${motif}-${Math.round(hue)}`;
  const deep = `hsl(${hue} 65% 12%)`;
  const mid = `hsl(${hue} 60% 22%)`;
  const accent = `hsl(${hue} 85% 62%)`;
  const filled = motif === "coral" || motif === "pump" || motif === "light";

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", className)}
      role="img"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={mid} />
          <stop offset="100%" stopColor={deep} />
        </linearGradient>
        <radialGradient id={`light-${id}`} cx="30%" cy="0%" r="90%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
          <stop offset="60%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="100" height="100" fill={`url(#bg-${id})`} />
      <rect width="100" height="100" fill={`url(#light-${id})`} />

      {/* caustic light streaks */}
      <g stroke="white" strokeOpacity="0.07" strokeWidth="1.2" fill="none">
        <path d="M-10 30 C20 20 40 40 70 28 100 18 110 34 130 26" />
        <path d="M-10 58 C20 48 40 68 70 56 100 46 110 62 130 54" />
      </g>

      {/* motif silhouette */}
      <g
        className="animate-float-slow"
        style={{ transformOrigin: "center" }}
        transform="translate(0 4)"
      >
        <path
          d={motifPaths[motif]}
          fill={filled ? "none" : accent}
          fillOpacity={filled ? 0 : 0.85}
          stroke={accent}
          strokeOpacity="0.9"
          strokeWidth={filled ? 2.2 : 0.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* bubbles */}
      {bubbles && (
        <g fill="white" fillOpacity="0.5">
          <circle cx="22" cy="74" r="1.6" className="animate-float" />
          <circle cx="80" cy="66" r="1.1" className="animate-float-slow" />
          <circle cx="64" cy="82" r="0.9" className="animate-float" />
        </g>
      )}
    </svg>
  );
}
