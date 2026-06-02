"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart";
import { getProduct, formatPrice } from "@/lib/products";

export function ProductBuy({ slug }: { slug: string }) {
  const [qty, setQty] = useState(1);
  const { add, setOpen } = useCart();
  const product = getProduct(slug);
  if (!product) return null;

  function handleAdd() {
    if (!product) return;
    add(slug, qty);
    setOpen(true);
  }

  if (!product.inStock) {
    return (
      <Button size="lg" disabled className="w-full sm:w-auto">
        Currently out of stock
      </Button>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center rounded-full border bg-card/60">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          aria-label="Decrease"
        >
          <Minus className="size-4" />
        </Button>
        <span className="w-10 text-center font-mono">{qty}</span>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => setQty((q) => q + 1)}
          aria-label="Increase"
        >
          <Plus className="size-4" />
        </Button>
      </div>
      <Button size="lg" className="glow flex-1 sm:flex-none" onClick={handleAdd}>
        <ShoppingBag className="size-4" /> Add to cart ·{" "}
        {formatPrice(product.price * qty)}
      </Button>
    </div>
  );
}
