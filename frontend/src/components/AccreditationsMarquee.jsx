import { motion } from "framer-motion";

export const ACCREDITATION_LOGOS = [
  {
    name: "APEDA - Ministry of Commerce",
    subtitle: "Grown in India for the World",
    src: "/images/accreditations/apeda.png",
    aspect: "aspect-[16/10]",
  },
  {
    name: "FSSAI Food Safety",
    subtitle: "Lic No. 12724999000843",
    src: "/images/accreditations/fssai.png",
    aspect: "aspect-[16/9]",
  },
  {
    name: "GST Certified",
    subtitle: "09AAICH2946R1ZR",
    src: "/images/accreditations/gst.png",
    aspect: "aspect-square",
  },
  {
    name: "IEC Import Export Code",
    subtitle: "AAICH2946R · DGFT",
    src: "/images/accreditations/iec.png",
    aspect: "aspect-[16/9]",
  },
  {
    name: "Ministry of MSME",
    subtitle: "Govt. of India Enterprise",
    src: "/images/accreditations/msme.png",
    aspect: "aspect-[16/8]",
  },
];

export const AccreditationsMarquee = () => {
  // Duplicate array 4 times for a perfectly seamless, gap-free infinite scroll
  const duplicatedLogos = [
    ...ACCREDITATION_LOGOS,
    ...ACCREDITATION_LOGOS,
    ...ACCREDITATION_LOGOS,
    ...ACCREDITATION_LOGOS,
  ];

  return (
    <div
      data-testid="accreditations-marquee"
      className="relative w-full overflow-hidden border-y-2 border-hg-line bg-white/90 dark:bg-[#111611]/90 backdrop-blur-md py-6 sm:py-8 select-none"
    >
      {/* LEFT & RIGHT GRADIENT MASKS */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 sm:w-40 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-[#0d100d] dark:via-[#0d100d]/80 dark:to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 sm:w-40 bg-gradient-to-l from-white via-white/80 to-transparent dark:from-[#0d100d] dark:via-[#0d100d]/80 dark:to-transparent" />

      {/* FIXED CENTER HEADING (Logos glide seamlessly behind this) */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <div className="flex items-center gap-3 rounded-full border-2 border-hg-line/90 bg-white/95 dark:bg-[#0e130e]/95 px-6 sm:px-9 py-2.5 sm:py-3.5 shadow-2xl backdrop-blur-xl">
          <span className="h-2.5 w-2.5 rounded-full bg-hg-gold animate-pulse shrink-0" />
          <h2 className="font-display text-base sm:text-xl md:text-2xl font-extrabold uppercase tracking-wider text-hg-fg whitespace-nowrap">
            Our Accreditations
          </h2>
        </div>
      </div>

      {/* CONTINUOUS LOGO MARQUEE TRACK (Moving Right to Left) */}
      <div className="flex w-max items-center animate-marquee hover:[animation-play-state:paused]">
        {duplicatedLogos.map((item, idx) => (
          <div
            key={idx}
            className="mx-4 sm:mx-8 flex h-20 sm:h-24 min-w-[170px] sm:min-w-[220px] shrink-0 items-center justify-center rounded-lg border border-hg-line/80 bg-white p-3 sm:p-4 shadow-sm transition-transform duration-300 hover:scale-105 dark:bg-white/95"
          >
            <img
              src={item.src}
              alt={item.name}
              loading="lazy"
              className="max-h-14 sm:max-h-16 w-auto object-contain transition-all duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
