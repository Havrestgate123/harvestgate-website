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
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path
      fill="#25D366"
      d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2Z"
    />
    <path
      fill="#FFFFFF"
      d="M17.51 14.39C17.21 14.24 15.73 13.51 15.46 13.41C15.18 13.31 14.98 13.26 14.78 13.56C14.58 13.86 14 14.54 13.83 14.74C13.65 14.94 13.48 14.96 13.18 14.81C12.88 14.66 11.91 14.35 10.76 13.32C9.87 12.52 9.27 11.53 9.1 11.23C8.92 10.93 9.08 10.77 9.23 10.62C9.36 10.49 9.53 10.27 9.68 10.1C9.83 9.92 9.88 9.8 9.98 9.6C10.08 9.4 10.03 9.22 9.96 9.07C9.88 8.92 9.28 7.45 9.03 6.85C8.79 6.26 8.54 6.35 8.36 6.34C8.18 6.33 7.98 6.33 7.78 6.33C7.58 6.33 7.25 6.41 6.98 6.7C6.7 7 5.93 7.73 5.93 9.2C5.93 10.68 7 12.11 7.15 12.31C7.3 12.51 9.25 15.53 12.24 16.82C12.95 17.13 13.51 17.31 13.94 17.45C14.66 17.68 15.31 17.65 15.83 17.57C16.41 17.48 17.61 16.84 17.86 16.14C18.11 15.43 18.11 14.83 18.03 14.71C17.96 14.58 17.81 14.51 17.51 14.39Z"
    />
  </svg>
);

const LinkedInIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const InstagramIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
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
        <div className="border-b border-hg-line/80 bg-hg-bg2 py-1.5 text-[10.5px] xl:text-[11px] font-mono tracking-wider transition-colors duration-300 overflow-x-auto no-scrollbar">
          <div className="hg-container flex items-center justify-between gap-3 xl:gap-4 flex-nowrap whitespace-nowrap">
            {/* LEFT: Official Registrations & Badges */}
            <div className="flex items-center gap-2 sm:gap-3 xl:gap-3.5 text-hg-fg2 flex-nowrap shrink-0">
              <span className="inline-flex items-center gap-1.5 text-hg-fg font-semibold">
                <CheckCircle2 size={12} className="text-hg-gold shrink-0" />
                <span className="text-hg-fg3 font-medium">GSTIN:</span>
                <span className="text-hg-gold font-bold tracking-wider">09AAICH2946R1ZR</span>
              </span>
              <span className="text-hg-line2">|</span>
              <span className="inline-flex items-center gap-1.5 text-hg-fg font-semibold">
                <CheckCircle2 size={12} className="text-hg-gold shrink-0" />
                <span className="text-hg-fg3 font-medium">IEC:</span>
                <span className="text-hg-gold font-bold tracking-wider">AAICH2946R</span>
              </span>
              <span className="hidden 2xl:inline text-hg-line2">|</span>
              <span className="hidden 2xl:inline-flex items-center gap-1.5 text-hg-fg font-semibold text-[10.5px] uppercase tracking-[0.16em]">
                <ShieldCheck size={12} className="text-emerald-500 shrink-0" />
                Govt. of India Registered
              </span>
            </div>

            {/* RIGHT: Symmetrical Location, Gmail & WhatsApp Links */}
            <div className="flex items-center gap-2.5 sm:gap-3 xl:gap-3.5 text-hg-fg font-medium flex-nowrap shrink-0">
              <span className="hidden md:inline-flex items-center gap-1.5 text-hg-fg2 font-mono">
                <MapPin size={12} className="text-hg-gold shrink-0" />
                <span>Moradabad, Uttar Pradesh - 244001</span>
              </span>
              <span className="hidden md:inline text-hg-line2">|</span>
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
              <span className="text-hg-line2">|</span>
              <div className="inline-flex items-center gap-2">
                <a
                  href="https://www.linkedin.com/company/harvestgate-overseas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-hg-fg hover:text-[#0A66C2] transition-colors p-0.5"
                  title="LinkedIn — HarvestGate Overseas"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon className="w-3.5 h-3.5 fill-current" />
                </a>
                <a
                  href="https://www.instagram.com/harvestgateoverseaspvtltd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-hg-fg hover:text-[#E1306C] transition-colors p-0.5"
                  title="Instagram — @harvestgateoverseaspvtltd"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-3.5 h-3.5 fill-current" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ============ MAIN NAVIGATION ============ */}
        <div className="hg-container flex h-[84px] sm:h-[96px] items-center justify-between gap-4">
          <BrandLock />

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden lg:flex items-center gap-10">
            <NavLink
              to="/"
              end
              data-testid="nav-link-home"
              className={({ isActive }) =>
                `!inline-flex !flex-row items-center whitespace-nowrap font-mono text-[14px] uppercase tracking-[0.22em] font-semibold transition-colors duration-300 ${isActive ? "text-hg-gold font-bold" : "text-hg-fg hover:text-hg-gold"
                }`
              }
            >
              {({ isActive }) => (
                <span data-active={isActive ? "true" : "false"} className="hg-link py-1 whitespace-nowrap leading-none">
                  Home
                </span>
              )}
            </NavLink>

            {/* PRODUCTS WITH TWO-RANGE MEGA DROPDOWN */}
            <div
              className="relative !inline-flex !flex-row items-center"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setProductsOpen((prev) => !prev)}
                className={`!inline-flex !flex-row items-center gap-1.5 whitespace-nowrap font-mono text-[14px] uppercase tracking-[0.22em] font-semibold transition-colors duration-300 ${pathname.startsWith("/products")
                    ? "text-hg-gold font-bold"
                    : "text-hg-fg hover:text-hg-gold"
                  }`}
                aria-expanded={productsOpen}
                data-testid="nav-products-dropdown-toggle"
              >
                <span
                  data-active={pathname.startsWith("/products") ? "true" : "false"}
                  className="hg-link py-1 whitespace-nowrap leading-none"
                >
                  Products
                </span>
                <ChevronDown
                  size={14}
                  className={`shrink-0 transition-transform duration-300 ${productsOpen ? "rotate-180 text-hg-gold" : "text-hg-fg3"
                    }`}
                />
              </button>

              {/* TWO-RANGE MEGA DROPDOWN (OPENS ON THE RIGHT SIDE) */}
              <AnimatePresence>
                {productsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18, ease: EASE }}
                    className="absolute left-0 top-full mt-3 w-[660px] rounded border-2 border-hg-line bg-white dark:bg-[#161616] shadow-[0_25px_60px_rgba(0,0,0,0.35)] z-[9999] overflow-hidden before:content-[''] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3"
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
                `!inline-flex !flex-row items-center whitespace-nowrap font-mono text-[14px] uppercase tracking-[0.22em] font-semibold transition-colors duration-300 ${isActive ? "text-hg-gold font-bold" : "text-hg-fg hover:text-hg-gold"
                }`
              }
            >
              {({ isActive }) => (
                <span data-active={isActive ? "true" : "false"} className="hg-link py-1 whitespace-nowrap leading-none">
                  About
                </span>
              )}
            </NavLink>

            <NavLink
              to="/terms"
              data-testid="nav-link-terms"
              className={({ isActive }) =>
                `!inline-flex !flex-row items-center whitespace-nowrap font-mono text-[14px] uppercase tracking-[0.22em] font-semibold transition-colors duration-300 ${isActive ? "text-hg-gold font-bold" : "text-hg-fg hover:text-hg-gold"
                }`
              }
            >
              {({ isActive }) => (
                <span data-active={isActive ? "true" : "false"} className="hg-link py-1 whitespace-nowrap leading-none">
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
                                <span className="text-[10.5px] font-mono text-hg-fg3">{(cat.description.split(/[,•/]/)[0] || "").trim()}</span>
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
                                <span className="text-[10.5px] font-mono text-hg-fg3">{(cat.description.split(/[,•/]/)[0] || "").trim()}</span>
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
                  <a
                    href="https://www.linkedin.com/company/harvestgate-overseas/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-lg border border-[#0A66C2]/30 bg-[#0A66C2]/10 py-2.5 px-3 font-mono text-[11.5px] font-bold text-[#0A66C2] hover:bg-[#0A66C2]/20 transition-colors"
                  >
                    <LinkedInIcon className="w-4 h-4 shrink-0" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="https://www.instagram.com/harvestgateoverseaspvtltd/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-lg border border-[#E1306C]/30 bg-[#E1306C]/10 py-2.5 px-3 font-mono text-[11.5px] font-bold text-[#E1306C] hover:bg-[#E1306C]/20 transition-colors"
                  >
                    <InstagramIcon className="w-4 h-4 shrink-0" />
                    <span>Instagram</span>
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
