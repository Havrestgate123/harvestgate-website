import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { MaskLines, MaskLinesInView, Reveal, Marquee } from "../components/motion/Reveal";
import { IMG, STATS, CERTS } from "../data/products";

const TIMELINE = [
  ["2019", "Incorporated in Patna", "HarvestGate Overseas Private Limited is registered with a single mandate: export-grade Phool Makhana with verifiable provenance."],
  ["2021", "Cluster contracts signed", "Direct agreements with 180 makhana households across Darbhanga and Madhubani replace open-market procurement."],
  ["2023", "Millet & jaggery programmes", "Rajasthan and Kolhapur sourcing lines open; NABL laboratory partnership formalised for every outbound batch."],
  ["2025", "Kashmir walnut line", "Cold-chain kernel programme launched from Anantnag and Shopian, extending the catalogue to four crops."],
];

const VALUES = [
  ["Traceability", "Cluster, farmer group and crop window recorded against every lot number."],
  ["Consistency", "Published grade tolerances that do not move between shipments."],
  ["Documentation", "Full export document set issued before vessel departure, every time."],
  ["Responsiveness", "Quotation and spec sheet within one business day of enquiry."],
];

const About = () => (
  <div data-testid="page-about" className="pt-[68px] sm:pt-[84px]">
    <section className="hg-container pt-20 pb-16 sm:pt-28 sm:pb-24">
      <p className="hg-eyebrow">About — HarvestGate Overseas Pvt. Ltd.</p>
      <MaskLines
        data-testid="about-heading"
        delay={0.12}
        className="hg-display mt-6 text-[14vw] leading-[0.86] text-hg-fg sm:text-[9.5vw] lg:text-[7vw]"
        lines={["Between the", "field and", "the port."]}
      />
      <div className="mt-14 grid grid-cols-1 gap-12 border-t border-hg-line pt-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <p className="hg-italic text-2xl leading-snug text-hg-gold sm:text-3xl">
            An Indian export house built for buyers who read the spec sheet.
          </p>
          <p className="mt-8 text-base leading-[1.9] text-hg-fg2">
            HarvestGate Overseas was founded in Patna in 2019 by a team with two decades of
            combined experience in agri-procurement and ocean freight documentation. We began
            with a single crop — Phool Makhana — and one uncomfortable observation: buyers in
            Dubai, Rotterdam and New Jersey were paying premium prices for lots they could not
            trace back further than a mandi receipt.
          </p>
          <p className="mt-6 text-base leading-[1.9] text-hg-fg2">
            Today we operate four crop programmes across five Indian states, each structured
            the same way: contracted farm clusters, our own grading and packing discipline,
            accredited third-party laboratory panels, and an export document set that clears
            customs without follow-up. We are deliberately narrow. Four crops, done
            exceptionally, beats forty done adequately.
          </p>
        </div>
        <div className="lg:col-span-5">
          <div className="hg-spotlight overflow-hidden border border-hg-line">
            <img
              src={IMG.hands}
              alt="Farmer holding raw grain"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-hg-fg3">
            Contracted cluster — Darbhanga, Bihar
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
            <p className="hg-display text-4xl text-hg-gold sm:text-5xl lg:text-6xl">{v}</p>
            <p className="mt-3 font-mono text-[9px] uppercase leading-relaxed tracking-[0.18em] text-hg-fg3">
              {l}
            </p>
          </Reveal>
        ))}
      </div>
    </section>

    {/* MISSION */}
    <section className="border-y border-hg-line bg-hg-bg2">
      <div className="hg-container py-20 sm:py-28 lg:py-36">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="hg-eyebrow">Mission</p>
            <MaskLinesInView
              className="hg-display mt-6 text-4xl leading-[0.92] text-hg-fg sm:text-5xl"
              lines={["Make Indian", "provenance", "legible."]}
            />
          </div>
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-y-0 sm:grid-cols-2 sm:gap-x-10">
              {VALUES.map(([t, d], i) => (
                <Reveal key={t} delay={i * 0.06} className="border-t border-hg-line py-7">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-hg-gold">
                    0{i + 1}
                  </p>
                  <h3 className="mt-4 text-xl text-hg-fg">{t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-hg-fg2">{d}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* TIMELINE */}
    <section className="hg-container py-20 sm:py-28 lg:py-36">
      <p className="hg-eyebrow">Trajectory</p>
      <MaskLinesInView
        className="hg-display mt-6 text-4xl leading-[0.92] text-hg-fg sm:text-5xl lg:text-6xl"
        lines={["Seven years,", "four programmes."]}
      />
      <div className="mt-14">
        {TIMELINE.map(([year, title, body], i) => (
          <Reveal
            key={year}
            delay={i * 0.05}
            className="group grid grid-cols-1 gap-4 border-t border-hg-line py-8 last:border-b sm:grid-cols-12 sm:gap-8 sm:py-10"
          >
            <p className="hg-display text-3xl text-hg-gold/70 transition-colors duration-500 group-hover:text-hg-gold sm:col-span-2 sm:text-4xl">
              {year}
            </p>
            <h3 className="text-xl text-hg-fg sm:col-span-4">{title}</h3>
            <p className="text-sm leading-[1.85] text-hg-fg2 sm:col-span-6">{body}</p>
          </Reveal>
        ))}
      </div>
    </section>

    {/* CREDENTIALS + CTA */}
    <section className="relative overflow-hidden border-t border-hg-line">
      <div className="absolute inset-0 z-0">
        <img src={IMG.port} alt="Export terminal" loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hg-bg/80" />
      </div>
      <div className="hg-container relative z-10 py-24 sm:py-32">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="hg-eyebrow">Credentials</p>
            <MaskLinesInView
              className="hg-display mt-6 text-4xl leading-[0.92] text-hg-fg sm:text-5xl"
              lines={["Registered.", "Audited.", "Documented."]}
            />
            <p className="mt-7 max-w-lg text-base leading-[1.85] text-hg-fg2">
              Copies of all registrations, audit reports and laboratory panels are shared with
              serious enquiries under NDA on request.
            </p>
            <Link to="/contact" data-testid="about-cta-enquire" className="hg-btn hg-btn--solid mt-10">
              <span>Talk to our export desk</span>
              <ArrowUpRight size={13} className="relative z-[2]" />
            </Link>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <ul className="border-t border-hg-line">
              {CERTS.map((c, i) => (
                <Reveal
                  key={c}
                  delay={i * 0.05}
                  className="flex items-center justify-between border-b border-hg-line py-5"
                >
                  <span className="text-sm text-hg-fg">{c}</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-hg-gold">
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
