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
- [2026-06-02] პროდუქტის ბარათები გავათანაბრე — auto-rows-fr + h-full + price mt-auto; ყველა ბარათი ზუსტად 408px (eval-ით).
- [2026-06-02] Pillow-ით მოვაშორე Red Sea ლოგო პროდუქტის ფოტოებს — გვერდითი ფონის patch-ით top-left გადავფარე.
- [2026-06-02] ფასები გადავიყვანე დოლარებში ($) — formatPrice და products/pricing რიცხვები რეალისტურ USD მნიშვნელობებზე.
- [2026-06-02] navbar intro-ს დროს position:fixed (flow-დან ამოღებული), რომ hero სრულ ეკრანზე დაეტიოს, არ დარჩეს ზოლი.
- [2026-06-02] HomeShell შევქმენი — Explore More-ზე hero unmount-დება, უკან ვერ ბრუნდები სანამ გვერდს არ გადატვირთავ.
- [2026-06-02] hero carousel-ს დავამატე autoplay (~2წმ, hover-ზე ჩერდება); eval-ით CORAL→REEF TANK ავტომატურად შეიცვალა.
- [2026-06-02] ghost text დავპატარავე და ავწიე, center ფოტო ქვემოთ/პატარა — უკანა ტექსტი აღარ იფარება.
- [2026-06-02] შევქმენი ახალი SVG ლოგო (გრადიენტ emblem + waves) navbar/footer-ში; ძველი Waves icon მოვაშორე.
- [2026-06-02] CTA ფონი შევცვალე HB-4.mp4 ვიდეოთი (`public/video/`); კატეგორიების SVG-ები რეალური ფოტოებით (`public/categories/`).
- [2026-06-02] build წარმატებული (23 გვერდი), 0 console error, 0 გატეხილი ფოტო — ყველა ცვლილება eval-ით დადასტურდა.
- [2026-06-02] hero ფოტოები შევცვალე 4 ნამდვილი აკვარიუმის ავზის ფოტოთი (Philippine reef tank, Manila, balanced marine, nano reef).
- [2026-06-02] hero ghost labels განვაახლე — REEF TANK / MARINE / AQUASCAPE / NANO REEF (ცალკეული თევზების ნაცვლად).
- [2026-06-02] center ფოტოს ზომა შევამცირე (height 56%, bottom 8%, scale 1.0) — აღარ იჭრება ქვემოდან, eval: bottom 614<714.
- [2026-06-02] დადასტურდა UI/UX Pro Max skill დაყენებულია (.claude/skills/ui-ux-pro-max/SKILL.md) და მუშაობს.
- [2026-06-02] hero carousel მთლიანად გადავწერე — ბარათები ფიზიკურად ცვლიან ადგილს (position exchange), არა fade/replace.
- [2026-06-02] კლიკზე გვერდითი ბარათი ცენტრში გადადის, ცენტრალური მის ადგილზე — order swap + Framer Motion spring.
- [2026-06-02] ბარათები ანიმირდება x/y/scale/rotateY(tilt)/blur/boxShadow-ით spring-ით (stiffness 90, damping 16) — 3D perspective 1500.
- [2026-06-02] იდენტობა შენარჩუნებულია (keyed motion.div, არ unmount-დება), opacity არასდროს 0 — fade არ ხდება.
- [2026-06-02] eval-ით დადასტურდა: 3 თანმიმდევრული click-ი ცენტრში გადაიტანა დაკლიკებული ბარათი (ok:true×3), 0 console error.
- [2026-06-02] ფერების glitch გავასწორე — blur და box-shadow CSS transition-ზე გადავიტანე, Framer მხოლოდ transform/opacity-ს ანიმირებს.
- [2026-06-02] hero 4-დან 3 ფოტომდე — დავტოვე REEF TANK + NANO REEF, მოვაშორე 2 ცუდი, დავამატე ახალი (Saltwater Fish Tank).
- [2026-06-02] hero ფონის ფერები მუქი გავხადე ყველა ფოტოზე (#06242c/#0a1c33/#0e1430) — აკვარიუმის განწყობა, აღარ კაშკაშა.
- [2026-06-02] eval: heroCount 3, rootBg rgb(6,36,44) მუქი, swap REEF TANK→SALTWATER მუშაობს, 0 console error.
- [2026-06-02] ფერების glitch-ის ნამდვილი მიზეზი: კლიკზე ბრაუზერი selection highlight-ს ადებდა ფოტოს — დავამატე user-select:none.
- [2026-06-02] SALTWATER ფოტო (blurry) შევცვალე ახლით — Great Barrier Reef (portrait 1280×2000), card-ს კარგად ერგება.
- [2026-06-02] eval: user-select none ბარათზე/stage-ზე, ახალი ფოტო ჩაიტვირთა (1280), swap მუშაობს, 0 console error.
- [2026-06-02] მომხმარებელმა 3 საკუთარი ფოტო ჩააგდო (ქართული სახელებით); გადავარქვი 1/2/4.jpg-ად მაპინგით.
- [2026-06-02] hero ფოტოები: 1=nano reef (375², low-res), 2=ფერადი კორალები, 4=galaxy/cosmic; მუქი ფონები მორგებული.
- [2026-06-02] eval: 3 ფოტო ჩაიტვირთა, galaxy bg rgb(10,17,36) მუქი, ghost GALAXY, 0 console error.
- [2026-06-02] nano reef (1.jpg) მომხმარებელმა უკეთესი ხარისხით ჩაანაცვლა (736×981); გადავარქვი 1.jpg-ად.
- [2026-06-02] hero გვერდითი ბარათების blur მოვხსენი (blur 0) — მომხმარებელს არ მოსწონდა; სიღრმე მხოლოდ scale+tilt-ით.
- [2026-06-02] slide 1 label NANO REEF→AQUASCAPE (ბნელი driftwood ფოტო); ფონი დავაყენე #0b0f16 (dark neutral).
- [2026-06-02] hero layout დავხვეწე — AQUARIA ზემოთ (top-4), ghost პატარა+დაბლა (top 9%, clamp 52–210), bottom სიმეტრია (sm:left-10).
- [2026-06-02] Explore More გავასწორე arrows-თან ვერტიკალურად (flex h-12 items-center sm:h-16).
- [2026-06-02] საიტის ლოგო შევცვალე — მომხმარებლის fish ლოგოს ფონი flood-fill-ით მოვაშორე → public/logo.png (transparent).
- [2026-06-02] Logo კომპონენტი ახლა /logo.png-ს იყენებს (navbar/footer/mobile), eval: ჩაიტვირთა (natW 258), 0 console error.
- [2026-06-02] autoplay აღარ ჩერდება ხელით გადართვის შემდეგ — მოვხსენი hover-pause; ტაიმერი order-ის ცვლილებაზე რესტარტდება.
- [2026-06-02] eval: ხელით click-ის შემდეგ 3.8წმ-ში autoplay თავისით გადაერთო (REEF TANK→AQUASCAPE), 0 console error. Vercel-ისთვის მზადაა.
- [2026-06-02] cart bug: ძველი slug-ები localStorage-ში count-ს ზრდიდა მაგრამ არ ჩანდა — load-ზე ვალიდურ პროდუქტებად ვფილტრავ.
- [2026-06-02] eval: stale cart ([clownfish,reefer-g3,qty0]) → "Cart (1)", localStorage გაიწმინდა reefer-g3-მდე; reload-ზე persist მუშაობს.
- [2026-06-02] საკონტაქტო მონაცემები ნეიტრალური გავხადე (ქვეყანა არ ჟონავს): email hello@aquaria.com, phone +1(555), address "Online · Worldwide".
- [2026-06-02] checkout placeholder-ები (Tbilisi/+995) ნეიტრალურით შევცვალე; grep: src-ში აღარაა Georgia/.ge/995/Tbilisi.
- [2026-06-02] contact ფორმის grid გავაბალანსე [1fr_22rem]→[1.3fr_1fr] items-start — უფრო პროპორციული form/info.
- [2026-06-02] მომხმარებელს ძველი ზომები ერჩივნა — დავაბრუნე [1fr_22rem]; ფორმა h-full გავწელე, textarea flex-1 — ბარათების სიმაღლეს ეტოლება.
- [2026-06-02] eval (1280px): formCol და infoCol ორივე 372px, bottom 701px, aligned:true — ფორმა ბარათების ბოლომდე.
- [2026-06-02] favicon/tab icon დავაყენე ლოგოდან — public/logo.png → src/app/icon.png (512²) + favicon.ico; Next-მა icon links დააგენერირა.
- [2026-06-02] footer-დან ლოგო (fish icon) მოვაშორე, AQUARIA wordmark დავტოვე.
- [2026-06-02] cart thumbnail ბაგი: sizes=80/96px-ის გამო next/image 96×50 აწვდიდა → cover ზრდიდა → ბუნდოვანი; sizes=240px გავხადე.
- [2026-06-02] eval: cart thumbnails ახლა 239×125 მოდის, object-cover downscale — მკვეთრი, 0 console error.
