import { useNavigate } from "react-router-dom";
import { useRole } from "@/contexts/RoleContext";
import { Shield, Landmark, ArrowRight, Info, FileCheck, Scale } from "lucide-react";
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
    accent: "primary",
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
    accent: "secondary",
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
      <header className="border-b border-border/60 bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
              <Scale className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground tracking-tight">TradeFlow</h1>
              <p className="text-xs text-muted-foreground">Trade Finance Platform</p>
            </div>
          </div>
          <span className="text-xs text-muted-foreground">Enterprise Edition v3.2</span>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <p className="text-xs font-medium uppercase tracking-widest text-primary mb-3">Import & Export</p>
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
                  className={`relative group rounded-xl border bg-card p-6 transition-all duration-300 cursor-pointer ${
                    isHovered
                      ? "border-primary shadow-lg shadow-primary/8 -translate-y-1"
                      : "border-border hover:border-primary/40"
                  }`}
                  onMouseEnter={() => setHoveredRole(role.id)}
                  onMouseLeave={() => setHoveredRole(null)}
                  onClick={() => handleSelectRole(role.id)}
                >
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors ${
                    role.id === "issuing" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
                  }`}>
                    <Icon className="w-6 h-6" />
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
                  <div className="rounded-lg bg-muted/50 p-3 mb-5">
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
                  <Button className="w-full group/btn" variant={role.id === "issuing" ? "default" : "outline"}>
                    Proceed as {role.title}
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
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
