import { Link } from "react-router-dom";
import { MaskLines, Reveal } from "../components/motion/Reveal";

const SECTIONS = [
  {
    n: "01",
    title: "Interpretation & scope",
    body: [
      "These terms and conditions govern the use of this website and any commercial correspondence initiated through it with HarvestGate Overseas Private Limited (\u201cHarvestGate\u201d, \u201cwe\u201d, \u201cus\u201d), a company incorporated in India.",
      "By browsing this website or submitting an enquiry, you confirm that you are acting on behalf of a business entity and that you have authority to do so.",
    ],
  },
  {
    n: "02",
    title: "Nature of information published",
    body: [
      "Product descriptions, grade tolerances, laboratory parameters, packaging formats and indicative volumes published on this website are representative of typical export lots and are provided for guidance only.",
      "They do not constitute a binding offer. Final specifications, tolerances and pricing are established solely in a signed proforma invoice or sales contract issued by HarvestGate.",
    ],
  },
  {
    n: "03",
    title: "Enquiries & quotations",
    body: [
      "Enquiries submitted through this website are treated as requests for quotation. No contract of sale arises until HarvestGate issues a proforma invoice and the buyer confirms it in writing together with the agreed advance payment.",
      "Quotations remain valid for the period stated in the quotation document. Where no period is stated, validity is seven calendar days from issue.",
    ],
  },
  {
    n: "04",
    title: "Pricing, incoterms & payment",
    body: [
      "All prices are quoted in United States Dollars unless expressly agreed otherwise, on FOB, CIF, CFR or EXW terms as specified, interpreted in accordance with Incoterms 2020.",
      "Unless otherwise agreed, payment terms are 30% advance against proforma invoice with the balance against a scanned set of shipping documents, or an irrevocable letter of credit at sight from a bank acceptable to HarvestGate.",
    ],
  },
  {
    n: "05",
    title: "Quality, inspection & claims",
    body: [
      "Every consignment is tested prior to dispatch and accompanied by the applicable certificates. Buyers are entitled to appoint an independent surveyor at load port at their own cost.",
      "Quality claims must be raised in writing within fifteen calendar days of discharge at the destination port, supported by an independent surveyor's report and retained samples. Claims raised after this period, or in respect of goods that have been processed, blended or repacked, cannot be entertained.",
    ],
  },
  {
    n: "06",
    title: "Shipment & force majeure",
    body: [
      "Shipment windows are estimates based on vessel availability and are not guaranteed. HarvestGate shall not be liable for delay or non-performance arising from crop failure, adverse weather, port congestion, strike, war, epidemic, regulatory action, export restriction or any other event beyond its reasonable control.",
    ],
  },
  {
    n: "07",
    title: "Regulatory compliance",
    body: [
      "The buyer is responsible for ensuring that the goods, their labelling and their intended use comply with all import, food safety, labelling and customs regulations applicable in the destination country.",
      "HarvestGate will provide the documentation set specified in the sales contract but accepts no liability for import refusal arising from destination-country regulatory requirements not communicated to us in writing before shipment.",
    ],
  },
  {
    n: "08",
    title: "Intellectual property",
    body: [
      "All content on this website, including text, photography, layout, marks and the HarvestGate name and emblem, is owned by or licensed to HarvestGate Overseas Private Limited and may not be reproduced without prior written consent.",
    ],
  },
  {
    n: "09",
    title: "Confidentiality & data",
    body: [
      "Information you submit through the enquiry form is used solely to respond to your requirement and to maintain our commercial records. We do not sell or rent enquiry data to third parties.",
      "Certificates, audit reports and laboratory panels shared with prospective buyers are confidential and may be subject to a mutual non-disclosure agreement.",
    ],
  },
  {
    n: "10",
    title: "Governing law & jurisdiction",
    body: [
      "These terms and any contract of sale arising from them are governed by the laws of India. The courts at Patna, Bihar shall have exclusive jurisdiction, save that the parties may agree to arbitration under the Arbitration and Conciliation Act, 1996, seated in Patna.",
    ],
  },
];

const Terms = () => (
  <div data-testid="page-terms" className="pt-[68px] sm:pt-[84px]">
    <section className="hg-container pt-20 pb-14 sm:pt-28 sm:pb-20">
      <p className="hg-eyebrow">Legal — Last updated June 2026</p>
      <MaskLines
        data-testid="terms-heading"
        delay={0.12}
        className="hg-display mt-6 text-[14vw] leading-[0.86] text-hg-fg sm:text-[9.5vw] lg:text-[7vw]"
        lines={["Terms &", "conditions"]}
      />
      <Reveal delay={0.35}>
        <p className="hg-italic mt-6 max-w-2xl text-xl text-hg-gold">
          The commercial framework within which we quote, contract and ship.
        </p>
      </Reveal>
    </section>

    <section className="hg-container pb-24 sm:pb-32">
      <div className="grid grid-cols-1 gap-12 border-t border-hg-line pt-12 lg:grid-cols-12 lg:gap-16">
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-32">
            <p className="hg-eyebrow">Contents</p>
            <ol className="mt-6 space-y-3">
              {SECTIONS.map((s) => (
                <li key={s.n}>
                  <a
                    href={`#clause-${s.n}`}
                    data-testid={`terms-toc-${s.n}`}
                    className="hg-link font-mono text-[10px] uppercase tracking-[0.14em] text-hg-fg2 transition-colors hover:text-hg-gold"
                  >
                    <span className="text-hg-gold">{s.n}</span> {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </aside>

        <div className="lg:col-span-8 lg:col-start-5">
          {SECTIONS.map((s, i) => (
            <Reveal
              key={s.n}
              delay={i * 0.03}
              id={`clause-${s.n}`}
              className="scroll-mt-32 border-t border-hg-line py-9 first:border-t-0 first:pt-0 last:border-b"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-hg-gold">
                {s.n}
              </p>
              <h2 className="mt-4 text-2xl leading-tight text-hg-fg sm:text-3xl">{s.title}</h2>
              <div className="mt-5 space-y-4">
                {s.body.map((p, k) => (
                  <p key={k} className="max-w-2xl text-sm leading-[1.9] text-hg-fg2">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}

          <div className="mt-14 border border-hg-line bg-hg-card p-7 sm:p-9">
            <p className="hg-eyebrow">Questions on these terms?</p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-hg-fg2">
              Our export desk can provide the full sales contract template and document set for
              legal review before you commit to a first shipment.
            </p>
            <Link to="/contact" data-testid="terms-cta-contact" className="hg-btn mt-8">
              <span>Contact the export desk</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Terms;
