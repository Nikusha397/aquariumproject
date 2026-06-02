"use client";

import Link from "next/link";
import { ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProductMedia } from "@/components/product-media";
import { useCart } from "@/context/cart";
import { formatPrice } from "@/lib/products";

export function CartSheet() {
  const { items, count, subtotal, open, setOpen, getLineProduct, setQty, remove } =
    useCart();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        aria-label="Cart"
        onClick={() => setOpen(true)}
      >
        <ShoppingBag className="size-5" />
        {count > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-coral text-[11px] font-semibold text-background">
            {count}
          </span>
        )}
      </Button>

      <SheetContent className="flex w-full flex-col gap-0 sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-heading text-xl">
            Cart {count > 0 && `(${count})`}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBag className="size-10 text-muted-foreground" />
            <p className="text-muted-foreground">Your cart is empty</p>
            <Button asChild variant="secondary" onClick={() => setOpen(false)}>
              <Link href="/shop">Go to shop</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              {items.map((line) => {
                const product = getLineProduct(line.slug);
                if (!product) return null;
                return (
                  <div key={line.slug} className="flex gap-3">
                    <Link
                      href={`/product/${product.slug}`}
                      onClick={() => setOpen(false)}
                      className="size-20 shrink-0 overflow-hidden rounded-lg"
                    >
                      <ProductMedia
                        product={product}
                        className="size-20"
                        sizes="240px"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-2">
                        <span className="font-medium leading-tight">
                          {product.name}
                        </span>
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
                      <div className="mt-auto flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="size-7"
                          onClick={() => setQty(line.slug, line.qty - 1)}
                          aria-label="Decrease"
                        >
                          <Minus className="size-3" />
                        </Button>
                        <span className="w-8 text-center font-mono text-sm">
                          {line.qty}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="size-7"
                          onClick={() => setQty(line.slug, line.qty + 1)}
                          aria-label="Increase"
                        >
                          <Plus className="size-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <Separator />
            <SheetFooter className="gap-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total</span>
                <span className="font-mono text-lg text-foreground">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button asChild variant="secondary" onClick={() => setOpen(false)}>
                  <Link href="/cart">Cart</Link>
                </Button>
                <Button asChild onClick={() => setOpen(false)}>
                  <Link href="/checkout">Checkout</Link>
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
