import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

export const Reveal = ({ children, delay = 0, y = 20, className = "", ...rest }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.05 }}
    transition={{ duration: 0.7, delay, ease: EASE }}
    {...rest}
  >
    {children}
  </motion.div>
);

/* Masked line-by-line reveal — each line clipped by its own overflow-hidden mask */
export const MaskLines = ({
  lines = [],
  className = "",
  lineClassName = "",
  delay = 0,
  stagger = 0.08,
  duration = 0.8,
  as: Tag = "h1",
  ...rest
}) => (
  <Tag className={className} {...rest}>
    {lines.map((line, i) => (
      <span key={i} className="block overflow-hidden">
        <motion.span
          className={`block ${lineClassName}`}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ duration, delay: delay + i * stagger, ease: EASE }}
        >
          {line}
        </motion.span>
      </span>
    ))}
  </Tag>
);

export const MaskLinesInView = ({
  lines = [],
  className = "",
  lineClassName = "",
  delay = 0,
  stagger = 0.08,
  duration = 0.8,
  as: Tag = "h2",
  ...rest
}) => (
  <Tag className={className} {...rest}>
    {lines.map((line, i) => (
      <span key={i} className="block overflow-hidden">
        <motion.span
          className={`block ${lineClassName}`}
          initial={{ y: "100%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration, delay: delay + i * stagger, ease: EASE }}
        >
          {line}
        </motion.span>
      </span>
    ))}
  </Tag>
);

export const Marquee = ({ items, reverse = false, testId }) => {
  const row = [...items, ...items];
  return (
    <div
      data-testid={testId}
      className="relative overflow-hidden border-y border-hg-line bg-hg-bg2 py-4 select-none"
    >
      <div className={`hg-marquee-track ${reverse ? "animate-marqueeRev" : "animate-marquee"}`}>
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center whitespace-nowrap font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.34em] text-hg-gold"
          >
            {item}
            <span className="mx-6 sm:mx-10 text-hg-fg3">/</span>
          </span>
        ))}
      </div>
    </div>
  );
};
