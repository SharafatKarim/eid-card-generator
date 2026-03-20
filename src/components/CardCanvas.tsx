import React from "react";

export interface CardTemplate {
  id: string;
  name: string;
  bg: string;
  textColor: string;
  accentColor: string;
}

export type TextureType = "none" | "stars" | "geometric" | "dots" | "crescents" | "lanterns";

export const textures: { id: TextureType; name: string }[] = [
  { id: "none", name: "None" },
  { id: "stars", name: "Stars" },
  { id: "geometric", name: "Geometric" },
  { id: "dots", name: "Dots" },
  { id: "crescents", name: "Crescents" },
  { id: "lanterns", name: "Lanterns" },
];

export const templates: CardTemplate[] = [
  {
    id: "emerald-gold",
    name: "Emerald & Gold",
    bg: "#1f5c4a",
    textColor: "#faf5e8",
    accentColor: "#c9a84c",
  },
  {
    id: "royal-navy",
    name: "Royal Navy",
    bg: "#1a2340",
    textColor: "#faf5e8",
    accentColor: "#c9a84c",
  },
  {
    id: "golden-luxury",
    name: "Golden Luxury",
    bg: "#c9a84c",
    textColor: "#1a2340",
    accentColor: "#1f5c4a",
  },
  {
    id: "cream-classic",
    name: "Cream Classic",
    bg: "#f5f0e3",
    textColor: "#1a2340",
    accentColor: "#8a6d2b",
  },
];

function renderTexture(texture: TextureType, color: string) {
  switch (texture) {
    case "stars":
      return (
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
          {Array.from({ length: 30 }).map((_, i) => {
            const x = (i * 137.5) % 600;
            const y = (i * 97.3) % 400;
            const size = 6 + (i % 4) * 3;
            return (
              <text key={i} x={x} y={y} fill={color} fontSize={size} style={{ opacity: 0.5 + (i % 3) * 0.2 }}>
                ✦
              </text>
            );
          })}
        </svg>
      );
    case "geometric":
      return (
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
          <defs>
            <pattern id="geo" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 0 L60 30 L30 60 L0 30Z" fill="none" stroke={color} strokeWidth="1.2" />
              <circle cx="30" cy="30" r="4" fill="none" stroke={color} strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#geo)" />
        </svg>
      );
    case "dots":
      return (
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
          <defs>
            <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="12" cy="12" r="2" fill={color} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      );
    case "crescents":
      return (
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
          {Array.from({ length: 18 }).map((_, i) => {
            const x = (i * 157.3) % 580 + 10;
            const y = (i * 113.7) % 380 + 10;
            const size = 10 + (i % 3) * 5;
            return (
              <text key={i} x={x} y={y} fill={color} fontSize={size} style={{ opacity: 0.5 + (i % 4) * 0.15 }}>
                ☪︎
              </text>
            );
          })}
        </svg>
      );
    case "lanterns":
      return (
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
          {Array.from({ length: 12 }).map((_, i) => {
            const x = (i * 143.7) % 560 + 20;
            const y = (i * 89.3) % 360 + 20;
            return (
              <g key={i} transform={`translate(${x},${y})`} opacity={0.5 + (i % 3) * 0.15}>
                <rect x="-5" y="-14" width="10" height="22" rx="4" fill="none" stroke={color} strokeWidth="1.5" />
                <line x1="0" y1="-14" x2="0" y2="-20" stroke={color} strokeWidth="1" />
                <circle cx="0" cy="-20" r="2" fill={color} />
              </g>
            );
          })}
        </svg>
      );
    default:
      return null;
  }
}

interface CardCanvasProps {
  template: CardTemplate;
  greeting: string;
  recipientName: string;
  senderName: string;
  message: string;
  texture?: TextureType;
  textureOpacity?: number;
  backgroundImage?: string | null;
  backgroundOpacity?: number;
  arabicText?: string;
  showArabicText?: boolean;
  topOrnament?: string;
  showTopOrnament?: boolean;
  bottomOrnament?: string;
  showBottomOrnament?: boolean;
  recipientPrefix?: string;
  senderPrefix?: string;
  greetingFontSize?: number;
  messageFontSize?: number;
  arabicFontSize?: number;
}

const CardCanvas = React.forwardRef<HTMLDivElement, CardCanvasProps>(
  ({ template, greeting, recipientName, senderName, message, texture = "none", textureOpacity = 0.5, backgroundImage = null, backgroundOpacity = 0.4, arabicText = "عيد مبارك", showArabicText = true, topOrnament = "✦", showTopOrnament = true, bottomOrnament = "☪︎", showBottomOrnament = true, recipientPrefix = "Dear", senderPrefix = "—", greetingFontSize = 28, messageFontSize = 14, arabicFontSize = 28 }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          position: "relative",
          width: 600,
          height: 400,
          borderRadius: 16,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 40,
          backgroundColor: template.bg,
          fontFamily: "'Playfair Display', serif",
        }}
      >
        {/* Background image */}
        {backgroundImage && (
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: backgroundOpacity,
            pointerEvents: "none",
          }} />
        )}

        {/* Texture overlay */}
        <div style={{ position: "absolute", inset: 0, opacity: textureOpacity, pointerEvents: "none" }}>
          {renderTexture(texture, template.accentColor)}
        </div>

        {/* Decorative border */}
        <div
          style={{
            position: "absolute",
            inset: 12,
            borderRadius: 12,
            border: `2px solid ${template.accentColor}33`,
            pointerEvents: "none",
          }}
        />

        {/* Top ornament */}
        {showTopOrnament && topOrnament && (
          <div style={{ fontSize: 28, marginBottom: 4, color: template.accentColor, position: "relative" }}>{topOrnament}</div>
        )}

        {/* Arabic calligraphy */}
        {showArabicText && arabicText && (
          <p style={{ fontFamily: "'Amiri', serif", fontSize: arabicFontSize, marginBottom: 8, color: template.accentColor, lineHeight: 1.4, position: "relative" }}>
            {arabicText}
          </p>
        )}

        {/* Main greeting */}
        <h2 style={{ fontSize: greetingFontSize, fontWeight: 700, marginBottom: 12, textAlign: "center", lineHeight: 1.2, color: template.textColor, position: "relative", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" }}>
          {greeting}
        </h2>

        {/* Recipient */}
        {recipientName && (
          <p style={{ fontSize: 18, marginBottom: 8, fontStyle: "italic", color: template.accentColor, position: "relative" }}>
            {recipientPrefix} {recipientName}
          </p>
        )}

        {/* Custom message */}
        {message && (
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: messageFontSize, textAlign: "center", maxWidth: 400, marginBottom: 12, lineHeight: 1.6, opacity: 0.9, color: template.textColor, position: "relative" }}>
            {message}
          </p>
        )}

        {/* Sender */}
        {senderName && (
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 16, marginTop: "auto", color: template.accentColor, position: "relative" }}>
            {senderPrefix} {senderName}
          </p>
        )}

        {/* Bottom ornament */}
        {showBottomOrnament && bottomOrnament && (
          <div style={{ fontSize: 20, marginTop: 8, color: template.accentColor, position: "relative" }}>{bottomOrnament}</div>
        )}
      </div>
    );
  }
);

CardCanvas.displayName = "CardCanvas";
export default CardCanvas;
