import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CinematicIntroProps {
  onComplete: () => void;
  variant?: "default" | "bazar" | "joyeria";
}

const THEMES = {
  default: {
    bg: "hsl(0 0% 4%)",
    title: "Centenario",
    subtitle: "Desde 1926",
    font: "'Playfair Display', Georgia, serif",
    accentMid: "hsl(46 56% 51%)",
    isLight: false,
  },
  bazar: {
    bg: "hsl(0 0% 6%)",
    title: "Bazar",
    subtitle: "Centenario",
    font: "'Inter', system-ui, sans-serif",
    accentMid: "hsl(46 56% 51%)",
    isLight: false,
  },
  joyeria: {
    bg: "hsl(40 33% 97%)",
    title: "Joyería",
    subtitle: "Centenario",
    font: "'Playfair Display', Georgia, serif",
    accentMid: "hsl(20 12% 30%)",
    isLight: true,
  },
};

const CinematicIntro = ({ onComplete, variant = "default" }: CinematicIntroProps) => {
  const [visible, setVisible] = useState(true);
  const theme = THEMES[variant];

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 400);
    }, 1200);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
          style={{ background: theme.bg }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={`text-4xl font-light md:text-6xl ${theme.isLight ? "" : "text-gold-gradient"}`}
            style={{
              fontFamily: theme.font,
              letterSpacing: "0.15em",
              color: theme.isLight ? theme.accentMid : undefined,
              filter: theme.isLight ? undefined : "drop-shadow(0 0 20px rgba(212,175,55,0.3))",
            }}
          >
            {theme.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-2 text-[10px] font-medium uppercase tracking-[0.35em]"
            style={{ color: theme.accentMid }}
          >
            {theme.subtitle}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CinematicIntro;
