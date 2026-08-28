import { Link } from "react-router-dom";
import { ArrowUp, Mail, Phone, MapPin } from "lucide-react";
import { LogoMark } from "./Logo";
import { PRODUCTS, CERTS } from "../data/products";
import { scrollToTopSmooth } from "./SmoothScroll";

const COL_LINKS = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About us" },
  { to: "/contact", label: "Enquiry" },
  { to: "/terms", label: "Terms" },
];

export const Footer = () => (
  <footer data-testid="site-footer" className="border-t border-hg-line bg-hg-bg2">
    <div className="hg-container py-16 sm:py-20">
      <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 text-hg-gold">
            <LogoMark className="h-11 w-11" />
            <div className="leading-none">
              <p className="hg-display text-2xl text-hg-fg">
                Harvest<span className="text-hg-gold">Gate</span>
              </p>
              <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.3em] text-hg-fg3">
                Overseas Private Limited
              </p>
            </div>
          </div>
          <p className="mt-7 max-w-sm text-sm leading-relaxed text-hg-fg2">
            Premium Indian agricultural exports for global B2B buyers.
            <span className="hg-italic text-hg-fg"> Cultivated with intent, shipped with proof.</span>
          </p>
          <div className="mt-8 space-y-3 font-mono text-[11px] tracking-[0.08em] text-hg-fg2">
            <a
              href="mailto:exports@harvestgateoverseas.com"
              data-testid="footer-email"
              className="flex items-center gap-3 transition-colors hover:text-hg-gold"
            >
              <Mail size={13} className="text-hg-gold" />
              exports@harvestgateoverseas.com
            </a>
            <a
              href="tel:+919000000000"
              data-testid="footer-phone"
              className="flex items-center gap-3 transition-colors hover:text-hg-gold"
            >
              <Phone size={13} className="text-hg-gold" />
              +91 90 0000 0000
            </a>
            <p className="flex items-start gap-3">
              <MapPin size={13} className="mt-0.5 shrink-0 text-hg-gold" />
              Patna, Bihar · Kolhapur, Maharashtra · India
            </p>
          </div>
        </div>

        <div className="md:col-span-3">
          <p className="hg-eyebrow">Catalogue</p>
          <ul className="mt-6 space-y-3.5">
            {PRODUCTS.map((p) => (
              <li key={p.slug}>
                <Link
                  to={`/products/${p.slug}`}
                  data-testid={`footer-product-${p.slug}`}
                  className="hg-link text-sm text-hg-fg2 transition-colors hover:text-hg-fg"
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="hg-eyebrow">Navigate</p>
          <ul className="mt-6 space-y-3.5">
            {COL_LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  data-testid={`footer-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="hg-link text-sm text-hg-fg2 transition-colors hover:text-hg-fg"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="hg-eyebrow">Compliance</p>
          <ul className="mt-6 space-y-3">
            {CERTS.map((c) => (
              <li key={c} className="font-mono text-[10px] uppercase tracking-[0.14em] text-hg-fg3">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-5 border-t border-hg-line pt-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-hg-fg3">
          © {new Date().getFullYear()} HarvestGate Overseas Pvt. Ltd. — All rights reserved
        </p>
        <button
          type="button"
          onClick={scrollToTopSmooth}
          data-testid="footer-back-to-top"
          className="group flex items-center gap-2 self-start font-mono text-[10px] uppercase tracking-[0.24em] text-hg-fg2 transition-colors hover:text-hg-gold sm:self-auto"
        >
          Back to top
          <ArrowUp size={12} className="transition-transform duration-300 group-hover:-translate-y-1" />
        </button>
      </div>
    </div>
  </footer>
);
