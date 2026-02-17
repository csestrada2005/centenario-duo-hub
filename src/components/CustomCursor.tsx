import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type CursorVariant = "default" | "link" | "button" | "text" | "image";

const CURSOR_SIZE = {
  default: 22,
  link: 48,
  button: 54,
  text: 6,
  image: 72,
};

/** Diamond SVG shape reused across variants */
const DiamondShape = ({ size = 16, glow = true }: { size?: number; glow?: boolean }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    style={{
      filter: glow ? "drop-shadow(0 0 6px hsl(46 56% 51% / 0.7))" : undefined,
    }}
  >
    {/* Diamond / gem shape */}
    <path
      d="M12 2 L4 9 L12 22 L20 9 Z"
      fill="url(#goldGrad)"
      stroke="hsl(46 80% 70%)"
      strokeWidth="0.8"
    />
    <path
      d="M4 9 L12 2 L20 9"
      fill="none"
      stroke="hsl(46 80% 75%)"
      strokeWidth="0.5"
    />
    <line x1="12" y1="2" x2="12" y2="22" stroke="hsl(46 80% 75% / 0.3)" strokeWidth="0.5" />
    <line x1="4" y1="9" x2="20" y2="9" stroke="hsl(46 80% 75% / 0.3)" strokeWidth="0.5" />
    <defs>
      <linearGradient id="goldGrad" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="hsl(46 80% 75%)" />
        <stop offset="50%" stopColor="hsl(46 56% 51%)" />
        <stop offset="100%" stopColor="hsl(40 60% 40%)" />
      </linearGradient>
    </defs>
  </svg>
);

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number>(0);
  const posRef = useRef({ x: -100, y: -100 });

  const updatePos = useCallback((e: MouseEvent) => {
    posRef.current = { x: e.clientX, y: e.clientY };
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setPos(posRef.current);
    });
  }, []);

  useEffect(() => {
    const getVariant = (el: HTMLElement | null): CursorVariant => {
      if (!el) return "default";
      const tag = el.tagName.toLowerCase();
      if (tag === "img" || el.dataset.cursorImage !== undefined) return "image";
      if (tag === "button" || el.role === "button" || el.dataset.cursorButton !== undefined) return "button";
      if (tag === "a" || el.closest("a") || el.dataset.cursorLink !== undefined) return "link";
      if ((tag === "h1" || tag === "h2" || tag === "h3" || tag === "p" || tag === "span") && !el.closest("a") && !el.closest("button")) return "text";
      return "default";
    };

    const handleMove = (e: MouseEvent) => {
      updatePos(e);
      if (!visible) setVisible(true);
      const target = e.target as HTMLElement;
      const v = getVariant(target) === "default" && target.parentElement ? getVariant(target.parentElement) : getVariant(target);
      setVariant(v);
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    document.body.style.cursor = "none";
    const style = document.createElement("style");
    style.id = "custom-cursor-hide";
    style.textContent = `*, *::before, *::after { cursor: none !important; }`;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
      document.body.style.cursor = "";
      document.getElementById("custom-cursor-hide")?.remove();
      cancelAnimationFrame(rafRef.current);
    };
  }, [updatePos, visible]);

  const size = CURSOR_SIZE[variant];

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9998]"
      animate={{
        x: pos.x - size / 2,
        y: pos.y - size / 2,
        width: size,
        height: size,
        opacity: visible ? 1 : 0,
      }}
      transition={{
        x: { type: "spring", stiffness: 500, damping: 28, mass: 0.4 },
        y: { type: "spring", stiffness: 500, damping: 28, mass: 0.4 },
        width: { duration: 0.25, ease: "easeOut" },
        height: { duration: 0.25, ease: "easeOut" },
        opacity: { duration: 0.15 },
      }}
    >
      <AnimatePresence mode="wait">
        {/* Default — gold diamond */}
        {variant === "default" && (
          <motion.div
            key="default"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 45 }}
            className="flex h-full w-full items-center justify-center"
          >
            <DiamondShape size={20} />
          </motion.div>
        )}

        {/* Link — diamond inside gold ring */}
        {variant === "link" && (
          <motion.div
            key="link"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="flex h-full w-full items-center justify-center rounded-full border-2"
            style={{
              borderColor: "hsl(46 56% 51%)",
              boxShadow: "0 0 16px hsl(46 56% 51% / 0.4), inset 0 0 8px hsl(46 56% 51% / 0.1)",
            }}
          >
            <DiamondShape size={18} />
          </motion.div>
        )}

        {/* Button — diamond with pulsing glow */}
        {variant === "button" && (
          <motion.div
            key="button"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="flex h-full w-full items-center justify-center rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(46 56% 51% / 0.12), transparent 70%)",
              border: "1.5px solid hsl(46 56% 51% / 0.5)",
              boxShadow: "0 0 24px hsl(46 56% 51% / 0.35)",
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <DiamondShape size={22} />
            </motion.div>
          </motion.div>
        )}

        {/* Text — small diamond */}
        {variant === "text" && (
          <motion.div
            key="text"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            className="flex h-full w-full items-center justify-center"
          >
            <DiamondShape size={14} glow={false} />
          </motion.div>
        )}

        {/* Image — large ring with diamond */}
        {variant === "image" && (
          <motion.div
            key="image"
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, 5, -5, 0] }}
            exit={{ scale: 0 }}
            transition={{ rotate: { repeat: Infinity, duration: 3, ease: "easeInOut" } }}
            className="flex h-full w-full items-center justify-center rounded-full border"
            style={{
              borderColor: "hsl(46 56% 51% / 0.4)",
              boxShadow: "0 0 20px hsl(46 56% 51% / 0.25)",
            }}
          >
            <DiamondShape size={28} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CustomCursor;
