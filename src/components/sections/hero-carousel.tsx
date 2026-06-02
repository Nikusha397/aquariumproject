"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useIntro } from "@/context/intro";

const IMAGES = [
  { src: "/hero/1.jpg", bg: "#0E7490", panel: "#0891B2", label: "CLOWNFISH" },
  { src: "/hero/2.jpg", bg: "#0D9488", panel: "#14B8A6", label: "CORAL" },
  { src: "/hero/3.jpg", bg: "#1D4ED8", panel: "#3B82F6", label: "REEF TANK" },
  { src: "/hero/4.jpg", bg: "#6D28D9", panel: "#8B5CF6", label: "JELLYFISH" },
];

const EASE = "cubic-bezier(0.4,0,0.2,1)";
const DUR = 650;
const AUTOPLAY_MS = 2000;

type Role = "center" | "left" | "right" | "back";

export function HeroCarousel() {
  const { revealed, reveal } = useIntro();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [paused, setPaused] = useState(false);

  // track viewport
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock scrolling to the hero until the visitor enters the site.
  useEffect(() => {
    if (revealed) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = prev;
    };
  }, [revealed]);

  // Auto-advance the carousel; resets on manual navigation, pauses on hover.
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(
      () => setActiveIndex((p) => (p + 1) % 4),
      AUTOPLAY_MS,
    );
    return () => clearTimeout(t);
  }, [activeIndex, paused]);

  const enterSite = useCallback(() => {
    window.scrollTo(0, 0);
    reveal();
  }, [reveal]);

  // preload images
  useEffect(() => {
    IMAGES.forEach((img) => {
      const i = new window.Image();
      i.src = img.src;
    });
  }, []);

  const navigate = useCallback(
    (dir: "next" | "prev") => {
      if (isAnimating) return;
      setIsAnimating(true);
      setActiveIndex((prev) =>
        dir === "next" ? (prev + 1) % 4 : (prev + 3) % 4,
      );
      setTimeout(() => setIsAnimating(false), DUR);
    },
    [isAnimating],
  );

  const roleOf = (i: number): Role => {
    if (i === activeIndex) return "center";
    if (i === (activeIndex + 3) % 4) return "left";
    if (i === (activeIndex + 1) % 4) return "right";
    return "back";
  };

  const styleFor = (role: Role): CSSProperties => {
    const base: CSSProperties = {
      position: "absolute",
      aspectRatio: "0.6 / 1",
      transition: `transform ${DUR}ms ${EASE}, filter ${DUR}ms ${EASE}, opacity ${DUR}ms ${EASE}, left ${DUR}ms ${EASE}, bottom ${DUR}ms ${EASE}, height ${DUR}ms ${EASE}`,
      willChange: "transform, filter, opacity",
    };
    switch (role) {
      case "center":
        return {
          ...base,
          left: "50%",
          bottom: isMobile ? "16%" : "0%",
          height: isMobile ? "46%" : "64%",
          transform: `translateX(-50%) scale(${isMobile ? 1.0 : 1.05})`,
          filter: "none",
          opacity: 1,
          zIndex: 20,
        };
      case "left":
        return {
          ...base,
          left: isMobile ? "20%" : "30%",
          bottom: isMobile ? "32%" : "12%",
          height: isMobile ? "16%" : "28%",
          transform: "translateX(-50%) scale(1)",
          filter: "blur(2px)",
          opacity: 0.85,
          zIndex: 10,
        };
      case "right":
        return {
          ...base,
          left: isMobile ? "80%" : "70%",
          bottom: isMobile ? "32%" : "12%",
          height: isMobile ? "16%" : "28%",
          transform: "translateX(-50%) scale(1)",
          filter: "blur(2px)",
          opacity: 0.85,
          zIndex: 10,
        };
      default: // back
        return {
          ...base,
          left: "50%",
          bottom: isMobile ? "32%" : "12%",
          height: isMobile ? "13%" : "22%",
          transform: "translateX(-50%) scale(1)",
          filter: "blur(4px)",
          opacity: 1,
          zIndex: 5,
        };
    }
  };

  const active = IMAGES[activeIndex];

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        backgroundColor: active.bg,
        transition: `background-color ${DUR}ms ${EASE}`,
        fontFamily: "var(--font-sans), sans-serif",
      }}
    >
      <div className="relative w-full" style={{ height: "100vh", overflow: "hidden" }}>
        {/* 1. grain */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            zIndex: 50,
            opacity: 0.4,
            backgroundSize: "200px 200px",
            backgroundRepeat: "repeat",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
          }}
        />

        {/* 2. giant ghost text */}
        <div
          className="pointer-events-none absolute inset-x-0 flex select-none items-center justify-center"
          style={{ zIndex: 2, top: "6%" }}
        >
          <span
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontSize: "clamp(64px, 18vw, 250px)",
              fontWeight: 900,
              color: "#fff",
              opacity: 0.95,
              lineHeight: 1,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
              transition: `opacity ${DUR}ms ${EASE}`,
            }}
          >
            {active.label}
          </span>
        </div>

        {/* 3. brand */}
        <div
          className="absolute left-4 top-6 sm:left-8"
          style={{
            zIndex: 60,
            color: "#fff",
            opacity: 0.9,
            letterSpacing: "0.18em",
          }}
        >
          <span className="text-xs font-semibold uppercase">AQUARIA</span>
        </div>

        {/* 4. carousel */}
        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {IMAGES.map((img, i) => (
            <div key={img.src} style={styleFor(roleOf(i))}>
              <div
                className="h-full w-full overflow-hidden rounded-2xl ring-1 ring-white/20"
                style={{
                  boxShadow: "0 30px 70px -20px rgba(0,0,0,0.55)",
                  backgroundColor: img.panel,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.label.toLowerCase()}
                  draggable={false}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* 5. bottom-left copy + nav */}
        <div
          className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24"
          style={{ zIndex: 60, maxWidth: 340 }}
        >
          <p
            className="mb-2 text-base font-bold uppercase tracking-widest sm:mb-3 sm:text-[22px]"
            style={{
              color: "#fff",
              opacity: 0.95,
              letterSpacing: "0.02em",
              textShadow: "0 2px 24px rgba(0,0,0,0.45)",
            }}
          >
            Saltwater Aquariums
          </p>
          <p
            className="mb-4 hidden text-xs sm:mb-5 sm:block sm:text-sm"
            style={{
              color: "#fff",
              opacity: 0.9,
              lineHeight: 1.6,
              textShadow: "0 2px 18px rgba(0,0,0,0.4)",
            }}
          >
            Hand-picked, quarantined reef life and premium gear — delivered and
            installed, then maintained so your tank thrives. Build the ocean you
            have always wanted. Start today.
          </p>
          <div className="flex gap-3">
            <NavButton onClick={() => navigate("prev")} aria-label="Previous">
              <ArrowLeft size={26} strokeWidth={2.25} />
            </NavButton>
            <NavButton onClick={() => navigate("next")} aria-label="Next">
              <ArrowRight size={26} strokeWidth={2.25} />
            </NavButton>
          </div>
        </div>

        {/* 6. bottom-right link */}
        <div
          className="absolute bottom-6 right-4 sm:bottom-20 sm:right-10"
          style={{ zIndex: 60 }}
        >
          <button
            type="button"
            onClick={enterSite}
            className="group flex items-center text-white transition-opacity duration-200 hover:opacity-100"
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontSize: "clamp(20px, 4vw, 56px)",
              fontWeight: 400,
              opacity: 0.95,
              letterSpacing: "-0.02em",
              lineHeight: 1,
              textTransform: "uppercase",
            }}
          >
            <span>Explore More</span>
            <ArrowRight
              className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1 sm:h-8 sm:w-8"
              strokeWidth={2.25}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

function NavButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white text-white transition-[transform,background-color] duration-150 hover:scale-[1.08] sm:h-16 sm:w-16"
      style={{ backgroundColor: "transparent" }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = "transparent")
      }
    >
      {children}
    </button>
  );
}
