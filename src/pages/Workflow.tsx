import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { useRole } from "@/contexts/RoleContext";
import {
  CheckCircle2,
  Circle,
  Clock,
  AlertTriangle,
  XCircle,
  ChevronRight,
  Upload,
  Play,
  Info,
  FileText,
  Shield,
  Scale,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type StageStatus = "completed" | "active" | "pending" | "failed" | "hold";

interface Stage {
  id: number;
  title: string;
  status: StageStatus;
  confidence?: number;
  lastAction?: string;
}

interface ValidationStep {
  label: string;
  status: "completed" | "running" | "pending" | "failed" | "hold";
  duration?: string;
  explanation: string;
}

const initialStages: Stage[] = [
  { id: 1, title: "Application & Contract Validation", status: "completed", confidence: 100, lastAction: "Apr 10, 14:32" },
  { id: 2, title: "Sanctions Screening & Risk Control", status: "active", confidence: 68, lastAction: "Apr 10, 15:01" },
  { id: 3, title: "LC Issuance", status: "pending" },
];

const validationSteps: ValidationStep[] = [
  { label: "Initiating AML & Sanctions Workflow", status: "completed", duration: "1.2s", explanation: "Establishes secure connection to sanctions databases and initializes screening parameters." },
  { label: "Sanctions & Watchlist Matching", status: "completed", duration: "3.8s", explanation: "Screens all parties against OFAC SDN, EU Consolidated, UN Sanctions, and proprietary watchlists." },
  { label: "Counterparty Verification", status: "running", duration: "—", explanation: "Validates beneficial ownership structures and cross-references with adverse media databases." },
  { label: "Restricted Goods & Ports Screening", status: "pending", explanation: "Checks commodity codes against dual-use and restricted goods lists; validates ports of origin/destination." },
  { label: "Composite Risk Scoring", status: "pending", explanation: "Aggregates all risk signals into a weighted composite score for decisioning." },
];

const stageStatusIcon = (status: StageStatus) => {
  switch (status) {
    case "completed": return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
    case "active": return <Loader2 className="w-5 h-5 text-primary animate-spin" />;
    case "pending": return <Circle className="w-5 h-5 text-muted-foreground/40" />;
    case "failed": return <XCircle className="w-5 h-5 text-destructive" />;
    case "hold": return <AlertTriangle className="w-5 h-5 text-amber-500" />;
  }
};

const stepIcon = (status: string) => {
  switch (status) {
    case "completed": return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
    case "running": return <Loader2 className="w-4 h-4 text-primary animate-spin" />;
    case "pending": return <Circle className="w-4 h-4 text-muted-foreground/30" />;
    case "failed": return <XCircle className="w-4 h-4 text-destructive" />;
    case "hold": return <AlertTriangle className="w-4 h-4 text-amber-500" />;
  }
};

const Workflow = () => {
  const { roleName } = useRole();
  const [stages] = useState<Stage[]>(initialStages);
  const [steps] = useState<ValidationStep[]>(validationSteps);

  const activeStage = stages.find((s) => s.status === "active");
  const completedSteps = steps.filter((s) => s.status === "completed").length;
  const progress = (completedSteps / steps.length) * 100;

  return (
    <AppLayout>
      <div className="space-y-6 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <span>Transactions</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground font-medium">TXN-2026-0841</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground">Al Rajhi Trading Co.</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              LC Amount: <span className="font-medium text-foreground">$2,450,000 USD</span> · {roleName}
            </p>
          </div>
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs">
            <AlertTriangle className="w-3 h-3 mr-1" /> Screening In Progress
          </Badge>
        </div>

        {/* Process Rail */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 mb-5">
            <Scale className="w-4 h-4 text-secondary" />
            <h3 className="text-sm font-semibold text-foreground">Process Pipeline</h3>
          </div>
          <div className="flex items-center gap-0">
            {stages.map((stage, i) => (
              <div key={stage.id} className="flex items-center flex-1">
                <div className={`flex-1 rounded-lg border p-4 transition-all ${
                  stage.status === "active"
                    ? "border-primary bg-primary/5 shadow-sm"
                    : stage.status === "completed"
                    ? "border-emerald-200 bg-emerald-50/50"
                    : "border-border bg-muted/20"
                }`}>
                  <div className="flex items-center gap-3">
                    {stageStatusIcon(stage.status)}
                    <div className="min-w-0">
                      <p className={`text-xs font-medium ${stage.status === "active" ? "text-primary" : stage.status === "completed" ? "text-emerald-700" : "text-muted-foreground"}`}>
                        Stage {stage.id}
                      </p>
                      <p className="text-sm font-medium text-foreground truncate">{stage.title}</p>
                    </div>
                  </div>
                  {stage.confidence !== undefined && (
                    <div className="mt-3 flex items-center gap-2">
                      <Progress value={stage.confidence} className="h-1.5 flex-1" />
                      <span className="text-[10px] font-mono text-muted-foreground">{stage.confidence}%</span>
                    </div>
                  )}
                  {stage.lastAction && (
                    <p className="text-[10px] text-muted-foreground mt-2 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {stage.lastAction}
                    </p>
                  )}
                </div>
                {i < stages.length - 1 && (
                  <ChevronRight className="w-5 h-5 text-muted-foreground/30 mx-2 shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Active Stage Detail */}
        {activeStage && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Execution Log */}
            <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">{activeStage.title}</h3>
                </div>
                <span className="text-xs text-muted-foreground">{completedSteps}/{steps.length} steps completed</span>
              </div>

              <div className="space-y-1">
                {steps.map((step, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                      step.status === "running" ? "bg-primary/5" : step.status === "completed" ? "bg-muted/20" : ""
                    }`}
                  >
                    <div className="mt-0.5">{stepIcon(step.status)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={`text-sm ${step.status === "pending" ? "text-muted-foreground" : "text-foreground"}`}>
                          {step.label}
                        </p>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-3 h-3 text-muted-foreground/50 hover:text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs text-xs">{step.explanation}</TooltipContent>
                        </Tooltip>
                      </div>
                      {step.duration && (
                        <p className="text-[10px] text-muted-foreground mt-0.5 font-mono">{step.duration}</p>
                      )}
                    </div>
                    {step.status === "running" && (
                      <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20 animate-pulse-soft">
                        Processing
                      </Badge>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-border flex items-center gap-3">
                <Progress value={progress} className="flex-1 h-2" />
                <span className="text-xs font-medium text-foreground">{Math.round(progress)}%</span>
              </div>
            </div>

            {/* Context Panel */}
            <div className="space-y-4">
              {/* What's Happening */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">What's Happening</h4>
                <p className="text-sm text-foreground leading-relaxed">
                  The system is performing real-time sanctions screening against global watchlists. Counterparty verification is currently underway.
                </p>
              </div>

              {/* What Must You Do */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">What Must You Do Next</h4>
                <p className="text-sm text-foreground leading-relaxed">
                  Wait for automated screening to complete. If a partial match is detected, you will be prompted to review and escalate or clear.
                </p>
              </div>

              {/* If You Do Nothing */}
              <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-3">If You Do Nothing</h4>
                <p className="text-sm text-foreground leading-relaxed">
                  The transaction will remain in screening state. SLA timer continues. After 24h, it will auto-escalate to compliance supervisor.
                </p>
              </div>

              {/* Documents */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Documents</h4>
                <div className="space-y-2">
                  {["Application Form.pdf", "Sales Contract.pdf", "Pro-forma Invoice.pdf"].map((doc) => (
                    <div key={doc} className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 hover:bg-muted/50 cursor-pointer transition-colors">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs text-foreground">{doc}</span>
                      <CheckCircle2 className="w-3 h-3 text-emerald-500 ml-auto" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Workflow;
