import { motion } from "framer-motion";

export const ACCREDITATION_LOGOS = [
  {
    name: "APEDA - Ministry of Commerce",
    subtitle: "Grown in India for the World",
    src: "/images/accreditations/apeda.png",
  },
  {
    name: "FSSAI Food Safety",
    subtitle: "Food Safety and Standards Authority of India",
    src: "/images/accreditations/fssai.png",
  },
  {
    name: "GST Certified",
    subtitle: "09AAICH2946R1ZR",
    src: "/images/accreditations/gst.png",
  },
  {
    name: "IEC Import Export Code",
    subtitle: "AAICH2946R · DGFT",
    src: "/images/accreditations/iec.png",
  },
  {
    name: "Ministry of MSME",
    subtitle: "Govt. of India Enterprise",
    src: "/images/accreditations/msme.png",
  },
];

export const AccreditationsMarquee = () => {
  // Duplicate array 5 times for a perfectly seamless, gap-free infinite stream
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
      className="relative w-full overflow-hidden border-y-2 border-hg-line bg-hg-bg2/90 dark:bg-[#121712]/90 backdrop-blur-md py-6 sm:py-8 select-none"
    >
      {/* LEFT & RIGHT GRADIENT MASKS FOR SMOOTH FADE */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 sm:w-44 bg-gradient-to-r from-hg-bg via-hg-bg/80 to-transparent dark:from-[#0d100d] dark:via-[#0d100d]/80 dark:to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 sm:w-44 bg-gradient-to-l from-hg-bg via-hg-bg/80 to-transparent dark:from-[#0d100d] dark:via-[#0d100d]/80 dark:to-transparent" />

      {/* FIXED CENTER HEADING (Logos glide seamlessly behind this) */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <div className="flex items-center gap-3 rounded-full border-2 border-hg-line bg-white/95 dark:bg-[#141a14]/95 px-7 sm:px-10 py-2.5 sm:py-3.5 shadow-2xl backdrop-blur-xl">
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
            className="mx-8 sm:mx-14 flex h-16 sm:h-20 shrink-0 items-center justify-center transition-transform duration-300 hover:scale-110"
          >
            <img
              src={item.src}
              alt={item.name}
              loading="lazy"
              className="max-h-12 sm:max-h-16 w-auto max-w-[170px] sm:max-w-[210px] object-contain transition-all duration-300 drop-shadow-sm dark:brightness-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
