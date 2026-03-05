import { MessageCircle } from "lucide-react";
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
    <a
      href="https://wa.me/5551234567"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full px-4 py-2.5 shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95"
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
    </a>
  );
};

export default WhatsAppButton;
