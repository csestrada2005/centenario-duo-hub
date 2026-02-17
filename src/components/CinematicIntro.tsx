import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CinematicIntro = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"logo" | "reveal" | "done">("logo");

  useEffect(() => {
    // Logo phase lasts 2.2s, then reveal transition
    const t1 = setTimeout(() => setPhase("reveal"), 2200);
    const t2 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 3200);
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
          style={{ background: "hsl(0 0% 4%)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Subtle gold line above logo */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 h-px w-16 origin-center"
            style={{ background: "linear-gradient(90deg, transparent, hsl(46 56% 51%), transparent)" }}
          />

          {/* Diamond icon */}
          <motion.svg
            initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            className="mb-6"
            style={{ filter: "drop-shadow(0 0 12px hsl(46 56% 51% / 0.5))" }}
          >
            <path
              d="M12 2 L4 9 L12 22 L20 9 Z"
              fill="url(#introGoldGrad)"
              stroke="hsl(46 80% 70%)"
              strokeWidth="0.5"
            />
            <defs>
              <linearGradient id="introGoldGrad" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="hsl(46 80% 75%)" />
                <stop offset="100%" stopColor="hsl(40 60% 40%)" />
              </linearGradient>
            </defs>
          </motion.svg>

          {/* Logo text */}
          <motion.h1
            initial={{ opacity: 0, y: 20, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0.15em" }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-gold-gradient text-5xl font-light md:text-7xl lg:text-8xl"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              filter: "drop-shadow(0 0 30px rgba(212,175,55,0.4))",
            }}
          >
            Centenario
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-4 text-[10px] font-medium uppercase tracking-[0.4em]"
            style={{ color: "hsl(46 56% 51% / 0.5)" }}
          >
            Desde 1926
          </motion.p>

          {/* Gold line below */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 h-px w-16 origin-center"
            style={{ background: "linear-gradient(90deg, transparent, hsl(46 56% 51%), transparent)" }}
          />

          {/* Curtain wipe on reveal phase */}
          {phase === "reveal" && (
            <>
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: "-100%" }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0"
                style={{ background: "hsl(0 0% 4%)" }}
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CinematicIntro;
