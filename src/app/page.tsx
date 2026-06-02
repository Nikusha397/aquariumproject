import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Droplets, ShieldCheck, Truck, Sparkles } from "lucide-react";
import { HomeShell } from "@/components/home-shell";
import { ProductCard } from "@/components/product-card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { categories, getFeaturedProducts } from "@/lib/products";

const steps = [
  {
    icon: Droplets,
    title: "Plan",
    text: "We size the tank, gear and livestock around your space and goals.",
  },
  {
    icon: ShieldCheck,
    title: "Quarantine",
    text: "Every fish and coral is screened, so what arrives is healthy.",
  },
  {
    icon: Truck,
    title: "Deliver & Install",
    text: "We set the system up on-site and cycle the water for stability.",
  },
  {
    icon: Sparkles,
    title: "Maintain",
    text: "Regular service keeps the reef thriving for years to come.",
  },
];

export default function HomePage() {
  const featured = getFeaturedProducts(8);

  return (
    <HomeShell>
      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Reveal className="mb-10 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-3xl font-bold sm:text-4xl">
              Categories
            </h2>
            <p className="mt-2 text-muted-foreground">
              Everything a complete reef needs.
            </p>
          </div>
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link href="/shop">
              View all <ArrowRight className="size-4" />
            </Link>
          </Button>
        </Reveal>

        <Stagger className="grid gap-5 md:grid-cols-3">
          {categories.map((cat) => (
            <StaggerItem key={cat.slug}>
              <Link
                href={`/shop/${cat.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-2xl border"
              >
                <Image
                  src={cat.image ?? ""}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/10" />
                <div className="absolute bottom-0 p-6">
                  <h3 className="font-heading text-2xl font-bold">{cat.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {cat.tagline}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm text-aqua">
                    Browse <ArrowRight className="size-4" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <Reveal className="mb-10">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            Popular products
          </h2>
          <p className="mt-2 text-muted-foreground">
            Selected livestock and gear, ready to order.
          </p>
        </Reveal>

        <Stagger className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <StaggerItem key={product.slug}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Reveal className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            How we work
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
            From planning to long-term care — one team, full service.
          </p>
        </Reveal>

        <Stagger className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <StaggerItem key={step.title}>
              <div className="h-full rounded-2xl border bg-card/60 p-6 backdrop-blur transition-colors hover:border-aqua/40">
                <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-aqua/10 text-aqua">
                  <step.icon className="size-5" />
                </div>
                <div className="font-mono text-xs text-muted-foreground">
                  0{i + 1}
                </div>
                <h3 className="mt-1 font-heading text-lg">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border p-10 text-center sm:p-16">
            <video
              className="absolute inset-0 -z-10 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="/categories/reef-care.jpg"
            >
              <source src="/video/hero-bg.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 -z-10 bg-background/70" />
            <h2 className="font-heading text-3xl font-bold sm:text-4xl">
              Ready for your own reef?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              Get in touch and we will design your perfect saltwater aquarium
              together.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="glow">
                <Link href="/contact">Contact us</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </HomeShell>
  );
}
