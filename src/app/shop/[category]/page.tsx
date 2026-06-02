import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, PackagePlus } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import {
  categories,
  getCategory,
  getProductsByCategory,
} from "@/lib/products";

type Params = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: Params): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  return {
    title: cat ? cat.name : "Category",
    description: cat?.description,
  };
}

export default async function CategoryPage({ params }: Params) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const products = getProductsByCategory(cat.slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <Reveal>
        <Link
          href="/shop"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Shop
        </Link>
        <h1 className="mt-3 font-heading text-4xl font-bold sm:text-5xl">
          {cat.name}
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">{cat.description}</p>
      </Reveal>

      {products.length > 0 ? (
        <Stagger className="mt-10 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <StaggerItem key={product.slug}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </Stagger>
      ) : (
        <Reveal className="mt-10">
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed bg-card/40 p-16 text-center">
            <PackagePlus className="size-10 text-aqua" />
            <h2 className="font-heading text-xl">Products coming soon</h2>
            <p className="max-w-sm text-muted-foreground">
              This category is being stocked. Get in touch about availability.
            </p>
            <Link
              href="/contact"
              className="mt-2 text-sm text-aqua hover:underline"
            >
              Contact us →
            </Link>
          </div>
        </Reveal>
      )}
    </div>
  );
}
