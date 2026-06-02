"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart";
import { getProduct } from "@/lib/products";
import { cn } from "@/lib/utils";

export function AddToCart({
  slug,
  qty = 1,
  className,
  size = "default",
  full = false,
  openOnAdd = false,
  label = "Add to cart",
}: {
  slug: string;
  qty?: number;
  className?: string;
  size?: "sm" | "default" | "lg" | "icon";
  full?: boolean;
  openOnAdd?: boolean;
  label?: string;
}) {
  const { add, setOpen } = useCart();
  const product = getProduct(slug);
  const disabled = !product || !product.inStock;

  function handleAdd() {
    if (!product) return;
    add(slug, qty);
    if (openOnAdd) setOpen(true);
  }

  if (size === "icon") {
    return (
      <Button
        type="button"
        size="icon"
        onClick={handleAdd}
        disabled={disabled}
        aria-label={label}
        className={cn("rounded-full", className)}
      >
        <ShoppingBag className="size-4" />
      </Button>
    );
  }

  return (
    <Button
      type="button"
      size={size}
      onClick={handleAdd}
      disabled={disabled}
      className={cn(full && "w-full", className)}
    >
      {disabled ? (
        "Out of stock"
      ) : (
        <>
          <ShoppingBag className="size-4" /> {label}
        </>
      )}
    </Button>
  );
}
