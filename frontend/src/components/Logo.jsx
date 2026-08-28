import { Link } from "react-router-dom";

/* Official HarvestGate Overseas emblem (background removed, proportions preserved).
   Dark theme lifts luminance only — brand hues are untouched. */
export const LogoMark = ({ className = "h-9" }) => (
  <img
    src="/logo.png"
    alt="HarvestGate Overseas logo"
    className={`w-auto shrink-0 select-none object-contain dark:[filter:brightness(1.55)_saturate(1.05)] ${className}`}
    draggable="false"
  />
);

export const BrandLock = ({ onClick, compact = false }) => (
  <Link
    to="/"
    onClick={onClick}
    data-testid="nav-brand-logo"
    className="group flex min-w-0 items-center gap-2.5 sm:gap-3.5"
    aria-label="HarvestGate Overseas — home"
  >
    <LogoMark className={compact ? "h-8" : "h-9 sm:h-12"} />
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
