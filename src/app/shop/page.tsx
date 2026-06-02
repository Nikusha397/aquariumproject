import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { categories, getProductsByCategory } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop",
  description: "Saltwater fish, corals and equipment.",
};

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <Reveal>
        <p className="font-mono text-sm text-aqua">Shop</p>
        <h1 className="mt-2 font-heading text-4xl font-bold sm:text-5xl">
          All products
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Livestock is quarantined; equipment is sourced from trusted brands.
        </p>
      </Reveal>

      {/* category quick links */}
      <Reveal className="mt-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/shop/${cat.slug}`}
            className="rounded-full border bg-card/60 px-4 py-2 text-sm text-muted-foreground backdrop-blur transition-colors hover:border-aqua/50 hover:text-foreground"
          >
            {cat.name}
          </Link>
        ))}
      </Reveal>

      {categories.map((cat) => (
        <section key={cat.slug} className="mt-14">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="font-heading text-2xl font-bold">{cat.name}</h2>
            <Link
              href={`/shop/${cat.slug}`}
              className="text-sm text-aqua hover:underline"
            >
              View all
            </Link>
          </div>
          <Stagger className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {getProductsByCategory(cat.slug).map((product) => (
              <StaggerItem key={product.slug}>
                <ProductCard product={product} />
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      ))}
    </div>
  );
}
