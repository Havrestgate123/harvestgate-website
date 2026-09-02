import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Leaf, Star } from "lucide-react";
import { MaskLines, MaskLinesInView, Reveal, Marquee } from "../components/motion/Reveal";
import {
  PRODUCTS,
  NATURALS_CATEGORIES,
  SELECT_CATEGORIES,
  surfaceAccent,
  getProductsByRange,
} from "../data/products";
import { useTheme } from "../theme/ThemeProvider";

const MARQUEE_ITEMS = [
  "Phool Makhana",
  "Harvestgate Naturals",
  "Harvestgate Select",
  "Ancient Millets",
  "Natural Sweeteners",
  "Export Pulses & Dal",
  "Basmati & Long Grain Rice",
  "Roasted Wheat Daliya",
  "APEDA Registered",
  "IEC AAICH2946R",
  "GSTIN 09AAICH2946R1ZR",
];

const ALL_FILTER_TABS = [
  { id: "all", label: "All Products" },
  { id: "NATURALS", label: "Naturals", icon: "leaf" },
  { id: "SELECT", label: "Select", icon: "star" },
  ...NATURALS_CATEGORIES.map((c) => ({ id: c.id, label: c.label, range: "NATURALS" })),
  ...SELECT_CATEGORIES.map((c) => ({ id: c.id, label: c.label, range: "SELECT" })),
];

// Range badge component
const RangeBadge = ({ range, size = "sm" }) => {
  const isSelect = range === "SELECT";
  const sizeClasses = size === "sm"
    ? "px-2 py-0.5 text-[9px] tracking-[0.26em]"
    : "px-3 py-1 text-[10px] tracking-[0.3em]";

  return (
    <span
      className={`inline-flex items-center gap-1 font-mono font-bold uppercase rounded-sm border ${sizeClasses} ${isSelect
          ? "border-hg-gold/50 bg-hg-gold/10 text-hg-gold"
          : "border-hg-green/50 bg-hg-green/10 text-hg-green"
        }`}
    >
      {isSelect ? <Star size={8} className="shrink-0" /> : <Leaf size={8} className="shrink-0" />}
      {isSelect ? "Select" : "Naturals"}
    </span>
  );
};

const ProductCard = ({ p, i, wide = false }) => {
  const { theme } = useTheme();
  const isSelect = p.range === "SELECT";
  return (
    <Reveal delay={(i % 3) * 0.07} className={wide ? "md:col-span-2" : "col-span-1"}>
      <Link
        to={`/products/${p.slug}`}
        data-testid={`product-card-${p.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-hg-line dark:border-white/10 bg-white/80 dark:bg-[#141b15]/80 backdrop-blur-md transition-all duration-300 hover:border-emerald-500/50 dark:hover:border-emerald-400/50 hover:shadow-[0_12px_35px_rgba(16,185,129,0.12)] hover:-translate-y-1"
      >
        {/* CLEAN IMAGE WITH GLOWING BRAND RANGE PILL */}
        <div className={`relative overflow-hidden bg-black/5 ${wide ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
          <img
            src={p.image}
            alt={p.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform ease-out group-hover:scale-[1.08]"
            style={{ transitionDuration: '1200ms' }}
          />
          <span
            className="absolute left-0 top-0 h-[3.5px] w-0 transition-all duration-700 ease-out group-hover:w-full z-10"
            style={{ backgroundColor: p.accent }}
          />

          {/* GLOWING BRAND RANGE BUTTON (TOP RIGHT CORNER) */}
          <div
            className={`absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[9.5px] sm:text-[10px] font-bold uppercase tracking-[0.16em] backdrop-blur-md transition-all duration-300 shadow-xl ${
              isSelect
                ? "bg-black/80 border-hg-gold/70 text-hg-gold shadow-[0_0_14px_rgba(212,175,55,0.4)]"
                : "bg-black/80 border-hg-green/70 text-emerald-400 shadow-[0_0_14px_rgba(46,139,87,0.4)]"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full animate-pulse shrink-0 ${
                isSelect
                  ? "bg-hg-gold shadow-[0_0_8px_#d4af37]"
                  : "bg-emerald-400 shadow-[0_0_8px_#34d399]"
              }`}
            />
            <span>{isSelect ? "Harvestgate Select" : "Harvestgate Naturals"}</span>
          </div>
        </div>

        {/* DETAILS SECTION (BELOW IMAGE) */}
        <div className="flex flex-1 flex-col p-5 sm:p-6 justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <RangeBadge range={p.range} />
              <span className="font-mono text-[11px] font-bold text-hg-fg3 tracking-wider">
                {p.index}
              </span>
            </div>
            <h2 className="hg-display text-2xl sm:text-3xl text-hg-fg transition-colors group-hover:text-hg-gold">
              {p.name}
            </h2>
            <p
              className="font-mono text-[11px] uppercase tracking-[0.2em] font-semibold mt-1"
              style={{ color: surfaceAccent(p, theme) }}
            >
              {p.subtitle}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-hg-fg2">{p.tagline}</p>
          </div>

          <div className="mt-6">
            <dl className="grid grid-cols-2 gap-y-3 border-t border-hg-line pt-4 font-mono text-[10px] uppercase tracking-[0.14em]">
              <div>
                <dt className="text-hg-fg3">Origin</dt>
                <dd className="mt-1 normal-case tracking-normal font-medium text-hg-fg">
                  {p.origin.split(",")[0]}
                </dd>
              </div>
              <div>
                <dt className="text-hg-fg3">Processing</dt>
                <dd className="mt-1 font-medium text-hg-fg">Sortex Cleaned</dd>
              </div>
            </dl>
            <div className="mt-4 flex items-center justify-between pt-3 border-t border-hg-line/40">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-hg-gold font-bold">
                View Spec Sheet
              </span>
              <span className="grid h-8 w-8 place-items-center border border-hg-line text-hg-fg2 transition-colors duration-300 group-hover:border-hg-gold group-hover:text-hg-gold">
                <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:rotate-45" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </Reveal>
  );
};

// Range section header
const RangeSectionHeader = ({ range }) => {
  const isSelect = range === "SELECT";
  return (
    <div className={`flex items-center gap-4 mb-8 pb-5 border-b-2 ${isSelect ? "border-hg-gold/40" : "border-hg-green/40"}`}>
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 ${isSelect ? "border-hg-gold/40 bg-hg-gold/8" : "border-hg-green/40 bg-hg-green/8"}`}>
        {isSelect ? (
          <Star size={18} className="text-hg-gold" />
        ) : (
          <Leaf size={18} className="text-hg-green" />
        )}
      </div>
      <div>
        <p className={`font-mono text-[10px] uppercase tracking-[0.32em] font-bold ${isSelect ? "text-hg-gold" : "text-hg-green"}`}>
          Product Range
        </p>
        <h2 className="hg-display text-2xl sm:text-3xl text-hg-fg mt-0.5">
          {isSelect ? "Harvestgate Select" : "Harvestgate Naturals"}
        </h2>
        <p className="text-sm text-hg-fg3 mt-0.5 font-medium">
          {isSelect
            ? "Premium single-origin specialty exports"
            : "Ancient grains, pure sweeteners & wholesome nutrition"}
        </p>
      </div>
    </div>
  );
};

const Products = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const naturalsProducts = getProductsByRange("NATURALS");
  const selectProducts = getProductsByRange("SELECT");

  // Filtered products
  const getFilteredProducts = () => {
    if (activeFilter === "all") return PRODUCTS;
    if (activeFilter === "NATURALS") return naturalsProducts;
    if (activeFilter === "SELECT") return selectProducts;
    return PRODUCTS.filter((p) => p.category === activeFilter);
  };

  const filtered = getFilteredProducts();

  // Determine which range sections to show
  const showNaturals = activeFilter === "all" || activeFilter === "NATURALS" ||
    NATURALS_CATEGORIES.some((c) => c.id === activeFilter);
  const showSelect = activeFilter === "all" || activeFilter === "SELECT" ||
    SELECT_CATEGORIES.some((c) => c.id === activeFilter);

  const filteredNaturals = filtered.filter((p) => p.range === "NATURALS");
  const filteredSelect = filtered.filter((p) => p.range === "SELECT");

  return (
    <div data-testid="page-products" className="pt-[110px] sm:pt-[130px]">
      {/* HERO HEADER */}
      <section className="hg-container pt-12 pb-14 sm:pt-20 sm:pb-20">
        <p className="hg-eyebrow">Catalogue — 2026 Export Season</p>
        <MaskLines
          data-testid="products-heading"
          delay={0.12}
          className="hg-display mt-6 text-[14vw] leading-[0.86] text-hg-fg sm:text-[9vw] lg:text-[7vw]"
          lines={["The Export", "Catalogue"]}
        />
        <div className="mt-12 grid grid-cols-1 gap-8 border-t border-hg-line pt-9 lg:grid-cols-12">
          <p className="max-w-2xl text-base leading-[1.85] text-hg-fg2 lg:col-span-7">
            Two distinct product ranges crafted for global B2B buyers —
            <span className="font-bold text-hg-green"> Harvestgate Naturals</span> for premium ancient
            grains, sweeteners, pulses, grains, flours & porridge, and
            <span className="font-bold text-hg-gold"> Harvestgate Select</span> for our signature
            Grade-A Foxnuts.
            <span className="hg-italic text-hg-fg text-lg">
              {" "}
              Direct procurement with verifiable Indian provenance.
            </span>
          </p>
          <div className="lg:col-span-4 lg:col-start-9">
            <dl className="space-y-3 font-mono text-[10px] uppercase tracking-[0.18em] text-hg-fg3">
              <div className="flex justify-between border-b border-hg-line pb-2">
                <dt>Programmes</dt>
                <dd className="text-hg-gold font-bold">0{PRODUCTS.length} Commodities</dd>
              </div>
              <div className="flex justify-between border-b border-hg-line pb-2">
                <dt>Min. Order (MOQ)</dt>
                <dd className="text-hg-gold font-bold">1 x 20ft FCL</dd>
              </div>
              <div className="flex justify-between border-b border-hg-line pb-2">
                <dt>Sampling</dt>
                <dd className="text-hg-gold font-bold">Free sample couriered</dd>
              </div>
              <div className="flex justify-between border-b border-hg-line pb-2">
                <dt>Export Credentials</dt>
                <dd className="text-hg-gold font-bold">APEDA · FSSAI · IEC</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <Marquee items={MARQUEE_ITEMS} testId="products-marquee" />

      {/* FILTER TABS */}
      <section className="hg-container pt-12">
        <div className="flex flex-wrap gap-2 pb-6 border-b border-hg-line">
          {/* All + Range tabs */}
          {[
            { id: "all", label: "All Products", cls: "text-hg-fg border-hg-line hover:border-hg-gold hover:text-hg-gold" },
            { id: "NATURALS", label: "Naturals", icon: "leaf", cls: "text-hg-green border-hg-green/30 hover:border-hg-green hover:bg-hg-green/5" },
            { id: "SELECT", label: "Select", icon: "star", cls: "text-hg-gold border-hg-gold/30 hover:border-hg-gold hover:bg-hg-gold/5" },
          ].map(({ id, label, icon, cls }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveFilter(id)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] font-bold border-2 transition-all duration-200 ${cls} ${activeFilter === id ? (id === "NATURALS" ? "border-hg-green bg-hg-green/10 text-hg-green" : id === "SELECT" ? "border-hg-gold bg-hg-gold/10 text-hg-gold" : "border-hg-gold text-hg-gold bg-hg-gold/5") : ""}`}
            >
              {icon === "leaf" && <Leaf size={11} className="shrink-0" />}
              {icon === "star" && <Star size={11} className="shrink-0" />}
              {label}
            </button>
          ))}

          {/* Category tabs — Naturals */}
          <div className="w-full flex flex-wrap gap-2 mt-1">
            <span className="flex items-center gap-1 font-mono text-[9.5px] uppercase tracking-[0.24em] text-hg-fg3 self-center pr-2">
              <Leaf size={9} className="text-hg-green" /> Naturals:
            </span>
            {NATURALS_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveFilter(cat.id)}
                className={`px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.18em] font-semibold border transition-all duration-200 ${activeFilter === cat.id
                    ? "border-hg-green bg-hg-green/10 text-hg-green"
                    : "border-hg-line text-hg-fg3 hover:border-hg-green/50 hover:text-hg-green"
                  }`}
              >
                {cat.label}
              </button>
            ))}
            <span className="flex items-center gap-1 font-mono text-[9.5px] uppercase tracking-[0.24em] text-hg-fg3 self-center px-2">
              <Star size={9} className="text-hg-gold" /> Select:
            </span>
            {SELECT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveFilter(cat.id)}
                className={`px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.18em] font-semibold border transition-all duration-200 ${activeFilter === cat.id
                    ? "border-hg-gold bg-hg-gold/10 text-hg-gold"
                    : "border-hg-line text-hg-fg3 hover:border-hg-gold/50 hover:text-hg-gold"
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS GRID — HARVESTGATE NATURALS */}
      {showNaturals && filteredNaturals.length > 0 && (
        <section className="hg-container py-14 sm:py-20">
          <RangeSectionHeader range="NATURALS" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {filteredNaturals.map((p, i) => (
              <ProductCard key={p.slug} p={p} i={i} wide={i === 0 && activeFilter !== "all" ? false : i === 0} />
            ))}
          </div>
        </section>
      )}

      {/* PRODUCTS GRID — HARVESTGATE SELECT */}
      {showSelect && filteredSelect.length > 0 && (
        <section className={`hg-container py-14 sm:py-20 ${showNaturals && filteredNaturals.length > 0 ? "border-t border-hg-line" : ""}`}>
          <RangeSectionHeader range="SELECT" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {filteredSelect.map((p, i) => (
              <ProductCard key={p.slug} p={p} i={i} wide={filteredSelect.length === 1} />
            ))}
          </div>
        </section>
      )}

      {/* CONSOLIDATION BANNER */}
      <section className="border-t border-hg-line bg-hg-bg2">
        <div className="hg-container py-20 text-center sm:py-28">
          <MaskLinesInView
            className="hg-display mx-auto max-w-3xl text-4xl leading-[0.92] text-hg-fg sm:text-5xl lg:text-6xl"
            lines={["Need a blended", "multi-commodity container?"]}
          />
          <Reveal delay={0.15}>
            <p className="hg-italic mx-auto mt-5 max-w-lg text-lg text-hg-gold">
              We consolidate mixed pallets across Foxnuts, Millets, Sweeteners, Pulses, Grains, Flours and Daliya.
            </p>
            <Link to="/contact" data-testid="products-cta-enquire" className="hg-btn hg-btn--solid mt-9">
              <span>Start an enquiry</span>
              <ArrowUpRight size={14} className="relative z-[2]" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Products;
