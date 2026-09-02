import { Link } from "react-router-dom";
import { ArrowUp, Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { LogoMark } from "./Logo";
import { PRODUCTS, CERTS } from "../data/products";
import { scrollToTopSmooth } from "./SmoothScroll";

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
        <div className="md:col-span-5">
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
        <div className="md:col-span-2">
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
        <button
          type="button"
          onClick={scrollToTopSmooth}
          data-testid="footer-back-to-top"
          className="group flex items-center gap-2 self-start font-mono text-[11.5px] uppercase tracking-[0.24em] font-bold text-hg-fg transition-colors hover:text-hg-gold sm:self-auto"
        >
          Back to top
          <ArrowUp size={14} className="transition-transform duration-300 group-hover:-translate-y-1 text-hg-gold" />
        </button>
      </div>
    </div>
  </footer>
);
