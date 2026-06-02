"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "@/components/motion";
import { siteConfig } from "@/lib/site";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Website inquiry — ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    );
    // Opens the visitor's email client addressed to the shop.
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  }

  const contacts = [
    {
      icon: Mail,
      label: "Email",
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: siteConfig.phone,
      href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
    },
    { icon: MapPin, label: "Address", value: siteConfig.address },
    { icon: Clock, label: "Hours", value: "Mon–Sat · 10:00–19:00" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <Reveal className="text-center">
        <p className="font-mono text-sm text-aqua">Contact</p>
        <h1 className="mt-2 font-heading text-4xl font-bold sm:text-5xl">
          Get in touch
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Questions about a tank, a specific fish or a full build? Send us a
          message — we are happy to help.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_22rem]">
        <Reveal className="h-full">
          <form
            onSubmit={handleSubmit}
            className="flex h-full flex-col gap-4 rounded-2xl border bg-card/50 p-6 backdrop-blur sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@mail.com"
                />
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="How can we help?"
                className="min-h-40 flex-1"
              />
            </div>
            <Button type="submit" size="lg" className="glow w-full sm:w-auto">
              <Send className="size-4" /> Send
            </Button>
          </form>
        </Reveal>

        <Reveal delay={0.1} className="space-y-3">
          {contacts.map((c) => {
            const inner = (
              <div className="flex items-start gap-3 rounded-2xl border bg-card/50 p-5 backdrop-blur transition-colors hover:border-aqua/40">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-aqua/10 text-aqua">
                  <c.icon className="size-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">
                    {c.label}
                  </div>
                  <div className="mt-0.5 font-medium">{c.value}</div>
                </div>
              </div>
            );
            return c.href ? (
              <a key={c.label} href={c.href} className="block">
                {inner}
              </a>
            ) : (
              <div key={c.label}>{inner}</div>
            );
          })}
        </Reveal>
      </div>
    </div>
  );
}
