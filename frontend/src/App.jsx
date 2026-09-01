import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "sonner";
import "@/App.css";

import { ThemeProvider, useTheme } from "@/theme/ThemeProvider";
import { SmoothScroll, ScrollToTop } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Contact from "@/pages/Contact";
import Terms from "@/pages/Terms";
import NotFound from "@/pages/NotFound";

const Page = ({ children }) => (
  <motion.main
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.main>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Page><Home /></Page>} />
        <Route path="/about" element={<Page><About /></Page>} />
        <Route path="/products" element={<Page><Products /></Page>} />
        <Route path="/products/:slug" element={<Page><ProductDetail /></Page>} />
        <Route path="/contact" element={<Page><Contact /></Page>} />
        <Route path="/terms" element={<Page><Terms /></Page>} />
        <Route path="*" element={<Page><NotFound /></Page>} />
      </Routes>
    </AnimatePresence>
  );
};

const Shell = () => {
  const { theme } = useTheme();
  return (
    <div className="grain-overlay min-h-screen bg-hg-bg">
      <ScrollToTop />
      <Navbar />
      <AnimatedRoutes />
      <Footer />
      <Toaster
        theme={theme}
        position="bottom-right"
        toastOptions={{
          style: {
            background: "rgb(var(--hg-card))",
            color: "rgb(var(--hg-fg))",
            border: "1px solid rgb(var(--hg-line2))",
            borderRadius: "2px",
            fontFamily: "Manrope, sans-serif",
          },
        }}
      />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <SmoothScroll>
          <Shell />
        </SmoothScroll>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
