import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CinematicIntroProps {
  onComplete: () => void;
  /** Visual theme variant */
  variant?: "default" | "bazar" | "joyeria";
}

const THEMES = {
  default: {
    bg: "hsl(0 0% 4%)",
    title: "Centenario",
    subtitle: "Desde 1926",
    font: "'Playfair Display', Georgia, serif",
    accentFrom: "hsl(46 80% 75%)",
    accentTo: "hsl(40 60% 40%)",
    accentMid: "hsl(46 56% 51%)",
    accentLine: "hsl(46 56% 51%)",
    showDiamond: true,
  },
  bazar: {
    bg: "hsl(0 0% 6%)",
    title: "Bazar",
    subtitle: "Centenario",
    font: "'Inter', system-ui, sans-serif",
    accentFrom: "hsl(46 80% 75%)",
    accentTo: "hsl(40 60% 40%)",
    accentMid: "hsl(46 56% 51%)",
    accentLine: "hsl(46 56% 51%)",
    showDiamond: false,
  },
  joyeria: {
    bg: "hsl(40 33% 97%)",
    title: "Joyería",
    subtitle: "Centenario",
    font: "'Playfair Display', Georgia, serif",
    accentFrom: "hsl(20 12% 30%)",
    accentTo: "hsl(20 12% 20%)",
    accentMid: "hsl(20 12% 30%)",
    accentLine: "hsl(20 12% 30%)",
    showDiamond: true,
  },
};

const CinematicIntro = ({ onComplete, variant = "default" }: CinematicIntroProps) => {
  const [phase, setPhase] = useState<"logo" | "reveal" | "done">("logo");
  const theme = THEMES[variant];
  const isLight = variant === "joyeria";

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("reveal"), 1800);
    const t2 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
          style={{ background: theme.bg }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Top accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 h-px w-16 origin-center"
            style={{ background: `linear-gradient(90deg, transparent, ${theme.accentLine}, transparent)` }}
          />

          {/* Diamond icon (optional) */}
          {theme.showDiamond && (
            <motion.svg
              initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              className="mb-5"
              style={{ filter: `drop-shadow(0 0 10px ${theme.accentMid}80)` }}
            >
              <path
                d="M12 2 L4 9 L12 22 L20 9 Z"
                fill={`url(#introGrad-${variant})`}
                stroke={theme.accentFrom}
                strokeWidth="0.5"
              />
              <defs>
                <linearGradient id={`introGrad-${variant}`} x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor={theme.accentFrom} />
                  <stop offset="100%" stopColor={theme.accentTo} />
                </linearGradient>
              </defs>
            </motion.svg>
          )}

          {/* Bazar: gold coin icon instead of diamond */}
          {variant === "bazar" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border"
              style={{
                borderColor: theme.accentMid,
                boxShadow: `0 0 20px ${theme.accentMid}40`,
              }}
            >
              <span
                className="text-lg font-light"
                style={{ color: theme.accentMid, fontFamily: theme.font }}
              >
                C
              </span>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0.15em" }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`text-4xl font-light md:text-6xl lg:text-7xl ${variant === "joyeria" ? "" : "text-gold-gradient"}`}
            style={{
              fontFamily: theme.font,
              color: isLight ? theme.accentMid : undefined,
              filter: isLight ? undefined : "drop-shadow(0 0 25px rgba(212,175,55,0.35))",
            }}
          >
            {theme.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: isLight ? 0.6 : 0.4 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="mt-3 text-[10px] font-medium uppercase tracking-[0.35em]"
            style={{ color: theme.accentMid }}
          >
            {theme.subtitle}
          </motion.p>

          {/* Bottom accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 h-px w-16 origin-center"
            style={{ background: `linear-gradient(90deg, transparent, ${theme.accentLine}, transparent)` }}
          />

          {/* Curtain wipe */}
          {phase === "reveal" && (
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: "-100%" }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0"
              style={{ background: theme.bg }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CinematicIntro;
