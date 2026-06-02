"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, CreditCard, Lock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/cart";
import { formatPrice } from "@/lib/products";

export default function CheckoutPage() {
  const { items, subtotal, count, getLineProduct, clear } = useCart();
  const [placed, setPlaced] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPlaced(true);
    clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (placed) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-28 text-center">
        <CheckCircle2 className="size-14 text-aqua" />
        <h1 className="font-heading text-3xl font-bold">Order received!</h1>
        <p className="text-muted-foreground">
          Thanks for your order. We will contact you to confirm the details.
          (Demo mode — no payment was processed.)
        </p>
        <Button asChild size="lg" className="glow">
          <Link href="/shop">Back to shop</Link>
        </Button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-28 text-center">
        <h1 className="font-heading text-2xl font-bold">Your cart is empty</h1>
        <p className="text-muted-foreground">
          Add products first to continue to checkout.
        </p>
        <Button asChild size="lg">
          <Link href="/shop">Go to shop</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <Link
        href="/cart"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Cart
      </Link>
      <h1 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">
        Checkout
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]"
      >
        <div className="space-y-8">
          {/* contact + delivery */}
          <fieldset className="rounded-2xl border bg-card/50 p-6 backdrop-blur">
            <legend className="px-2 font-heading text-lg">
              Contact & delivery
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" required placeholder="John Doe" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" required type="tel" placeholder="+995 5xx xx xx xx" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" required type="email" placeholder="you@mail.com" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="city">City</Label>
                <Input id="city" required placeholder="Tbilisi" />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" required placeholder="Street, number, apt" />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea id="notes" placeholder="Additional instructions..." />
              </div>
            </div>
          </fieldset>

          {/* payment — visual only */}
          <fieldset className="relative overflow-hidden rounded-2xl border bg-card/50 p-6 backdrop-blur">
            <legend className="flex items-center gap-2 px-2 font-heading text-lg">
              <CreditCard className="size-4 text-aqua" /> Payment
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <Label>Card number</Label>
                <Input placeholder="0000 0000 0000 0000" disabled />
              </div>
              <div className="space-y-1.5">
                <Label>Expiry</Label>
                <Input placeholder="MM / YY" disabled />
              </div>
              <div className="space-y-1.5">
                <Label>CVC</Label>
                <Input placeholder="123" disabled />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-dashed bg-background/40 p-3 text-sm text-muted-foreground">
              <Lock className="size-4 text-aqua" />
              Online payment is coming soon — we will contact you after you place
              the order.
            </div>
          </fieldset>
        </div>

        {/* summary */}
        <aside className="h-fit rounded-2xl border bg-card/60 p-6 backdrop-blur lg:sticky lg:top-24">
          <h2 className="font-heading text-xl">Order ({count})</h2>
          <Separator className="my-4" />
          <ul className="space-y-3 text-sm">
            {items.map((line) => {
              const product = getLineProduct(line.slug);
              if (!product) return null;
              return (
                <li key={line.slug} className="flex justify-between gap-2">
                  <span className="text-muted-foreground">
                    {product.name} × {line.qty}
                  </span>
                  <span className="font-mono">
                    {formatPrice(product.price * line.qty)}
                  </span>
                </li>
              );
            })}
          </ul>
          <Separator className="my-4" />
          <div className="flex justify-between text-lg">
            <span>Total</span>
            <span className="font-mono text-aqua">{formatPrice(subtotal)}</span>
          </div>
          <Button type="submit" size="lg" className="glow mt-6 w-full">
            Place order
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Demo mode — no real payment is taken.
          </p>
        </aside>
      </form>
    </div>
  );
}
