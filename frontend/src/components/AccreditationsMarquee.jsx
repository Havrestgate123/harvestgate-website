import { motion } from "framer-motion";

export const ACCREDITATION_LOGOS = [
  {
    name: "APEDA - Ministry of Commerce",
    subtitle: "Grown in India for the World",
    src: "/images/accreditations/apeda.png",
    invertInDark: false,
    className: "max-h-16 sm:max-h-20 md:max-h-22",
  },
  {
    name: "FSSAI Food Safety",
    subtitle: "Food Safety and Standards Authority of India",
    src: "/images/accreditations/fssai.png",
    invertInDark: false,
    className: "max-h-14 sm:max-h-18 md:max-h-20",
  },
  {
    name: "GST Certified",
    subtitle: "09AAICH2946R1ZR",
    src: "/images/accreditations/gst.png",
    invertInDark: true,
    className: "max-h-16 sm:max-h-20 md:max-h-22",
  },
  {
    name: "IEC Import Export Code",
    subtitle: "AAICH2946R · DGFT",
    src: "/images/accreditations/iec.png",
    invertInDark: true,
    className: "max-h-14 sm:max-h-18 md:max-h-20",
  },
  {
    name: "Ministry of MSME",
    subtitle: "Govt. of India Enterprise",
    src: "/images/accreditations/msme.png",
    invertInDark: true,
    className: "max-h-14 sm:max-h-18 md:max-h-20",
  },
];

export const AccreditationsMarquee = () => {
  // Duplicate array 5 times for a continuous, gap-free infinite scroll
  const duplicatedLogos = [
    ...ACCREDITATION_LOGOS,
    ...ACCREDITATION_LOGOS,
    ...ACCREDITATION_LOGOS,
    ...ACCREDITATION_LOGOS,
    ...ACCREDITATION_LOGOS,
  ];

  return (
    <div
      data-testid="accreditations-marquee"
      className="relative w-full overflow-hidden border-y-2 border-hg-line bg-hg-bg2/90 dark:bg-[#121712]/90 backdrop-blur-md py-7 sm:py-10 select-none"
    >
      {/* LEFT & RIGHT GRADIENT MASKS FOR SMOOTH FADE */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 sm:w-48 bg-gradient-to-r from-hg-bg via-hg-bg/80 to-transparent dark:from-[#0d100d] dark:via-[#0d100d]/80 dark:to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 sm:w-48 bg-gradient-to-l from-hg-bg via-hg-bg/80 to-transparent dark:from-[#0d100d] dark:via-[#0d100d]/80 dark:to-transparent" />

      {/* FIXED CENTER HEADING (Logos glide seamlessly behind this) */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <div className="flex items-center gap-3 rounded-full border-2 border-hg-line bg-white/95 dark:bg-[#141a14]/95 px-7 sm:px-11 py-3 sm:py-4 shadow-2xl backdrop-blur-xl">
          <span className="h-2.5 w-2.5 rounded-full bg-hg-gold animate-pulse shrink-0" />
          <h2 className="font-display text-base sm:text-lg md:text-xl font-extrabold uppercase tracking-[0.16em] text-hg-fg whitespace-nowrap">
            Our Accreditations
          </h2>
        </div>
      </div>

      {/* CONTINUOUS TRANSPARENT LOGO STREAM (Moving Right to Left) */}
      <div className="flex w-max items-center animate-marquee hover:[animation-play-state:paused]">
        {duplicatedLogos.map((item, idx) => (
          <div
            key={idx}
            className="mx-8 sm:mx-14 md:mx-16 flex h-20 sm:h-24 md:h-28 shrink-0 items-center justify-center transition-transform duration-300 hover:scale-110"
          >
            <img
              src={item.src}
              alt={item.name}
              loading="lazy"
              className={`w-auto max-w-[190px] sm:max-w-[250px] md:max-w-[280px] object-contain transition-all duration-300 ${
                item.className
              } ${
                item.invertInDark
                  ? "dark:invert dark:brightness-125 dark:drop-shadow-[0_2px_10px_rgba(255,255,255,0.18)]"
                  : "dark:brightness-110 dark:contrast-110 dark:drop-shadow-[0_2px_8px_rgba(255,255,255,0.08)]"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
