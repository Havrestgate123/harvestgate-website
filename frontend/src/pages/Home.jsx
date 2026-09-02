import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowDown, MapPin, Phone } from "lucide-react";
import { MaskLines, MaskLinesInView, Reveal } from "../components/motion/Reveal";
import { AccreditationsMarquee } from "../components/AccreditationsMarquee";
import { PRODUCTS, MANIFESTO, IMG } from "../data/products";

const EASE = [0.16, 1, 0.3, 1];

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.16]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const fade = useTransform(scrollYProgress, [0, 0.65, 0.95], [1, 1, 0]);

  return (
    <section
      ref={ref}
      data-testid="home-hero"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-32"
    >
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0 z-0">
        <img
          src={IMG.heroField}
          alt="Lush green Indian farmlands at sunrise — HarvestGate Overseas"
          className="h-full w-full object-cover"
        />
        {/* Vibrant color grading & subtle depth veil */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/15 dark:from-black/50 dark:via-black/35 dark:to-[#0b100c]/75" />
        {/* Soft bottom edge transition into Section 01 — ONLY at the very bottom (last 2 lines) */}
        <div className="absolute inset-x-0 bottom-0 h-24 sm:h-32 bg-gradient-to-t from-hg-bg via-hg-bg/60 to-transparent pointer-events-none" />
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
          className="flex flex-wrap items-center gap-3 font-mono text-xs sm:text-[13px] font-extrabold uppercase tracking-[0.2em] text-hg-fg dark:text-hg-gold drop-shadow"
        >
          <span className="inline-block h-[2px] w-8 sm:w-10 bg-hg-gold align-middle" />
          <span>“Delivering India’s finest harvests—ethically sourced, expertly handled, and shipped worldwide with speed.”</span>
        </motion.p>

        <MaskLines
          data-testid="hero-heading"
          as="h1"
          delay={0.3}
          className="hg-display mt-7 text-[15vw] leading-[0.85] text-hg-fg sm:text-[11vw] lg:text-[8.6vw] drop-shadow-sm"
          lines={["Cultivated", "in India."]}
        />
        <MaskLines
          as="h2"
          delay={0.62}
          className="hg-display text-[15vw] leading-[0.85] sm:text-[11vw] lg:text-[8.6vw] drop-shadow-md"
          lineClassName="text-hg-gold"
          lines={["Delivered", "to the world."]}
        />

        <div className="mt-12 grid grid-cols-1 gap-8 border-t border-hg-line/70 pt-9 lg:grid-cols-12 lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.05, ease: EASE }}
            className="rounded-2xl border border-white/60 dark:border-white/10 bg-white/85 dark:bg-[#0c120c]/85 backdrop-blur-md p-6 sm:p-7 shadow-xl lg:col-span-7 transition-all duration-300"
          >
            <p className="text-[15px] sm:text-[15.5px] font-bold leading-relaxed text-gray-950 dark:text-hg-gold">
              We Export Premium Indian Foxnuts, Millets, Pulses, Grains, Flours, Jaggery &amp; More. <br />
              Harvestgate Overseas brings the finest agricultural treasures of India to global markets — from naturally cultivated, traditionally processed staples under Harvestgate Naturals to carefully selected premium produce under Harvestgate Select. Our range includes wholesome unpolished millets, pulses, grains, traditional flours, naturally prepared jaggery, and premium Indian foxnuts, sourced with care from trusted farming communities. Rooted in India's agricultural heritage and prepared with attention to purity, authenticity, and quality, every product reflects our commitment to bringing the true goodness of Indian produce to the world.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: EASE }}
            className="flex flex-wrap items-center gap-4 lg:col-span-5 lg:justify-end"
          >
            <Link
              to="/products"
              data-testid="hero-explore-products"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-gray-950 bg-white/95 px-6 py-3.5 font-mono text-[12.5px] font-extrabold uppercase tracking-[0.2em] text-gray-950 shadow-md transition-all hover:bg-gray-950 hover:text-white dark:border-hg-gold dark:bg-[#121612]/90 dark:text-hg-gold dark:hover:bg-hg-gold dark:hover:text-black"
            >
              <span>Explore catalogue</span>
            </Link>
            <Link
              to="/contact"
              data-testid="hero-enquiry-cta"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-6 py-3.5 font-mono text-[12.5px] font-extrabold uppercase tracking-[0.2em] text-[#0f140f] shadow-lg transition-all hover:brightness-110 hover:shadow-xl active:scale-[0.98]"
            >
              <span>Enquire now</span>
              <ArrowUpRight size={15} strokeWidth={2.5} />
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

const ProductCard = ({ p, className = "" }) => {
  const isSelect = p.range === "SELECT";
  return (
    <Reveal className={className}>
      <Link
        to={`/products/${p.slug}`}
        data-testid={`product-card-${p.slug}`}
        className="group relative flex flex-col h-full overflow-hidden border border-hg-line bg-hg-card transition-all duration-500 hover:border-hg-gold hover:shadow-lg"
        style={{ ["--accent"]: p.accent }}
      >
        {/* CLEAN IMAGE WITH GLOWING BRAND RANGE PILL */}
        <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
          <img
            src={p.image}
            alt={p.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform ease-out group-hover:scale-[1.07]"
            style={{ transitionDuration: '1100ms' }}
          />
          <span
            className="absolute left-0 top-0 h-[3px] w-0 transition-all duration-700 ease-out group-hover:w-full z-10"
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

        {/* DETAILS SECTION BELOW IMAGE */}
        <div className="flex flex-1 flex-col p-5 sm:p-6 justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span
                className={`inline-flex items-center gap-1 font-mono text-[9px] font-bold tracking-[0.24em] uppercase px-2 py-0.5 rounded-sm border ${isSelect
                  ? "border-hg-gold/60 bg-hg-gold/15 text-hg-gold"
                  : "border-hg-green/60 bg-hg-green/15 text-hg-green"
                }`}
              >
                {isSelect ? "Select" : "Naturals"}
              </span>
              <span className="font-mono text-[11px] font-bold text-hg-fg3 tracking-wider">
                {p.index}
              </span>
            </div>
            <h3 className="hg-display text-2xl sm:text-3xl text-hg-fg transition-colors group-hover:text-hg-gold">
              {p.name}
            </h3>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] font-semibold text-hg-gold mt-1">
              {p.subtitle}
            </p>
            <p className="mt-2.5 text-sm leading-relaxed text-hg-fg2">{p.tagline}</p>
          </div>

          <div className="mt-5 pt-4 border-t border-hg-line/60 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-hg-gold font-bold">
              View Spec Sheet
            </span>
            <span className="grid h-8 w-8 place-items-center border border-hg-line text-hg-fg2 transition-colors duration-300 group-hover:border-hg-gold group-hover:text-hg-gold">
              <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:rotate-45" />
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
};

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
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="hg-eyebrow">01 — The house</p>
            </Reveal>
            <div className="mt-6 hg-rule" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
              className="mt-8 overflow-hidden rounded-2xl border-2 border-hg-line shadow-2xl bg-white/70 dark:bg-[#141b15]/70 backdrop-blur-md p-2.5 group"
            >
              <div className="overflow-hidden rounded-xl">
                <img
                  src="/images/the-house-brands.jpg"
                  alt="HarvestGate Naturals & HarvestGate Select — Certified Indian Agro House Ranges"
                  loading="lazy"
                  className="w-full aspect-square rounded-xl object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="pt-3 pb-1 text-center">
                <span className="font-mono text-[11.5px] font-extrabold uppercase tracking-[0.2em] text-hg-gold">
                  Harvestgate Naturals &bull; Harvestgate Select
                </span>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <MaskLinesInView
              className="hg-display text-[9vw] leading-[0.92] text-hg-fg sm:text-5xl lg:text-6xl"
              lines={["We Bring India’s", "Natural Goodness", "To The World."]}
            />

            <Reveal delay={0.15}>
              <div className="mt-9 text-base sm:text-lg leading-[1.85] text-hg-fg2 font-medium space-y-4">
                <p>
                  At Harvestgate Overseas, we bring the richness of India’s agricultural heritage to international markets through two distinct product ranges:
                </p>
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-1">
                  <p className="text-hg-fg font-bold">
                    🌿 Harvestgate Naturals
                  </p>
                  <p className="text-sm text-hg-fg2 leading-relaxed">
                    Brings together a diverse selection of millets, pulses, grains, flours, daliya (porridge), jaggery and sugars — cultivated without chemical fertilizers or pesticides and prepared through careful, natural processes that preserve the inherent character and goodness of the produce.
                  </p>
                </div>
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-1">
                  <p className="text-hg-fg font-bold">
                    ⭐ Harvestgate Select
                  </p>
                  <p className="text-sm text-hg-fg2 leading-relaxed">
                    Represents our premium selection of export-grade Indian foxnuts, available in assorted grades and carefully selected to meet the quality and presentation requirements of international markets.
                  </p>
                </div>
                <p className="pt-2 text-hg-fg font-semibold">
                  From naturally cultivated staples to premium foxnuts, every Harvestgate product is sourced with care and selected for quality, authenticity, consistency and global suitability — connecting the richness of Indian agriculture with buyers around the world.
                </p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ============ PRODUCTS ============ */}
      <section className="hg-container pb-24 sm:pb-32 lg:pb-40" data-testid="home-products">
        <div className="flex flex-col gap-6 border-t border-hg-line pt-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Reveal>
              <p className="hg-eyebrow">02 — Export Portfolio</p>
            </Reveal>
            <MaskLinesInView
              className="hg-display mt-5 text-5xl leading-[0.9] text-hg-fg sm:text-6xl lg:text-7xl font-extrabold"
              lines={["Export-Grade Harvests.", "Certified for the World."]}
            />
          </div>
          <Link
            to="/products"
            data-testid="home-view-all-products"
            className="hg-link shrink-0 font-mono text-[12px] uppercase tracking-[0.24em] text-hg-gold font-bold"
          >
            Explore Complete Export Catalogue →
          </Link>
        </div>

        <div className="mt-14 space-y-6">
          {/* Top 3 Featured Commodities */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.slice(0, 3).map((prod) => (
              <ProductCard key={prod.slug} p={prod} />
            ))}
          </div>

          {/* Remaining 4 Commodities */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.slice(3).map((prod) => (
              <ProductCard key={prod.slug} p={prod} />
            ))}
          </div>
        </div>
      </section>


      {/* ============ MANIFESTO ============ */}
      <section
        ref={manifestoRef}
        data-testid="home-manifesto"
        className="relative overflow-hidden border-y border-hg-line bg-hg-bg2/75 dark:bg-[#121813]/70 backdrop-blur-xl py-24 sm:py-32 lg:py-40"
      >
        {/* DYNAMIC AMBIENT NEON GLOW ORBS & GRID */}
        <div className="pointer-events-none absolute inset-0 select-none">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-emerald-500/20 dark:bg-emerald-400/20 blur-[130px]" />
          <div className="absolute top-1/2 -right-24 h-96 w-96 rounded-full bg-teal-400/15 dark:bg-cyan-500/15 blur-[140px]" />
          <div className="absolute -bottom-20 left-1/3 h-80 w-80 rounded-full bg-amber-400/15 dark:bg-amber-400/15 blur-[120px]" />
          <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] dark:bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.08] dark:opacity-[0.1]" />
        </div>

        <div className="hg-container relative z-10">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="hg-eyebrow">03 — Manifesto</p>
              </Reveal>
              <MaskLinesInView
                className="hg-display mt-6 text-5xl leading-[0.9] text-hg-fg sm:text-6xl font-extrabold"
                lines={[
                  "The",
                  <span key="hg">Harvest<span className="text-hg-gold">Gate</span></span>,
                  "method.",
                ]}
              />
              <p className="mt-6 text-lg sm:text-xl font-medium text-hg-fg2 leading-relaxed">
                Our commitments, applied to every shipment.
              </p>
              <motion.div
                style={{ y: labY }}
                className="relative mt-12 hidden overflow-hidden rounded-2xl border border-hg-line dark:border-white/15 shadow-2xl bg-white/70 dark:bg-[#151b15]/70 backdrop-blur-md p-3 lg:block"
              >
                <img
                  src={IMG.lab}
                  alt="HarvestGate Overseas Export Pillars"
                  loading="lazy"
                  className="aspect-square w-full rounded-xl object-contain shadow-inner"
                />
              </motion.div>
            </div>

            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              {MANIFESTO.map((m, i) => (
                <Reveal
                  key={m.number}
                  delay={i * 0.06}
                  data-testid={`manifesto-chapter-${i + 1}`}
                  className="group rounded-2xl border border-hg-line dark:border-white/10 bg-white/75 dark:bg-white/[0.03] backdrop-blur-md p-6 sm:p-8 hover:border-emerald-500/50 dark:hover:border-emerald-400/50 hover:bg-white/95 dark:hover:bg-white/[0.06] hover:shadow-[0_12px_35px_rgba(16,185,129,0.12)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-start gap-6 sm:gap-8">
                    <span className="hg-display shrink-0 text-3xl font-extrabold text-hg-gold/60 transition-colors duration-300 group-hover:text-hg-gold group-hover:scale-110 sm:text-4xl">
                      {m.number}
                    </span>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold leading-tight text-hg-fg group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                        {m.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-sm sm:text-[15px] leading-[1.85] text-hg-fg2 font-medium">
                        {m.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section data-testid="home-cta" className="relative overflow-hidden border-t-2 border-hg-line">
        <div className="absolute inset-0 z-0">
          <img src={IMG.port} alt="HarvestGate Agro Export Supply Chain" loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-hg-bg/72 dark:bg-black/75 backdrop-blur-[0.5px]" />
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
            <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-2xl font-bold tracking-normal text-hg-fg dark:text-white leading-relaxed">
              Specifications, samples and FOB pricing within one business day.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact" data-testid="cta-enquire-button" className="hg-btn hg-btn--solid">
                <span>Request export quotation</span>
                <ArrowUpRight size={13} className="relative z-[2]" />
              </Link>
              <Link
                to="/about"
                data-testid="cta-about-button"
                className="inline-flex items-center gap-2 rounded-full border-2 border-hg-fg dark:border-white/60 bg-white/80 dark:bg-black/60 px-8 py-4 font-mono text-xs font-extrabold uppercase tracking-widest text-hg-fg dark:text-white backdrop-blur-md shadow-md hover:bg-hg-fg hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
              >
                <span>About the company</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ LOCATION & MAP SECTION ============ */}
      <section data-testid="home-location-map" className="border-t-2 border-hg-line bg-hg-bg2 py-20 sm:py-28">
        <div className="hg-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <div>
                <p className="hg-eyebrow">05 — Facility &amp; Global Trade Hub</p>
                <h2 className="hg-display mt-4 text-4xl sm:text-5xl text-hg-fg font-extrabold">
                  Visit Our Headquarters
                </h2>
                <p className="mt-4 text-base sm:text-lg font-medium text-hg-fg2 leading-relaxed">
                  Strategically situated in the Western Uttar Pradesh agricultural corridor with direct connectivity to major national freight lines and inland container dry ports (ICD).
                </p>
              </div>

              <div className="space-y-4 rounded-2xl border border-hg-line bg-hg-card p-6 shadow-md">
                <div className="flex items-start gap-3.5">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-hg-gold/10 text-hg-gold">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-hg-fg3 uppercase tracking-wider block font-bold">Registered Facility Address</span>
                    <p className="text-sm font-bold text-hg-fg mt-0.5 leading-snug">
                      Mig-14, Kanth Rd, near Muskan Nursing Home, Ashiyana Colony, Harthala, Moradabad, Uttar Pradesh, India - 244001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-3 border-t border-hg-line">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-hg-fg3 uppercase tracking-wider block font-bold">Direct Trade Desk</span>
                    <p className="text-sm font-bold text-hg-fg mt-0.5">
                      +91 8077078313 • contact@harvestgateoverseas.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Muskan+Nursing+Home,+Ashiyana+Phase+1,+Kanth+Road,+Moradabad,+Uttar+Pradesh+244001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-hg-gold px-6 py-3.5 font-mono text-xs uppercase tracking-widest font-extrabold text-black hover:bg-amber-400 transition-all shadow-lg"
                >
                  <MapPin size={15} />
                  <span>Get Directions in Google Maps</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-3xl border-2 border-hg-line shadow-2xl bg-hg-card h-[380px] sm:h-[460px] w-full">
                <iframe
                  title="HarvestGate Overseas Registered Office Location Map"
                  src="https://maps.google.com/maps?q=Muskan+Nursing+Home,+Ashiyana+Phase+1,+Kanth+Road,+Moradabad,+Uttar+Pradesh+244001&t=&z=16&ie=UTF8&iwloc=B&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full dark:invert-[0.88] dark:hue-rotate-180"
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
