import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { MaskLines, MaskLinesInView, Reveal } from "../components/motion/Reveal";
import { AccreditationsMarquee } from "../components/AccreditationsMarquee";
import { PRODUCTS, MANIFESTO, STATS, IMG } from "../data/products";

const EASE = [0.16, 1, 0.3, 1];

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.16]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      data-testid="home-hero"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-32"
    >
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0 z-0">
        <img
          src={IMG.heroField}
          alt="Indian millet farmland at dusk"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-hg-bg/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-hg-bg via-hg-bg/55 to-hg-bg/40" />
      </motion.div>

      {/* ACCREDITATIONS MARQUEE WITH FIXED CENTER TITLE */}
      <div className="relative z-10 w-full mb-8">
        <AccreditationsMarquee />
      </div>

      <motion.div style={{ y: textY, opacity: fade }} className="hg-container relative z-10 pb-16 sm:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="hg-eyebrow flex flex-wrap items-center gap-3"
        >
          <span className="inline-block h-px w-10 bg-hg-gold align-middle" />
          "Delivering India’s finest harvests—ethically sourced, expertly handled, and shipped worldwide with speed."
        </motion.p>

        <MaskLines
          data-testid="hero-heading"
          as="h1"
          delay={0.3}
          className="hg-display mt-7 text-[15vw] leading-[0.85] text-hg-fg sm:text-[11vw] lg:text-[8.6vw]"
          lines={["Cultivated", "in India."]}
        />
        <MaskLines
          as="h2"
          delay={0.62}
          className="hg-display text-[15vw] leading-[0.85] sm:text-[11vw] lg:text-[8.6vw]"
          lineClassName="text-hg-gold"
          lines={["Delivered", "to the world."]}
        />

        <div className="mt-12 grid grid-cols-1 gap-10 border-t border-hg-line pt-9 lg:grid-cols-12 lg:items-end">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.05, ease: EASE }}
            className="max-w-xl text-base leading-relaxed text-hg-fg2 lg:col-span-6"
          >
            We Export Premium Indian Foxnuts, Millets, Pulses, Grains, Flours, Jaggery & More. <br></br>
            Harvestgate Overseas brings the finest agricultural treasures of India to global markets — from naturally cultivated, traditionally processed staples under Harvestgate Naturals to carefully selected premium produce under Harvestgate Select. Our range includes wholesome unpolished millets, pulses, grains, traditional flours, naturally prepared jaggery, and premium Indian foxnuts, sourced with care from trusted farming communities. Rooted in India’s agricultural heritage and prepared with attention to purity, authenticity, and quality, every product reflects our commitment to bringing the true goodness of Indian produce to the world.

          </motion.p>

          <motion.div
            initial={{ opacity: 2, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: EASE }}
            className="flex flex-wrap items-center gap-4 lg:col-span-4 lg:col-start-9 lg:justify-end"
          >
            <Link to="/products" data-testid="hero-explore-products" className="hg-btn">
              <span>Explore catalogue</span>
            </Link>
            <Link to="/contact" data-testid="hero-enquiry-cta" className="hg-btn hg-btn--solid">
              <span>Enquire now</span>
              <ArrowUpRight size={13} className="relative z-[2]" />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        style={{ opacity: fade }}
        className="pointer-events-none absolute bottom-7 right-5 hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] text-hg-fg3 lg:flex"
      >
        Scroll
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.9, ease: "easeInOut" }}
        >
          <ArrowDown size={12} />
        </motion.span>
      </motion.div>
    </section>
  );
};

const ProductCard = ({ p, className = "", tall = false }) => (
  <Reveal className={className}>
    <Link
      to={`/products/${p.slug}`}
      data-testid={`product-card-${p.slug}`}
      className="group relative block h-full overflow-hidden border border-hg-line bg-hg-card transition-colors duration-500 hover:border-hg-gold"
      style={{ ["--accent"]: p.accent }}
    >
      <div className={`relative overflow-hidden ${tall ? "aspect-[4/5] lg:aspect-[16/11]" : "aspect-[4/3]"}`}>
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.07]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
        <span
          className="absolute left-0 top-0 h-[3px] w-0 transition-all duration-700 ease-out group-hover:w-full"
          style={{ backgroundColor: p.accent }}
        />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: p.accent }}>
              {p.index} / {p.subtitle}
            </p>
            <h3 className={`hg-display mt-2 text-white ${tall ? "text-4xl sm:text-5xl" : "text-3xl"}`}>
              {p.name}
            </h3>
          </div>
          <span
            className="grid h-10 w-10 shrink-0 place-items-center border border-white/25 text-white transition-all duration-500 group-hover:border-transparent group-hover:bg-hg-gold"
          >
            <ArrowUpRight size={15} className="transition-transform duration-500 group-hover:rotate-45" />
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 px-5 py-5 sm:px-7">
        <p className="max-w-md text-sm leading-relaxed text-hg-fg2">{p.tagline}</p>
        <p className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-hg-fg3 sm:block">
          HS {p.hsCode}
        </p>
      </div>
    </Link>
  </Reveal>
);

const Home = () => {
  const manifestoRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: manifestoRef,
    offset: ["start end", "end start"],
  });
  const labY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div data-testid="page-home">
      <Hero />

      {/* ============ STATEMENT ============ */}
      <section className="hg-container py-24 sm:py-32 lg:py-40">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="hg-eyebrow">01 — The house</p>
            <div className="mt-6 hg-rule" />
          </div>
          <div className="lg:col-span-8">
            <MaskLinesInView
              className="hg-display text-[9vw] leading-[0.92] text-hg-fg sm:text-5xl lg:text-6xl"
              lines={["We Bring India’s", "Natural Goodness", "To The World."]}
            />

            <Reveal delay={0.15}>
              <p className="mt-9 max-w-2xl text-base leading-[1.85] text-hg-fg2">
                At Harvestgate Overseas, we bring the richness of India’s agricultural heritage to international markets through two distinct product ranges. <br></br>
                <b> Harvestgate Naturals </b> brings together a diverse selection of millets, pulses, grains, flours, daliya (porridge), jaggery and sugars — cultivated without chemical fertilizers or pesticides and prepared through careful, natural processes that preserve the inherent character and goodness of the produce. <br></br>
                <b> Harvestgate Select </b> represents our premium selection of export-grade Indian foxnuts, available in assorted grades and carefully selected to meet the quality and presentation requirements of international markets.
                <p> From naturally cultivated staples to premium foxnuts, every Harvestgate product is sourced with care and selected for quality, authenticity, consistency and global suitability — connecting the richness of Indian agriculture with buyers around the world.
                </p>

              </p>
            </Reveal>

            <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-hg-line pt-10 sm:grid-cols-4">
              {STATS.map(([value, label], i) => (
                <Reveal key={label} delay={i * 0.08}>
                  <p className="hg-display text-3xl text-hg-gold sm:text-4xl">{value}</p>
                  <p className="mt-2 font-mono text-[9px] uppercase leading-relaxed tracking-[0.18em] text-hg-fg3">
                    {label}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ PRODUCTS ============ */}
      <section className="hg-container pb-24 sm:pb-32 lg:pb-40" data-testid="home-products">
        <div className="flex flex-col gap-6 border-t border-hg-line pt-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="hg-eyebrow">02 — Catalogue</p>
            <MaskLinesInView
              className="hg-display mt-5 text-5xl leading-[0.9] text-hg-fg sm:text-6xl lg:text-7xl"
              lines={["Seven commodities.", "One standard."]}
            />
          </div>
          <Link
            to="/products"
            data-testid="home-view-all-products"
            className="hg-link shrink-0 font-mono text-[12px] uppercase tracking-[0.24em] text-hg-gold"
          >
            View all 7 products →
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
          <ProductCard p={PRODUCTS[0]} tall className="lg:col-span-7" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:gap-6">
            <ProductCard p={PRODUCTS[1]} />
            <ProductCard p={PRODUCTS[2]} />
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-4 lg:gap-6">
            <ProductCard p={PRODUCTS[3]} />
            <ProductCard p={PRODUCTS[4]} />
            <ProductCard p={PRODUCTS[5]} />
            <ProductCard p={PRODUCTS[6]} />
          </div>
        </div>
      </section>

      {/* ============ MANIFESTO ============ */}
      <section
        ref={manifestoRef}
        data-testid="home-manifesto"
        className="relative border-y border-hg-line bg-hg-bg2 py-24 sm:py-32 lg:py-40"
      >
        <div className="hg-container">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <p className="hg-eyebrow">03 — Manifesto</p>
              <MaskLinesInView
                className="hg-display mt-6 text-5xl leading-[0.9] text-hg-fg sm:text-6xl"
                lines={["The", "HarvestGate", "method."]}
              />
              <p className="hg-italic mt-6 text-xl text-hg-fg2">
                Six commitments, applied to every shipment.
              </p>
              <motion.div
                style={{ y: labY }}
                className="relative mt-12 hidden overflow-hidden border border-hg-line lg:block"
              >
                <img
                  src={IMG.lab}
                  alt="Grain sample laboratory bench"
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="absolute inset-0 bg-hg-bg/25" />
              </motion.div>
            </div>

            <div className="lg:col-span-7">
              {MANIFESTO.map((m, i) => (
                <Reveal
                  key={m.number}
                  delay={i * 0.06}
                  data-testid={`manifesto-chapter-${i + 1}`}
                  className="group border-t border-hg-line last:border-b"
                >
                  <div className="flex gap-6 py-8 transition-colors duration-500 sm:gap-10 sm:py-10">
                    <p className="hg-display shrink-0 text-2xl text-hg-gold/60 transition-colors duration-500 group-hover:text-hg-gold sm:text-3xl">
                      {m.number}
                    </p>
                    <div>
                      <h3 className="text-xl leading-tight text-hg-fg sm:text-2xl font-display font-bold">{m.title}</h3>
                      <p className="mt-4 max-w-xl text-sm leading-[1.85] text-hg-fg2">{m.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section data-testid="home-cta" className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={IMG.port} alt="Export port at night" loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-hg-bg/78" />
        </div>
        <div className="hg-container relative z-10 py-28 text-center sm:py-36 lg:py-44">
          <Reveal>
            <p className="hg-eyebrow">04 — Enquiry</p>
          </Reveal>
          <MaskLinesInView
            className="hg-display mx-auto mt-7 max-w-4xl text-[11vw] leading-[0.9] text-hg-fg sm:text-6xl lg:text-7xl"
            lines={["Ready to source", "your first container?"]}
          />
          <Reveal delay={0.2}>
            <p className="hg-italic mx-auto mt-6 max-w-xl text-xl text-hg-gold">
              Specifications, samples and FOB pricing within one business day.
            </p>
            <div className="mt-11 flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact" data-testid="cta-enquire-button" className="hg-btn hg-btn--solid">
                <span>Request export quotation</span>
                <ArrowUpRight size={13} className="relative z-[2]" />
              </Link>
              <Link to="/about" data-testid="cta-about-button" className="hg-btn">
                <span>About the company</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Home;
