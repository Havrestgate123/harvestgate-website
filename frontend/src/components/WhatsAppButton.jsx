import { useState } from "react";

const WHATSAPP_NUMBER = "918077078313"; // +91 8077078313
const WHATSAPP_MESSAGE = "Hello HarvestGate! I'm interested in your export products.";

export const WhatsAppButton = () => {
  const [hovered, setHovered] = useState(false);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      data-testid="whatsapp-float-btn"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed",
        bottom: "28px",
        right: "28px",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: "10px",
        textDecoration: "none",
      }}
    >
      {/* Tooltip label */}
      <span
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateX(0)" : "translateX(8px)",
          transition: "opacity 0.25s ease, transform 0.25s ease",
          background: "#25D366",
          color: "#fff",
          fontSize: "13px",
          fontWeight: 600,
          fontFamily: "Manrope, sans-serif",
          padding: "6px 14px",
          borderRadius: "999px",
          whiteSpace: "nowrap",
          boxShadow: "0 4px 16px rgba(37,211,102,0.35)",
          letterSpacing: "0.01em",
          pointerEvents: "none",
        }}
      >
        Chat with us
      </span>

      {/* WhatsApp circle button */}
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "66px",
          height: "66px",
          borderRadius: "50%",
          background: hovered
            ? "linear-gradient(135deg, #128C7E 0%, #25D366 100%)"
            : "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
          boxShadow: hovered
            ? "0 8px 32px rgba(37,211,102,0.55), 0 0 0 6px rgba(37,211,102,0.15)"
            : "0 4px 18px rgba(37,211,102,0.40)",
          transform: hovered ? "scale(1.12)" : "scale(1)",
          transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
          flexShrink: 0,
        }}
      >
        {/* Official WhatsApp speech-bubble logo SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="38"
          height="38"
          aria-hidden="true"
        >
          {/* Speech bubble outline */}
          <path
            fill="white"
            d="M24 4C13 4 4 13 4 24c0 3.6 1 7 2.7 9.9L4 44l10.4-2.7C17 43 20.4 44 24 44c11 0 20-9 20-20S35 4 24 4zm0 36c-3.1 0-6.1-.8-8.7-2.4l-.6-.4-6.2 1.6 1.7-6-.4-.6C8.2 30 7.3 27.1 7.3 24 7.3 14.8 14.8 7.3 24 7.3S40.7 14.8 40.7 24 33.2 40 24 40z"
          />
          {/* Phone handset */}
          <path
            fill="white"
            d="M33.5 27.4c-.5-.2-2.9-1.4-3.3-1.6-.5-.2-.8-.2-1.1.2-.3.5-1.3 1.6-1.6 1.9-.3.3-.6.4-1.1.1-.5-.2-2.1-.8-4-2.5-1.5-1.3-2.5-3-2.8-3.5-.3-.5 0-.8.2-1 .2-.2.5-.6.7-.8.2-.3.3-.5.5-.8.2-.3.1-.6 0-.8-.1-.2-1.1-2.6-1.5-3.6-.4-.9-.8-.8-1.1-.8h-.9c-.3 0-.8.1-1.2.6-.4.5-1.6 1.6-1.6 3.8s1.7 4.4 1.9 4.7c.2.3 3.3 5.1 8 7.1 1.1.5 2 .8 2.7 1 1.1.3 2.2.3 3 .2.9-.1 2.9-1.2 3.3-2.3.4-1.1.4-2.1.3-2.3-.2-.1-.5-.2-1-.4z"
          />
        </svg>
      </span>
    </a>
  );
};

