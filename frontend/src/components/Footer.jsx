import { Link } from "react-router-dom";
import { ArrowUp, Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { LogoMark } from "./Logo";
import { PRODUCTS, CERTS } from "../data/products";
import { scrollToTopSmooth } from "./SmoothScroll";

const LinkedInIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const WhatsAppIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="#25D366">
    <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.677.15-.201.3-.777.978-.952 1.179-.175.201-.35.226-.652.075-1.804-.903-2.983-1.613-4.17-3.652-.153-.263.153-.244.437-.813.076-.15.038-.282-.019-.395-.057-.113-.514-1.238-.704-1.696-.185-.446-.373-.386-.513-.393-.133-.007-.285-.008-.437-.008-.152 0-.399.057-.608.285-.209.228-.798.78-.798 1.902 0 1.122.817 2.206.931 2.357.114.15 1.609 2.457 3.899 3.446 1.434.619 1.996.678 2.71.572.434-.065 1.332-.544 1.522-1.07.19-.526.19-.978.133-1.07-.057-.093-.209-.15-.51-.3zM12.04 2C6.516 2 2.022 6.47 2.022 11.968c0 1.954.568 3.774 1.554 5.319L2 22l4.87-1.53c1.479.885 3.203 1.398 5.17 1.398 5.524 0 10.018-4.47 10.018-9.968C22.058 6.47 17.564 2 12.04 2z" />
  </svg>
);

const COL_LINKS = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Catalogue" },
  { to: "/about", label: "About us" },
  { to: "/contact", label: "Export Enquiry" },
  { to: "/terms", label: "Terms & Conditions" },
];

export const Footer = () => (
  <footer data-testid="site-footer" className="border-t border-hg-line bg-hg-bg2 transition-colors duration-300">
    <div className="hg-container py-16 sm:py-24">
      <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-12">
        {/* BRAND & CONTACT */}
        <div className="md:col-span-4">
          <div className="flex items-center gap-4">
            <LogoMark className="h-16 sm:h-18" />
            <div className="leading-tight">
              <p className="hg-display text-3xl sm:text-4xl text-hg-fg">
                Harvest<span className="text-hg-gold">Gate</span>
              </p>
              <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.32em] text-hg-fg3 font-semibold">
                Overseas Private Limited
              </p>
            </div>
          </div>
          <p className="mt-7 max-w-md text-base leading-relaxed text-hg-fg font-medium">
            Premium Indian agricultural exports for global B2B buyers and institutional importers.
            <span className="hg-italic text-hg-fg text-lg font-normal"> Cultivated with intent, shipped with proof.</span>
          </p>
          <div className="mt-8 space-y-3.5 font-mono text-[13px] text-hg-fg">
            <a
              href="mailto:contact@harvestgateoverseas.com"
              data-testid="footer-email"
              className="flex items-center gap-3 transition-colors hover:text-hg-gold font-medium"
            >
              <Mail size={16} className="text-hg-gold shrink-0" />
              contact@harvestgateoverseas.com
            </a>
            <a
              href="tel:+918077078313"
              data-testid="footer-phone"
              className="flex items-center gap-3 transition-colors hover:text-hg-gold font-medium"
            >
              <Phone size={16} className="text-hg-gold shrink-0" />
              +91 8077078313
            </a>
            <p className="flex items-start gap-3 text-hg-fg2">
              <MapPin size={16} className="mt-1 shrink-0 text-hg-gold" />
              <span>Mig-14, Kanth Rd, near Muskan Nursing Home, Ashiyana Colony, Harthala, Moradabad, Uttar Pradesh, India - 244001</span>
            </p>
          </div>

          {/* SOCIAL MEDIA CHANNELS */}
          <div className="mt-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-hg-gold font-bold mb-3">
              Official Channels
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/harvestgate-overseas/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="HarvestGate Overseas on LinkedIn"
                className="group flex h-10 w-10 items-center justify-center rounded-xl border border-hg-line bg-hg-bg transition-all duration-300 hover:border-[#0A66C2] hover:bg-[#0A66C2]/10 hover:text-[#0A66C2] text-hg-fg shadow-sm hover:-translate-y-0.5"
                title="LinkedIn — HarvestGate Overseas"
              >
                <LinkedInIcon className="h-4 w-4 fill-current transition-transform duration-300 group-hover:scale-110" />
              </a>
              <a
                href="https://www.instagram.com/harvestgateoverseaspvtltd/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="HarvestGate Overseas on Instagram"
                className="group flex h-10 w-10 items-center justify-center rounded-xl border border-hg-line bg-hg-bg transition-all duration-300 hover:border-[#E1306C] hover:bg-[#E1306C]/10 hover:text-[#E1306C] text-hg-fg shadow-sm hover:-translate-y-0.5"
                title="Instagram — @harvestgateoverseaspvtltd"
              >
                <InstagramIcon className="h-4 w-4 fill-current transition-transform duration-300 group-hover:scale-110" />
              </a>
              <a
                href="https://wa.me/918077078313?text=Hello%20HarvestGate%20Overseas,%20I%20am%20interested%20in%20an%20export%20enquiry."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="HarvestGate Overseas on WhatsApp"
                className="group flex h-10 w-10 items-center justify-center rounded-xl border border-hg-line bg-hg-bg transition-all duration-300 hover:border-[#25D366] hover:bg-[#25D366]/10 hover:text-[#25D366] text-hg-fg shadow-sm hover:-translate-y-0.5"
                title="WhatsApp Direct Export Desk"
              >
                <WhatsAppIcon className="h-4 w-4 fill-[#25D366] transition-transform duration-300 group-hover:scale-110" />
              </a>
            </div>
          </div>
        </div>

        {/* CATALOGUE LINKS */}
        <div className="md:col-span-3">
          <p className="hg-eyebrow text-[11px] font-bold">Commodities</p>
          <ul className="mt-6 space-y-3">
            {PRODUCTS.map((p) => (
              <li key={p.slug}>
                <Link
                  to={`/products/${p.slug}`}
                  data-testid={`footer-product-${p.slug}`}
                  className="hg-link text-[15px] font-semibold text-hg-fg transition-colors hover:text-hg-gold"
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* NAVIGATE */}
        <div className="md:col-span-2">
          <p className="hg-eyebrow text-[11px] font-bold">Navigate</p>
          <ul className="mt-6 space-y-3">
            {COL_LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  data-testid={`footer-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="hg-link text-[15px] font-semibold text-hg-fg transition-colors hover:text-hg-gold"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* COMPLIANCE */}
        <div className="md:col-span-3">
          <p className="hg-eyebrow text-[11px] font-bold">Registration & Accreditations</p>
          <ul className="mt-6 space-y-3">
            {CERTS.map((c) => (
              <li key={c} className="font-mono text-[11.5px] font-semibold text-hg-fg flex items-start gap-2">
                <CheckCircle2 size={13} className="text-hg-gold shrink-0 mt-0.5" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-5 border-t border-hg-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-hg-fg3 font-semibold">
          © {new Date().getFullYear()} HarvestGate Overseas Pvt. Ltd. — All rights reserved
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/company/harvestgate-overseas/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-hg-fg3 hover:text-[#0A66C2] transition-colors"
          >
            <LinkedInIcon className="w-4 h-4 fill-current" />
          </a>
          <a
            href="https://www.instagram.com/harvestgateoverseaspvtltd/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-hg-fg3 hover:text-[#E1306C] transition-colors"
          >
            <InstagramIcon className="w-4 h-4 fill-current" />
          </a>
          <button
            type="button"
            onClick={scrollToTopSmooth}
            data-testid="footer-back-to-top"
            className="group flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.24em] font-bold text-hg-fg transition-colors hover:text-hg-gold ml-2"
          >
            Back to top
            <ArrowUp size={14} className="transition-transform duration-300 group-hover:-translate-y-1 text-hg-gold" />
          </button>
        </div>
      </div>
    </div>
  </footer>
);
