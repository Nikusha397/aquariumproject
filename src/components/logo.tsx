import Image from "next/image";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

/** AQUARIA brand mark — transparent fish icon + wordmark. */
export function Logo({
  className,
  withText = true,
}: {
  className?: string;
  withText?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Image
        src="/logo.png"
        alt={siteConfig.name}
        width={258}
        height={186}
        priority
        className="h-9 w-auto"
      />
      {withText && (
        <span className="font-display text-xl tracking-[0.18em] text-foreground">
          {siteConfig.name}
        </span>
      )}
    </span>
  );
}
