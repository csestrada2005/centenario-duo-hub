import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoBazar from "@/assets/logo-bazar.png";
import logoJoyeria from "@/assets/logo-joyeria.png";

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
    logo: null as string | null,
  },
  bazar: {
    bg: "hsl(164 43% 8%)",
    title: "Bazar Centenario",
    subtitle: "Casa de empeño",
    font: "'Inter', system-ui, sans-serif",
    accentMid: "hsl(155 44% 33%)",
    isLight: false,
    logo: logoBazar,
  },
  joyeria: {
    bg: "hsl(0 0% 4%)",
    title: "Joyería",
    subtitle: "Centenario",
    font: "'Playfair Display', Georgia, serif",
    accentMid: "hsl(46 56% 54%)",
    isLight: false,
    logo: logoJoyeria,
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
          {/* Logo */}
           {theme.logo && (
            <motion.img
              src={theme.logo}
              alt={theme.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mb-4 h-20 w-auto md:h-28"
              style={{ filter: variant === "joyeria" ? "brightness(0) invert(1)" : undefined }}
            />
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl font-light md:text-6xl"
            style={{
              fontFamily: theme.font,
              letterSpacing: variant === "bazar" ? "-0.01em" : "0.15em",
              fontWeight: variant === "bazar" ? 800 : 300,
              color: "white",
              filter: variant === "default" ? "drop-shadow(0 0 20px rgba(212,175,55,0.3))" : undefined,
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
