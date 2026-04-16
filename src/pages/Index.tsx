import { useNavigate } from "react-router-dom";
import { useRole } from "@/contexts/RoleContext";
import { Shield, Landmark, ArrowRight, Info, FileCheck, Scale, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";

const roles = [
  {
    id: "issuing" as const,
    title: "Issuing Bank",
    icon: Landmark,
    description: "Originate and issue Letters of Credit on behalf of applicants. Manage compliance, sanctions screening, and LC lifecycle.",
    responsibilities: [
      "Application intake & contract validation",
      "Sanctions screening & AML compliance",
      "LC issuance under UCP 600",
      "Document examination & settlement",
    ],
    regulatory: "Full regulatory accountability under UCP 600, local AML/CFT regulations, and OFAC/EU sanctions frameworks.",
    gradient: "from-[hsl(216,92%,65%)] to-[hsl(237,51%,42%)]",
    bgGradient: "from-[hsl(216,92%,65%)]/8 to-[hsl(237,51%,42%)]/4",
  },
  {
    id: "negotiating" as const,
    title: "Negotiating Bank",
    icon: FileCheck,
    description: "Act on behalf of beneficiaries. Verify document compliance, negotiate discrepancies, and facilitate payment under LC terms.",
    responsibilities: [
      "Document receipt & compliance verification",
      "Discrepancy identification & client advisory",
      "Negotiation & payment facilitation",
      "Evidence tagging & audit trail",
    ],
    regulatory: "Accountability for document verification accuracy, beneficiary due diligence, and adherence to issuing bank instructions.",
    gradient: "from-[hsl(270,60%,55%)] to-[hsl(237,51%,42%)]",
    bgGradient: "from-[hsl(270,60%,55%)]/8 to-[hsl(237,51%,42%)]/4",
  },
];

const Index = () => {
  const navigate = useNavigate();
  const { setRole } = useRole();
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);

  const handleSelectRole = (roleId: "issuing" | "negotiating") => {
    setRole(roleId);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/60 bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[hsl(216,92%,65%)] to-[hsl(237,51%,42%)] opacity-40 blur-lg translate-y-1" />
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(216,92%,65%)] to-[hsl(237,51%,42%)] flex items-center justify-center shadow-lg">
                <Scale className="w-5 h-5 text-white drop-shadow-sm" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground tracking-tight">TradeFlow</h1>
              <p className="text-xs text-muted-foreground">Trade Finance Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs text-muted-foreground">Enterprise Edition v3.2</span>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-6 py-16 relative overflow-hidden">
        {/* Background decorative gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-secondary/10 to-transparent rounded-full blur-3xl" />

        <div className="max-w-4xl w-full relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <p className="text-xs font-medium uppercase tracking-widest text-primary">Import & Export</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Select Your Operating Role
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
              Your role determines workflow scope, regulatory responsibilities, and available actions.
              Select carefully — role changes require supervisor authorization.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {roles.map((role) => {
              const Icon = role.icon;
              const isHovered = hoveredRole === role.id;

              return (
                <div
                  key={role.id}
                  className={`relative group rounded-2xl border bg-card p-6 transition-all duration-300 cursor-pointer overflow-hidden ${
                    isHovered
                      ? "border-primary/50 shadow-xl shadow-primary/10 -translate-y-1.5"
                      : "border-border hover:border-primary/30"
                  }`}
                  onMouseEnter={() => setHoveredRole(role.id)}
                  onMouseLeave={() => setHoveredRole(null)}
                  onClick={() => handleSelectRole(role.id)}
                >
                  {/* Background gradient wash */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${role.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative">
                    {/* 3D Icon */}
                    <div className="relative w-14 h-14 mb-5">
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${role.gradient} opacity-40 blur-lg translate-y-1`} />
                      <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${role.gradient} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-7 h-7 text-white drop-shadow-sm" />
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-foreground mb-2">{role.title}</h3>
                    <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{role.description}</p>

                    {/* Responsibilities */}
                    <div className="mb-5">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-1.5">
                        {role.responsibilities.map((r) => (
                          <li key={r} className="text-sm text-foreground flex items-start gap-2">
                            <Shield className="w-3.5 h-3.5 mt-0.5 text-primary shrink-0" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Regulatory */}
                    <div className="rounded-xl bg-muted/50 p-3 mb-5 border border-border/50">
                      <div className="flex items-start gap-2">
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-3.5 h-3.5 mt-0.5 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p className="text-xs">Regulatory accountability is non-transferable and subject to audit.</p>
                          </TooltipContent>
                        </Tooltip>
                        <p className="text-xs text-muted-foreground leading-relaxed">{role.regulatory}</p>
                      </div>
                    </div>

                    {/* CTA */}
                    <Button className={`w-full group/btn bg-gradient-to-r ${role.gradient} hover:opacity-90 text-white border-0`}>
                      Proceed as {role.title}
                      <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <footer className="border-t border-border/40 py-4 text-center text-xs text-muted-foreground">
        © 2026 TradeFlow — All transactions are logged and subject to regulatory audit
      </footer>
    </div>
  );
};

export default Index;
