import React from "react";

export const Reveal = ({ children, className = "", delay, y, ...rest }) => (
  <div className={className} {...rest}>
    {children}
  </div>
);

/* Stable, crisp line-by-line heading rendering — 100% visible and anchored */
export const MaskLines = ({
  lines = [],
  className = "",
  lineClassName = "",
  as: Tag = "h1",
  delay,
  stagger,
  duration,
  ...rest
}) => {
  const Component = Tag || "h1";
  const items = Array.isArray(lines) ? lines : [lines];

  return (
    <Component className={className} {...rest}>
      {items.map((line, i) => (
        <span key={i} className={`block ${lineClassName || ""}`.trim()}>
          {line}
        </span>
      ))}
    </Component>
  );
};

export const MaskLinesInView = ({
  lines = [],
  className = "",
  lineClassName = "",
  as: Tag = "h2",
  delay,
  stagger,
  duration,
  ...rest
}) => {
  const Component = Tag || "h2";
  const items = Array.isArray(lines) ? lines : [lines];

  return (
    <Component className={className} {...rest}>
      {items.map((line, i) => (
        <span key={i} className={`block ${lineClassName || ""}`.trim()}>
          {line}
        </span>
      ))}
    </Component>
  );
};

export const Marquee = ({ items, reverse = false, testId }) => {
  const list = Array.isArray(items) ? items : [];
  const row = [...list, ...list];
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
