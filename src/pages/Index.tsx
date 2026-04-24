import { useNavigate } from "react-router-dom";
import { useRole } from "@/contexts/RoleContext";
import { Shield, Landmark, ArrowRight, Info, FileCheck, Triangle, Phone, Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";

const roles = [
  {
    id: "issuing" as const,
    title: "Issuing Bank",
    icon: Landmark,
    tagline: "Originate. Issue. Govern.",
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
    accent: "primary",
  },
  {
    id: "negotiating" as const,
    title: "Negotiating Bank",
    icon: FileCheck,
    tagline: "Verify. Negotiate. Settle.",
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
    accent: "secondary",
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
      {/* Top utility bar — Rosano style */}
      <div className="bg-muted/60 border-b border-border">
        <div className="container mx-auto px-6 py-2 flex items-center justify-between text-[11px]">
          <div className="hidden md:flex items-center gap-6 text-muted-foreground uppercase tracking-widest font-medium">
            <a href="#" className="hover:text-secondary transition-colors">Contact</a>
            <a href="#" className="hover:text-secondary transition-colors">Locations</a>
            <a href="#" className="hover:text-secondary transition-colors">FAQ</a>
            <a href="#" className="hover:text-secondary transition-colors">Compliance</a>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground ml-auto">
            <Phone className="w-3 h-3" />
            <span>24/7 Trade Support</span>
            <span className="font-bold text-foreground">+1 (234) 500 0975</span>
          </div>
        </div>
      </div>

      {/* Header — Rosano style: navy block + orange divider + nav */}
      <header className="border-b border-border bg-card relative">
        <div className="flex items-stretch">
          {/* Brand block (navy) */}
          <div className="bg-primary text-primary-foreground px-8 py-5 flex items-center gap-3 relative">
            <div className="relative w-11 h-11 flex items-center justify-center">
              <Triangle className="absolute w-10 h-10 text-secondary" strokeWidth={2.5} />
              <Triangle className="w-5 h-5 text-secondary fill-secondary" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wider">TRADEFLOW</h1>
              <p className="text-[10px] text-primary-foreground/70 uppercase tracking-widest">Banking for Trade</p>
            </div>
            {/* Orange divider edge */}
            <div className="absolute top-0 bottom-0 -right-1 w-1 bg-secondary" />
          </div>

          {/* Nav */}
          <nav className="flex-1 flex items-center justify-end gap-8 px-8">
            <a className="text-sm font-semibold text-secondary">[ Home ]</a>
            <a className="text-sm font-medium text-foreground/80 hover:text-foreground cursor-pointer">About</a>
            <a className="text-sm font-medium text-foreground/80 hover:text-foreground cursor-pointer">Services</a>
            <a className="text-sm font-medium text-foreground/80 hover:text-foreground cursor-pointer">Compliance</a>
            <a className="text-sm font-medium text-foreground/80 hover:text-foreground cursor-pointer">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 relative overflow-hidden">
        {/* Decorative peach blobs (Rosano signature) */}
        <div className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-accent/70 blur-3xl" />
        <div className="absolute bottom-10 -right-32 w-96 h-96 rounded-full bg-accent/60 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-secondary/5 blur-3xl" />

        <div className="container mx-auto px-6 py-14 relative">
          {/* Eyebrow */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-8 h-0.5 bg-secondary" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary">
                Simple & Secure Trade Banking
              </span>
              <span className="w-8 h-0.5 bg-secondary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              We Power <span className="text-secondary">Stronger</span> Trade
              <br /> Across Borders & Banks
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm leading-relaxed">
              Select your operating role to enter the workflow. Your role determines scope,
              regulatory responsibilities, and available actions. Role changes require supervisor authorization.
            </p>
          </div>

          {/* Role cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {roles.map((role, idx) => {
              const Icon = role.icon;
              const isHovered = hoveredRole === role.id;
              const isOrange = role.accent === "secondary";

              return (
                <div
                  key={role.id}
                  className={`relative group bg-card border border-border transition-all duration-300 cursor-pointer overflow-hidden ${
                    isHovered ? "shadow-elegant -translate-y-1" : "shadow-sm"
                  }`}
                  onMouseEnter={() => setHoveredRole(role.id)}
                  onMouseLeave={() => setHoveredRole(null)}
                  onClick={() => handleSelectRole(role.id)}
                >
                  {/* Step number badge (Rosano style) */}
                  <div className="absolute top-5 left-5 z-10">
                    <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shadow-elegant">
                      {idx + 1}
                    </div>
                  </div>

                  {/* Peach circle backdrop with 3D icon */}
                  <div className="relative pt-12 pb-6 px-8 flex items-center justify-center">
                    <div className="relative w-40 h-40 flex items-center justify-center">
                      <div className={`absolute inset-0 rounded-full ${isOrange ? "bg-secondary/15" : "bg-accent"}`} />
                      <div className={`absolute inset-4 rounded-full ${isOrange ? "bg-secondary/10" : "bg-accent/60"}`} />
                      {/* 3D icon */}
                      <div className="relative">
                        <div className={`absolute inset-0 ${isOrange ? "bg-secondary" : "bg-primary"} rounded-2xl blur-xl opacity-40 translate-y-2`} />
                        <div className={`relative w-20 h-20 rounded-2xl ${isOrange ? "bg-secondary" : "bg-primary"} flex items-center justify-center shadow-elegant`}>
                          <Icon className="w-10 h-10 text-white drop-shadow" strokeWidth={1.8} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-8 pb-8">
                    {/* Title */}
                    <div className="text-center mb-4">
                      <p className={`text-[10px] uppercase tracking-[0.25em] mb-1 ${isOrange ? "text-secondary" : "text-primary"} font-semibold`}>
                        {role.tagline}
                      </p>
                      <h3 className="text-2xl font-bold text-foreground">{role.title}</h3>
                    </div>

                    <p className="text-sm text-muted-foreground mb-5 text-center leading-relaxed">
                      {role.description}
                    </p>

                    {/* Responsibilities */}
                    <div className="mb-5 border-t border-border pt-5">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3 text-center">
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-2">
                        {role.responsibilities.map((r) => (
                          <li key={r} className="text-sm text-foreground flex items-start gap-2.5">
                            <Shield className={`w-3.5 h-3.5 mt-0.5 ${isOrange ? "text-secondary" : "text-primary"} shrink-0`} />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Regulatory note */}
                    <div className="rounded-md bg-muted/60 p-3 mb-5 border-l-2 border-secondary">
                      <div className="flex items-start gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="w-3.5 h-3.5 mt-0.5 text-muted-foreground shrink-0 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p className="text-xs">Regulatory accountability is non-transferable and subject to audit.</p>
                          </TooltipContent>
                        </Tooltip>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">{role.regulatory}</p>
                      </div>
                    </div>

                    {/* CTA */}
                    <Button
                      className={`w-full h-12 group/btn rounded-md text-sm font-semibold ${
                        isOrange
                          ? "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                          : "bg-primary hover:bg-primary/90 text-primary-foreground"
                      }`}
                    >
                      Proceed as {role.title}
                      <span className={`ml-2 inline-flex items-center justify-center w-7 h-7 rounded-full ${isOrange ? "bg-white/20" : "bg-white/20"} transition-transform group-hover/btn:translate-x-1`}>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trust strip */}
          <div className="max-w-5xl mx-auto mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { v: "UCP 600", l: "Compliant" },
              { v: "OFAC / EU", l: "Sanctions Screened" },
              { v: "ISO 27001", l: "Certified Platform" },
              { v: "24/7", l: "Operations" },
            ].map((t) => (
              <div key={t.v} className="bg-card border border-border rounded-md px-4 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                  <Globe2 className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">{t.v}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{t.l}</div>
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

export default Index;
