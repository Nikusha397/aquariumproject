"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useIntro } from "@/context/intro";

// Three curated aquarium tank photos with dark, aquarium-like backgrounds
// tuned to each image. Drop the photos in /public/hero (see filenames).
const IMAGES = [
  { src: "/hero/1.jpg", bg: "#0b0f16", label: "AQUASCAPE" }, // dark driftwood scape
  { src: "/hero/2.jpg", bg: "#08090d", label: "REEF TANK" }, // colorful coral, near-black
  { src: "/hero/4.jpg", bg: "#0a1124", label: "GALAXY" }, // cosmic / deep-space scape
];

const AUTOPLAY_MS = 3200;

// Elastic spring for the physical position exchange.
const SWAP_SPRING = {
  type: "spring" as const,
  stiffness: 90,
  damping: 16,
  mass: 1.1,
};

type Role = {
  scale: number;
  rotateY: number;
  blur: number;
  opacity: number;
  z: number;
  shadow: string;
};

function roleFor(slot: number, isMobile: boolean): Role {
  if (slot === 0) {
    return {
      scale: 1,
      rotateY: 0,
      blur: 0,
      opacity: 1,
      z: 40,
      shadow: "0 30px 70px -22px rgba(0,0,0,0.7)",
    };
  }
  const left = slot === 1;
  return {
    scale: isMobile ? 0.62 : 0.76,
    rotateY: left ? 20 : -20,
    blur: 0,
    opacity: 0.92,
    z: 25,
    shadow: "0 20px 45px -20px rgba(0,0,0,0.55)",
  };
}

function slotCenter(slot: number, w: number, h: number, isMobile: boolean): [number, number] {
  const P = isMobile
    ? ([
        [0.5, 0.55],
        [0.18, 0.6],
        [0.82, 0.6],
      ] as const)
    : ([
        [0.5, 0.5],
        [0.24, 0.54],
        [0.76, 0.54],
      ] as const);
  const [fx, fy] = P[slot];
  return [fx * w, fy * h];
}

export function HeroCarousel() {
  const { revealed, reveal } = useIntro();
  // order[0] = center, [1] = left, [2] = right. Values are IMAGE ids.
  const [order, setOrder] = useState([0, 1, 2]);
  const [isMobile, setIsMobile] = useState(false);
  const [size, setSize] = useState({ w: 0, h: 0 });
  // Track which hero photos have decoded so the cards can fade in (per-card
  // opacity — never on the perspective stage, which would flatten the 3D).
  const [loadedSrc, setLoadedSrc] = useState<Record<string, true>>({});
  const [timedOut, setTimedOut] = useState(false);
  const markLoaded = useCallback((src: string) => {
    setLoadedSrc((prev) => (prev[src] ? prev : { ...prev, [src]: true }));
  }, []);
  const imagesReady =
    timedOut || Object.keys(loadedSrc).length >= IMAGES.length;
  const stageRef = useRef<HTMLDivElement>(null);

  // Safety net so a slow/failed asset never traps the visitor.
  useEffect(() => {
    const t = setTimeout(() => setTimedOut(true), 5000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) =>
      setSize({ w: e.contentRect.width, h: e.contentRect.height }),
    );
    ro.observe(el);
    setSize({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (revealed) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = prev;
    };
  }, [revealed]);

  const swapToCenter = useCallback((id: number) => {
    setOrder((o) => {
      const i = o.indexOf(id);
      if (i <= 0) return o;
      const next = [...o];
      [next[0], next[i]] = [next[i], next[0]];
      return next;
    });
  }, []);

  const rotate = useCallback((dir: 1 | -1) => {
    setOrder((o) => (dir === 1 ? [o[1], o[2], o[0]] : [o[2], o[0], o[1]]));
  }, []);

  // Always auto-advances. Any manual change updates `order`, which re-runs
  // this effect and simply restarts the timer — autoplay never stops.
  useEffect(() => {
    const t = setTimeout(() => rotate(1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [order, rotate]);

  const enterSite = useCallback(() => {
    window.scrollTo(0, 0);
    reveal();
  }, [reveal]);

  const center = IMAGES[order[0]];
  const { w, h } = size;
  const cardH = (isMobile ? 0.46 : 0.62) * h;
  const cardW = cardH * 0.62;

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: center.bg,
        transition: "background-color 800ms cubic-bezier(0.4,0,0.2,1)",
        fontFamily: "var(--font-sans), sans-serif",
      }}
    >
      <div className="relative w-full" style={{ height: "100vh", overflow: "hidden" }}>
        {/* grain */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            zIndex: 50,
            opacity: 0.35,
            backgroundSize: "200px 200px",
            backgroundRepeat: "repeat",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
          }}
        />

        {/* giant ghost word — behind the cards (bold over the dark bg) */}
        <div
          className="pointer-events-none absolute inset-x-0 flex select-none items-center justify-center"
          style={{ zIndex: 2, top: "9%" }}
        >
          <span
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontSize: "clamp(52px, 15vw, 210px)",
              fontWeight: 900,
              color: "#fff",
              opacity: 0.95,
              lineHeight: 1,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
              transition: "opacity 600ms",
            }}
          >
            {center.label}
          </span>
        </div>

        {/* brand */}
        <div
          className="absolute left-4 top-4 sm:left-8"
          style={{ zIndex: 60, color: "#fff", opacity: 0.9, letterSpacing: "0.18em" }}
        >
          <span className="text-xs font-semibold uppercase">AQUARIA</span>
        </div>

        {/* swapping cards stage */}
        <div
          ref={stageRef}
          className="absolute inset-0 select-none"
          style={{
            zIndex: 3,
            perspective: 1500,
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {w > 0 &&
            IMAGES.map((img, id) => {
              const slot = order.indexOf(id);
              const role = roleFor(slot, isMobile);
              const [cx, cy] = slotCenter(slot, w, h, isMobile);
              // Framer animates transform + opacity (spring). blur and shadow are
              // handled with plain CSS transitions to avoid filter compositing
              // artifacts during the move.
              const cardStyle: CSSProperties = {
                position: "absolute",
                width: cardW,
                height: cardH,
                top: 0,
                left: 0,
                zIndex: role.z,
                borderRadius: 18,
                overflow: "hidden",
                isolation: "isolate",
                cursor: slot === 0 ? "default" : "pointer",
                transformStyle: "preserve-3d",
                // Hairline ring via inset shadow renders cleanly on the tilted
                // 3D cards (a real border breaks up at the top/bottom edges).
                boxShadow: `${role.shadow}, inset 0 0 0 1px rgba(255,255,255,0.16)`,
                transition: "box-shadow 0.6s ease",
                backgroundColor: "#0b1220",
                userSelect: "none",
                WebkitUserSelect: "none",
                WebkitTapHighlightColor: "transparent",
              };
              return (
                <motion.div
                  key={img.src}
                  style={cardStyle}
                  onClick={() => swapToCenter(id)}
                  initial={false}
                  animate={{
                    x: cx - cardW / 2,
                    y: cy - cardH / 2,
                    scale: role.scale,
                    rotateY: role.rotateY,
                    opacity: imagesReady ? role.opacity : 0,
                  }}
                  transition={{ default: SWAP_SPRING, opacity: { duration: 0.5 } }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src}
                    alt={img.label.toLowerCase()}
                    draggable={false}
                    ref={(el) => {
                      if (el && el.complete && el.naturalWidth > 0)
                        markLoaded(img.src);
                    }}
                    onLoad={() => markLoaded(img.src)}
                    onError={() => markLoaded(img.src)}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      borderRadius: 18,
                      pointerEvents: "none",
                      userSelect: "none",
                      WebkitUserSelect: "none",
                      filter: `blur(${role.blur}px)`,
                      transition: "filter 0.6s ease",
                    }}
                  />
                </motion.div>
              );
            })}
        </div>

        {/* bottom-left copy + arrows */}
        <div
          className="absolute bottom-6 left-4 sm:bottom-20 sm:left-10"
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
            <NavButton onClick={() => rotate(-1)} aria-label="Previous">
              <ArrowLeft size={26} strokeWidth={2.25} />
            </NavButton>
            <NavButton onClick={() => rotate(1)} aria-label="Next">
              <ArrowRight size={26} strokeWidth={2.25} />
            </NavButton>
          </div>
        </div>

        {/* enter the site */}
        <div
          className="absolute bottom-6 right-4 flex h-12 items-center sm:bottom-20 sm:right-10 sm:h-16"
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
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
    >
      {children}
    </button>
  );
}
