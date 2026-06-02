"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { ProductMedia } from "@/components/product-media";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/cart";
import { formatPrice } from "@/lib/products";

export default function CartPage() {
  const { items, subtotal, count, getLineProduct, setQty, remove, clear } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-28 text-center">
        <ShoppingBag className="size-12 text-muted-foreground" />
        <h1 className="font-heading text-2xl font-bold">Your cart is empty</h1>
        <p className="text-muted-foreground">
          Add products from the shop to start your order.
        </p>
        <Button asChild size="lg" className="glow">
          <Link href="/shop">Go to shop</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="flex items-end justify-between">
        <h1 className="font-heading text-3xl font-bold sm:text-4xl">
          Cart <span className="text-muted-foreground">({count})</span>
        </h1>
        <button
          onClick={clear}
          className="text-sm text-muted-foreground transition-colors hover:text-destructive"
        >
          Clear
        </button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-4">
          {items.map((line) => {
            const product = getLineProduct(line.slug);
            if (!product) return null;
            return (
              <div
                key={line.slug}
                className="flex gap-4 rounded-2xl border bg-card/50 p-4 backdrop-blur"
              >
                <Link
                  href={`/product/${product.slug}`}
                  className="size-24 shrink-0 overflow-hidden rounded-xl"
                >
                  <ProductMedia
                    product={product}
                    className="size-24"
                    sizes="240px"
                  />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-3">
                    <Link
                      href={`/product/${product.slug}`}
                      className="font-heading text-lg hover:text-aqua"
                    >
                      {product.name}
                    </Link>
                    <button
                      onClick={() => remove(line.slug)}
                      aria-label="Remove"
                      className="text-muted-foreground transition-colors hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                  <span className="font-mono text-sm text-aqua">
                    {formatPrice(product.price)}
                  </span>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center rounded-full border">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 rounded-full"
                        onClick={() => setQty(line.slug, line.qty - 1)}
                        aria-label="Decrease"
                      >
                        <Minus className="size-3.5" />
                      </Button>
                      <span className="w-9 text-center font-mono text-sm">
                        {line.qty}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 rounded-full"
                        onClick={() => setQty(line.slug, line.qty + 1)}
                        aria-label="Increase"
                      >
                        <Plus className="size-3.5" />
                      </Button>
                    </div>
                    <span className="font-mono text-foreground">
                      {formatPrice(product.price * line.qty)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <aside className="h-fit rounded-2xl border bg-card/60 p-6 backdrop-blur lg:sticky lg:top-24">
          <h2 className="font-heading text-xl">Order summary</h2>
          <Separator className="my-4" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Items ({count})</span>
              <span className="font-mono">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery</span>
              <span className="text-muted-foreground">Calculated later</span>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between text-lg">
            <span>Total</span>
            <span className="font-mono text-aqua">{formatPrice(subtotal)}</span>
          </div>
          <Button asChild size="lg" className="glow mt-6 w-full">
            <Link href="/checkout">
              Checkout <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="ghost" className="mt-2 w-full">
            <Link href="/shop">Continue shopping</Link>
          </Button>
        </aside>
      </div>
    </div>
  );
}
