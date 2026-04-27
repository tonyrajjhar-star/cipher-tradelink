import { useNavigate } from "react-router-dom";
import { useRole } from "@/contexts/RoleContext";
import {
  Shield,
  Landmark,
  ArrowUpRight,
  Info,
  FileCheck,
  Globe2,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";

/**
 * Landing page — neutral header, two themed role cards.
 * Selecting a role both stores it and applies the matching theme
 * (handled globally by <ThemeApplier />).
 */

const roles = [
  {
    id: "issuing" as const,
    title: "Issuing Bank",
    icon: Landmark,
    tagline: "Originate · Issue · Govern",
    description:
      "Originate and issue Letters of Credit on behalf of applicants. Manage compliance, sanctions screening, and the full LC lifecycle.",
    responsibilities: [
      "Application intake & contract validation",
      "Sanctions screening & AML compliance",
      "LC issuance under UCP 600",
      "Document examination & settlement",
    ],
    regulatory:
      "Full regulatory accountability under UCP 600, local AML/CFT regulations, and OFAC/EU sanctions frameworks.",
    // theme preview (matches data-theme="issuing": light + crimson)
    preview: {
      surface: "bg-white",
      surfaceText: "text-[#0B1020]",
      mutedText: "text-[#6b7280]",
      accent: "#E11D48",
      accentSoft: "#FFE4E9",
      candleA: "#E11D48",
      candleB: "#F43F5E",
      candleC: "#9F1239",
      label: "Light theme · Crimson accent",
    },
    btnClass: "bg-[#E11D48] hover:bg-[#be123c] text-white",
    chipClass: "bg-[#FFE4E9] text-[#9F1239]",
  },
  {
    id: "negotiating" as const,
    title: "Negotiating Bank",
    icon: FileCheck,
    tagline: "Verify · Negotiate · Settle",
    description:
      "Act on behalf of beneficiaries. Verify document compliance, negotiate discrepancies, and facilitate payment under LC terms.",
    responsibilities: [
      "Document receipt & compliance verification",
      "Discrepancy identification & client advisory",
      "Negotiation & payment facilitation",
      "Evidence tagging & audit trail",
    ],
    regulatory:
      "Accountability for document verification accuracy, beneficiary due diligence, and adherence to issuing bank instructions.",
    // theme preview (matches data-theme="negotiating": dark + green)
    preview: {
      surface: "bg-[#0F1419]",
      surfaceText: "text-white",
      mutedText: "text-white/60",
      accent: "#22C55E",
      accentSoft: "#143324",
      candleA: "#16A34A",
      candleB: "#22C55E",
      candleC: "#15803D",
      label: "Dark theme · Emerald accent",
    },
    btnClass: "bg-[#22C55E] hover:bg-[#16A34A] text-[#0F1419]",
    chipClass: "bg-[#143324] text-[#22C55E]",
  },
];

const Index = () => {
  const navigate = useNavigate();
  const { setRole } = useRole();
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);

  const handleSelectRole = (roleId: "issuing" | "negotiating") => {
    setRole(roleId);
    navigate("/create");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header — neutral. Both brand candlesticks shown side-by-side. */}
      <header className="border-b border-border bg-card relative z-10">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <NeutralCandlesticks />
            <div className="leading-tight">
              <h1 className="text-base font-extrabold tracking-wider text-foreground">
                TRADEFLOW
              </h1>
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Banking for Trade
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-[11px] text-muted-foreground inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Markets · Compliance · Operations
                </span>
              </TooltipTrigger>
              <TooltipContent>Cross-border trade finance platform.</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0 pattern-grid opacity-40" />
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] rounded-full bg-[#FFE4E9]/40 blur-3xl -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] rounded-full bg-emerald-100/40 blur-3xl translate-y-1/3 -translate-x-1/4" />

        <div className="container mx-auto px-6 py-14 relative">
          {/* Eyebrow + headline */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-0.5 bg-[#E11D48]" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9F1239]">
                Choose your operating role
              </span>
              <span className="w-8 h-0.5 bg-emerald-500" />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight leading-[1.1]">
              Leading the way in <span className="text-[#E11D48]">Cross-Border</span>
              <br />
              Trade <span className="text-emerald-600">Finance</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm leading-relaxed">
              Each role enters a tailored workspace with its own theme, controls, and
              regulatory scope. Role changes require supervisor authorization.
            </p>
          </div>

          {/* Role cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {roles.map((role) => {
              const Icon = role.icon;
              const isHovered = hoveredRole === role.id;
              const p = role.preview;

              return (
                <div
                  key={role.id}
                  className={`relative group bg-card border border-border rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden ${
                    isHovered ? "shadow-elegant -translate-y-1" : "shadow-sm"
                  }`}
                  onMouseEnter={() => setHoveredRole(role.id)}
                  onMouseLeave={() => setHoveredRole(null)}
                  onClick={() => handleSelectRole(role.id)}
                >
                  {/* Theme preview "browser chrome" — shows what the workspace looks like */}
                  <div className={`relative ${p.surface} px-5 pt-4 pb-6`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                      </div>
                      <span
                        className={`text-[9px] uppercase tracking-widest font-semibold ${p.mutedText}`}
                      >
                        {p.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      {/* Mini logo in role's signature colors */}
                      <MiniCandlesticks
                        a={p.candleA}
                        b={p.candleB}
                        c={p.candleC}
                      />
                      <div>
                        <div className={`text-xs font-extrabold tracking-wider ${p.surfaceText}`}>
                          TRADEFLOW
                        </div>
                        <div className={`text-[9px] uppercase tracking-widest ${p.mutedText}`}>
                          {role.id === "negotiating" ? "Negotiating Desk" : "Issuing Desk"}
                        </div>
                      </div>
                      <div
                        className="ml-auto inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: p.accentSoft,
                          color: p.accent,
                        }}
                      >
                        <TrendingUp className="w-3 h-3" />
                        Live
                      </div>
                    </div>

                    {/* Mini "card" sample to convey theme */}
                    <div
                      className="rounded-lg p-3 border"
                      style={{
                        borderColor: role.id === "negotiating" ? "#1f2933" : "#eef0f4",
                        backgroundColor: role.id === "negotiating" ? "#161B22" : "#F7F8FA",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] uppercase tracking-widest ${p.mutedText}`}>
                          Sample KPI
                        </span>
                        <span
                          className="text-[10px] font-mono font-semibold"
                          style={{ color: p.accent }}
                        >
                          +0.34%
                        </span>
                      </div>
                      <div className={`text-lg font-extrabold mt-0.5 ${p.surfaceText}`}>
                        $2.45M USD
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="px-7 py-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className="relative w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-elegant"
                        style={{ backgroundColor: p.accent }}
                      >
                        <Icon className="w-7 h-7 text-white drop-shadow" strokeWidth={1.8} />
                      </div>
                      <div className="min-w-0">
                        <p
                          className="text-[10px] uppercase tracking-[0.22em] font-bold mb-1"
                          style={{ color: p.accent }}
                        >
                          {role.tagline}
                        </p>
                        <h3 className="text-2xl font-extrabold text-foreground">
                          {role.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                      {role.description}
                    </p>

                    {/* Responsibilities */}
                    <div className="mb-5 border-t border-border pt-4">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-2">
                        {role.responsibilities.map((r) => (
                          <li
                            key={r}
                            className="text-sm text-foreground flex items-start gap-2.5"
                          >
                            <Shield
                              className="w-3.5 h-3.5 mt-0.5 shrink-0"
                              style={{ color: p.accent }}
                            />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Regulatory */}
                    <div
                      className="rounded-md p-3 mb-5 border-l-2"
                      style={{
                        backgroundColor: "hsl(var(--muted) / 0.6)",
                        borderLeftColor: p.accent,
                      }}
                    >
                      <div className="flex items-start gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="w-3.5 h-3.5 mt-0.5 text-muted-foreground shrink-0 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p className="text-xs">
                              Regulatory accountability is non-transferable and subject to
                              audit.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                          {role.regulatory}
                        </p>
                      </div>
                    </div>

                    {/* CTA — Bullion-style "Open an A/c ↘" */}
                    <Button
                      className={`w-full h-12 rounded-md text-sm font-bold gap-2 group/btn ${role.btnClass}`}
                    >
                      Proceed as {role.title}
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trust strip */}
          <div className="max-w-6xl mx-auto mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { v: "UCP 600", l: "Compliant", color: "#E11D48" },
              { v: "OFAC / EU", l: "Sanctions Screened", color: "#22C55E" },
              { v: "ISO 27001", l: "Certified Platform", color: "#E11D48" },
              { v: "Always-On", l: "Operations", color: "#22C55E" },
            ].map((t) => (
              <div
                key={t.v}
                className="bg-card border border-border rounded-md px-4 py-3 flex items-center gap-3"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${t.color}1A` }}
                >
                  <Globe2 className="w-4 h-4" style={{ color: t.color }} />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">{t.v}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    {t.l}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-4 text-center text-[11px] text-muted-foreground bg-card">
        © 2026 TradeFlow — All transactions are logged and subject to regulatory audit
      </footer>
    </div>
  );
};

/* --------- Inline SVGs for the landing page (don't depend on theme) --------- */

const NeutralCandlesticks = () => (
  <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
    <line x1="8" y1="6" x2="8" y2="34" stroke="#E11D48" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="5" y="14" width="6" height="14" rx="1.2" fill="#F43F5E" />
    <line x1="20" y1="2" x2="20" y2="38" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="17" y="8" width="6" height="24" rx="1.2" fill="#22C55E" />
    <line x1="32" y1="6" x2="32" y2="34" stroke="#9F1239" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="29" y="12" width="6" height="18" rx="1.2" fill="#9F1239" />
  </svg>
);

const MiniCandlesticks = ({ a, b, c }: { a: string; b: string; c: string }) => (
  <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
    <line x1="8" y1="6" x2="8" y2="34" stroke={a} strokeWidth="1.5" strokeLinecap="round" />
    <rect x="5" y="14" width="6" height="14" rx="1.2" fill={b} />
    <line x1="20" y1="2" x2="20" y2="38" stroke={a} strokeWidth="1.5" strokeLinecap="round" />
    <rect x="17" y="8" width="6" height="24" rx="1.2" fill={b} />
    <line x1="32" y1="6" x2="32" y2="34" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
    <rect x="29" y="12" width="6" height="18" rx="1.2" fill={c} />
  </svg>
);

export default Index;
