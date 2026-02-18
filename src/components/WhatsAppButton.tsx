import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const WhatsAppButton = () => {
  const location = useLocation();
  const isJoyeria = location.pathname.startsWith("/joyeria");

  const bg = isJoyeria ? "hsl(40 30% 12%)" : "hsl(214 40% 14%)";
  const iconBg = isJoyeria ? "hsl(43 74% 49%)" : "hsl(214 80% 40%)";
  const border = isJoyeria
    ? "1px solid hsl(43 74% 49% / 0.35)"
    : "1px solid hsl(214 80% 60% / 0.25)";

  return (
    <motion.a
      href="https://wa.me/5551234567"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 300, damping: 20 }}
      whileHover={{ scale: 1.06, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full px-4 py-2.5 shadow-lg"
      style={{ background: bg, border, color: "white" }}
    >
      <span
        className="flex h-7 w-7 items-center justify-center rounded-full"
        style={{ background: iconBg }}
      >
        <MessageCircle className="h-4 w-4" fill="white" strokeWidth={0} />
      </span>
      <span
        className="text-xs font-semibold tracking-wide"
        style={isJoyeria ? { fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: "0.08em" } : {}}
      >
        WhatsApp
      </span>
    </motion.a>
  );
};

export default WhatsAppButton;
