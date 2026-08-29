import { useEffect, useState, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, ArrowUpRight, ChevronDown, CheckCircle2 } from "lucide-react";
import { useTheme } from "../theme/ThemeProvider";
import { BrandLock } from "./Logo";
import { PRODUCTS, surfaceAccent } from "../data/products";

const EASE = [0.16, 1, 0.3, 1];

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const dropdownTimeoutRef = useRef(null);

  useEffect(() => {
    setOpen(false);
    setProductsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock background scroll completely when mobile menu is open
  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      }
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setProductsOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setProductsOpen(false);
    }, 150);
  };

  return (
    <>
      <header
        data-testid="site-navbar"
        className={`fixed inset-x-0 top-0 z-[60] transition-all duration-300 ${
          scrolled
            ? "border-b border-hg-line bg-white/98 dark:bg-[#0e0e0e]/98 shadow-md"
            : "border-b border-hg-line/60 bg-white/95 dark:bg-[#0e0e0e]/95"
        }`}
      >
        {/* ============ TOP COMPLIANCE & CREDENTIALS BAR ============ */}
        <div className="border-b border-hg-line/80 bg-hg-bg2 py-2 text-[11.5px] font-mono tracking-wider transition-colors duration-300">
          <div className="hg-container flex flex-wrap items-center justify-between gap-x-6 gap-y-1.5">
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-hg-fg2">
              <span className="flex items-center gap-1.5 text-hg-fg font-semibold">
                <CheckCircle2 size={13} className="text-hg-gold shrink-0" />
                <span className="text-hg-fg3 font-medium">GSTIN:</span>
                <span className="text-hg-gold font-bold tracking-widest">09AAICH2946R1ZR</span>
              </span>
              <span className="hidden sm:inline text-hg-line2">|</span>
              <span className="flex items-center gap-1.5 text-hg-fg font-semibold">
                <span className="text-hg-fg3 font-medium">IEC:</span>
                <span className="text-hg-gold font-bold tracking-widest">AAICH2946R</span>
              </span>
              <span className="hidden md:inline text-hg-line2">|</span>
              <span className="hidden md:inline text-hg-fg font-semibold text-[11px] uppercase tracking-[0.2em]">
                Govt. of India Registered Exporter
              </span>
            </div>

            <div className="hidden lg:flex items-center gap-4 text-hg-fg font-medium text-[11px]">
              <span className="text-hg-fg2 font-mono">Moradabad, UP · India</span>
              <span className="text-hg-line2">|</span>
              <a
                href="tel:+918077078313"
                className="text-hg-gold hover:underline transition-colors font-mono font-bold"
              >
                +91 8077078313
              </a>
            </div>
          </div>
        </div>

        {/* ============ MAIN NAVIGATION ============ */}
        <div className="hg-container flex h-[84px] sm:h-[96px] items-center justify-between gap-4">
          <BrandLock />

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden lg:flex items-center gap-11">
            <NavLink
              to="/"
              end
              data-testid="nav-link-home"
              className={({ isActive }) =>
                `hg-link font-mono text-[14.5px] uppercase tracking-[0.22em] font-semibold transition-colors duration-300 ${
                  isActive ? "text-hg-gold font-bold" : "text-hg-fg hover:text-hg-gold"
                }`
              }
            >
              {({ isActive }) => (
                <span data-active={isActive ? "true" : "false"} className="hg-link">
                  Home
                </span>
              )}
            </NavLink>

            {/* PRODUCTS WITH SOLID (OPAQUE) DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setProductsOpen((prev) => !prev)}
                className={`hg-link flex items-center gap-1.5 font-mono text-[14.5px] uppercase tracking-[0.22em] font-semibold transition-colors duration-300 ${
                  pathname.startsWith("/products")
                    ? "text-hg-gold font-bold"
                    : "text-hg-fg hover:text-hg-gold"
                }`}
                aria-expanded={productsOpen}
                data-testid="nav-products-dropdown-toggle"
              >
                <span>Products</span>
                <ChevronDown
                  size={15}
                  className={`transition-transform duration-300 ${
                    productsOpen ? "rotate-180 text-hg-gold" : "text-hg-fg3"
                  }`}
                />
              </button>

              {/* SOLID, OPAQUE DROPDOWN MENU */}
              <AnimatePresence>
                {productsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18, ease: EASE }}
                    className="absolute left-1/2 top-full -translate-x-1/2 mt-3 w-[390px] sm:w-[440px] rounded border-2 border-hg-line bg-white dark:bg-[#161616] p-3 shadow-[0_25px_60px_rgba(0,0,0,0.35)] z-[9999]"
                    style={{ opacity: 1 }}
                  >
                    <div className="border-b border-hg-line px-3.5 pb-2.5 pt-1">
                      <p className="font-mono text-[10.5px] uppercase tracking-[0.3em] text-hg-gold font-bold">
                        Select an Export Commodity
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-1 pt-2 max-h-[400px] overflow-y-auto">
                      {PRODUCTS.map((p) => (
                        <Link
                          key={p.slug}
                          to={`/products/${p.slug}`}
                          onClick={() => setProductsOpen(false)}
                          data-testid={`dropdown-product-${p.slug}`}
                          className="group flex items-center justify-between rounded px-3.5 py-2.5 transition-colors duration-150 hover:bg-[#f3f0e8] dark:hover:bg-[#222222]"
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className="h-3 w-3 rounded-full transition-transform duration-200 group-hover:scale-125 shrink-0 border border-black/10 dark:border-white/10"
                              style={{ backgroundColor: surfaceAccent(p, theme) }}
                            />
                            <div>
                              <p className="text-[15px] font-bold text-hg-fg transition-colors group-hover:text-hg-gold">
                                {p.name}
                              </p>
                              <p className="text-[11.5px] font-mono font-medium text-hg-fg3 tracking-wider">
                                {p.subtitle}
                              </p>
                            </div>
                          </div>
                          <ArrowUpRight
                            size={15}
                            className="shrink-0 text-hg-fg3 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-hg-gold"
                          />
                        </Link>
                      ))}
                    </div>

                    <div className="mt-2 border-t border-hg-line pt-2.5 px-3">
                      <Link
                        to="/products"
                        onClick={() => setProductsOpen(false)}
                        className="flex items-center justify-between text-[12px] font-mono uppercase tracking-[0.2em] font-bold text-hg-gold hover:underline"
                      >
                        <span>View Full 2026 Catalogue ({PRODUCTS.length} Commodities)</span>
                        <ArrowUpRight size={14} />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink
              to="/about"
              data-testid="nav-link-about"
              className={({ isActive }) =>
                `hg-link font-mono text-[14.5px] uppercase tracking-[0.22em] font-semibold transition-colors duration-300 ${
                  isActive ? "text-hg-gold font-bold" : "text-hg-fg hover:text-hg-gold"
                }`
              }
            >
              {({ isActive }) => (
                <span data-active={isActive ? "true" : "false"} className="hg-link">
                  About
                </span>
              )}
            </NavLink>

            <NavLink
              to="/terms"
              data-testid="nav-link-terms"
              className={({ isActive }) =>
                `hg-link font-mono text-[14.5px] uppercase tracking-[0.22em] font-semibold transition-colors duration-300 ${
                  isActive ? "text-hg-gold font-bold" : "text-hg-fg hover:text-hg-gold"
                }`
              }
            >
              {({ isActive }) => (
                <span data-active={isActive ? "true" : "false"} className="hg-link">
                  Terms
                </span>
              )}
            </NavLink>
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              type="button"
              onClick={toggleTheme}
              data-testid="nav-theme-toggle"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              className="grid h-11 w-11 place-items-center border-2 border-hg-line text-hg-fg transition-colors duration-300 hover:border-hg-gold hover:text-hg-gold"
            >
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="grid place-items-center"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </motion.span>
            </button>

            <Link
              to="/contact"
              data-testid="nav-enquiry-cta"
              className="hg-btn !hidden sm:!inline-flex !py-[0.8rem] !px-6 text-[12.5px] font-mono uppercase tracking-[0.24em] font-bold"
            >
              <span>Enquire</span>
              <ArrowUpRight size={14} className="relative z-[2]" />
            </Link>

            {/* MOBILE MENU TOGGLE */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              data-testid="mobile-menu-toggle"
              aria-label="Toggle navigation menu"
              aria-expanded={open}
              className="lg:hidden grid h-11 w-11 place-items-center border-2 border-hg-line text-hg-fg"
            >
              <span className="relative block h-[11px] w-[20px]">
                <motion.span
                  animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="absolute left-0 top-0 h-[2px] w-full bg-current"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="absolute bottom-0 left-0 h-[2px] w-full bg-current"
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ============ MOBILE NAVIGATION OVERLAY ============ */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-nav"
            data-testid="mobile-nav-overlay"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 z-[55] flex flex-col overflow-y-auto bg-white dark:bg-[#0e0e0e] pt-[125px] pb-12 lg:hidden shadow-2xl"
          >
            <div className="hg-container flex flex-1 flex-col justify-between py-6">
              {/* MOBILE COMPLIANCE DETAILS */}
              <div className="border-b border-hg-line pb-4 mb-6 space-y-1.5 font-mono text-[12px] text-hg-fg2">
                <p className="flex items-center justify-between">
                  <span className="font-semibold text-hg-fg">GSTIN:</span>
                  <span className="text-hg-gold font-bold">09AAICH2946R1ZR</span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="font-semibold text-hg-fg">IEC:</span>
                  <span className="text-hg-gold font-bold">AAICH2946R</span>
                </p>
              </div>

              <nav className="flex flex-col space-y-2">
                <Link
                  to="/"
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between py-3.5 border-b border-hg-line"
                >
                  <span className="hg-display text-3xl text-hg-fg font-bold">Home</span>
                  <span className="font-mono text-[12px] tracking-[0.3em] text-hg-gold font-bold">01</span>
                </Link>

                {/* MOBILE PRODUCTS ACCORDION */}
                <div className="border-b border-hg-line py-3.5">
                  <button
                    type="button"
                    onClick={() => setMobileProductsOpen((v) => !v)}
                    className="flex w-full items-center justify-between text-left"
                  >
                    <span className="hg-display text-3xl text-hg-fg font-bold">Products</span>
                    <ChevronDown
                      size={22}
                      className={`text-hg-gold transition-transform duration-300 ${
                        mobileProductsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {mobileProductsOpen && (
                    <div className="mt-4 grid grid-cols-1 gap-2 pl-3">
                      {PRODUCTS.map((p) => (
                        <Link
                          key={p.slug}
                          to={`/products/${p.slug}`}
                          onClick={() => setOpen(false)}
                          className="flex items-center justify-between py-2.5 text-[15px] font-semibold text-hg-fg hover:text-hg-gold"
                        >
                          <span className="flex items-center gap-3">
                            <span
                              className="h-2.5 w-2.5 rounded-full shrink-0"
                              style={{ backgroundColor: surfaceAccent(p, theme) }}
                            />
                            <span>{p.name}</span>
                          </span>
                          <span className="text-[11px] font-mono text-hg-fg3">{p.subtitle.split("·")[0]}</span>
                        </Link>
                      ))}
                      <Link
                        to="/products"
                        onClick={() => setOpen(false)}
                        className="mt-2 text-[13px] font-mono uppercase tracking-[0.2em] font-bold text-hg-gold"
                      >
                        → View All {PRODUCTS.length} Products
                      </Link>
                    </div>
                  )}
                </div>

                <Link
                  to="/about"
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between py-3.5 border-b border-hg-line"
                >
                  <span className="hg-display text-3xl text-hg-fg font-bold">About</span>
                  <span className="font-mono text-[12px] tracking-[0.3em] text-hg-gold font-bold">03</span>
                </Link>

                <Link
                  to="/terms"
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between py-3.5 border-b border-hg-line"
                >
                  <span className="hg-display text-3xl text-hg-fg font-bold">Terms</span>
                  <span className="font-mono text-[12px] tracking-[0.3em] text-hg-gold font-bold">04</span>
                </Link>
              </nav>

              <div className="mt-8 space-y-4">
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="hg-btn hg-btn--solid w-full justify-center text-[13px] font-bold py-3.5"
                >
                  <span>Request Export Quotation</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
