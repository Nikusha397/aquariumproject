import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { ProductMedia } from "@/components/product-media";
import { ProductBuy } from "@/components/product-buy";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import {
  products,
  getProduct,
  getCategory,
  getProductsByCategory,
  formatPrice,
} from "@/lib/products";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return {
    title: product ? product.name : "Product",
    description: product?.short,
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getProductsByCategory(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <Link
        href={category ? `/shop/${category.slug}` : "/shop"}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> {category?.name ?? "Shop"}
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <Reveal>
          <div className="relative aspect-square overflow-hidden rounded-3xl border glow-soft">
            <ProductMedia
              product={product}
              className="absolute inset-0"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col">
          <div className="flex items-center gap-2">
            {product.badge && (
              <Badge className="bg-coral text-background">{product.badge}</Badge>
            )}
            {product.inStock ? (
              <span className="inline-flex items-center gap-1 text-sm text-aqua">
                <Check className="size-4" /> In stock
              </span>
            ) : (
              <span className="text-sm text-muted-foreground">
                Sold out
              </span>
            )}
          </div>

          <h1 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-2 font-mono text-2xl text-aqua">
            {formatPrice(product.price)}
          </p>
          <p className="mt-4 text-muted-foreground">{product.description}</p>

          <div className="mt-6">
            <ProductBuy slug={product.slug} />
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-3">
            {product.specs.map((spec) => (
              <div
                key={spec.label}
                className="rounded-xl border bg-card/50 p-4 backdrop-blur"
              >
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                  {spec.label}
                </dt>
                <dd className="mt-1 font-medium">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-6 font-heading text-2xl font-bold">
Related products
          </h2>
          <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
