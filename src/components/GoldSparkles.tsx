import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
}

/**
 * Gold sparkle trail that follows the cursor across the entire page.
 * Place once in a layout — it listens on `document` and renders particles
 * in a fixed viewport overlay.
 */
const GoldSparkles = ({ maxSparkles = 20 }: { maxSparkles?: number }) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const idRef = useRef(0);

  const handleMove = useCallback(
    (e: MouseEvent) => {
      if (Math.random() > 0.45) return;
      const sparkle: Sparkle = {
        id: idRef.current++,
        x: e.clientX,
        y: e.clientY,
        size: 1.5 + Math.random() * 3,
      };
      setSparkles((prev) => [...prev.slice(-(maxSparkles - 1)), sparkle]);
    },
    [maxSparkles]
  );

  useEffect(() => {
    document.addEventListener("mousemove", handleMove);
    return () => document.removeEventListener("mousemove", handleMove);
  }, [handleMove]);

  // Auto-remove sparkles
  useEffect(() => {
    if (sparkles.length === 0) return;
    const timer = setTimeout(() => {
      setSparkles((prev) => prev.slice(1));
    }, 450);
    return () => clearTimeout(timer);
  }, [sparkles]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0.9, scale: 0, x: s.x - s.size / 2, y: s.y - s.size / 2 }}
            animate={{
              opacity: 0,
              scale: 1.2,
              y: s.y - 18 - Math.random() * 12,
              x: s.x + (Math.random() - 0.5) * 16,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="absolute"
            style={{
              width: s.size,
              height: s.size,
              borderRadius: "50%",
              background: `radial-gradient(circle, hsl(46 80% 70%), hsl(46 56% 51%))`,
              boxShadow: `0 0 ${s.size * 1.5}px hsl(46 56% 51% / 0.5)`,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default GoldSparkles;
