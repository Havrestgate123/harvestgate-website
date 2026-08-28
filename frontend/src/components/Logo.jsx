import { Link } from "react-router-dom";

/* HarvestGate emblem — thin-line gate arch enclosing a wheat sheaf.
   Placeholder for the official logo file; swap the SVG for an <img> when supplied. */
export const LogoMark = ({ className = "h-9 w-9" }) => (
  <svg
    viewBox="0 0 48 56"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth="1.1"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M3 54V22C3 11.5 12.4 3 24 3s21 8.5 21 19v32" />
    <path d="M24 50V19" />
    <path d="M24 20c-4.8-.6-7.6-3.6-7.8-8.6 4.9.5 7.7 3.5 7.8 8.6ZM24 20c4.8-.6 7.6-3.6 7.8-8.6-4.9.5-7.7 3.5-7.8 8.6Z" />
    <path d="M24 30c-5.4-.7-8.6-4-8.8-9.6 5.5.6 8.7 3.9 8.8 9.6ZM24 30c5.4-.7 8.6-4 8.8-9.6-5.5.6-8.7 3.9-8.8 9.6Z" />
    <path d="M24 40c-5.4-.7-8.6-4-8.8-9.6 5.5.6 8.7 3.9 8.8 9.6ZM24 40c5.4-.7 8.6-4 8.8-9.6-5.5.6-8.7 3.9-8.8 9.6Z" />
    <path d="M10 54h28" />
  </svg>
);

export const BrandLock = ({ onClick, compact = false }) => (
  <Link
    to="/"
    onClick={onClick}
    data-testid="nav-brand-logo"
    className="group flex min-w-0 items-center gap-2.5 text-hg-gold sm:gap-3"
    aria-label="HarvestGate Overseas — home"
  >
    <LogoMark className={compact ? "h-7 w-7" : "h-7 w-7 shrink-0 sm:h-10 sm:w-10"} />
    <span className="flex flex-col leading-none">
      <span
        className={`hg-display text-hg-fg ${
          compact ? "text-base" : "text-base sm:text-xl"
        } whitespace-nowrap tracking-[0.02em]`}
      >
        Harvest<span className="text-hg-gold">Gate</span>
      </span>
      <span className="mt-1 whitespace-nowrap font-mono text-[7px] uppercase tracking-[0.28em] text-hg-fg3 sm:text-[9px] sm:tracking-[0.3em]">
        Overseas Pvt. Ltd.
      </span>
    </span>
  </Link>
);
