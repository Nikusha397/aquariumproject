import type { Metadata } from "next";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/products";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Aquarium setup and maintenance service packages.",
};

const packages = [
  {
    name: "Nano Reef",
    price: 1500,
    tagline: "A compact system for small spaces",
    features: [
      "30–60 L aquarium",
      "Filtration + LED lighting",
      "Cycling and water prep",
      "2 fish + starter corals",
      "1 month of support",
    ],
    featured: false,
  },
  {
    name: "Standard Reef",
    price: 3500,
    tagline: "Our most popular full package",
    features: [
      "120–200 L aquarium + sump",
      "Protein skimmer + circulation",
      "Programmable LED lighting",
      "5 fish + LPS corals",
      "On-site installation",
      "3 months of support",
    ],
    featured: true,
  },
  {
    name: "Premium Reef",
    price: 7500,
    tagline: "A maximal system with automation",
    features: [
      "300+ L custom aquarium",
      "Full automation (dosing, ATO)",
      "High-end LED + controller",
      "Hand-picked fish + SPS/LPS",
      "Premium install and design",
      "6 months of support",
    ],
    featured: false,
  },
];

const maintenance = [
  { name: "Monthly care", price: 60, note: "1 visit / month" },
  { name: "Bi-weekly care", price: 110, note: "2 visits / month" },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <Reveal className="text-center">
        <p className="font-mono text-sm text-aqua">Pricing</p>
        <h1 className="mt-2 font-heading text-4xl font-bold sm:text-5xl">
          Service packages
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Transparent pricing for aquarium setup. Every package is tailored to
          you.
        </p>
      </Reveal>

      <Stagger className="mt-12 grid gap-6 lg:grid-cols-3">
        {packages.map((pkg) => (
          <StaggerItem key={pkg.name}>
            <div
              className={cn(
                "relative flex h-full flex-col rounded-3xl border bg-card/60 p-8 backdrop-blur",
                pkg.featured && "border-aqua/50 glow",
              )}
            >
              {pkg.featured && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-coral text-background">
                  <Sparkles className="size-3" /> Popular
                </Badge>
              )}
              <h3 className="font-heading text-2xl font-bold">{pkg.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {pkg.tagline}
              </p>
              <div className="mt-5 font-mono text-3xl text-aqua">
                {formatPrice(pkg.price)}
                <span className="text-base text-muted-foreground"> from</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-aqua" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className={cn("mt-8 w-full", pkg.featured && "glow")}
                variant={pkg.featured ? "default" : "secondary"}
              >
                <Link href="/contact">Order</Link>
              </Button>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="mt-16">
        <div className="rounded-3xl border bg-card/40 p-8">
          <h2 className="font-heading text-2xl font-bold">Maintenance plans</h2>
          <p className="mt-1 text-muted-foreground">
            Regular service to keep your water and livestock healthy.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {maintenance.map((m) => (
              <div
                key={m.name}
                className="flex items-center justify-between rounded-2xl border bg-background/40 p-5"
              >
                <div>
                  <div className="font-medium">{m.name}</div>
                  <div className="text-sm text-muted-foreground">{m.note}</div>
                </div>
                <div className="font-mono text-xl text-aqua">
                  {formatPrice(m.price)}
                  <span className="text-sm text-muted-foreground">/mo</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
