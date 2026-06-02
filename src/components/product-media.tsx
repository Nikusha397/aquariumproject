import Image from "next/image";
import { AquaImage } from "@/components/aqua-image";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

/**
 * Renders the product photo when `image` is set, otherwise a generated
 * aquarium placeholder. Swap to real photos by filling `image` in products.ts.
 */
export function ProductMedia({
  product,
  className,
  sizes,
}: {
  product: Pick<Product, "name" | "image" | "hue" | "motif">;
  className?: string;
  sizes?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-secondary", className)}>
      {product.image ? (
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes={sizes ?? "(max-width: 768px) 100vw, 33vw"}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
          <AquaImage hue={product.hue} motif={product.motif} />
        </div>
      )}
    </div>
  );
}
