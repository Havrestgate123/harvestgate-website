import React from "react";
import { motion } from "framer-motion";

export const AmbientBackground = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* 1. GEOMETRIC SUBTLE DOT-MATRIX PATTERN */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] dark:bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.07] dark:opacity-[0.09]" />

      {/* 2. SUBTLE ARCHITECTURAL LINE GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b9810a_1px,transparent_1px),linear-gradient(to_bottom,#10b9810a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#34d39908_1px,transparent_1px),linear-gradient(to_bottom,#34d39908_1px,transparent_1px)] bg-[size:6rem_6rem] opacity-60 dark:opacity-40" />

      {/* 3. NEON MESH GLOW ORB 1: TOP-LEFT EMERALD / MINT AURORA */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -30, 30, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] max-w-[850px] max-h-[850px] rounded-full bg-gradient-to-br from-emerald-500/25 via-teal-400/20 to-emerald-700/0 blur-[120px] dark:from-emerald-400/20 dark:via-teal-500/15 dark:to-transparent"
      />

      {/* 4. NEON MESH GLOW ORB 2: TOP-RIGHT GOLD / AMBER SUNRISE */}
      <motion.div
        animate={{
          x: [0, -50, 20, 0],
          y: [0, 40, -20, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute -top-[10%] -right-[10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-bl from-amber-400/25 via-yellow-500/15 to-transparent blur-[130px] dark:from-amber-400/18 dark:via-yellow-600/12 dark:to-transparent"
      />

      {/* 5. NEON MESH GLOW ORB 3: CENTER-RIGHT VIBRANT CYAN / TEAL GLOW */}
      <motion.div
        animate={{
          x: [0, 30, -40, 0],
          y: [0, -50, 20, 0],
          scale: [0.95, 1.12, 1, 0.95],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute top-[40%] -right-[15%] w-[45vw] h-[45vw] max-w-[700px] max-h-[700px] rounded-full bg-gradient-to-l from-teal-400/20 via-cyan-500/15 to-transparent blur-[140px] dark:from-teal-400/15 dark:via-cyan-600/10 dark:to-transparent"
      />

      {/* 6. NEON MESH GLOW ORB 4: BOTTOM-LEFT LIME / BOTANICAL HARVEST RADIANCE */}
      <motion.div
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 30, -40, 0],
          scale: [1, 0.9, 1.15, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 6,
        }}
        className="absolute top-[70%] -left-[10%] w-[50vw] h-[50vw] max-w-[750px] max-h-[750px] rounded-full bg-gradient-to-tr from-lime-400/20 via-emerald-400/15 to-transparent blur-[130px] dark:from-lime-500/15 dark:via-emerald-600/10 dark:to-transparent"
      />

      {/* 7. NEON MESH GLOW ORB 5: BOTTOM-RIGHT GOLD LUXURY ACCENT */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute -bottom-[10%] right-[10%] w-[45vw] h-[45vw] max-w-[650px] max-h-[650px] rounded-full bg-gradient-to-tl from-amber-400/20 via-emerald-500/15 to-transparent blur-[120px] dark:from-amber-500/15 dark:via-emerald-700/10 dark:to-transparent"
      />

      {/* 8. SUBTLE LIGHT-BEAM STREAK (Subtle diagonal radiance) */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-emerald-500/[0.025] to-amber-400/[0.035] dark:via-emerald-400/[0.02] dark:to-amber-300/[0.02] mix-blend-overlay pointer-events-none" />
    </div>
  );
};
