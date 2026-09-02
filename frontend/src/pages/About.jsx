import { Link } from "react-router-dom";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { MaskLines, MaskLinesInView, Reveal, Marquee } from "../components/motion/Reveal";
import { IMG, STATS, CERTS } from "../data/products";

const TIMELINE = [
  ["2019", "Company Incorporation", "HarvestGate Overseas Private Limited is established with a single core mandate: export-grade Indian agricultural produce with verifiable provenance."],
  ["2021", "Cluster Direct Contracts", "Direct agreements with 300+ grower households across Bihar and Uttar Pradesh replace unverified open-market aggregated procurement."],
  ["2023", "Millets, Oats & Pulses Expansion", "Rajasthan, Madhya Pradesh and Maharashtra sourcing lines open; NABL laboratory partnerships formalised for every outbound lot."],
  ["2026", "Global Consolidated Exports", "Operating seven dedicated commodity programmes covering Foxnuts, Millets, Oats, Sugar, Pulses, Grains and Daliya to 18+ countries."],
];

const VALUES = [
  ["Traceability", "Named farm clusters, primary mandis and crop harvest windows recorded against every outbound container."],
  ["Standardization", "Strict grade tolerances, sortex purity guarantees and zero moisture compromises across every shipment."],
  ["Full Documentation", "Complete export set: Certificate of Origin, APEDA, FSSAI, GSTIN, IEC and SGS inspection certificates."],
  ["Rapid Response", "Detailed specification sheet, indicative FOB/CIF quote and free courier samples arranged within 1 business day."],
];

const About = () => (
  <div data-testid="page-about" className="pt-[110px] sm:pt-[130px]">
    <section className="hg-container pt-14 pb-16 sm:pt-20 sm:pb-24">
      <p className="hg-eyebrow text-[12px] font-bold">About — HarvestGate Overseas Pvt. Ltd.</p>
      <MaskLines
        data-testid="about-heading"
        delay={0.12}
        className="hg-display mt-6 text-[14vw] leading-[0.88] text-hg-fg sm:text-[9.5vw] lg:text-[7vw] font-extrabold"
        lines={["Between the", "field and", "the port."]}
      />
      <div className="mt-14 grid grid-cols-1 gap-12 border-t-2 border-hg-line pt-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <p className="hg-italic text-2xl leading-snug text-hg-gold sm:text-3xl font-semibold">
            An Indian agricultural export house built for international buyers who demand verifiable quality.
          </p>
          <p className="mt-8 text-lg leading-[1.85] text-hg-fg font-medium">
            HarvestGate Overseas Private Limited was founded by professionals with extensive experience in direct agricultural procurement, laboratory testing, and ocean freight logistics. We began with one clear vision: international buyers in Dubai, Rotterdam, New Jersey, and London deserve completely transparent, laboratory-tested produce with zero batch-to-batch variation.
          </p>
          <p className="mt-6 text-[16.5px] leading-[1.85] text-hg-fg2 font-medium">
            Today we operate seven specialized crop programmes across India's premier growing regions: contracted farm clusters, standardized sortex cleaning and grading, accredited third-party laboratory testing, and an airtight export document set (APEDA, FSSAI, GSTIN, IEC) that clears destination customs seamlessly.
          </p>
        </div>
        <div className="lg:col-span-5">
          <div className="overflow-hidden border-2 border-hg-line shadow-lg">
            <img
              src={IMG.hands}
              alt="Farmer holding raw grain"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-hg-fg3 font-semibold">
            Registered Head Office: Moradabad, Uttar Pradesh, India
          </p>
        </div>
      </div>
    </section>

    <Marquee items={CERTS} testId="about-marquee" />

    {/* STATS */}
    <section className="hg-container py-20 sm:py-28">
      <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4">
        {STATS.map(([v, l], i) => (
          <Reveal key={l} delay={i * 0.07}>
            <p className="hg-display text-4xl text-hg-gold sm:text-5xl lg:text-6xl font-extrabold">{v}</p>
            <p className="mt-3 font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-hg-fg font-bold">
              {l}
            </p>
          </Reveal>
        ))}
      </div>
    </section>

    {/* MISSION */}
    <section className="border-y border-hg-line bg-hg-bg2/80 dark:bg-[#131b14]/70 backdrop-blur-md relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 dark:bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="hg-container py-20 sm:py-28 lg:py-36 relative z-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="hg-eyebrow text-[12px] font-bold">Our Pillars</p>
            <MaskLinesInView
              className="hg-display mt-6 text-4xl leading-[0.95] text-hg-fg sm:text-5xl font-extrabold"
              lines={["Direct Indian", "Provenance.", "Certified."]}
            />
          </div>
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {VALUES.map(([t, d], i) => (
                <Reveal key={t} delay={i * 0.06} className="rounded-2xl border border-hg-line dark:border-white/10 bg-white/70 dark:bg-white/[0.03] backdrop-blur-md p-6 hover:border-emerald-500/40 dark:hover:border-emerald-400/40 hover:shadow-[0_8px_30px_rgb(16,185,129,0.08)] transition-all">
                  <p className="font-mono text-[12px] uppercase tracking-[0.24em] text-hg-gold font-bold">
                    0{i + 1}
                  </p>
                  <h3 className="mt-3 text-2xl text-hg-fg font-bold">{t}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-hg-fg2 font-medium">{d}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* TIMELINE */}
    <section className="hg-container py-20 sm:py-28 lg:py-36">
      <p className="hg-eyebrow text-[12px] font-bold">Our Growth Trajectory</p>
      <MaskLinesInView
        className="hg-display mt-6 text-4xl leading-[0.95] text-hg-fg sm:text-5xl lg:text-6xl font-extrabold"
        lines={["Proven track record,", "seven programmes."]}
      />
      <div className="mt-14 space-y-4">
        {TIMELINE.map(([year, title, body], i) => (
          <Reveal
            key={year}
            delay={i * 0.05}
            className="group grid grid-cols-1 gap-4 rounded-2xl border border-hg-line dark:border-white/10 bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm p-6 sm:p-8 sm:grid-cols-12 sm:gap-8 hover:border-hg-gold/50 hover:bg-white/90 dark:hover:bg-white/[0.05] hover:shadow-lg transition-all"
          >
            <p className="hg-display text-3xl text-hg-gold transition-colors duration-300 sm:col-span-2 sm:text-4xl font-extrabold">
              {year}
            </p>
            <h3 className="text-2xl text-hg-fg font-bold sm:col-span-4">{title}</h3>
            <p className="text-[15.5px] leading-[1.85] text-hg-fg2 font-medium sm:col-span-6">{body}</p>
          </Reveal>
        ))}
      </div>
    </section>

    {/* CREDENTIALS + CTA */}
    <section className="relative overflow-hidden border-t border-hg-line bg-hg-bg2/80 dark:bg-[#131b14]/70 backdrop-blur-md">
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-400/10 dark:bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="hg-container relative z-10 py-24 sm:py-32">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="hg-eyebrow text-[12px] font-bold">Government & Trade Credentials</p>
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
