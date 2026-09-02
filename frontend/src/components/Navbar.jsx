import { useEffect, useState, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, ArrowUpRight, ChevronDown, CheckCircle2, Leaf, Star, Mail, MapPin, ShieldCheck } from "lucide-react";
import { useTheme } from "../theme/ThemeProvider";
import { BrandLock } from "./Logo";
import { PRODUCTS, NATURALS_CATEGORIES, SELECT_CATEGORIES, surfaceAccent } from "../data/products";

const GmailIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path fill="#4285F4" d="M22 6.5V18C22 19.1 21.1 20 20 20H18V10.5L22 7.5V6.5Z" />
    <path fill="#34A853" d="M2 6.5V18C2 19.1 2.9 20 4 20H6V10.5L2 7.5V6.5Z" />
    <path fill="#EA4335" d="M18 10.5L12 15L6 10.5V4H7.5L12 7.5L16.5 4H18V10.5Z" />
    <path fill="#FBBC04" d="M18 4V10.5L22 7.5V6.5C22 4.8 20.3 3.6 18.7 4.3L18 4Z" />
    <path fill="#C5221F" d="M6 4V10.5L2 7.5V6.5C2 4.8 3.7 3.6 5.3 4.3L6 4Z" />
  </svg>
);

const WhatsAppIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="#25D366">
    <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.677.15-.201.3-.777.978-.952 1.179-.175.201-.35.226-.652.075-1.804-.903-2.983-1.613-4.17-3.652-.153-.263.153-.244.437-.813.076-.15.038-.282-.019-.395-.057-.113-.514-1.238-.704-1.696-.185-.446-.373-.386-.513-.393-.133-.007-.285-.008-.437-.008-.152 0-.399.057-.608.285-.209.228-.798.78-.798 1.902 0 1.122.817 2.206.931 2.357.114.15 1.609 2.457 3.899 3.446 1.434.619 1.996.678 2.71.572.434-.065 1.332-.544 1.522-1.07.19-.526.19-.978.133-1.07-.057-.093-.209-.15-.51-.3zM12.04 2C6.516 2 2.022 6.47 2.022 11.968c0 1.954.568 3.774 1.554 5.319L2 22l4.87-1.53c1.479.885 3.203 1.398 5.17 1.398 5.524 0 10.018-4.47 10.018-9.968C22.058 6.47 17.564 2 12.04 2z" />
  </svg>
);

const EASE = [0.16, 1, 0.3, 1];

const NATURALS_PRODUCTS = PRODUCTS.filter((p) => p.range === "NATURALS");
const SELECT_PRODUCTS = PRODUCTS.filter((p) => p.range === "SELECT");

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(true);
  const [mobileNaturalsOpen, setMobileNaturalsOpen] = useState(true);
  const [mobileSelectOpen, setMobileSelectOpen] = useState(true);
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
        className={`fixed inset-x-0 top-0 z-[60] transition-all duration-300 ${scrolled
            ? "border-b border-hg-line bg-white/98 dark:bg-[#0e0e0e]/98 shadow-md"
            : "border-b border-hg-line/60 bg-white/95 dark:bg-[#0e0e0e]/95"
          }`}
      >
        {/* ============ TOP COMPLIANCE & CREDENTIALS BAR ============ */}
        <div className="border-b border-hg-line/80 bg-hg-bg2 py-2 text-[11.5px] font-mono tracking-wider transition-colors duration-300">
          <div className="hg-container flex items-center justify-between gap-x-6 gap-y-2">
            {/* LEFT: Official Registrations & Badges */}
            <div className="flex items-center gap-3.5 sm:gap-5 text-hg-fg2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 text-hg-fg font-semibold">
                <CheckCircle2 size={13} className="text-hg-gold shrink-0" />
                <span className="text-hg-fg3 font-medium">GSTIN:</span>
                <span className="text-hg-gold font-bold tracking-wider">09AAICH2946R1ZR</span>
              </span>
              <span className="hidden sm:inline text-hg-line2">|</span>
              <span className="inline-flex items-center gap-1.5 text-hg-fg font-semibold">
                <CheckCircle2 size={13} className="text-hg-gold shrink-0" />
                <span className="text-hg-fg3 font-medium">IEC:</span>
                <span className="text-hg-gold font-bold tracking-wider">AAICH2946R</span>
              </span>
              <span className="hidden xl:inline text-hg-line2">|</span>
              <span className="hidden xl:inline-flex items-center gap-1.5 text-hg-fg font-semibold text-[11px] uppercase tracking-[0.2em]">
                <ShieldCheck size={13} className="text-emerald-500 shrink-0" />
                Govt. of India Registered
              </span>
            </div>

            {/* RIGHT: Symmetrical Location, Gmail & WhatsApp Links */}
            <div className="hidden lg:flex items-center gap-4 text-hg-fg font-medium text-[11.5px]">
              <span className="inline-flex items-center gap-1.5 text-hg-fg2 font-mono">
                <MapPin size={13} className="text-hg-gold shrink-0" />
                <span>Moradabad, Uttar Pradesh - 244001</span>
              </span>
              <span className="text-hg-line2">|</span>
              <a
                href="mailto:contact@harvestgateoverseas.com"
                className="inline-flex items-center gap-1.5 text-hg-fg hover:text-hg-gold transition-colors font-mono font-bold"
                title="Send official email via Gmail"
              >
                <GmailIcon className="w-3.5 h-3.5 shrink-0" />
                <span>contact@harvestgateoverseas.com</span>
              </a>
              <span className="text-hg-line2">|</span>
              <a
                href="https://wa.me/918077078313?text=Hello%20HarvestGate%20Overseas,%20I%20am%20interested%20in%20an%20export%20enquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors font-mono font-bold"
                title="Chat on WhatsApp"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 shrink-0" />
                <span>+91 8077078313</span>
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
                `hg-link font-mono text-[14.5px] uppercase tracking-[0.22em] font-semibold transition-colors duration-300 ${isActive ? "text-hg-gold font-bold" : "text-hg-fg hover:text-hg-gold"
                }`
              }
            >
              {({ isActive }) => (
                <span data-active={isActive ? "true" : "false"} className="hg-link">
                  Home
                </span>
              )}
            </NavLink>

            {/* PRODUCTS WITH TWO-RANGE MEGA DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setProductsOpen((prev) => !prev)}
                className={`hg-link flex items-center gap-1.5 font-mono text-[14.5px] uppercase tracking-[0.22em] font-semibold transition-colors duration-300 ${pathname.startsWith("/products")
                    ? "text-hg-gold font-bold"
                    : "text-hg-fg hover:text-hg-gold"
                  }`}
                aria-expanded={productsOpen}
                data-testid="nav-products-dropdown-toggle"
              >
                <span>Products</span>
                <ChevronDown
                  size={15}
                  className={`transition-transform duration-300 ${productsOpen ? "rotate-180 text-hg-gold" : "text-hg-fg3"
                    }`}
                />
              </button>

              {/* TWO-RANGE MEGA DROPDOWN */}
              <AnimatePresence>
                {productsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18, ease: EASE }}
                    className="absolute left-1/2 top-full -translate-x-1/2 mt-3 w-[660px] rounded border-2 border-hg-line bg-white dark:bg-[#161616] shadow-[0_25px_60px_rgba(0,0,0,0.35)] z-[9999] overflow-hidden"
                    style={{ opacity: 1 }}
                  >
                    <div className="grid grid-cols-2 divide-x-2 divide-hg-line">

                      {/* LEFT: HARVESTGATE NATURALS */}
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-hg-line bg-hg-bg2/60">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-hg-green/15 border border-hg-green/30">
                            <Leaf size={11} className="text-hg-green" />
                          </span>
                          <div>
                            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-hg-green font-bold">
                              Harvestgate Naturals
                            </p>
                          </div>
                        </div>
                        <div className="p-2">
                          {NATURALS_CATEGORIES.map((cat) => {
                            const product = NATURALS_PRODUCTS.find((p) => p.category === cat.id);
                            return (
                              <Link
                                key={cat.id}
                                to={`/products/${cat.slug}`}
                                onClick={() => setProductsOpen(false)}
                                data-testid={`dropdown-product-${cat.slug}`}
                                className="group flex items-center justify-between rounded px-3 py-2 transition-colors duration-150 hover:bg-[#f3f0e8] dark:hover:bg-[#222222]"
                              >
                                <div className="flex items-center gap-2.5">
                                  {product && (
                                    <span
                                      className="h-2.5 w-2.5 rounded-full shrink-0 border border-black/10 dark:border-white/10"
                                      style={{ backgroundColor: product ? surfaceAccent(product, theme) : "#8A9A86" }}
                                    />
                                  )}
                                  <div>
                                    <p className="text-[13.5px] font-bold text-hg-fg transition-colors group-hover:text-hg-green">
                                      {cat.label}
                                    </p>
                                    <p className="text-[10.5px] font-mono text-hg-fg3 tracking-wide leading-tight">
                                      {cat.description}
                                    </p>
                                  </div>
                                </div>
                                <ArrowUpRight
                                  size={13}
                                  className="shrink-0 text-hg-fg3 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-hg-green"
                                />
                              </Link>
                            );
                          })}
                        </div>
                      </div>

                      {/* RIGHT: HARVESTGATE SELECT */}
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-hg-line bg-hg-bg2/60">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-hg-gold/15 border border-hg-gold/30">
                            <Star size={11} className="text-hg-gold" />
                          </span>
                          <div>
                            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-hg-gold font-bold">
                              Harvestgate Select
                            </p>
                          </div>
                        </div>
                        <div className="p-2">
                          {SELECT_CATEGORIES.map((cat) => {
                            const product = SELECT_PRODUCTS.find((p) => p.category === cat.id);
                            return (
                              <Link
                                key={cat.id}
                                to={`/products/${cat.slug}`}
                                onClick={() => setProductsOpen(false)}
                                data-testid={`dropdown-product-${cat.slug}`}
                                className="group flex items-center justify-between rounded px-3 py-2 transition-colors duration-150 hover:bg-[#f3f0e8] dark:hover:bg-[#222222]"
                              >
                                <div className="flex items-center gap-2.5">
                                  {product && (
                                    <span
                                      className="h-2.5 w-2.5 rounded-full shrink-0 border border-black/10 dark:border-white/10"
                                      style={{ backgroundColor: product ? surfaceAccent(product, theme) : "#F7F4EB" }}
                                    />
                                  )}
                                  <div>
                                    <p className="text-[13.5px] font-bold text-hg-fg transition-colors group-hover:text-hg-gold">
                                      {cat.label}
                                    </p>
                                    <p className="text-[10.5px] font-mono text-hg-fg3 tracking-wide leading-tight">
                                      {cat.description}
                                    </p>
                                  </div>
                                </div>
                                <ArrowUpRight
                                  size={13}
                                  className="shrink-0 text-hg-fg3 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-hg-gold"
                                />
                              </Link>
                            );
                          })}
                        </div>

                        {/* Spacer + full catalogue link */}
                        <div className="mt-auto px-2 pb-2">
                          <div className="rounded border border-hg-gold/30 bg-hg-gold/5 p-3">
                            <p className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-hg-fg3 mb-1.5">Premium single-origin</p>
                            <p className="text-[12px] font-bold text-hg-fg leading-snug">
                              Grade-A Phool Makhana,<br />hand-popped in Bihar wetlands.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* FOOTER: View Full Catalogue */}
                    <div className="border-t-2 border-hg-line px-4 py-3 bg-hg-bg2/40">
                      <Link
                        to="/products"
                        onClick={() => setProductsOpen(false)}
                        className="flex items-center justify-between text-[11.5px] font-mono uppercase tracking-[0.2em] font-bold text-hg-gold hover:underline"
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
                `hg-link font-mono text-[14.5px] uppercase tracking-[0.22em] font-semibold transition-colors duration-300 ${isActive ? "text-hg-gold font-bold" : "text-hg-fg hover:text-hg-gold"
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
                `hg-link font-mono text-[14.5px] uppercase tracking-[0.22em] font-semibold transition-colors duration-300 ${isActive ? "text-hg-gold font-bold" : "text-hg-fg hover:text-hg-gold"
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
                      className={`text-hg-gold transition-transform duration-300 ${mobileProductsOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {mobileProductsOpen && (
                    <div className="mt-4 pl-2 space-y-4">

                      {/* NATURALS sub-accordion */}
                      <div>
                        <button
                          type="button"
                          onClick={() => setMobileNaturalsOpen((v) => !v)}
                          className="flex w-full items-center justify-between py-2"
                        >
                          <span className="flex items-center gap-2">
                            <Leaf size={13} className="text-hg-green" />
                            <span className="font-mono text-[11.5px] uppercase tracking-[0.22em] font-bold text-hg-green">
                              Harvestgate Naturals
                            </span>
                          </span>
                          <ChevronDown
                            size={15}
                            className={`text-hg-green transition-transform duration-200 ${mobileNaturalsOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                        {mobileNaturalsOpen && (
                          <div className="mt-2 grid grid-cols-1 gap-1 pl-4 border-l-2 border-hg-green/20">
                            {NATURALS_CATEGORIES.map((cat) => (
                              <Link
                                key={cat.id}
                                to={`/products/${cat.slug}`}
                                onClick={() => setOpen(false)}
                                className="flex items-center justify-between py-2 text-[14.5px] font-semibold text-hg-fg hover:text-hg-green transition-colors"
                              >
                                <span className="flex items-center gap-2.5">
                                  <span className="h-2 w-2 rounded-full bg-hg-green/50 shrink-0" />
                                  <span>{cat.label}</span>
                                </span>
                                <span className="text-[10.5px] font-mono text-hg-fg3">{cat.description.split(",")[0]}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* SELECT sub-accordion */}
                      <div>
                        <button
                          type="button"
                          onClick={() => setMobileSelectOpen((v) => !v)}
                          className="flex w-full items-center justify-between py-2"
                        >
                          <span className="flex items-center gap-2">
                            <Star size={13} className="text-hg-gold" />
                            <span className="font-mono text-[11.5px] uppercase tracking-[0.22em] font-bold text-hg-gold">
                              Harvestgate Select
                            </span>
                          </span>
                          <ChevronDown
                            size={15}
                            className={`text-hg-gold transition-transform duration-200 ${mobileSelectOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                        {mobileSelectOpen && (
                          <div className="mt-2 grid grid-cols-1 gap-1 pl-4 border-l-2 border-hg-gold/20">
                            {SELECT_CATEGORIES.map((cat) => (
                              <Link
                                key={cat.id}
                                to={`/products/${cat.slug}`}
                                onClick={() => setOpen(false)}
                                className="flex items-center justify-between py-2 text-[14.5px] font-semibold text-hg-fg hover:text-hg-gold transition-colors"
                              >
                                <span className="flex items-center gap-2.5">
                                  <span className="h-2 w-2 rounded-full bg-hg-gold/50 shrink-0" />
                                  <span>{cat.label}</span>
                                </span>
                                <span className="text-[10.5px] font-mono text-hg-fg3">{cat.description.split(",")[0]}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>

                      <Link
                        to="/products"
                        onClick={() => setOpen(false)}
                        className="block mt-2 text-[12px] font-mono uppercase tracking-[0.2em] font-bold text-hg-gold"
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

              <div className="mt-8 space-y-3">
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="hg-btn hg-btn--solid w-full justify-center text-[13px] font-bold py-3.5"
                >
                  <span>Request Export Quotation</span>
                </Link>

                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  <a
                    href="https://wa.me/918077078313?text=Hello%20HarvestGate%20Overseas,%20I%20am%20interested%20in%20an%20export%20enquiry."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 py-2.5 px-3 font-mono text-[11.5px] font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                  >
                    <WhatsAppIcon className="w-4 h-4 shrink-0" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href="mailto:contact@harvestgateoverseas.com"
                    className="flex items-center justify-center gap-2 rounded-lg border border-red-500/25 bg-red-500/10 py-2.5 px-3 font-mono text-[11.5px] font-bold text-hg-fg hover:bg-red-500/20 transition-colors"
                  >
                    <GmailIcon className="w-4 h-4 shrink-0" />
                    <span>Gmail</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
