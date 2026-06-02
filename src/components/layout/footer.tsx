import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { siteConfig, navLinks } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div className="space-y-3">
          <Link href="/" aria-label={siteConfig.name}>
            <span className="font-display text-xl tracking-[0.18em] text-foreground">
              {siteConfig.name}
            </span>
          </Link>
          <p className="max-w-xs text-sm text-muted-foreground">
            {siteConfig.description}
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-heading text-sm uppercase tracking-wider text-muted-foreground">
Navigation
          </h4>
          <ul className="space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-heading text-sm uppercase tracking-wider text-muted-foreground">
Contact
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <Mail className="size-4 text-aqua" /> {siteConfig.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <Phone className="size-4 text-aqua" /> {siteConfig.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-4 text-aqua" /> {siteConfig.address}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
