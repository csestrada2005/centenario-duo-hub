import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
}

/**
 * Spawns gold sparkle particles where the cursor moves inside the parent.
 * Parent must have `position: relative` and `overflow: hidden`.
 */
const GoldSparkles = ({ maxSparkles = 12 }: { maxSparkles?: number }) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const idRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (e: MouseEvent) => {
      const parent = containerRef.current?.parentElement;
      if (!parent) return;
      // Only spawn ~1 in 3 moves to keep it subtle
      if (Math.random() > 0.35) return;

      const rect = parent.getBoundingClientRect();
      const sparkle: Sparkle = {
        id: idRef.current++,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        size: 3 + Math.random() * 5,
      };

      setSparkles((prev) => [...prev.slice(-(maxSparkles - 1)), sparkle]);
    },
    [maxSparkles]
  );

  useEffect(() => {
    const parent = containerRef.current?.parentElement;
    if (!parent) return;
    parent.addEventListener("mousemove", handleMove);
    return () => parent.removeEventListener("mousemove", handleMove);
  }, [handleMove]);

  // Auto-remove sparkles after animation
  useEffect(() => {
    if (sparkles.length === 0) return;
    const timer = setTimeout(() => {
      setSparkles((prev) => prev.slice(1));
    }, 700);
    return () => clearTimeout(timer);
  }, [sparkles]);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 z-10">
      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 1, scale: 0, x: s.x, y: s.y }}
            animate={{
              opacity: 0,
              scale: 1,
              y: s.y - 20 - Math.random() * 15,
              x: s.x + (Math.random() - 0.5) * 20,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute"
            style={{
              width: s.size,
              height: s.size,
              borderRadius: "50%",
              background: `radial-gradient(circle, hsl(46 80% 65%), hsl(46 56% 51%))`,
              boxShadow: `0 0 ${s.size * 2}px hsl(46 56% 51% / 0.6)`,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default GoldSparkles;
