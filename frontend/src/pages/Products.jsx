import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { MaskLines, MaskLinesInView, Reveal, Marquee } from "../components/motion/Reveal";
import { PRODUCTS, surfaceAccent } from "../data/products";
import { useTheme } from "../theme/ThemeProvider";

const SPANS = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];
const RATIOS = ["aspect-[4/3] lg:aspect-[16/11]", "aspect-[4/3] lg:aspect-[5/4]", "aspect-[4/3] lg:aspect-[5/4]", "aspect-[4/3] lg:aspect-[16/11]"];

const Products = () => {
  const { theme } = useTheme();
  return (
  <div data-testid="page-products" className="pt-[68px] sm:pt-[84px]">
    <section className="hg-container pt-20 pb-14 sm:pt-28 sm:pb-20">
      <p className="hg-eyebrow">Catalogue — 2026 season</p>
      <MaskLines
        data-testid="products-heading"
        delay={0.12}
        className="hg-display mt-6 text-[15vw] leading-[0.86] text-hg-fg sm:text-[10vw] lg:text-[7.5vw]"
        lines={["The", "Catalogue"]}
      />
      <div className="mt-12 grid grid-cols-1 gap-8 border-t border-hg-line pt-9 lg:grid-cols-12">
        <p className="max-w-2xl text-base leading-[1.85] text-hg-fg2 lg:col-span-7">
          Four crop programmes, each run as a closed loop from contracted cluster to stuffed
          container. Grades, laboratory parameters, packaging formats and incoterms are
          published up front —
          <span className="hg-italic text-hg-fg text-lg"> no discovery calls required to get to a spec sheet.</span>
        </p>
        <div className="lg:col-span-4 lg:col-start-9">
          <dl className="space-y-3 font-mono text-[10px] uppercase tracking-[0.18em] text-hg-fg3">
            <div className="flex justify-between border-b border-hg-line pb-2">
              <dt>Programmes</dt>
              <dd className="text-hg-gold">04</dd>
            </div>
            <div className="flex justify-between border-b border-hg-line pb-2">
              <dt>Min. order</dt>
              <dd className="text-hg-gold">1 x 20ft FCL</dd>
            </div>
            <div className="flex justify-between border-b border-hg-line pb-2">
              <dt>Sampling</dt>
              <dd className="text-hg-gold">Free, courier at cost</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <Marquee
      items={["Grade sheets on request", "Third-party inspection welcome", "Private label available", "Sample within 72h"]}
      testId="products-marquee"
    />

    <section className="hg-container py-16 sm:py-24">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-7">
        {PRODUCTS.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 0.08} className={SPANS[i]}>
            <Link
              to={`/products/${p.slug}`}
              data-testid={`product-card-${p.slug}`}
              className="group relative flex h-full flex-col overflow-hidden border border-hg-line bg-hg-card"
            >
              <div className={`relative overflow-hidden ${RATIOS[i]}`}>
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span
                  className="absolute left-0 top-0 h-[3px] w-0 transition-all duration-700 ease-out group-hover:w-full"
                  style={{ backgroundColor: p.accent }}
                />
                <p
                  className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.3em] sm:left-7 sm:top-7"
                  style={{ color: p.accent }}
                >
                  {p.index}
                </p>
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em]" style={{ color: surfaceAccent(p, theme) }}>
                      {p.subtitle}
                    </p>
                    <h2 className="hg-display mt-2.5 text-3xl text-hg-fg sm:text-4xl">{p.name}</h2>
                  </div>
                  <span className="grid h-10 w-10 shrink-0 place-items-center border border-hg-line text-hg-fg2 transition-colors duration-500 group-hover:border-hg-gold group-hover:text-hg-gold">
                    <ArrowUpRight size={15} className="transition-transform duration-500 group-hover:rotate-45" />
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-hg-fg2">{p.tagline}</p>
                <dl className="mt-7 grid grid-cols-2 gap-y-4 border-t border-hg-line pt-6 font-mono text-[10px] uppercase tracking-[0.14em] sm:grid-cols-3">
                  <div>
                    <dt className="text-hg-fg3">Origin</dt>
                    <dd className="mt-1.5 normal-case tracking-normal text-hg-fg">{p.origin.split(",")[0]}</dd>
                  </div>
                  <div>
                    <dt className="text-hg-fg3">HS code</dt>
                    <dd className="mt-1.5 text-hg-fg">{p.hsCode}</dd>
                  </div>
                  <div>
                    <dt className="text-hg-fg3">Grades</dt>
                    <dd className="mt-1.5 text-hg-fg">{String(p.grades.length).padStart(2, "0")}</dd>
                  </div>
                </dl>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>

    <section className="border-t border-hg-line bg-hg-bg2">
      <div className="hg-container py-20 text-center sm:py-28">
        <MaskLinesInView
          className="hg-display mx-auto max-w-3xl text-4xl leading-[0.92] text-hg-fg sm:text-5xl lg:text-6xl"
          lines={["Need a blended", "multi-product container?"]}
        />
        <Reveal delay={0.15}>
          <p className="hg-italic mx-auto mt-5 max-w-lg text-lg text-hg-gold">
            We consolidate mixed pallets across all four programmes.
          </p>
          <Link to="/contact" data-testid="products-cta-enquire" className="hg-btn hg-btn--solid mt-9">
            <span>Start an enquiry</span>
            <ArrowUpRight size={13} className="relative z-[2]" />
          </Link>
        </Reveal>
      </div>
    </section>
  </div>
  );
};

export default Products;
