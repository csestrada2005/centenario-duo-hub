import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Renders a gold radial glow that follows the mouse cursor
 * within its parent container. Parent must have `position: relative` and `overflow: hidden`.
 */
const GoldCursorGlow = ({
  size = 350,
  opacity = 0.12,
  className = "",
}: {
  size?: number;
  opacity?: number;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-size);
  const mouseY = useMotionValue(-size);

  const springX = useSpring(mouseX, { damping: 25, stiffness: 150 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 150 });

  useEffect(() => {
    const parent = containerRef.current?.parentElement;
    if (!parent) return;

    const handleMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left - size / 2);
      mouseY.set(e.clientY - rect.top - size / 2);
    };

    const handleLeave = () => {
      mouseX.set(-size);
      mouseY.set(-size);
    };

    parent.addEventListener("mousemove", handleMove);
    parent.addEventListener("mouseleave", handleLeave);
    return () => {
      parent.removeEventListener("mousemove", handleMove);
      parent.removeEventListener("mouseleave", handleLeave);
    };
  }, [mouseX, mouseY, size]);

  return (
    <motion.div
      ref={containerRef}
      className={`pointer-events-none absolute z-0 rounded-full will-change-transform ${className}`}
      style={{
        x: springX,
        y: springY,
        width: size,
        height: size,
        background: `radial-gradient(circle, hsl(46 56% 51% / ${opacity}) 0%, hsl(40 60% 65% / ${opacity * 0.5}) 40%, transparent 70%)`,
      }}
    />
  );
};

export default GoldCursorGlow;
