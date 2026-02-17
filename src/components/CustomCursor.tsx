import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type CursorVariant = "default" | "link" | "button" | "text" | "image";

const CURSOR_SIZE = {
  default: 8,
  link: 40,
  button: 48,
  text: 2,
  image: 64,
};

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
    // Detect interactive elements
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

    // Hide default cursor
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
      className="pointer-events-none fixed left-0 top-0 z-[9998] mix-blend-difference"
      animate={{
        x: pos.x - size / 2,
        y: pos.y - size / 2,
        width: size,
        height: size,
        opacity: visible ? 1 : 0,
      }}
      transition={{
        x: { type: "spring", stiffness: 500, damping: 30, mass: 0.5 },
        y: { type: "spring", stiffness: 500, damping: 30, mass: 0.5 },
        width: { duration: 0.25, ease: "easeOut" },
        height: { duration: 0.25, ease: "easeOut" },
        opacity: { duration: 0.15 },
      }}
    >
      <AnimatePresence mode="wait">
        {/* Default dot */}
        {variant === "default" && (
          <motion.div
            key="default"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="h-full w-full rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(46 80% 70%), hsl(46 56% 51%))",
              boxShadow: "0 0 8px hsl(46 56% 51% / 0.4)",
            }}
          />
        )}

        {/* Link — ring */}
        {variant === "link" && (
          <motion.div
            key="link"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="flex h-full w-full items-center justify-center rounded-full border-2"
            style={{
              borderColor: "hsl(46 56% 51%)",
              boxShadow: "0 0 12px hsl(46 56% 51% / 0.3)",
            }}
          >
            <div
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "hsl(46 80% 70%)" }}
            />
          </motion.div>
        )}

        {/* Button — filled circle with glow */}
        {variant === "button" && (
          <motion.div
            key="button"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="flex h-full w-full items-center justify-center rounded-full"
            style={{
              background: "hsl(46 56% 51% / 0.15)",
              border: "1.5px solid hsl(46 56% 51% / 0.6)",
              boxShadow: "0 0 20px hsl(46 56% 51% / 0.25)",
            }}
          >
            <div
              className="h-2 w-2 rounded-full"
              style={{ background: "hsl(46 80% 70%)" }}
            />
          </motion.div>
        )}

        {/* Text — vertical bar */}
        {variant === "text" && (
          <motion.div
            key="text"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            className="h-full w-full rounded-full"
            style={{
              background: "hsl(46 56% 51%)",
              width: 2,
              height: 24,
              boxShadow: "0 0 6px hsl(46 56% 51% / 0.5)",
            }}
          />
        )}

        {/* Image — large ring with cross */}
        {variant === "image" && (
          <motion.div
            key="image"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="flex h-full w-full items-center justify-center rounded-full border"
            style={{
              borderColor: "hsl(46 56% 51% / 0.5)",
              boxShadow: "0 0 16px hsl(46 56% 51% / 0.2)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-80">
              <line x1="8" y1="3" x2="8" y2="13" stroke="hsl(46 80% 70%)" strokeWidth="1.5" />
              <line x1="3" y1="8" x2="13" y2="8" stroke="hsl(46 80% 70%)" strokeWidth="1.5" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CustomCursor;
