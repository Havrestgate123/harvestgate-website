import { useRef } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
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

      {/* INTRO + IMAGE */}
      <section className="hg-container py-20 sm:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="hg-eyebrow text-[12px] font-bold">Commodity Overview</p>
            <Reveal>
              <p className="mt-6 text-xl leading-relaxed text-hg-fg font-semibold sm:text-2xl">{product.intro}</p>
              <p className="mt-6 text-[16.5px] leading-relaxed text-hg-fg2 font-medium">{product.description}</p>
            </Reveal>

            <Reveal delay={0.1} className="mt-14">
              <p className="hg-eyebrow text-[12px] font-bold">Grades & Calibration</p>
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
