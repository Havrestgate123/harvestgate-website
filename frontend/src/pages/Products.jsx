import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { MaskLines, MaskLinesInView, Reveal, Marquee } from "../components/motion/Reveal";
import { PRODUCTS, surfaceAccent } from "../data/products";
import { useTheme } from "../theme/ThemeProvider";

const MARQUEE_ITEMS = [
  "Phool Makhana",
  "Ancient Millets",
  "Rolled & Steel-Cut Oats",
  "Refined Sugar & Cane Jaggery",
  "Export Pulses & Dal",
  "Basmati & Long Grain Rice",
  "Roasted Wheat Daliya",
  "APEDA Registered",
  "IEC AAICH2946R",
  "GSTIN 09AAICH2946R1ZR",
];

const Products = () => {
  const { theme } = useTheme();

  return (
    <div data-testid="page-products" className="pt-[110px] sm:pt-[130px]">
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
            Seven dedicated crop programmes, each run as a closed loop from contracted farm clusters to
            stuffed containers at port. Standardized grades, physical and chemical parameters, packaging
            customization and incoterms published up front —
            <span className="hg-italic text-hg-fg text-lg">
              {" "}
              direct procurement with verifiable Indian provenance.
            </span>
          </p>
          <div className="lg:col-span-4 lg:col-start-9">
            <dl className="space-y-3 font-mono text-[10px] uppercase tracking-[0.18em] text-hg-fg3">
              <div className="flex justify-between border-b border-hg-line pb-2">
                <dt>Programmes</dt>
                <dd className="text-hg-gold font-bold">07 Commodities</dd>
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

      {/* ALL 7 PRODUCTS GRID */}
      <section className="hg-container py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {PRODUCTS.map((p, i) => (
            <Reveal
              key={p.slug}
              delay={(i % 3) * 0.08}
              className={i === 0 ? "md:col-span-2 lg:col-span-2" : "col-span-1"}
            >
              <Link
                to={`/products/${p.slug}`}
                data-testid={`product-card-${p.slug}`}
                className="group relative flex h-full flex-col overflow-hidden border border-hg-line bg-hg-card transition-colors duration-300 hover:border-hg-gold"
              >
                <div className={`relative overflow-hidden ${i === 0 ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <span
                    className="absolute left-0 top-0 h-[3.5px] w-0 transition-all duration-700 ease-out group-hover:w-full"
                    style={{ backgroundColor: p.accent }}
                  />
                  <p
                    className="absolute left-5 top-5 font-mono text-[11px] uppercase tracking-[0.3em] font-bold sm:left-6 sm:top-6"
                    style={{ color: p.accent }}
                  >
                    {p.index}
                  </p>
                  <div className="absolute bottom-4 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6">
                    <p
                      className="font-mono text-[10px] uppercase tracking-[0.24em] font-medium"
                      style={{ color: surfaceAccent(p, "dark") }}
                    >
                      {p.subtitle}
                    </p>
                    <h2 className="hg-display mt-1 text-3xl text-white sm:text-4xl">
                      {p.name}
                    </h2>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6 justify-between">
                  <div>
                    <p className="text-sm leading-relaxed text-hg-fg2">{p.tagline}</p>
                  </div>
                  <dl className="mt-6 grid grid-cols-2 gap-y-3 border-t border-hg-line pt-5 font-mono text-[10px] uppercase tracking-[0.14em]">
                    <div>
                      <dt className="text-hg-fg3">Origin</dt>
                      <dd className="mt-1 normal-case tracking-normal font-medium text-hg-fg">
                        {p.origin.split(",")[0]}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-hg-fg3">HS Code</dt>
                      <dd className="mt-1 font-medium text-hg-fg">{p.hsCode}</dd>
                    </div>
                  </dl>
                  <div className="mt-5 flex items-center justify-between pt-3 border-t border-hg-line/40">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-hg-gold">
                      View Spec Sheet
                    </span>
                    <span className="grid h-8 w-8 place-items-center border border-hg-line text-hg-fg2 transition-colors duration-300 group-hover:border-hg-gold group-hover:text-hg-gold">
                      <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:rotate-45" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CONSOLIDATION BANNER */}
      <section className="border-t border-hg-line bg-hg-bg2">
        <div className="hg-container py-20 text-center sm:py-28">
          <MaskLinesInView
            className="hg-display mx-auto max-w-3xl text-4xl leading-[0.92] text-hg-fg sm:text-5xl lg:text-6xl"
            lines={["Need a blended", "multi-commodity container?"]}
          />
          <Reveal delay={0.15}>
            <p className="hg-italic mx-auto mt-5 max-w-lg text-lg text-hg-gold">
              We consolidate mixed pallets across Foxnuts, Millets, Oats, Sugar, Pulses, Grains and Daliya.
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
