import { Reveal } from "./motion/Reveal";

export const AccreditationsSection = () => {
  return (
    <div data-testid="accreditations-section" className="w-full pt-14 pb-4 border-t border-hg-line">
      <Reveal className="text-center mb-10 sm:mb-12">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-hg-fg">
          Our Accreditations
        </h2>
      </Reveal>

      {/* Row 1: 4 Logos (APEDA, FSSAI, GST, IEC) */}
      <Reveal delay={0.1}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10 lg:gap-14 items-center justify-items-center">
          {/* APEDA */}
          <div className="flex items-center justify-center p-3 transition-transform duration-300 hover:scale-105">
            <img
              src="/images/accreditations/apeda.png"
              alt="APEDA - Grown in India for the World"
              loading="lazy"
              className="h-20 sm:h-24 md:h-28 w-auto max-w-[160px] sm:max-w-[190px] object-contain dark:brightness-110 drop-shadow-sm"
            />
          </div>

          {/* FSSAI */}
          <div className="flex items-center justify-center p-3 transition-transform duration-300 hover:scale-105">
            <img
              src="/images/accreditations/fssai.png"
              alt="FSSAI - Food Safety and Standards Authority of India"
              loading="lazy"
              className="h-16 sm:h-20 md:h-22 w-auto max-w-[160px] sm:max-w-[190px] object-contain dark:brightness-110 drop-shadow-sm"
            />
          </div>

          {/* GST */}
          <div className="flex items-center justify-center p-3 transition-transform duration-300 hover:scale-105">
            <img
              src="/images/accreditations/gst.png"
              alt="GST Certified"
              loading="lazy"
              className="h-20 sm:h-24 md:h-28 w-auto max-w-[160px] sm:max-w-[190px] object-contain dark:invert dark:brightness-125 drop-shadow-sm"
            />
          </div>

          {/* IEC */}
          <div className="flex items-center justify-center p-3 transition-transform duration-300 hover:scale-105">
            <img
              src="/images/accreditations/iec.png"
              alt="IEC - Import Export Code"
              loading="lazy"
              className="h-16 sm:h-20 md:h-22 w-auto max-w-[160px] sm:max-w-[190px] object-contain dark:invert dark:brightness-125 drop-shadow-sm"
            />
          </div>
        </div>
      </Reveal>

      {/* Row 2: MSME Logo Centered */}
      <Reveal delay={0.2}>
        <div className="mt-8 sm:mt-10 flex items-center justify-center">
          <div className="flex items-center justify-center p-3 transition-transform duration-300 hover:scale-105">
            <img
              src="/images/accreditations/msme.png"
              alt="Ministry of MSME, Govt. of India"
              loading="lazy"
              className="h-20 sm:h-24 md:h-28 w-auto max-w-[240px] sm:max-w-[280px] object-contain dark:invert dark:brightness-125 drop-shadow-sm"
            />
          </div>
        </div>
      </Reveal>
    </div>
  );
};
