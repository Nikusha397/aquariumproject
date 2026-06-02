import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

/** AQUARIA brand mark — a rounded gradient emblem with stacked reef waves. */
export function Logo({
  className,
  withText = true,
}: {
  className?: string;
  withText?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 32 32"
        className="size-8 shrink-0"
        role="img"
        aria-label={siteConfig.name}
      >
        <defs>
          <linearGradient id="aq-logo" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="55%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>
        <rect x="1.5" y="1.5" width="29" height="29" rx="9" fill="url(#aq-logo)" />
        <g
          fill="none"
          stroke="#0b1220"
          strokeOpacity="0.85"
          strokeWidth="2.1"
          strokeLinecap="round"
        >
          <path d="M6 12.5c2.5-2.4 4.3-2.4 6.8 0 2.5 2.4 4.3 2.4 6.8 0 2.5-2.4 4.3-2.4 6.4 0" />
          <path d="M6 19.5c2.5-2.4 4.3-2.4 6.8 0 2.5 2.4 4.3 2.4 6.8 0 2.5-2.4 4.3-2.4 6.4 0" />
        </g>
      </svg>
      {withText && (
        <span className="font-display text-xl tracking-[0.18em] text-foreground">
          {siteConfig.name}
        </span>
      )}
    </span>
  );
}
