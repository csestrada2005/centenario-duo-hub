import { useRef, useState, useCallback } from "react";
import { motion, useSpring } from "framer-motion";

/**
 * Text that subtly shifts toward the cursor on hover, with a gold shimmer underline reveal.
 */
const MagneticText = ({
  children,
  className = "",
  intensity = 0.3,
  as: Tag = "span",
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p" | "div";
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useSpring(0, { damping: 20, stiffness: 200 });
  const y = useSpring(0, { damping: 20, stiffness: 200 });

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) * intensity);
      y.set((e.clientY - cy) * intensity);
    },
    [x, y, intensity]
  );

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setHovered(false);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      style={{ x, y }}
      className={`relative inline-block cursor-default ${className}`}
    >
      {children}
      {/* Gold shimmer underline on hover */}
      <motion.div
        className="absolute -bottom-1 left-0 right-0 h-[2px] origin-left"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(46 56% 51%), hsl(40 60% 65%), transparent)",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
};

export default MagneticText;
