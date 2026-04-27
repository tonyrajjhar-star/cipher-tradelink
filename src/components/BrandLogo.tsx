import { useRole } from "@/contexts/RoleContext";

interface BrandLogoProps {
  size?: number;
  variant?: "auto" | "issuing" | "negotiating";
  showWordmark?: boolean;
  wordmarkClassName?: string;
  taglineClassName?: string;
}

/**
 * Two distinct Bullion-inspired logos:
 *  - issuing:    crimson/red candlestick mark (light theme)
 *  - negotiating: emerald-green candlestick mark (dark theme)
 *
 * Both render an SVG candlestick cluster reminiscent of the Bullion mark
 * in the references, in the colour appropriate to the role.
 */
export const BrandLogo = ({
  size = 36,
  variant = "auto",
  showWordmark = true,
  wordmarkClassName = "",
  taglineClassName = "",
}: BrandLogoProps) => {
  const { role } = useRole();
  const resolved =
    variant === "auto" ? (role === "negotiating" ? "negotiating" : "issuing") : variant;

  const isNeg = resolved === "negotiating";

  // Candlestick palette per theme
  const wickColor = isNeg ? "#16A34A" : "#E11D48"; // green vs crimson
  const bodyColor = isNeg ? "#22C55E" : "#F43F5E";
  const muted = isNeg ? "#15803D" : "#9F1239";

  const wordmark = isNeg ? "TRADEFLOW" : "TRADEFLOW";
  const tagline = isNeg ? "Negotiating Desk" : "Issuing Desk";

  return (
    <div className="flex items-center gap-3">
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label={isNeg ? "TradeFlow Negotiating logo" : "TradeFlow Issuing logo"}
      >
        {/* Candle 1 — short */}
        <line x1="8" y1="6" x2="8" y2="34" stroke={wickColor} strokeWidth="1.5" strokeLinecap="round" />
        <rect x="5" y="14" width="6" height="14" rx="1.2" fill={bodyColor} />

        {/* Candle 2 — tall (centerpiece) */}
        <line x1="20" y1="2" x2="20" y2="38" stroke={wickColor} strokeWidth="1.5" strokeLinecap="round" />
        <rect x="17" y="8" width="6" height="24" rx="1.2" fill={bodyColor} />

        {/* Candle 3 — medium */}
        <line x1="32" y1="6" x2="32" y2="34" stroke={muted} strokeWidth="1.5" strokeLinecap="round" />
        <rect x="29" y="12" width="6" height="18" rx="1.2" fill={muted} />
      </svg>

      {showWordmark && (
        <div className="leading-tight">
          <h1 className={`text-base font-extrabold tracking-wider ${wordmarkClassName}`}>
            {wordmark}
          </h1>
          <p className={`text-[10px] uppercase tracking-[0.2em] ${taglineClassName}`}>
            {tagline}
          </p>
        </div>
      )}
    </div>
  );
};
