import { Link } from "react-router-dom";

/* Official HarvestGate Overseas emblem (background removed, proportions preserved).
   Dark theme lifts luminance only — brand hues are untouched. */
export const LogoMark = ({ className = "h-12 sm:h-14" }) => (
  <img
    src="/logo.png"
    alt="HarvestGate Overseas logo"
    className={`w-auto shrink-0 select-none object-contain transition-transform duration-300 group-hover:scale-105 dark:[filter:brightness(1.4)_saturate(1.1)] ${className}`}
    draggable="false"
  />
);

export const BrandLock = ({ onClick, compact = false }) => (
  <Link
    to="/"
    onClick={onClick}
    data-testid="nav-brand-logo"
    className="group flex min-w-0 items-center gap-3 sm:gap-4 py-1"
    aria-label="HarvestGate Overseas — home"
  >
    <LogoMark className={compact ? "h-10 sm:h-12" : "h-12 sm:h-14 lg:h-16"} />
    <span className="flex flex-col justify-center leading-tight">
      <span
        className={`hg-display text-hg-fg ${
          compact ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl lg:text-[2rem]"
        } whitespace-nowrap tracking-[0.03em] font-normal transition-colors duration-300 group-hover:text-hg-gold`}
      >
        Harvest<span className="text-hg-gold">Gate</span>
      </span>
      <span className="mt-0.5 whitespace-nowrap font-mono text-[8.5px] uppercase tracking-[0.32em] text-hg-fg3 sm:text-[10.5px] sm:tracking-[0.36em]">
        Overseas Pvt. Ltd.
      </span>
    </span>
  </Link>
);
