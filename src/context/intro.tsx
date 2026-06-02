"use client";

import { createContext, useContext, useState, useCallback } from "react";

type IntroContextValue = {
  /** True once the visitor has entered the site from the hero intro. */
  revealed: boolean;
  reveal: () => void;
};

const IntroContext = createContext<IntroContextValue | null>(null);

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [revealed, setRevealed] = useState(false);
  const reveal = useCallback(() => setRevealed(true), []);
  return (
    <IntroContext.Provider value={{ revealed, reveal }}>
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  const ctx = useContext(IntroContext);
  if (!ctx) throw new Error("useIntro must be used within IntroProvider");
  return ctx;
}
