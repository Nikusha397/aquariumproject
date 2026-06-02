import Link from "next/link";
import { ProductMedia } from "@/components/product-media";
import { AddToCart } from "@/components/add-to-cart";
import { Badge } from "@/components/ui/badge";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card/60 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:glow">
      <Link
        href={`/product/${product.slug}`}
        className="flex flex-1 flex-col focus:outline-none"
      >
        <div className="relative aspect-[4/3] w-full">
          <ProductMedia
            product={product}
            className="absolute inset-0"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {product.badge && (
            <Badge className="absolute left-3 top-3 bg-coral text-background">
              {product.badge}
            </Badge>
          )}
          {!product.inStock && (
            <Badge
              variant="secondary"
              className="absolute right-3 top-3 backdrop-blur"
            >
              Sold out
            </Badge>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-1.5 p-4">
          <h3 className="font-heading text-lg leading-tight">{product.name}</h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {product.short}
          </p>
          <p className="mt-auto pt-3 font-mono text-lg text-aqua">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>

      <div className="flex items-center gap-2 px-4 pb-4">
        <AddToCart slug={product.slug} full size="sm" />
      </div>
    </div>
  );
}
