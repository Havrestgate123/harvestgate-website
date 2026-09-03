import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  CheckCircle2,
  Leaf,
  Star,
  ShieldCheck,
  Compass,
  FileCheck2,
  Clock,
  MapPin,
  ExternalLink,
  Sparkles,
  Quote,
} from "lucide-react";
import { MaskLines, MaskLinesInView, Reveal, Marquee } from "../components/motion/Reveal";
import { IMG, CERTS } from "../data/products";

const LinkedInIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const PILLARS = [
  {
    num: "01",
    tagline: "Know what you're buying.",
    title: "Traceability",
    desc: "Clear sourcing and supplier records for greater visibility from origin to shipment.",
    icon: Compass,
  },
  {
    num: "02",
    tagline: "Consistency, shipment after shipment.",
    title: "Standardization",
    desc: "Defined specifications for grade, size, purity, moisture and packaging—built around buyer requirements.",
    icon: ShieldCheck,
  },
  {
    num: "03",
    tagline: "Every shipment. Properly documented.",
    title: "Full Documentation",
    desc: "Clear commercial, quality, regulatory and shipping documentation to keep international trade moving smoothly.",
    icon: FileCheck2,
  },
  {
    num: "04",
    tagline: "Fast answers. Faster execution.",
    title: "Rapid Response",
    desc: "Responsive communication from enquiry and quotation to documentation and shipment coordination.",
    icon: Clock,
  },
];

const About = () => (
  <div data-testid="page-about" className="pt-[110px] sm:pt-[130px]">
    {/* ========================================================================= */}
    {/* 1. HERO SECTION */}
    {/* ========================================================================= */}
    <section className="hg-container pt-12 pb-16 sm:pt-20 sm:pb-24">
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-hg-gold/40 bg-hg-gold/10 px-4 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-hg-gold backdrop-blur-md">
          <Sparkles size={12} />
          About Harvestgate Overseas Pvt. Ltd.
        </span>
        <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[11px] text-hg-fg3 tracking-wider">
          <MapPin size={12} className="text-hg-gold" />
          Moradabad, Uttar Pradesh, India
        </span>
      </div>

      <MaskLines
        data-testid="about-heading"
        delay={0.12}
        className="hg-display mt-8 text-[12vw] leading-[0.9] text-hg-fg sm:text-[8vw] lg:text-[6.2vw] font-extrabold"
        lines={["DIRECT FROM INDIA.", "BUILT FOR THE WORLD."]}
      />

      <Reveal delay={0.25} className="mt-7 max-w-3xl">
        <p className="text-xl leading-relaxed text-hg-gold sm:text-2xl font-semibold">
          Two product lines. One commitment to quality, consistency, and dependable global supply.
        </p>
      </Reveal>

      {/* ========================================================================= */}
      {/* 2. ROOTED IN INDIA. BUILT WITH PURPOSE. */}
      {/* ========================================================================= */}
      <div className="mt-16 border-t-2 border-hg-line pt-14">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          <div className="lg:col-span-7 space-y-7">
            <div>
              <p className="hg-eyebrow text-[12px] font-bold text-hg-fg3">Our Foundation &amp; Identity</p>
              <h2 className="hg-display mt-3 text-3xl sm:text-4xl text-hg-fg font-extrabold leading-tight">
                ROOTED IN INDIA.<br />
                <span className="text-hg-gold">BUILT WITH PURPOSE.</span>
              </h2>
            </div>

            <div className="rounded-2xl border-l-4 border-hg-gold bg-hg-gold/5 p-6 sm:p-7 border border-hg-line">
              <p className="text-[17px] sm:text-[19px] leading-relaxed text-hg-fg font-semibold">
                Based in Moradabad, Uttar Pradesh, India, Harvestgate Overseas is an Indian agricultural export house built around a simple belief:
              </p>
              <p className="mt-3 text-xl sm:text-2xl font-bold text-hg-gold leading-snug">
                “India&apos;s finest agricultural products deserve a stronger route to the world.”
              </p>
            </div>

            <div className="space-y-5 text-[16px] sm:text-[17px] leading-[1.85] text-hg-fg2 font-medium">
              <p>
                We bring together responsible sourcing, careful product selection and export-focused execution to connect India&apos;s agricultural strength with buyers across international markets.
              </p>
              <p>
                Our approach is deliberately straightforward—source with care, maintain standards, communicate clearly, and deliver reliably.
              </p>
              <p className="text-hg-fg font-semibold">
                Through our two distinct product lines, we serve different segments of the global market while maintaining the same commitment to quality and dependable supply.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.15} className="overflow-hidden rounded-2xl border-2 border-hg-line shadow-2xl relative group">
              <img
                src={IMG.hands}
                alt="Direct Indian sourcing and harvest"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-hg-gold font-bold">
                  Registered Indian Export House
                </p>
                <p className="mt-1 text-base font-bold text-white leading-snug">
                  Moradabad, Uttar Pradesh — 244001, India
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>

    {/* ========================================================================= */}
    {/* 3. TWO DISTINCT PRODUCT LINES SHOWCASE */}
    {/* ========================================================================= */}
    <section className="border-y border-hg-line bg-hg-bg2/60 dark:bg-[#121813]/60 py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="hg-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="hg-eyebrow text-[12px] font-bold">Two Export Portfolios · Single Quality Standard</p>
          <h2 className="hg-display mt-4 text-3xl sm:text-5xl text-hg-fg font-extrabold">
            Our Two Product Lines
          </h2>
          <p className="mt-4 text-base sm:text-lg text-hg-fg2 font-medium">
            Engineered to cater to distinct global market requirements with uncompromising traceability.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* HARVESTGATE NATURALS CARD */}
          <Reveal delay={0.1}>
            <div className="flex flex-col justify-between h-full rounded-3xl border-2 border-emerald-500/40 bg-white dark:bg-[#151d16] p-8 sm:p-10 shadow-xl transition-all duration-300 hover:border-emerald-400 hover:shadow-[0_15px_40px_rgba(16,185,129,0.15)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="flex items-center justify-between gap-3 mb-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/50 bg-emerald-500/10 px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-emerald-400">
                    <Leaf size={14} className="text-emerald-400" />
                    Product Line 01
                  </div>
                  <span className="font-mono text-xs font-bold text-emerald-500/80">
                    Naturally Cultivated
                  </span>
                </div>

                <h3 className="hg-display text-3xl sm:text-4xl text-hg-fg font-extrabold">
                  HARVESTGATE NATURALS
                </h3>

                <p className="mt-4 text-[16.5px] leading-relaxed text-hg-fg font-semibold">
                  A range of naturally cultivated and naturally prepared Indian staples, including millets, pulses, grains, flours, daliya, jaggery and sugars.
                </p>

                <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5">
                  <p className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-bold mb-2 flex items-center gap-1.5">
                    <CheckCircle2 size={14} /> Zero Chemicals Guarantee
                  </p>
                  <p className="text-[14.5px] leading-relaxed text-hg-fg2 font-medium">
                    The products in this range are cultivated without the use of chemical fertilizers and pesticides, and are handled through methods that preserve their natural character, authenticity and wholesome qualities.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-hg-line flex items-center justify-between">
                <Link
                  to="/products#naturals-section"
                  className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.2em] font-bold text-emerald-500 hover:text-emerald-400 transition-colors"
                >
                  <span>Explore Naturals Catalog</span>
                  <ArrowUpRight size={15} />
                </Link>
                <span className="text-xs font-mono text-hg-fg3 font-semibold">6 Staple Categories</span>
              </div>
            </div>
          </Reveal>

          {/* HARVESTGATE SELECT CARD */}
          <Reveal delay={0.2}>
            <div className="flex flex-col justify-between h-full rounded-3xl border-2 border-hg-gold/40 bg-white dark:bg-[#181816] p-8 sm:p-10 shadow-xl transition-all duration-300 hover:border-hg-gold hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-hg-gold/10 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="flex items-center justify-between gap-3 mb-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-hg-gold/50 bg-hg-gold/10 px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-hg-gold">
                    <Star size={14} className="text-hg-gold" />
                    Product Line 02
                  </div>
                  <span className="font-mono text-xs font-bold text-hg-gold/80">
                    Single-Origin Premium
                  </span>
                </div>

                <h3 className="hg-display text-3xl sm:text-4xl text-hg-fg font-extrabold">
                  HARVESTGATE SELECT
                </h3>

                <p className="mt-4 text-[16.5px] leading-relaxed text-hg-fg font-semibold">
                  Our premium range of export-grade Indian foxnuts (makhana), carefully selected and graded for international markets.
                </p>

                <div className="mt-6 rounded-2xl border border-hg-gold/30 bg-hg-gold/5 p-5">
                  <p className="font-mono text-xs uppercase tracking-wider text-hg-gold font-bold mb-2 flex items-center gap-1.5">
                    <Sparkles size={14} /> Uncompromising Grading Standard
                  </p>
                  <p className="text-[15px] leading-relaxed text-hg-fg font-bold">
                    Different grades. Different requirements.
                  </p>
                  <p className="mt-1 text-[14.5px] leading-relaxed text-hg-fg2 font-medium">
                    One uncompromising focus on quality and consistency across Grade A (6+ Sutta), 5+ Sutta HP, and 4+ Sutta HP.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-hg-line flex items-center justify-between">
                <Link
                  to="/products/foxnuts"
                  className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.2em] font-bold text-hg-gold hover:underline transition-colors"
                >
                  <span>Explore Foxnuts (Makhana)</span>
                  <ArrowUpRight size={15} />
                </Link>
                <span className="text-xs font-mono text-hg-fg3 font-semibold">Handpicked Export Grades</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    {/* ========================================================================= */}
    {/* 4. OUR VISION SECTION */}
    {/* ========================================================================= */}
    <section className="hg-container py-20 sm:py-28 lg:py-32">
      <div className="rounded-3xl border-2 border-hg-line bg-gradient-to-br from-hg-card via-hg-card to-hg-bg2 p-8 sm:p-14 lg:p-16 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-hg-gold/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl relative z-10">
          <p className="hg-eyebrow text-[12px] font-bold text-hg-gold">Our Vision</p>
          <h2 className="hg-display mt-4 text-3xl sm:text-5xl lg:text-6xl text-hg-fg font-black leading-[1.05]">
            TO MAKE INDIAN AGRICULTURAL QUALITY A GLOBAL BENCHMARK.
          </h2>

          <div className="mt-8 space-y-6 text-[17px] sm:text-xl leading-relaxed text-hg-fg2 font-medium">
            <p className="text-hg-fg font-semibold">
              We envision a world where international buyers can source from India with clarity, confidence and consistency—knowing that behind every product is a disciplined approach to sourcing, quality and execution.
            </p>
            <p>
              We are not looking to simply add another name to India&apos;s long list of exporters.
            </p>
            <p className="text-2xl sm:text-3xl text-hg-gold font-bold leading-snug">
              We are building a trusted bridge between India&apos;s fields and the world&apos;s markets.
            </p>
            <p className="text-base sm:text-lg text-hg-fg font-medium pt-2 border-t border-hg-line">
              And that bridge begins with what we source, how we standardize it, and how reliably we deliver it.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* ========================================================================= */}
    {/* 5. OUR PILLARS SECTION */}
    {/* ========================================================================= */}
    <section className="border-t border-hg-line bg-hg-bg2/80 dark:bg-[#131b14]/70 backdrop-blur-md py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="hg-container relative z-10">
        <div className="max-w-3xl mb-16">
          <p className="hg-eyebrow text-[12px] font-bold">Our Core Sourcing Pillars</p>
          <h2 className="hg-display mt-3 text-3xl sm:text-5xl text-hg-fg font-extrabold">
            DIRECT INDIAN SOURCING.
          </h2>
          <p className="mt-3 text-xl sm:text-2xl font-bold text-hg-gold">
            Closer to the source. Closer to the quality.
          </p>
          <p className="mt-4 text-base sm:text-lg text-hg-fg2 font-medium leading-relaxed">
            We work with trusted Indian farmers and suppliers to source products with greater control over origin, quality and supply.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal
                key={p.num}
                delay={i * 0.08}
                className="group flex flex-col justify-between rounded-2xl border-2 border-hg-line bg-white/80 dark:bg-white/[0.03] backdrop-blur-md p-7 transition-all duration-300 hover:border-hg-gold hover:shadow-xl relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <span className="font-mono text-[13px] font-black uppercase tracking-[0.24em] text-hg-gold bg-hg-gold/10 border border-hg-gold/30 px-3 py-1 rounded-full">
                      {p.num}
                    </span>
                    <Icon size={20} className="text-hg-gold shrink-0 transition-transform duration-300 group-hover:scale-110" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-hg-fg group-hover:text-hg-gold transition-colors">
                    {p.title}
                  </h3>

                  <p className="mt-2 text-sm font-bold text-hg-gold">
                    {p.tagline}
                  </p>

                  <p className="mt-4 text-[14.5px] leading-relaxed text-hg-fg2 font-medium">
                    {p.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>

    {/* ========================================================================= */}
    {/* 6. NOTE FROM OUR CEO (DR. SUMAN PRABHA) */}
    {/* ========================================================================= */}
    <section className="hg-container py-20 sm:py-28 lg:py-32">
      <div className="rounded-3xl border-2 border-hg-gold/50 bg-gradient-to-br from-[#faf8f2] via-white to-[#fbf9f4] dark:from-[#1b1915] dark:via-[#151513] dark:to-[#121210] p-6 sm:p-10 lg:p-14 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-hg-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* HEADER ROW */}
          <div className="flex items-center justify-between gap-4 flex-wrap pb-6 border-b border-hg-line mb-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-hg-gold/15 border border-hg-gold/40 text-hg-gold">
                <Quote size={20} />
              </span>
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-hg-gold">
                  Leadership Address
                </p>
                <h2 className="hg-display text-2xl sm:text-3xl font-black text-hg-fg mt-0.5">
                  Note from Our CEO
                </h2>
              </div>
            </div>

            <a
              href="https://www.linkedin.com/in/dr-suman-prabha-b60440383/"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="ceo-linkedin-link"
              className="inline-flex items-center gap-2 rounded-full border border-hg-line hover:border-[#0A66C2] bg-white dark:bg-black/40 px-4 py-2 text-xs font-mono font-bold text-hg-fg hover:text-[#0A66C2] shadow-sm transition-all hover:shadow-md"
              title="Connect with Dr. Suman Prabha on LinkedIn"
            >
              <LinkedInIcon className="w-4 h-4 text-[#0A66C2]" />
              <span>Connect on LinkedIn</span>
              <ExternalLink size={12} className="opacity-70" />
            </a>
          </div>

          {/* TWO-COLUMN EXECUTIVE LAYOUT: IMAGE + LETTER */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* CEO PHOTO CARD */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border-2 border-hg-gold/40 shadow-2xl group bg-black/5 dark:bg-white/5">
                <img
                  src="/images/ceo-dr-suman-prabha.jpg"
                  alt="Dr. Suman Prabha — CEO & Founder, Harvestgate Overseas"
                  loading="lazy"
                  className="w-full h-auto object-cover aspect-[3/4] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                  <div className="inline-flex items-center gap-1.5 self-start rounded-full bg-hg-gold/20 backdrop-blur-md border border-hg-gold/50 px-3 py-1 mb-2">
                    <Sparkles size={11} className="text-hg-gold" />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                      Executive Founder
                    </span>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold text-white leading-tight">
                    Dr. Suman Prabha
                  </p>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-hg-gold font-bold mt-1">
                    CEO &amp; Founder, Harvestgate Overseas
                  </p>
                </div>
              </div>

              {/* CEO DETAILS / CREDENTIAL BADGE */}
              <div className="mt-4 rounded-xl border border-hg-line bg-hg-bg2/80 p-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-hg-fg3">Head Office:</span>
                  <span className="text-hg-fg font-bold">Moradabad, UP, India</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-hg-fg3">Enterprise:</span>
                  <span className="text-hg-gold font-bold">Harvestgate Overseas Pvt. Ltd.</span>
                </div>
                <div className="pt-2 border-t border-hg-line">
                  <a
                    href="https://www.linkedin.com/in/dr-suman-prabha-b60440383/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 border border-[#0A66C2]/30 py-2.5 text-xs font-mono font-bold text-[#0A66C2] transition-colors"
                  >
                    <LinkedInIcon className="w-3.5 h-3.5" />
                    <span>View LinkedIn Profile</span>
                    <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            </div>

            {/* CEO LETTER CONTENT */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full">
              <div className="space-y-6 text-[16px] sm:text-[17.5px] leading-[1.85] text-hg-fg2 font-medium">
                <p className="text-2xl font-bold text-hg-fg font-serif italic">
                  Greetings,
                </p>

                <p>
                  I’m <strong className="text-hg-fg font-bold">Dr. Suman Prabha</strong>, proud founder of Harvestgate Overseas. From the very beginning, my vision has been clear: to harness India’s rich agricultural heritage and share its nourishment, purity, and tradition with the world. Every harvest, every product, and every partnership is more than a transaction — it is a promise.
                </p>

                <p>
                  My journey — rooted in a deep respect for our farmers, a passion for quality, and a commitment to sustainable growth — inspires everything we do. As a woman in agribusiness, I believe strongly in empowerment: for my team, for communities, and for stakeholders. I see each order not just as business, but as an opportunity to build bridges — between cultures, values, and people.
                </p>

                <p>
                  At Harvestgate Overseas, our dedication is to you — our customers. We pledge to deliver excellence, transparency, and service that goes beyond expectation. Give us the chance to show you what Indian agricultural produce can truly be: authentic in origin, superior in quality, and rich in respect for all involved.
                </p>
              </div>

              {/* SIGNATURE & VALEDICTION */}
              <div className="mt-8 pt-6 border-t border-hg-line flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div>
                  <p className="font-mono text-sm font-semibold text-hg-fg3 tracking-wider">
                    Warm regards,
                  </p>

                  {/* STYLIZED SIGNATURE */}
                  <div className="my-2 py-1">
                    <span
                      className="font-serif italic font-medium text-3xl sm:text-4xl text-hg-gold tracking-wide select-none drop-shadow-sm"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      Dr. Suman Prabha
                    </span>
                  </div>

                  <p className="text-lg font-bold text-hg-fg">
                    Dr. Suman Prabha
                  </p>
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-hg-gold font-bold mt-0.5">
                    CEO &amp; Founder, Harvestgate Overseas
                  </p>
                </div>

                <div className="rounded-xl border border-hg-line bg-hg-bg2/70 p-4 max-w-xs text-xs font-mono text-hg-fg3 leading-relaxed">
                  <span className="font-bold text-hg-fg block mb-1">Direct Mandate:</span>
                  “Every harvest, every product, and every partnership is more than a transaction — it is a promise.”
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ========================================================================= */}
    {/* 7. ACCREDITATIONS MARQUEE */}
    {/* ========================================================================= */}
    <div className="py-8">
      <Marquee items={CERTS} testId="about-marquee" />
    </div>

    {/* ========================================================================= */}
    {/* 8. GOVERNMENT CREDENTIALS + EXPORT DESK CTA */}
    {/* ========================================================================= */}
    <section className="relative overflow-hidden border-t border-hg-line bg-hg-bg2/80 dark:bg-[#131b14]/70 backdrop-blur-md">
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-400/10 dark:bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="hg-container relative z-10 py-20 sm:py-28">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6">
            <p className="hg-eyebrow text-[12px] font-bold">Statutory Compliance &amp; Certifications</p>
            <MaskLinesInView
              className="hg-display mt-6 text-4xl leading-[0.95] text-hg-fg sm:text-5xl font-extrabold"
              lines={["Registered.", "Audited.", "Certified."]}
            />
            <p className="mt-7 max-w-lg text-[16.5px] leading-[1.85] text-hg-fg font-medium">
              HarvestGate Overseas operates with full statutory compliance under Indian export regulations. Certified documentation sets and lab reports are provided with all commercial quotes.
            </p>
            <Link to="/contact" data-testid="about-cta-enquire" className="hg-btn hg-btn--solid mt-10 text-[13px] font-bold py-4 px-8">
              <span>Talk to our export desk</span>
              <ArrowUpRight size={15} className="relative z-[2]" />
            </Link>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <ul className="border-t-2 border-hg-line">
              {CERTS.map((c, i) => (
                <Reveal
                  key={c}
                  delay={i * 0.05}
                  className="flex items-center justify-between border-b-2 border-hg-line py-5 font-mono text-[13px] font-bold text-hg-fg"
                >
                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-hg-gold shrink-0" />
                    <span>{c}</span>
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-hg-gold bg-hg-gold/10 px-2.5 py-1 rounded">
                    Active
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default About;

