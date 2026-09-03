import { Link } from "react-router-dom";
import { MaskLines, Reveal } from "../components/motion/Reveal";
import { ShieldCheck, Mail, Phone, AlertCircle, CheckCircle2 } from "lucide-react";

const SECTIONS = [
  {
    n: "01",
    title: "Order Placement & Confirmation",
    body: [
      "To initiate a trade, buyers should first fill out the official enquiry form available on our website.",
      "In case you experience any issues submitting the enquiry form, you may alternatively send an enquiry email with all necessary details to contact@harvestgateoverseas.com for prompt support.",
      "Upon receiving your enquiry, our sales team will contact you to discuss your requirements and provide Ex-Works pricing, based on current market rates and the quantity required (please note that the rate provided will be valid for upcoming 3 days only).",
      "If the buyer expresses interest, we will proceed to finalize trade details such as shipping method preferences, and calculate the final price per quantity, inclusive of applicable logistics.",
      "Once all terms are mutually agreed upon, a Proforma Invoice (PI) will be issued for confirmation. The trade is considered confirmed upon receipt of the advance payment as per our stated payment terms.",
    ],
    highlight: "Please note: Once the trade is confirmed and the advance payment is received, the order becomes final, non-cancellable, and the advance amount is non-refundable.",
  },
  {
    n: "02",
    title: "Order Preparation Time, MOQ & Samples",
    body: [
      "Order preparation timelines are generally flexible and typically commence from a minimum of approximately five weeks. The actual duration may vary based on order volume, buyer requirements, logistics planning, and the availability of fresh, harvest-grade produce, ensuring consistent quality standards.",
      "There is no fixed Minimum Order Quantity (MOQ) for regular orders. Order quantities are determined based on buyer demand, and we are open to initiating trade across a wide range of quantities as per buyer requirements.",
      "However, a minimum sample quantity of 10 kg applies for sampling requests. Samples are available upon request and are chargeable, with both sample cost and shipping charges payable in advance by the buyer.",
    ],
  },
  {
    n: "03",
    title: "Payment Terms",
    body: [
      "Our standard payment structure is strictly defined as follows:",
    ],
    bullets: [
      "70% advance payment is required upon issuance of the Proforma Invoice once the trade is confirmed.",
      "Remaining 30% payment is to be made prior to dispatch or against the scanned copy of the Bill of Lading (for sea shipments) / Air Waybill (for air shipments), as applicable.",
      "We also accept 100% advance payment for a faster and hassle-free process.",
      "Payment is to be made via Bank Transfer (SWIFT / NEFT / RTGS) to the account details provided in the Proforma Invoice.",
      "All bank charges (domestic and international) are to be borne by the buyer.",
    ],
    highlight: "Please note: Payment terms are strictly non-negotiable. However, if the buyer has any trust-related concerns, we offer a no minimum order quantity (MOQ) option. This allows the buyer to begin with smaller trial orders, ensuring a low-risk and confidence-building approach. Should you require any clarification, please feel free to contact us.",
  },
  {
    n: "04",
    title: "Payment Policy & Buyer Verification",
    body: [
      "Our payment terms are fixed and non-negotiable, as clearly outlined in the “Payment Terms” section. This ensures transparency and consistency across all trade activities.",
      "However, product pricing may be negotiable, depending on factors such as buyer location, market demand, order volume, and prevailing market conditions.",
      "Prior to initiating any trade activities, Harvestgate Overseas will conduct a proper background verification of the buyer to safeguard against fraud and ensure compliance.",
      "Buyers are required to provide genuine and verifiable contact details, along with accurate organizational information, via the official Contact Us form on our website.",
      "Any discrepancies or unverifiable details may result in the rejection of the enquiry or delay in processing the order.",
    ],
  },
  {
    n: "05",
    title: "Third-Party Quality Testing",
    body: [
      "We partner with leading FSSAI Approved & NABL Accredited Food Testing Laboratories to ensure our products meet international quality and safety standards.",
      "Buyers may request third-party testing reports as per their import or quality requirements. These reports are provided upon request and are conducted by certified labs at an additional cost, which must be borne by the buyer.",
      "Testing covers a wide range of parameters, depending on the buyer’s specifications.",
    ],
  },
  {
    n: "06",
    title: "Shipping & Logistics",
    body: [
      "We offer multiple flexible shipping modes, including CIF (Cost, Insurance & Freight), CAF (Cost and Freight), FOB (Free on Board), FCA (Free Carrier), and Air Freight, depending on the buyer’s preference and logistical requirements.",
      "We work in close coordination with experienced Customs House Agents (CHAs) to ensure smooth customs clearance and compliant documentation.",
      "Once goods are dispatched, transit times are subject to carrier performance and customs clearance processes at both origin and destination.",
      "We are not liable for delays caused by shipping lines, customs authorities, port strikes, or any force majeure events.",
      "All risk transfers to the buyer as per the agreed Incoterm.",
    ],
  },
  {
    n: "07",
    title: "Packaging & Labeling",
    body: [
      "All products are packed using export-grade, food-safe, and moisture-resistant materials, suitable for long-distance shipping and international handling.",
      "Packaging customization (e.g., material type, size, or packing style) can be accommodated based on buyer preferences and feasibility, subject to prior agreement and any additional cost implications.",
    ],
    highlight: "Please note: While packaging specifications can be customized, private labelling and branding services are not offered by us at this moment.",
  },
  {
    n: "08",
    title: "Export Documentation",
    body: [
      "We provide all necessary export documentation, which may include:",
    ],
    bullets: [
      "Commercial Invoice",
      "Packing List",
      "Certificate of Origin",
      "Phytosanitary Certificate",
      "Fumigation Certificate (if applicable)",
      "Third-Party Lab Reports (on paid basis, if requested)",
      "Bill of Lading / Air Waybill",
    ],
    note: "Additional documents can be arranged upon request, subject to availability and additional charges.",
  },
  {
    n: "09",
    title: "Product Liability & Claims",
    body: [
      "All products are inspected and quality-checked before dispatch.",
      "Claims for quality, weight shortage, or damage must be raised within 5 working days of goods arrival at the destination.",
      "No claims will be entertained without proper video evidence and third-party inspection report (if applicable).",
      "We are not responsible for deterioration caused due to improper storage, handling, or delays in clearance after arrival.",
    ],
  },
  {
    n: "10",
    title: "Force Majeure",
    body: [
      "We shall not be held responsible for delays or non-performance resulting from events beyond our control, including but not limited to natural disasters, pandemics, war, embargoes, shipping disruptions, port strikes, or governmental restrictions.",
    ],
  },
  {
    n: "11",
    title: "Confidentiality",
    body: [
      "All buyer-seller interactions, pricing, documents, and trade terms are considered strictly confidential and must not be disclosed to third parties without mutual consent.",
    ],
  },
  {
    n: "12",
    title: "Jurisdiction & Dispute Resolution",
    body: [
      "All contracts, transactions, and disputes shall be governed exclusively by the laws of the Republic of India.",
      "In the event of a legal dispute, the parties agree that the courts of Moradabad, Uttar Pradesh, India, shall have exclusive jurisdiction.",
      "Parties are encouraged to resolve disputes amicably through discussion or third-party mediation before resorting to legal proceedings.",
    ],
  },
  {
    n: "13",
    title: "Fraud Protection & Official Communication",
    body: [
      "To protect our buyers from fraudulent activities, please note that Harvestgate Overseas communicates only through the following official channels:",
    ],
    officialChannels: true,
    bullets: [
      "Buyers are strictly advised not to respond to any emails, messages, or calls from other IDs, numbers, or domains claiming to represent Harvestgate Overseas.",
      "We will not be liable for any financial loss or miscommunication arising from dealings conducted outside of our official contact points.",
      "For complete security, buyers are encouraged to verify all payment details and trade communications directly with our official contacts before making any financial commitments.",
    ],
  },
];

const Terms = () => (
  <div data-testid="page-terms" className="pt-[105px] sm:pt-[125px]">
    {/* HERO BANNER */}
    <section className="hg-container pt-16 pb-12 sm:pt-24 sm:pb-16">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-hg-gold animate-pulse" />
        <p className="hg-eyebrow text-xs font-bold">Legal Governance &amp; Trade Terms</p>
      </div>
      <MaskLines
        data-testid="terms-heading"
        delay={0.12}
        className="hg-display mt-5 text-[12vw] leading-[0.88] text-hg-fg sm:text-[8vw] lg:text-[6vw] font-black"
        lines={["Terms &", "Conditions."]}
      />
      <Reveal delay={0.35}>
        <p className="mt-5 max-w-2xl text-lg sm:text-xl text-hg-fg2 font-medium leading-relaxed">
          The legal framework and commercial guidelines governing all procurement, contracting, quality compliance, and international shipments with HarvestGate Overseas Pvt. Ltd.
        </p>
      </Reveal>
    </section>

    {/* CONTENT SECTION */}
    <section className="hg-container pb-24 sm:pb-32">
      <div className="grid grid-cols-1 gap-12 border-t border-hg-line pt-12 lg:grid-cols-12 lg:gap-16">
        {/* TABLE OF CONTENTS */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-36 rounded-2xl border border-hg-line bg-hg-bg2/70 p-6 backdrop-blur-sm shadow-sm">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-hg-gold font-bold flex items-center gap-2">
              <ShieldCheck size={14} /> Contents (13 Clauses)
            </p>
            <ol className="mt-5 space-y-2.5 max-h-[70vh] overflow-y-auto pr-2 no-scrollbar">
              {SECTIONS.map((s) => (
                <li key={s.n}>
                  <a
                    href={`#clause-${s.n}`}
                    data-testid={`terms-toc-${s.n}`}
                    className="group flex items-start gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-hg-fg2 transition-colors hover:text-hg-gold"
                  >
                    <span className="text-hg-gold font-bold shrink-0">{s.n}</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5 leading-snug">{s.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </aside>

        {/* CLAUSES BODY */}
        <div className="lg:col-span-8">
          <div className="space-y-12">
            {SECTIONS.map((s, i) => (
              <Reveal
                key={s.n}
                delay={0.05}
                id={`clause-${s.n}`}
                className="scroll-mt-36 rounded-2xl border border-hg-line bg-hg-card/50 p-6 sm:p-8 transition-colors hover:border-hg-gold/40 shadow-sm"
              >
                <div className="flex items-center justify-between border-b border-hg-line/80 pb-4">
                  <span className="inline-block rounded-md bg-hg-gold/15 px-2.5 py-1 font-mono text-xs font-bold text-hg-gold tracking-widest">
                    CLAUSE {s.n}
                  </span>
                  <span className="font-mono text-[11px] text-hg-fg3 tracking-wider uppercase">
                    HarvestGate Standard
                  </span>
                </div>

                <h2 className="mt-5 text-2xl font-bold leading-tight text-hg-fg sm:text-3xl">
                  {s.title}
                </h2>

                <div className="mt-5 space-y-3.5">
                  {s.body.map((p, k) => (
                    <p key={k} className="text-[14.5px] leading-[1.85] text-hg-fg2 font-medium">
                      {p}
                    </p>
                  ))}

                  {/* Official Channels Callout for Clause 13 */}
                  {s.officialChannels && (
                    <div className="my-4 rounded-xl border border-hg-gold/30 bg-hg-gold/10 p-5 space-y-2">
                      <p className="font-mono text-xs font-bold text-hg-gold uppercase tracking-wider">
                        Verified Contact Desks:
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 pt-1 font-mono text-xs">
                        <a
                          href="mailto:contact@harvestgateoverseas.com"
                          className="flex items-center gap-2 text-hg-fg font-bold hover:text-hg-gold transition-colors"
                        >
                          <Mail size={14} className="text-hg-gold" />
                          contact@harvestgateoverseas.com
                        </a>
                        <a
                          href="https://wa.me/918077078313"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold hover:underline transition-colors"
                        >
                          <Phone size={14} className="text-emerald-500" />
                          +91 80770 78313 (WhatsApp)
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Bullets if any */}
                  {s.bullets && (
                    <ul className="mt-4 space-y-2.5 border-l-2 border-hg-gold/40 pl-4">
                      {s.bullets.map((b, bi) => (
                        <li key={bi} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-hg-fg font-medium">
                          <CheckCircle2 size={15} className="mt-1 shrink-0 text-hg-gold" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Note if any */}
                  {s.note && (
                    <p className="mt-3 text-xs font-mono text-hg-fg3 italic">
                      * {s.note}
                    </p>
                  )}

                  {/* Highlight box if any */}
                  {s.highlight && (
                    <div className="mt-5 rounded-xl border-l-4 border-amber-500 bg-amber-500/10 p-4 sm:p-5 flex items-start gap-3">
                      <AlertCircle size={18} className="mt-0.5 shrink-0 text-amber-500" />
                      <p className="text-sm font-semibold text-hg-fg leading-relaxed">
                        {s.highlight}
                      </p>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          {/* QUESTIONS CALLOUT */}
          <div className="mt-14 rounded-2xl border border-hg-line bg-gradient-to-br from-hg-bg2 via-hg-card to-hg-card p-8 shadow-md">
            <p className="hg-eyebrow text-xs font-bold">Have Questions About Our Terms?</p>
            <p className="mt-3 text-base leading-relaxed text-hg-fg2 font-medium">
              Our export trade desk is available to discuss custom shipment specifications, formal Proforma Invoices, laboratory testing parameters, and container freight requirements.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link to="/contact" data-testid="terms-cta-contact" className="hg-btn hg-btn--solid">
                <span>Contact Export Desk</span>
              </Link>
              <a
                href="mailto:contact@harvestgateoverseas.com"
                className="font-mono text-xs font-bold text-hg-gold hover:underline flex items-center gap-1.5"
              >
                <Mail size={14} /> contact@harvestgateoverseas.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Terms;
