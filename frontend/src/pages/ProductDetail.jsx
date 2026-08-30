import { useRef, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowLeft, CheckCircle2, ShieldCheck, Package, Sparkles, ChevronDown } from "lucide-react";
import { MaskLines, Reveal } from "../components/motion/Reveal";
import { getProduct, PRODUCTS, surfaceAccent } from "../data/products";
import { useTheme } from "../theme/ThemeProvider";

const ProductDetail = () => {
  const { slug } = useParams();
  const { theme } = useTheme();
  const product = getProduct(slug);
  const [activeMilletTab, setActiveMilletTab] = useState(null);
  const imgRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  if (!product) return <Navigate to="/products" replace />;

  const others = PRODUCTS.filter((p) => p.slug !== product.slug);
  const accent = surfaceAccent(product, theme);
  const isMillets = product.slug === "millets";

  return (
    <div data-testid={`page-product-${product.slug}`} className="pt-[110px] sm:pt-[130px]">
      {/* HERO */}
      <section ref={imgRef} className="relative overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-hg-bg via-hg-bg/35 to-black/25 dark:via-hg-bg/60 dark:to-black/60" />
        </motion.div>

        <div className="hg-container relative z-10 pb-16 pt-14 sm:pb-24 sm:pt-20">
          <Link
            to="/products"
            data-testid="product-back-link"
            className="group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.24em] font-semibold text-hg-fg transition-colors hover:text-hg-gold"
          >
            <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1 text-hg-gold" />
            All Export Products
          </Link>

          <p className="hg-eyebrow mt-8 text-[12px] font-bold" style={{ color: accent }}>
            {product.index} — {product.subtitle}
          </p>
          <MaskLines
            data-testid="product-heading"
            delay={0.1}
            className="hg-display mt-5 text-[14vw] leading-[0.88] text-hg-fg sm:text-[8.5vw] lg:text-[6.5vw] font-extrabold"
            lines={product.name.split(" ")}
          />
          <Reveal delay={0.25}>
            <p className="hg-italic mt-6 max-w-3xl text-2xl leading-snug sm:text-3xl font-medium" style={{ color: accent }}>
              {product.tagline}
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t-2 border-hg-line pt-8 sm:grid-cols-4">
            {[
              ["Origin Cluster", product.origin],
              ["HS Tariff Code", product.hsCode],
              ["Harvest & Availability", product.season],
              ["Program Type", product.accentName],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-hg-fg3 font-semibold">{k}</p>
                <p className="mt-2 text-[15.5px] font-bold leading-snug text-hg-fg">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEDICATED 10-VARIETY MILLETS SHOWCASE SECTION */}
      {isMillets && product.varieties && (
        <section className="border-b-2 border-hg-line bg-hg-bg2/80 py-20 sm:py-28">
          <div className="hg-container">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b-2 border-hg-line pb-8">
              <div>
                <p className="hg-eyebrow text-[12px] font-bold">Comprehensive Catalogue</p>
                <h2 className="hg-display mt-4 text-4xl sm:text-5xl lg:text-6xl text-hg-fg font-extrabold">
                  10 Certified Indian Millet Varieties
                </h2>
              </div>
              <p className="max-w-md text-sm font-medium text-hg-fg2 leading-relaxed">
                Single-origin, unpolished, sortex-cleaned ancient grains processed for global food manufacturers, retail packagers, and institutional importers.
              </p>
            </div>

            {/* VARIETIES GRID */}
            <div className="mt-14 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
              {product.varieties.map((v, i) => (
                <Reveal key={v.id} delay={i * 0.05}>
                  <div className="group flex h-full flex-col justify-between overflow-hidden border-2 border-hg-line bg-hg-card transition-all duration-300 hover:border-hg-gold hover:shadow-xl rounded-sm">
                    {/* GRAIN IMAGE */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
                      <img
                        src={v.image}
                        alt={v.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                      <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                        <span className="bg-black/75 backdrop-blur-md text-white font-mono text-[11px] font-bold px-2.5 py-1 rounded border border-white/20">
                          0{i + 1}
                        </span>
                        <span className="bg-hg-gold text-black font-mono text-[10.5px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                          HS {v.hsCode}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <p className="font-mono text-[11px] uppercase tracking-widest text-hg-gold font-bold">
                          {v.localName} · <span className="italic normal-case text-white/90">{v.botanical}</span>
                        </p>
                        <h3 className="text-2xl font-extrabold drop-shadow mt-0.5">{v.name}</h3>
                      </div>
                    </div>

                    {/* CONTENT & SPECS */}
                    <div className="flex flex-1 flex-col justify-between p-6">
                      <div>
                        <p className="text-sm leading-relaxed text-hg-fg font-medium">{v.description}</p>

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

                      {/* SPEC SHEET ACCORDION / TOGGLE */}
                      <div className="mt-6 border-t border-hg-line pt-4">
                        <button
                          type="button"
                          onClick={() => setActiveMilletTab(activeMilletTab === v.id ? null : v.id)}
                          className="flex w-full items-center justify-between font-mono text-[11.5px] uppercase tracking-[0.16em] font-bold text-hg-gold hover:underline py-1"
                        >
                          <span>{activeMilletTab === v.id ? "Hide Spec Details" : "View Physical Parameters"}</span>
                          <ChevronDown
                            size={14}
                            className={`transition-transform duration-300 ${activeMilletTab === v.id ? "rotate-180" : ""}`}
                          />
                        </button>

                        <AnimatePresence>
                          {activeMilletTab === v.id && (
                            <motion.dl
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-3 space-y-2 border-t border-hg-line/60 pt-3 text-[12px] font-mono"
                            >
                              {v.specs.map(([k, val]) => (
                                <div key={k} className="flex items-center justify-between py-1 border-b border-hg-line/30 last:border-0">
                                  <dt className="text-hg-fg3 font-semibold uppercase">{k}</dt>
                                  <dd className="font-bold text-hg-fg">{val}</dd>
                                </div>
                              ))}
                              <div className="flex items-center justify-between py-1 pt-2">
                                <dt className="text-hg-fg3 font-semibold uppercase">Major Producing States</dt>
                                <dd className="font-bold text-hg-gold">{v.origin}</dd>
                              </div>
                            </motion.dl>
                          )}
                        </AnimatePresence>
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
                  <p className="hg-eyebrow text-[12px] font-bold">Why Source Millets From HarvestGate?</p>
                  <h3 className="hg-display mt-4 text-3xl sm:text-4xl text-hg-fg font-extrabold">
                    Unpolished Purity, Traceable Provenance.
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-hg-fg2 font-medium">
                    At HarvestGate Overseas, our unpolished millets retain the nutrient-rich bran layer, delivering superior dietary fiber, bioavailable minerals, and authentic aroma.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7">
                  {[
                    ["100% Organic & Natural", "Unpolished grains, handpicked, wholesome, chemical-free and nutrient-dense."],
                    ["Direct Farm Procurement", "Procured ethically and directly from trusted Indian farmer producer cooperatives."],
                    ["Accredited Lab Testing", "Testing on request at NABL-accredited & FSSAI-approved labs covering 210+ pesticide residues."],
                    ["Export-Ready Packaging", "Vacuum pouches (250g - 1kg) in sturdy cartons; bulk exports in 5kg, 10kg, 25kg & 50kg HDPE bags."],
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
            <p className="hg-eyebrow text-[12px] font-bold">Commodity Overview</p>
            <Reveal>
              <p className="mt-6 text-xl leading-relaxed text-hg-fg font-semibold sm:text-2xl">{product.intro}</p>
              <p className="mt-6 text-[16.5px] leading-relaxed text-hg-fg2 font-medium">{product.description}</p>
            </Reveal>

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
                      className="h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.08]"
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
