import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, ArrowUpRight } from "lucide-react";
import { useTheme } from "../theme/ThemeProvider";
import { BrandLock } from "./Logo";
import { PRODUCTS } from "../data/products";

const LINKS = [
  { to: "/", label: "Home", id: "home" },
  { to: "/products", label: "Products", id: "products" },
  { to: "/about", label: "About", id: "about" },
  { to: "/terms", label: "Terms", id: "terms" },
];

const EASE = [0.16, 1, 0.3, 1];

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        data-testid="site-navbar"
        className={`fixed inset-x-0 top-0 z-[60] transition-all duration-500 ${
          scrolled
            ? "border-b border-hg-line bg-hg-bg/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="hg-container flex h-[68px] sm:h-[84px] items-center justify-between gap-4">
          <BrandLock />

          <nav className="hidden lg:flex items-center gap-9">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                data-testid={`nav-link-${l.id}`}
                className={({ isActive }) =>
                  `hg-link font-mono text-[11px] uppercase tracking-[0.24em] transition-colors duration-300 ${
                    isActive ? "text-hg-gold" : "text-hg-fg2 hover:text-hg-fg"
                  }`
                }
              >
                {({ isActive }) => (
                  <span data-active={isActive ? "true" : "false"} className="hg-link">
                    {l.label}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={toggleTheme}
              data-testid="nav-theme-toggle"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              className="grid h-10 w-10 place-items-center border border-hg-line text-hg-fg2 transition-colors duration-300 hover:border-hg-gold hover:text-hg-gold"
            >
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="grid place-items-center"
              >
                {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              </motion.span>
            </button>

            <Link
              to="/contact"
              data-testid="nav-enquiry-cta"
              className="hg-btn !hidden sm:!inline-flex !py-[0.7rem] !px-5"
            >
              <span>Enquire</span>
              <ArrowUpRight size={13} className="relative z-[2]" />
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              data-testid="mobile-menu-toggle"
              aria-label="Toggle navigation menu"
              aria-expanded={open}
              className="lg:hidden grid h-10 w-10 place-items-center border border-hg-line text-hg-fg"
            >
              <span className="relative block h-[9px] w-[18px]">
                <motion.span
                  animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="absolute left-0 top-0 h-[1.5px] w-full bg-current"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="absolute bottom-0 left-0 h-[1.5px] w-full bg-current"
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-nav"
            data-testid="mobile-nav-overlay"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-hg-bg pt-[68px] sm:pt-[84px] lg:hidden"
          >
            <div className="hg-container flex flex-1 flex-col justify-between py-10">
              <nav className="flex flex-col">
                {LINKS.map((l, i) => (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18 + i * 0.07, duration: 0.6, ease: EASE }}
                    className="border-b border-hg-line"
                  >
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      data-testid={`mobile-nav-link-${l.id}`}
                      className="flex items-baseline justify-between py-5"
                    >
                      <span className="hg-display text-4xl text-hg-fg">{l.label}</span>
                      <span className="font-mono text-[10px] tracking-[0.3em] text-hg-gold">
                        0{i + 1}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-10 space-y-6"
              >
                <p className="hg-eyebrow">Catalogue</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  {PRODUCTS.map((p) => (
                    <Link
                      key={p.slug}
                      to={`/products/${p.slug}`}
                      onClick={() => setOpen(false)}
                      data-testid={`mobile-nav-product-${p.slug}`}
                      className="font-mono text-[11px] uppercase tracking-[0.16em] text-hg-fg2"
                    >
                      <span className="text-hg-gold">{p.index}</span> {p.name}
                    </Link>
                  ))}
                </div>
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  data-testid="mobile-nav-link-contact"
                  className="hg-btn hg-btn--solid w-full justify-center"
                >
                  <span>Request Export Quotation</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
