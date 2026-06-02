"use client";

import { useIntro } from "@/context/intro";
import { HeroCarousel } from "@/components/sections/hero-carousel";

/**
 * Home page wrapper: shows the full-screen hero intro first. Once the visitor
 * clicks "Explore more" the hero unmounts and the site content takes over —
 * the hero can't be scrolled back to until the page is reloaded.
 */
export function HomeShell({ children }: { children: React.ReactNode }) {
  const { revealed } = useIntro();
  return (
    <>
      {!revealed && <HeroCarousel />}
      {children}
    </>
  );
}
