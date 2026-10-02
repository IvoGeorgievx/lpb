// Used verbatim in the canvas, mobile showcase, preview, and downloaded HTML.
export const exportCss = `
.lpb-page { margin:0; width:100%; min-width:0; background:var(--lpb-background); color:var(--lpb-foreground); font-family:var(--lpb-font-body); font-size:16px; line-height:1.5; letter-spacing:var(--lpb-letter-spacing); overflow-wrap:anywhere; }
.lpb-page *, .lpb-page *::before, .lpb-page *::after { box-sizing:border-box; }
.lpb-page h1, .lpb-page h2, .lpb-page h3 { font-family:var(--lpb-font-heading); margin:0; line-height:1.15; font-weight:700; text-wrap:balance; }
.lpb-page p { margin:0; }
.lpb-page a { color:inherit; text-underline-offset:4px; }
.lpb-page a:focus-visible, .lpb-page input:focus-visible { outline:3px solid var(--lpb-ring); outline-offset:4px; }
.lpb-page img, .lpb-page svg { max-width:100%; }
.lpb-page ::selection { background:var(--lpb-accent); color:var(--lpb-foreground); }
.lpb-page { scrollbar-color:var(--lpb-scrollbar-thumb) var(--lpb-scrollbar-track); }
.lpb-page header, .hero-block-surface, .product-block, .testimonial-block { padding-inline:max(24px, calc((100% - 1120px) / 2)); }
.hero-block { width:100%; }
.hero-block-surface { padding-block:64px; text-align:center; }
.hero-block-surface h1 { max-width:18ch; }
.hero-block-surface p { max-width:60ch; line-height:1.6; }
.product-block { display:grid; grid-template-columns:repeat(auto-fit,minmax(min(250px,100%),1fr)); gap:24px; padding-block:56px; align-items:stretch; }
.product-card { background:var(--lpb-card); border:1px solid var(--lpb-border); border-radius:var(--lpb-radius); padding:var(--lpb-card-padding); box-shadow:var(--lpb-shadow-soft); display:flex; flex-direction:column; align-items:flex-start; gap:18px; min-width:0; }
.product-card > svg { width:44px; height:44px; padding:10px; border-radius:12px; background:var(--lpb-primary); color:var(--lpb-card); }
.product-card-heading { font-size:1.35rem; }
.product-card-subheading { font-size:1rem; color:var(--lpb-muted); }
.product-card-additional { display:flex; flex-direction:column; gap:12px; }
.product-card-additional-item { display:flex; gap:10px; }
.product-card-additional-item svg { flex-shrink:0; }
.product-card--featured { border-color:var(--lpb-accent); box-shadow:var(--lpb-shadow-strong); }
.product-card--ghost { background:transparent; border-color:transparent; box-shadow:none; }
.product-card--outlined { box-shadow:none; }
.product-card--glass { background:color-mix(in srgb,var(--lpb-card) 80%,transparent); backdrop-filter:blur(12px); }
.testimonial-block { padding-block:40px; }
.default-carousel { width:100%; margin:auto; }
.default-carousel-slides { border-radius:var(--lpb-radius); }
.default-carousel-slides::-webkit-scrollbar { display:none; }
.default-carousel-slide { width:100%; min-width:0; }
.default-carousel-nav, .fade-nav { display:flex; flex-wrap:wrap; align-items:center; justify-content:center; gap:8px; }
.testimonial-nav-item { display:inline-flex; align-items:center; justify-content:center; width:36px; height:36px; flex:0 0 36px; padding:0; border-radius:50%; font-family:var(--lpb-font-body); font-size:13px; line-height:1; font-variant-numeric:tabular-nums; color:var(--lpb-foreground); background:var(--lpb-card); border:1px solid var(--lpb-border); text-decoration:none; cursor:pointer; }
.testimonial-nav-item span { line-height:1; }
.testimonial-nav-item:hover { border-color:var(--lpb-primary); }
.fade-carousel { margin:auto; }
.fade-slides { display:grid; }
.fade-slide { grid-area:1 / 1; visibility:hidden; }
.fade-carousel input[type=radio] { position:absolute; width:1px; height:1px; opacity:0; }
.fade-carousel input:focus-visible ~ .fade-nav { outline:3px solid var(--lpb-ring); outline-offset:4px; }
.cta-block-link { display:inline-block; max-width:100%; white-space:normal; }
.page-footer { width:100%; }
@keyframes fadeIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:none; } }
@keyframes slideInLeft { from { opacity:0; transform:translateX(-16px); } to { opacity:1; transform:none; } }
@keyframes slideInRight { from { opacity:0; transform:translateX(16px); } to { opacity:1; transform:none; } }
.animate-fade-in { animation:fadeIn .5s ease-out; }
.animate-slide-in-left { animation:slideInLeft .5s ease-out; }
.animate-slide-in-right { animation:slideInRight .5s ease-out; }
@media(max-width:600px) {
 .hero-block-surface { padding:48px 20px; }
 .hero-block-surface h1 { font-size:min(38px, 10vw) !important; }
 .hero-block-surface p { font-size:min(19px, 5vw) !important; }
 .product-block { padding:32px 20px; }
 .testimonial-block { padding:24px 12px; }
 .default-carousel, .fade-carousel { padding-inline:8px !important; }
 .cta-block-inner { padding:20px !important; }
 .lpb-page header { height:auto !important; min-height:72px; padding:16px !important; }
 .lpb-page header p { font-size:18px !important; }
 .lpb-page header a { padding:10px 14px !important; }
}
@media(prefers-reduced-motion:reduce) { .lpb-page *, .lpb-page *::before, .lpb-page *::after { animation:none !important; transition:none !important; scroll-behavior:auto !important; } }
`;
