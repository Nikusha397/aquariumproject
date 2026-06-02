# PROJECT_STATE.md — ჩემი (Claude) მეხსიერება

ეს ფაილი არის ერთადერთი წყარო იმისა, თუ რა გაკეთდა ამ პროექტში.
**წესი:** ყოველ ცვლილებაზე ან დამატებაზე ვამატებ ჩანაწერს ქვემოთ, მინიმუმ 10 სიტყვით აღწერით.
ფორმატი: `- [თარიღი] აღწერა (10+ სიტყვა).`

---

## პროექტის მიმოხილვა
მარილიანი წყლის (saltwater) აკვარიუმის მაღაზიის ვებსაიტი — ბრენდი **AQUARIA**, ენა **ინგლისური**, ვალუტა ₾ (GEL).
სტეკი: Next.js 16 + React 19 + TypeScript + Tailwind v4 + shadcn/ui (Radix) + Framer Motion + lucide-react.
დიზაინი: Deep Ocean მუქი თემა + ფერადი carousel hero. ფონტები: Inter (body), Anton (display/ghost text), Geist Mono (ფასები).
**Hero:** full-viewport carousel (TOONHUB-სტილი) — 4 ნამდვილი აკვარიუმის ფოტო, ghost text, grain, role-based transitions, nav arrows.

## სტეკი და ინსტრუმენტები (დაყენებული)
- Next.js 16.2.7 (App Router, Turbopack), React 19, TypeScript 5, ESLint 9, Tailwind v4
- shadcn/ui (Radix): button, card, badge, input, textarea, label, separator, sheet, sonner
- lucide-react (აიკონები), framer-motion (ანიმაცია)
- skills: UI/UX Pro Max (`.claude/skills/ui-ux-pro-max/`), graphify (CLI 0.8.28; graph ჯერ არ აგებულა — საჭიროა LLM key ან `/graphify`)

## ფერები / თემა (globals.css)
ფონი მუქი ნავი oklch(0.16 0.035 244), primary/aqua ცისფერ-ტილ oklch(0.78 0.13 196), coral აქცენტი oklch(0.76 0.16 45).
უტილიტები: `.glass`, `.glass-strong`, `.text-gradient`, `.glow`, `.glow-soft`. ანიმაციები: `float`, `float-slow`, `rise`, `shimmer`, `aurora`. `prefers-reduced-motion` დაცულია.
ფონტები: Noto Sans Georgian (body), Noto Serif Georgian (heading), Geist Mono (ფასები). ქართული სრულად რენდერდება.

## ფაილების სტრუქტურა (საკვანძო)
- `src/app/layout.tsx` — fonts, metadata, CartProvider + Navbar + Footer + Toaster
- `src/app/page.tsx` — მთავარი: Hero, კატეგორიები, featured, პროცესი, CTA
- `src/app/shop/page.tsx` — ყველა პროდუქცია კატეგორიებად
- `src/app/shop/[category]/page.tsx` — კატეგორია (SSG); ცარიელ კატეგორიას აქვს "მალე დაემატება" empty-state
- `src/app/product/[slug]/page.tsx` — პროდუქტის დეტალი (SSG) + qty + related
- `src/app/pricing/page.tsx` — 3 სერვის-პაკეტი + მოვლის გეგმები
- `src/app/cart/page.tsx` — სრული კალათა (client), ფასის დათვლა
- `src/app/checkout/page.tsx` — ვიზუალური გადახდა (გათიშული), შეკვეთის სიმულაცია
- `src/app/contact/page.tsx` — mailto ფორმა + საკონტაქტო ბარათები
- `src/lib/site.ts` — ბრენდი, email/phone/address, nav links (აქ იცვლება კონტაქტი)
- `src/lib/products.ts` — Red Sea-სტილის პროდუქცია (aquariums/hardware/reef-care), რეალური ფოტოებით (`/products/*`)
- `src/context/cart.tsx` — კალათის Context + localStorage persistence
- `src/context/intro.tsx` — IntroContext (revealed); hero intro-ს და nav-ის დამალვას აკონტროლებს
- `src/components/` — aqua-image (SVG placeholder), product-media/card/buy, add-to-cart, cart-sheet, motion (Reveal/Stagger), layout/navbar+footer, sections/hero
- `.claude/launch.json` — dev სერვერი (`aquaria-dev`, port 3000)

## გადაწყვეტილებები
- ფრეიმვორქი: Next.js (SEO/routing/checkout-ისთვის).
- Hero ფოტოები: 4 ნამდვილი აკვარიუმის ფოტო Wikimedia Commons-დან, ლოკალურად `public/hero/1–4.jpg` (clownfish, coral, reef tank, jellyfish). შესაცვლელად — ჩაანაცვლეთ ეს ფაილები.
- პროდუქტების ფოტოები: ჯერ გენერირებული SVG placeholder (`AquaImage`); პროდუქტის `image` ველის შევსება ჩაანაცვლებს. Unsplash remotePatterns მზადაა `next.config.ts`-ში.
- გადახდა: ვიზუალურად დამატებულია (ბარათის ველები disabled), რეალური გადახდა ჯერ არ არის.

## ღია საკითხები (მომხმარებლის გადასაწყვეტი)
- რეალური პროდუქციის ინფო და ფასები (ახლა demo placeholder მონაცემებია).
- რეალური ფოტოები (ჩაანაცვლებს SVG placeholder-ებს).
- ბრენდის სახელი/ლოგო/ფერები — ამჟამად "AQUARIA"; საკონტაქტო info დროებითია `src/lib/site.ts`-ში.
- გადახდის პროვაიდერი (მომავალში).
- graphify graph-ის აგება (საჭიროა API key).

---

## ცვლილებების ლოგი
- [2026-06-02] დაყენდა Next.js 16 + React + TypeScript + Tailwind v4 პროექტი create-next-app-ით, build წარმატებით გავიდა.
- [2026-06-02] დაყენდა shadcn/ui Radix base-ით, lucide-react და framer-motion, ასევე UI/UX Pro Max და graphify skill-ები.
- [2026-06-02] შეიქმნა ეს PROJECT_STATE.md ფაილი როგორც პროექტის მუდმივი მეხსიერება და ცვლილებების ლოგი.
- [2026-06-02] დაემატა Deep Ocean დიზაინ სისტემა globals.css-ში — ფერები, glass/glow უტილიტები, წყლის ანიმაციის keyframes.
- [2026-06-02] დაყენდა ქართული ფონტები (Noto Sans/Serif Georgian) layout-ში, რომ ტექსტი სწორად გამოჩნდეს და metadata დაემატა.
- [2026-06-02] დაემატა data layer — site.ts კონფიგი და products.ts ტიპებით, demo პროდუქციით, ფასებითა და helper ფუნქციებით.
- [2026-06-02] შეიქმნა კალათის Context localStorage persistence-ით, რათა მომხმარებლის შერჩევა გვერდებს შორის შენარჩუნდეს.
- [2026-06-02] დაემატა AquaImage გენერირებული SVG ვიზუალი, რომ პროდუქცია ფოტოს გარეშეც ლამაზად გამოჩნდეს და არ დაიმტვრიოს.
- [2026-06-02] აიწყო საერთო კომპონენტები — Navbar (glass, cart badge), Footer, Reveal/Stagger motion, ProductCard, CartSheet.
- [2026-06-02] შეიქმნა ყველა გვერდი — მთავარი ანიმირებული Hero-თი, მაღაზია, კატეგორიები, პროდუქტი, ფასები, კალათა, checkout, კონტაქტი.
- [2026-06-02] build წარმატებით გავიდა (24 გვერდი), ყველა route აბრუნებს 200/404-ს, client console შეცდომების გარეშეა.
- [2026-06-02] მომხმარებელს არ მოეწონა SVG placeholder-ები; ჩამოვტვირთე 4 ნამდვილი აკვარიუმის ფოტო Wikimedia-დან `public/hero/`-ში.
- [2026-06-02] ავაშენე TOONHUB-სტილის full-viewport carousel hero ნამდვილი ფოტოებით, ghost text-ით, grain-ით და nav arrows-ით.
- [2026-06-02] ფონტები შევცვალე Inter + Anton-ით (ქართულის ნაცვლად), რადგან საიტი ახლა მთლიანად ინგლისურენოვანია.
- [2026-06-02] მთელი საიტი ვთარგმნე ინგლისურად — ნავიგაცია, პროდუქცია, ყველა გვერდი, footer, metadata და site config.
- [2026-06-02] მოვხსენი კალათაში დამატების toast შეტყობინება (Toaster layout-იდან), მომხმარებლის მოთხოვნით, რომ ზემოთ აღარ ამოვარდეს.
- [2026-06-02] hero დავხვეწე — ცენტრალური ფოტოს scale შევამცირე და ქვედა ტექსტს text-shadow დავამატე წაკითხვადობისთვის.
- [2026-06-02] screenshot-ით დადასტურდა: carousel მუშაობს ნამდვილი clownfish ფოტოთი; eval-ით — hero 100vh, ფონი მუქი.
- [2026-06-02] პროდუქტები გადავაკეთე Red Sea-სტილზე (redseafish.com) — აკვარიუმები, hardware, reef-care, რეალური ფოტოებით `public/products/`.
- [2026-06-02] ჩამოვტვირთე 11 პროდუქტის ფოტო redseafish.com-დან (og:image/share cards), კატეგორიები: aquariums, hardware, reef-care.
- [2026-06-02] hero გავხადე intro — top nav დამალულია და scroll ჩაკეტილია სანამ "Explore More"-ს არ დააჭერ.
- [2026-06-02] "Explore Shop" შევცვალე "Explore More"-ით; დაჭერისას nav ჩნდება, scroll იხსნება და ჩამოდის content-ზე.
- [2026-06-02] შევქმენი IntroContext (`src/context/intro.tsx`) revealed მდგომარეობით; Navbar home-ზე იმალება სანამ revealed=false.
- [2026-06-02] ghost text ოდნავ ზემოთ ავწიე (top 12%) რომ center ფოტოს ზემოთ უკეთ ჩანდეს, არ იფაროს.
- [2026-06-02] eval-ით დადასტურდა: intro flow მუშაობს (nav opacity 0→1, scroll lock→visible, scrollY=viewport), 12 ფოტო ჩაიტვირთა.
