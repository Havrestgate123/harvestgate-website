import { useRef } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Package,
  Sparkles,
  Scale,
  Clock,
  Info,
  Mail,
  TrendingUp,
  Award,
} from "lucide-react";
import { MaskLines, Reveal } from "../components/motion/Reveal";
import { getProduct, PRODUCTS, surfaceAccent } from "../data/products";
import { useTheme } from "../theme/ThemeProvider";

const ProductDetail = () => {
  const { slug } = useParams();
  const { theme } = useTheme();
  const product = getProduct(slug);
  const imgRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  if (!product) return <Navigate to="/products" replace />;

  const others = PRODUCTS.filter((p) => p.slug !== product.slug);
  const accent = surfaceAccent(product, theme);
  const isFoxnuts = product.slug === "foxnuts";

  return (
    <div data-testid={`page-product-${product.slug}`} className="pt-[110px] sm:pt-[130px]">
      {/* HERO */}
      <section ref={imgRef} className="relative overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-hg-bg via-hg-bg/60 to-black/35 dark:via-hg-bg/75 dark:to-black/65" />
        </motion.div>

        <div className="hg-container relative z-10 pb-16 pt-14 sm:pb-24 sm:pt-20">
          <Link
            to="/products"
            data-testid="product-back-link"
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-4 py-1.5 font-mono text-[11.5px] uppercase tracking-[0.24em] font-bold text-white backdrop-blur-md transition-all hover:bg-black/80 hover:text-hg-gold shadow-lg"
          >
            <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1 text-hg-gold" />
            All Export Products
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="inline-flex flex-wrap items-center gap-2.5 rounded-full border border-white/20 bg-black/65 px-4 py-1.5 backdrop-blur-md shadow-xl">
              <span
                className={`inline-flex items-center gap-1.5 font-mono text-[10.5px] font-bold tracking-[0.24em] uppercase px-3 py-1 rounded-full border ${
                  product.range === "SELECT"
                    ? "border-hg-gold/80 bg-black/50 text-hg-gold shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                    : "border-emerald-400/80 bg-black/50 text-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.4)]"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full animate-pulse shrink-0 ${
                    product.range === "SELECT"
                      ? "bg-hg-gold shadow-[0_0_8px_#d4af37]"
                      : "bg-emerald-400 shadow-[0_0_8px_#34d399]"
                  }`}
                />
                {product.range === "SELECT" ? "Harvestgate Select" : "Harvestgate Naturals"}
              </span>
              <span className="font-mono text-[12px] font-extrabold text-white tracking-wide">
                {product.index} — {product.subtitle}
              </span>
            </div>
          </div>
          <MaskLines
            data-testid="product-heading"
            delay={0.1}
            className="hg-display mt-5 text-[14vw] leading-[0.88] text-hg-fg sm:text-[8.5vw] lg:text-[6.5vw] font-extrabold"
            lines={product.name.split(" ")}
          />
          <Reveal delay={0.25}>
            <p className="mt-6 max-w-3xl text-2xl leading-snug sm:text-3xl font-bold" style={{ color: accent }}>
              {product.tagline}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= DEDICATED FOXNUTS (MAKHANA) SHOWCASE ================= */}
      {isFoxnuts && (
        <section className="border-b-2 border-hg-line bg-hg-bg2/80 py-20 sm:py-28">
          <div className="hg-container space-y-20 sm:space-y-28">

            {/* 1. SUTTA CALIBRATION & GRADING STANDARDS */}
            <div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b-2 border-hg-line pb-8">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-hg-gold/40 bg-hg-gold/15 px-3.5 py-1 text-xs font-mono font-bold text-hg-gold uppercase tracking-widest">
                    <Scale size={13} /> Size Calibration Metric
                  </span>
                  <h2 className="hg-display mt-4 text-3xl sm:text-5xl lg:text-6xl text-hg-fg font-extrabold">
                    What is “Sutta” in Foxnuts (Makhana)?
                  </h2>
                </div>
                <div className="rounded-xl border border-hg-gold/60 bg-hg-gold/15 px-5 py-3 shrink-0">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-hg-fg3 font-semibold">Standard Ratio</p>
                  <p className="font-mono text-lg font-black text-hg-gold">1 Sutta ≈ 3.2 mm</p>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-hg-line bg-hg-card/70 p-6 sm:p-8 backdrop-blur-sm">
                <p className="text-base sm:text-lg leading-relaxed text-hg-fg font-medium max-w-4xl">
                  In foxnut grading in India, <strong className="text-hg-gold font-bold">1 sutta ≈ 3.2 mm</strong> in diameter. The “sutta” count reflects the approximate size of each popped kernel — higher counts mean larger, more premium foxnuts prized for their look, texture, and crunch.
                </p>
              </div>

              {/* 3 EXPORT GRADES CARDS */}
              <div className="mt-10 grid grid-cols-1 gap-7 lg:grid-cols-3">
                {product.grades.map((g, i) => (
                  <Reveal key={g.name} delay={i * 0.08}>
                    <div className="group flex h-full flex-col justify-between rounded-2xl border-2 border-hg-line bg-hg-card p-7 transition-all duration-300 hover:border-hg-gold hover:shadow-xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-hg-gold/5 rounded-full blur-2xl pointer-events-none group-hover:bg-hg-gold/15 transition-colors" />
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <span className="font-mono text-xs font-bold uppercase tracking-wider text-hg-gold bg-hg-gold/10 border border-hg-gold/30 px-3 py-1 rounded-full">
                            Export Grade 0{i + 1}
                          </span>
                          <span className="font-mono text-xs font-bold text-hg-fg3">
                            {g.spec}
                          </span>
                        </div>

                        <h3 className="text-2xl font-black text-hg-fg group-hover:text-hg-gold transition-colors">
                          {g.name}
                        </h3>

                        {g.shortDesc && (
                          <p className="mt-2 text-sm font-semibold text-hg-gold">
                            {g.shortDesc}
                          </p>
                        )}

                        <p className="mt-4 text-[14.5px] leading-relaxed text-hg-fg2 font-medium">
                          {g.note}
                        </p>
                      </div>

                      <div className="mt-6 pt-5 border-t border-hg-line flex items-center justify-between">
                        <span className="text-xs font-mono uppercase tracking-wider text-hg-fg3 font-semibold">Inspection Standard</span>
                        <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                          <CheckCircle2 size={13} /> 100% Sortex Cleaned
                        </span>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* NATURAL VARIATION DISCLAIMER BANNER */}
              {product.variationDisclaimer && (
                <div className="mt-8 rounded-xl border border-hg-gold/30 bg-hg-gold/5 p-4 sm:p-5 flex items-start gap-3">
                  <Info size={18} className="text-hg-gold shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm font-medium text-hg-fg2 leading-relaxed italic">
                    “{product.variationDisclaimer}”
                  </p>
                </div>
              )}
            </div>

            {/* 2. WHY CHOOSE OUR FOXNUTS (6 PILLARS) */}
            {product.whyChoose && (
              <div>
                <div className="border-b-2 border-hg-line pb-6">
                  <span className="inline-flex items-center gap-2 rounded-full border border-hg-gold/40 bg-hg-gold/15 px-3.5 py-1 text-xs font-mono font-bold text-hg-gold uppercase tracking-widest">
                    <Award size={13} /> Competitive Advantage
                  </span>
                  <h2 className="hg-display mt-4 text-3xl sm:text-5xl text-hg-fg font-extrabold">
                    Why Choose Our Foxnuts?
                  </h2>
                  <p className="mt-3 text-base text-hg-fg2 font-medium max-w-2xl">
                    Engineered for international buyers seeking uniform calibration, verified moisture levels, and consistent export container loads.
                  </p>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {product.whyChoose.map((item, idx) => (
                    <Reveal key={item.title} delay={idx * 0.05}>
                      <div className="rounded-xl border border-hg-line bg-hg-card p-6 h-full flex flex-col justify-between hover:border-hg-gold/50 transition-all shadow-sm">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-hg-gold/15 text-hg-gold font-bold font-mono text-sm border border-hg-gold/30">
                              0{idx + 1}
                            </span>
                            <h4 className="text-lg font-bold text-hg-fg">{item.title}</h4>
                          </div>
                          <p className="mt-3.5 text-sm text-hg-fg2 leading-relaxed font-medium">
                            {item.desc}
                          </p>
                        </div>
                        <div className="mt-5 flex items-center gap-1.5 text-xs font-mono text-hg-gold font-bold">
                          <CheckCircle2 size={13} /> Export Standard
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            )}

            {/* 3. START YOUR FOXNUT SUCCESS STORY TODAY (HIGH CONVERSION HERO BANNER) */}
            <Reveal>
              <div className="rounded-3xl border-2 border-hg-gold/70 bg-gradient-to-br from-hg-card via-hg-bg2 to-[#122318] p-8 sm:p-14 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-hg-gold/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 max-w-3xl">
                  <span className="inline-flex items-center gap-2 rounded-full border border-hg-gold/50 bg-hg-gold/15 px-4 py-1.5 text-xs font-mono font-bold text-hg-gold uppercase tracking-[0.2em]">
                    <Sparkles size={14} className="text-hg-gold animate-pulse" /> Lucrative Global Opportunity
                  </span>
                  <h3 className="hg-display mt-6 text-3xl sm:text-5xl lg:text-6xl text-hg-fg font-black leading-tight">
                    Start Your Foxnut Success Story Today!
                  </h3>
                  <p className="mt-5 text-base sm:text-lg text-hg-fg2 leading-relaxed font-medium">
                    Don’t just watch the demand grow — own it. Import our premium organic foxnuts into your country, put them under your own brand, and become the go-to supplier in your market. The demand is rising, the margins are attractive, and the time to act is now. Secure your first shipment today and start building your profitable foxnut empire.
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Link to="/contact" className="hg-btn hg-btn--solid font-bold text-sm">
                      <span>Secure Your First Shipment</span>
                    </Link>
                    <a
                      href="mailto:contact@harvestgateoverseas.com?subject=Foxnut%20Import%20%26%20Rebranding%20Enquiry"
                      className="flex items-center gap-2 font-mono text-xs font-bold text-hg-gold hover:underline transition-colors"
                    >
                      <Mail size={15} /> contact@harvestgateoverseas.com
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

          </div>
        </section>
      )}

      {/* DEDICATED VARIETIES SHOWCASE SECTION (Millets, Pulses, etc.) */}
      {product.varieties && product.varieties.length > 0 && (
        <section className="border-b-2 border-hg-line bg-hg-bg2/80 py-20 sm:py-28">
          <div className="hg-container">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b-2 border-hg-line pb-8">
              <div>
                <p className="hg-eyebrow text-[12px] font-bold">Comprehensive Catalogue</p>
                <h2 className="hg-display mt-4 text-4xl sm:text-5xl lg:text-6xl text-hg-fg font-extrabold">
                  {product.varieties.length} Certified Indian {product.name.split("&")[0].trim()} Varieties
                </h2>
              </div>
              <p className="max-w-md text-sm font-medium text-hg-fg2 leading-relaxed">
                Single-origin, sortex-cleaned export-grade {product.name.toLowerCase()} processed for global food manufacturers, ethnic distributors, and institutional importers.
              </p>
            </div>

            {/* VARIETIES GRID */}
            <div className="mt-14 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
              {product.varieties.map((v, i) => (
                <Reveal key={v.id} delay={i * 0.05}>
                  <div className="group flex h-full flex-col justify-between overflow-hidden border-2 border-hg-line bg-hg-card transition-all duration-300 hover:border-hg-gold hover:shadow-xl rounded-sm">
                    {/* CLEAN GRAIN / PULSE IMAGE */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
                      <img
                        src={v.image}
                        alt={v.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                      />
                    </div>

                    {/* CONTENT & SPECS */}
                    <div className="flex flex-1 flex-col justify-between p-6">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="font-mono text-[11px] font-bold text-hg-gold uppercase tracking-wider">
                            Variety 0{i + 1}
                          </span>
                        </div>
                        <h3 className="text-2xl font-extrabold text-hg-fg mt-1 group-hover:text-hg-gold transition-colors">
                          {v.name}
                        </h3>
                        <p className="font-mono text-[11px] uppercase tracking-wider text-hg-gold font-semibold mt-0.5">
                          {v.localName} · <span className="italic normal-case text-hg-fg3">{v.botanical}</span>
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-hg-fg font-medium">{v.description}</p>

                        {/* HIGHLIGHT PILLS */}
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {v.highlights.map((h) => (
                            <span
                              key={h}
                              className="inline-flex items-center gap-1 rounded bg-hg-bg2 px-2.5 py-1 font-mono text-[10.5px] font-bold text-hg-fg border border-hg-line"
                            >
                              <Sparkles size={11} className="text-hg-gold shrink-0" />
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* HARVESTGATE ADVANTAGES BANNER */}
            <div className="mt-16 rounded-sm border-2 border-hg-gold/60 bg-hg-card p-8 sm:p-12 shadow-lg">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-5">
                  <p className="hg-eyebrow text-[12px] font-bold">Why Source From HarvestGate?</p>
                  <h3 className="hg-display mt-4 text-3xl sm:text-4xl text-hg-fg font-extrabold">
                    Unmatched Purity, Traceable Provenance.
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-hg-fg2 font-medium">
                    At HarvestGate Overseas, our export crops undergo twin-pass optical sortex cleaning, gravity separation, and rigorous NABL-accredited laboratory testing before vessel dispatch.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7">
                  {[
                    ["100% Sortex Cleaned", "Machine-cleaned and double-pass sortex sorted for uniform size, color and zero foreign matter."],
                    ["Direct Mandi Aggregation", "Procured directly from primary farming mandis across Madhya Pradesh, Rajasthan, Maharashtra & UP."],
                    ["Accredited Lab Testing", "Consignments backed by FSSAI-approved and NABL laboratory analysis for moisture, purity & pesticide residue."],
                    ["Export-Grade Packaging", "Vacuum retail packs (500g - 1kg) or bulk export shipments in 25kg / 50kg PP, HDPE and Jute bags."],
                  ].map(([t, d]) => (
                    <div key={t} className="border border-hg-line bg-hg-bg2/60 p-5 rounded">
                      <div className="flex items-center gap-2.5 text-hg-gold font-bold text-[15px]">
                        <CheckCircle2 size={16} className="shrink-0 text-hg-gold" />
                        <span>{t}</span>
                      </div>
                      <p className="mt-2 text-[13px] leading-relaxed text-hg-fg font-medium">{d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* OVERVIEW + SPECS */}
      <section className="hg-container py-20 sm:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            {!isFoxnuts && (
              <>
                <p className="hg-eyebrow text-[12px] font-bold">Commodity Overview</p>
                <Reveal>
                  <p className="mt-6 text-xl leading-relaxed text-hg-fg font-semibold sm:text-2xl">{product.intro}</p>
                  <p className="mt-6 text-[16.5px] leading-relaxed text-hg-fg2 font-medium">{product.description}</p>
                </Reveal>
              </>
            )}

            {/* HOW TO ORDER CARD */}
            {product.howToOrder && (
              <Reveal delay={0.1} className={`${isFoxnuts ? "" : "mt-10"} rounded-2xl border border-hg-gold/50 bg-hg-gold/10 p-6 sm:p-8`}>
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-hg-gold font-bold flex items-center gap-2">
                  <Clock size={15} /> How to Order
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-hg-fg font-medium">
                  {product.howToOrder}
                </p>
              </Reveal>
            )}

            {!isFoxnuts && (
              <Reveal delay={0.1} className="mt-14">
                <p className="hg-eyebrow text-[12px] font-bold">Standard Grades & Calibrations</p>
                <div className="mt-6 border-t-2 border-hg-line">
                  {product.grades.map((g) => (
                    <div
                      key={g.name}
                      className="group flex flex-col gap-2 border-b border-hg-line py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 transition-colors hover:bg-hg-bg2/40 px-2"
                    >
                      <div className="flex items-baseline gap-4">
                        <span
                          className="h-3 w-3 shrink-0 rounded-full transition-transform duration-300 group-hover:scale-150"
                          style={{ backgroundColor: accent }}
                        />
                        <div>
                          <p className="text-[17px] font-bold text-hg-fg">{g.name}</p>
                          <p className="mt-1 text-[13.5px] font-medium text-hg-fg3">{g.note}</p>
                        </div>
                      </div>
                      <p className="shrink-0 pl-7 font-mono text-[13px] uppercase tracking-[0.16em] font-bold text-hg-gold sm:pl-0">
                        {g.spec}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.12} className="overflow-hidden border-2 border-hg-line shadow-lg">
              <img
                src={product.image}
                alt={`${product.name} close up`}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </Reveal>

            <Reveal delay={0.18} className="mt-8 border-2 border-hg-line bg-hg-card p-6 sm:p-8 shadow-sm">
              <p className="hg-eyebrow text-[11.5px] font-bold">Physical & Chemical Spec Sheet</p>
              <dl data-testid="quick-spec-table" className="mt-6">
                {product.specs.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 border-b border-hg-line py-3.5 last:border-0">
                    <dt className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-hg-fg3 font-semibold">{k}</dt>
                    <dd className="text-right text-[15px] font-bold text-hg-fg">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.22} className="mt-8 space-y-7 border-2 border-hg-line bg-hg-bg2 p-6 sm:p-8 shadow-sm">
              <div>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-hg-fg3 font-semibold">
                  Minimum Order (MOQ)
                </p>
                <p className="mt-2 text-[16px] font-bold text-hg-fg">{product.moq}</p>
              </div>

              {product.orderTerms && (
                <>
                  <div>
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-hg-fg3 font-semibold">
                      Order Preparation Time
                    </p>
                    <p className="mt-2 text-[15px] font-bold text-hg-fg">{product.orderTerms.prepTime}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-hg-fg3 font-semibold">
                      Sampling Policy
                    </p>
                    <p className="mt-2 text-[15px] font-bold text-hg-fg">{product.orderTerms.samples}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-hg-fg3 font-semibold">
                      Pricing Validity Window
                    </p>
                    <p className="mt-2 text-[15px] font-bold text-hg-gold">{product.orderTerms.validity}</p>
                  </div>
                </>
              )}

              <div>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-hg-fg3 font-semibold">Incoterms Offered</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.incoterms.map((t) => (
                    <span
                      key={t}
                      className="border-2 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] font-bold bg-white dark:bg-black/40"
                      style={{ borderColor: accent, color: accent }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-hg-fg3 font-semibold">
                  Export Destinations
                </p>
                <p className="mt-2 text-[15px] font-medium leading-relaxed text-hg-fg">
                  {product.markets.join(" · ")}
                </p>
              </div>
              <Link
                to="/contact"
                data-testid="product-enquire-cta"
                className="hg-btn hg-btn--solid w-full justify-center text-[13px] font-bold py-4"
              >
                <span>Request Quotation for {product.name}</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* OTHER PRODUCTS */}
      <section className="border-t-2 border-hg-line bg-hg-bg2">
        <div className="hg-container py-20 sm:py-28">
          <p className="hg-eyebrow text-[12px] font-bold">Explore More Commodities</p>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.slice(0, 6).map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06}>
                <Link
                  to={`/products/${p.slug}`}
                  data-testid={`related-product-${p.slug}`}
                  className="group block overflow-hidden border-2 border-hg-line bg-hg-card transition-colors duration-300 hover:border-hg-gold shadow-sm"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform ease-out group-hover:scale-[1.08]"
                      style={{ transitionDuration: '1100ms' }}
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                  <div className="flex items-center justify-between gap-4 p-5 sm:p-6">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.24em] font-bold" style={{ color: surfaceAccent(p, theme) }}>
                        {p.index} / {p.subtitle.split("·")[0]}
                      </p>
                      <h3 className="hg-display mt-1 text-2xl sm:text-3xl text-hg-fg font-bold">{p.name}</h3>
                    </div>
                    <ArrowUpRight
                      size={20}
                      className="shrink-0 text-hg-fg3 transition-all duration-300 group-hover:rotate-45 group-hover:text-hg-gold"
                    />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
