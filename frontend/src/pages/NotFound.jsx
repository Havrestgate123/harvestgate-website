import { Link } from "react-router-dom";
import { MaskLines, Reveal } from "../components/motion/Reveal";

const NotFound = () => (
  <div data-testid="page-not-found" className="pt-[110px] sm:pt-[130px]">
    <section className="hg-container flex min-h-[70vh] flex-col justify-center py-24">
      <p className="hg-eyebrow">Error 404 — Off the manifest</p>
      <MaskLines
        delay={0.1}
        className="hg-display mt-6 text-[16vw] leading-[0.86] text-hg-fg sm:text-[10vw] lg:text-[7.5vw]"
        lines={["This container", "was never", "loaded."]}
      />
      <Reveal delay={0.4}>
        <p className="hg-italic mt-7 max-w-xl text-xl text-hg-gold">
          The page you asked for is not part of our catalogue.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link to="/" data-testid="notfound-home-link" className="hg-btn hg-btn--solid">
            <span>Back to homepage</span>
          </Link>
          <Link to="/products" data-testid="notfound-products-link" className="hg-btn">
            <span>Browse catalogue</span>
          </Link>
        </div>
      </Reveal>
    </section>
  </div>
);

export default NotFound;
