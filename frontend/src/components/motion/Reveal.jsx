import { motion } from "framer-motion";

export const Reveal = ({ children, className = "", ...rest }) => (
  <div className={className} {...rest}>
    {children}
  </div>
);

/* Stable, crisp line-by-line heading rendering — always visible and stick in place */
export const MaskLines = ({
  lines = [],
  className = "",
  lineClassName = "",
  as: Tag = "h1",
  ...rest
}) => (
  <Tag className={className} {...rest}>
    {lines.map((line, i) => (
      <span key={i} className={`block ${lineClassName}`}>
        {line}
      </span>
    ))}
  </Tag>
);

export const MaskLinesInView = ({
  lines = [],
  className = "",
  lineClassName = "",
  as: Tag = "h2",
  ...rest
}) => (
  <Tag className={className} {...rest}>
    {lines.map((line, i) => (
      <span key={i} className={`block ${lineClassName}`}>
        {line}
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
