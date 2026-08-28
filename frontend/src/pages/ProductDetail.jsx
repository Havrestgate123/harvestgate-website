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
    <div data-testid={`page-product-${product.slug}`} className="pt-[68px] sm:pt-[84px]">
      {/* HERO */}
      <section ref={imgRef} className="relative overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          <div className={`absolute inset-0 ${theme === "light" ? "bg-hg-bg/80" : "bg-hg-bg/58"}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-hg-bg via-hg-bg/45 to-hg-bg/60" />
        </motion.div>

        <div className="hg-container relative z-10 pb-16 pt-16 sm:pb-24 sm:pt-24">
          <Link
            to="/products"
            data-testid="product-back-link"
            className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.26em] text-hg-fg2 transition-colors hover:text-hg-gold"
          >
            <ArrowLeft size={12} className="transition-transform duration-300 group-hover:-translate-x-1" />
            All products
          </Link>

          <p className="hg-eyebrow mt-10" style={{ color: accent }}>
            {product.index} — {product.subtitle}
          </p>
          <MaskLines
            data-testid="product-heading"
            delay={0.1}
            className="hg-display mt-5 text-[14vw] leading-[0.86] text-hg-fg sm:text-[9vw] lg:text-[6.8vw]"
            lines={product.name.split(" ")}
          />
          <Reveal delay={0.35}>
            <p className="hg-italic mt-6 max-w-2xl text-xl leading-snug sm:text-2xl" style={{ color: accent }}>
              {product.tagline}
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-hg-line pt-8 sm:grid-cols-4">
            {[
              ["Origin", product.origin],
              ["HS code", product.hsCode],
              ["Harvest window", product.season],
              ["Accent", product.accentName],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-hg-fg3">{k}</p>
                <p className="mt-2 text-sm leading-snug text-hg-fg">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTRO + IMAGE */}
      <section className="hg-container py-20 sm:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="hg-eyebrow">Overview</p>
            <Reveal>
              <p className="mt-7 text-lg leading-[1.75] text-hg-fg sm:text-xl">{product.intro}</p>
              <p className="mt-7 text-base leading-[1.9] text-hg-fg2">{product.description}</p>
            </Reveal>

            <Reveal delay={0.1} className="mt-14">
              <p className="hg-eyebrow">Grades offered</p>
              <div className="mt-7 border-t border-hg-line">
                {product.grades.map((g) => (
                  <div
                    key={g.name}
                    className="group flex flex-col gap-2 border-b border-hg-line py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
                  >
                    <div className="flex items-baseline gap-4">
                      <span
                        className="h-2 w-2 shrink-0 rounded-full transition-transform duration-500 group-hover:scale-150"
                        style={{ backgroundColor: accent }}
                      />
                      <div>
                        <p className="text-base text-hg-fg">{g.name}</p>
                        <p className="mt-1 text-sm text-hg-fg3">{g.note}</p>
                      </div>
                    </div>
                    <p className="shrink-0 pl-6 font-mono text-[11px] uppercase tracking-[0.16em] text-hg-fg2 sm:pl-0">
                      {g.spec}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.12} className="hg-spotlight overflow-hidden border border-hg-line">
              <img
                src={product.image}
                alt={`${product.name} close up`}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </Reveal>

            <Reveal delay={0.18} className="mt-8 border border-hg-line bg-hg-card p-6 sm:p-8">
              <p className="hg-eyebrow">Specification sheet</p>
              <dl data-testid="quick-spec-table" className="mt-6">
                {product.specs.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 border-b border-hg-line py-3.5 last:border-0">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-hg-fg3">{k}</dt>
                    <dd className="text-right text-sm text-hg-fg">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.22} className="mt-8 space-y-7 border border-hg-line p-6 sm:p-8">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-hg-fg3">
                  Minimum order
                </p>
                <p className="mt-2 text-sm text-hg-fg">{product.moq}</p>
              </div>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-hg-fg3">Incoterms</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.incoterms.map((t) => (
                    <span
                      key={t}
                      className="border px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em]"
                      style={{ borderColor: `${accent}55`, color: accent }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-hg-fg3">
                  Active markets
                </p>
                <p className="mt-2 text-sm leading-relaxed text-hg-fg2">
                  {product.markets.join(" · ")}
                </p>
              </div>
              <Link
                to="/contact"
                data-testid="product-enquire-cta"
                className="hg-btn hg-btn--solid w-full justify-center"
              >
                <span>Enquire about {product.name}</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* OTHER PRODUCTS */}
      <section className="border-t border-hg-line bg-hg-bg2">
        <div className="hg-container py-20 sm:py-28">
          <p className="hg-eyebrow">Continue browsing</p>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {others.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.07}>
                <Link
                  to={`/products/${p.slug}`}
                  data-testid={`related-product-${p.slug}`}
                  className="group block overflow-hidden border border-hg-line bg-hg-card"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.08]"
                    />
                    <div className="absolute inset-0 bg-black/25" />
                  </div>
                  <div className="flex items-center justify-between gap-4 p-5">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.24em]" style={{ color: surfaceAccent(p, theme) }}>
                        {p.index}
                      </p>
                      <h3 className="hg-display mt-2 text-2xl text-hg-fg">{p.name}</h3>
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="shrink-0 text-hg-fg3 transition-all duration-500 group-hover:rotate-45 group-hover:text-hg-gold"
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
