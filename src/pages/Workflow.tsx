import { useState, useEffect, useCallback } from "react";
import { AppLayout } from "@/components/AppLayout";
import { useRole } from "@/contexts/RoleContext";
import { ChevronRight, AlertTriangle, Play, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProcessRail } from "@/components/workflow/ProcessRail";
import { ExecutionLog } from "@/components/workflow/ExecutionLog";
import { ContextPanel } from "@/components/workflow/ContextPanel";
import { LCIssuanceResult } from "@/components/workflow/LCIssuanceResult";
import { FailureUploadPanel } from "@/components/workflow/FailureUploadPanel";
import type { Stage, ValidationStep } from "@/components/workflow/WorkflowTypes";

type WorkflowOutcome = "running" | "success" | "failed" | "hold";

const sanctionsSteps: ValidationStep[] = [
  { label: "Initiating AML & Sanctions Workflow", status: "completed", duration: "1.2s", explanation: "Establishes secure connection to sanctions databases and initializes screening parameters." },
  { label: "Sanctions & Watchlist Matching", status: "completed", duration: "3.8s", explanation: "Screens all parties against OFAC SDN, EU Consolidated, UN Sanctions, and proprietary watchlists." },
  { label: "Counterparty Verification", status: "running", explanation: "Validates beneficial ownership structures and cross-references with adverse media databases." },
  { label: "Restricted Goods & Ports Screening", status: "pending", explanation: "Checks commodity codes against dual-use and restricted goods lists; validates ports of origin/destination." },
  { label: "Composite Risk Scoring", status: "pending", explanation: "Aggregates all risk signals into a weighted composite score for decisioning." },
];

const lcIssuanceSteps: ValidationStep[] = [
  { label: "LC Issuance Workflow Initiation", status: "pending", explanation: "Initializes the LC generation engine and loads transaction parameters." },
  { label: "UCP 600 Rule Validation", status: "pending", explanation: "Validates all terms against UCP 600 articles for international compliance." },
  { label: "Article-Level Compliance Checking", status: "pending", explanation: "Checks each LC article individually for discrepancies and regulatory alignment." },
  { label: "Trade & Payment Terms Verification", status: "pending", explanation: "Confirms payment schedules, Incoterms, and bank obligations match the underlying contract." },
  { label: "Discrepancy Detection", status: "pending", explanation: "Final sweep for inconsistencies across all documents and terms before issuance." },
];

const failReasons = [
  "Sanctioned entity match detected: Counterparty flagged on OFAC SDN List (confidence: 94%).",
  "Beneficial ownership structure could not be verified within regulatory timeframe.",
  "Commodity code HSN-8471 classified as dual-use under EU Regulation 2021/821.",
];

const holdReasons = [
  "Pending clarification from beneficiary on updated trade license.",
  "Additional documentation required for counterparty KYC verification.",
  "Port of destination under temporary screening hold — awaiting regulatory update.",
];

const Workflow = () => {
  const { role, roleName } = useRole();
  const isNegotiating = role === "negotiating";
  const [currentPhase, setCurrentPhase] = useState<"sanctions" | "lc">(isNegotiating ? "lc" : "sanctions");
  const [outcome, setOutcome] = useState<WorkflowOutcome>("running");
  const [sanctionSteps, setSanctionSteps] = useState<ValidationStep[]>(sanctionsSteps);
  const [lcSteps, setLcSteps] = useState<ValidationStep[]>(lcIssuanceSteps);
  const [stages, setStages] = useState<Stage[]>(
    isNegotiating
      ? [
          { id: 1, title: "Application & Contract Validation", status: "completed", confidence: 100, lastAction: "Apr 10, 14:32" },
          { id: 2, title: "LC Issuance", status: "active", confidence: 0, lastAction: "Apr 10, 15:01" },
        ]
      : [
          { id: 1, title: "Application & Contract Validation", status: "completed", confidence: 100, lastAction: "Apr 10, 14:32" },
          { id: 2, title: "Sanctions Screening & Risk Control", status: "active", confidence: 68, lastAction: "Apr 10, 15:01" },
          { id: 3, title: "LC Issuance", status: "pending" },
        ]
  );
  const [isSimulating, setIsSimulating] = useState(false);

  const now = () => {
    const d = new Date();
    return `Apr ${d.getDate()}, ${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`;
  };

  const simulateSanctions = useCallback(() => {
    setIsSimulating(true);
    setOutcome("running");
    const durations = ["2.1s", "4.5s", "3.2s"];
    let step = 2; // start from Counterparty Verification (index 2)

    const advance = () => {
      if (step >= sanctionsSteps.length) {
        // Sanctions complete → move to LC
        setStages((prev) => prev.map((s) =>
          s.id === 2 ? { ...s, status: "completed" as const, confidence: 100, lastAction: now() }
          : s.id === 3 ? { ...s, status: "active" as const, confidence: 0, lastAction: now() }
          : s
        ));
        setCurrentPhase("lc");
        setIsSimulating(false);
        setTimeout(() => simulateLC(), 800);
        return;
      }
      setSanctionSteps((prev) => prev.map((s, i) =>
        i === step ? { ...s, status: "running" as const } : i < step ? { ...s, status: "completed" as const, duration: s.duration || durations[i - 2] || "1.5s" } : s
      ));
      setTimeout(() => {
        setSanctionSteps((prev) => prev.map((s, i) =>
          i === step ? { ...s, status: "completed" as const, duration: durations[step - 2] || "2.0s" } : s
        ));
        setStages((prev) => prev.map((s) =>
          s.id === 2 ? { ...s, confidence: Math.min(100, 68 + (step - 1) * 12) } : s
        ));
        step++;
        setTimeout(advance, 600);
      }, 1500);
    };
    advance();
  }, []);

  const simulateLC = useCallback(() => {
    setIsSimulating(true);
    setOutcome("running");
    let step = 0;
    const durations = ["1.0s", "2.8s", "3.4s", "2.1s", "1.9s"];
    const lcStageId = isNegotiating ? 2 : 3;

    const advance = () => {
      if (step >= lcIssuanceSteps.length) {
        // LC complete → success
        setStages((prev) => prev.map((s) =>
          s.id === lcStageId ? { ...s, status: "completed" as const, confidence: 100, lastAction: now() } : s
        ));
        setOutcome("success");
        setIsSimulating(false);
        return;
      }
      setLcSteps((prev) => prev.map((s, i) =>
        i === step ? { ...s, status: "running" as const } : s
      ));
      setStages((prev) => prev.map((s) =>
        s.id === lcStageId ? { ...s, confidence: Math.round((step / lcIssuanceSteps.length) * 100) } : s
      ));
      setTimeout(() => {
        setLcSteps((prev) => prev.map((s, i) =>
          i === step ? { ...s, status: "completed" as const, duration: durations[step] } : s
        ));
        step++;
        setTimeout(advance, 600);
      }, 1500);
    };
    advance();
  }, [isNegotiating]);

  const simulateFailure = useCallback(() => {
    setIsSimulating(true);
    setOutcome("running");
    if (isNegotiating) {
      setLcSteps((prev) => prev.map((s, i) =>
        i === 1 ? { ...s, status: "running" as const } : s
      ));
      setTimeout(() => {
        setLcSteps((prev) => prev.map((s, i) =>
          i === 1 ? { ...s, status: "failed" as const, duration: "4.6s" }
          : i > 1 ? { ...s, status: "pending" as const }
          : s
        ));
        setStages((prev) => prev.map((s) =>
          s.id === 2 ? { ...s, status: "failed" as const, confidence: 35 } : s
        ));
        setOutcome("failed");
        setIsSimulating(false);
      }, 2000);
      return;
    }
    setSanctionSteps((prev) => prev.map((s, i) =>
      i === 2 ? { ...s, status: "running" as const } : s
    ));
    setTimeout(() => {
      setSanctionSteps((prev) => prev.map((s, i) =>
        i === 2 ? { ...s, status: "failed" as const, duration: "5.2s" }
        : i > 2 ? { ...s, status: "pending" as const }
        : s
      ));
      setStages((prev) => prev.map((s) =>
        s.id === 2 ? { ...s, status: "failed" as const, confidence: 35 } : s
      ));
      setOutcome("failed");
      setIsSimulating(false);
    }, 2000);
  }, [isNegotiating]);

  const simulateHold = useCallback(() => {
    setIsSimulating(true);
    setOutcome("running");
    if (isNegotiating) {
      setLcSteps((prev) => prev.map((s, i) =>
        i === 1 ? { ...s, status: "running" as const } : s
      ));
      setTimeout(() => {
        setLcSteps((prev) => prev.map((s, i) =>
          i === 1 ? { ...s, status: "hold" as const, duration: "—" }
          : i > 1 ? { ...s, status: "pending" as const }
          : s
        ));
        setStages((prev) => prev.map((s) =>
          s.id === 2 ? { ...s, status: "hold" as const, confidence: 52 } : s
        ));
        setOutcome("hold");
        setIsSimulating(false);
      }, 2000);
      return;
    }
    setSanctionSteps((prev) => prev.map((s, i) =>
      i === 2 ? { ...s, status: "running" as const } : s
    ));
    setTimeout(() => {
      setSanctionSteps((prev) => prev.map((s, i) =>
        i === 2 ? { ...s, status: "hold" as const, duration: "—" }
        : i > 2 ? { ...s, status: "pending" as const }
        : s
      ));
      setStages((prev) => prev.map((s) =>
        s.id === 2 ? { ...s, status: "hold" as const, confidence: 52 } : s
      ));
      setOutcome("hold");
      setIsSimulating(false);
    }, 2000);
  }, [isNegotiating]);

  const handleRetry = () => {
    setSanctionSteps(sanctionsSteps);
    setLcSteps(lcIssuanceSteps);
    if (isNegotiating) {
      setStages([
        { id: 1, title: "Application & Contract Validation", status: "completed", confidence: 100, lastAction: "Apr 10, 14:32" },
        { id: 2, title: "LC Issuance", status: "active", confidence: 0, lastAction: now() },
      ]);
      setCurrentPhase("lc");
    } else {
      setStages([
        { id: 1, title: "Application & Contract Validation", status: "completed", confidence: 100, lastAction: "Apr 10, 14:32" },
        { id: 2, title: "Sanctions Screening & Risk Control", status: "active", confidence: 68, lastAction: now() },
        { id: 3, title: "LC Issuance", status: "pending" },
      ]);
      setCurrentPhase("sanctions");
    }
    setOutcome("running");
  };

  const activeStage = stages.find((s) => s.status === "active");
  const currentSteps = currentPhase === "sanctions" ? sanctionSteps : lcSteps;
  const currentTitle = currentPhase === "sanctions"
    ? "Sanctions Screening & Risk Control"
    : "LC Issuance";

  const contextContent = currentPhase === "sanctions"
    ? {
        whatsHappening: "The system is performing real-time sanctions screening against global watchlists. Counterparty verification is currently underway.",
        whatToDo: "Wait for automated screening to complete. If a partial match is detected, you will be prompted to review and escalate or clear.",
        ifNothing: "The transaction will remain in screening state. SLA timer continues. After 24h, it will auto-escalate to compliance supervisor.",
      }
    : {
        whatsHappening: "LC issuance workflow is validating UCP 600 compliance, checking article-level rules, and verifying trade terms against the contract.",
        whatToDo: "Monitor the validation progress. Once complete, review the issued LC documents and distribute to relevant parties.",
        ifNothing: "LC generation will complete automatically. Documents will be locked for audit. Beneficiary notification will be queued.",
      };

  return (
    <AppLayout>
      <div className="space-y-6 animate-slide-up">
        {/* Header — Rosano style */}
        <div className="relative overflow-hidden rounded-lg bg-card border border-border shadow-sm">
          <div className="absolute top-0 left-0 bottom-0 w-1 bg-secondary" />
          <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-accent/70 blur-3xl" />
          <div className="relative p-6 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <span className="uppercase tracking-widest">Transaction</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-foreground font-semibold">TXN-2026-0841</span>
              </div>
              <h2 className="text-2xl font-bold text-foreground">Al Rajhi Trading Co.</h2>
              <p className="text-sm text-muted-foreground mt-1">
                LC Amount: <span className="font-semibold text-foreground">$2,450,000 USD</span>
                <span className="mx-2 text-border">·</span>
                <span className="text-secondary font-medium">{roleName}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              {outcome === "success" && (
                <Badge className="bg-secondary text-secondary-foreground border-0 text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> LC Issued
                </Badge>
              )}
              {outcome === "running" && (
                <Badge variant="outline" className="bg-accent text-primary border-secondary/30 text-xs uppercase tracking-wider">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  {currentPhase === "sanctions" ? "Screening" : "LC Issuance"}
                </Badge>
              )}
              {outcome === "failed" && (
                <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 text-xs uppercase tracking-wider">
                  Validation Failed
                </Badge>
              )}
              {outcome === "hold" && (
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs uppercase tracking-wider">
                  <AlertTriangle className="w-3 h-3 mr-1" /> On Hold
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Process Rail */}
        <ProcessRail stages={stages} />

        {/* Simulation Controls */}
        {!isSimulating && outcome === "running" && currentPhase === "sanctions" && (
          <div className="flex flex-wrap items-center gap-3 p-4 rounded-lg border border-border bg-card shadow-sm">
            <div className="flex items-center gap-2 mr-2">
              <div className="w-1 h-5 bg-secondary rounded-full" />
              <span className="text-xs text-foreground font-semibold uppercase tracking-wider">Simulate Outcome</span>
            </div>
            <Button size="sm" onClick={simulateSanctions} className="text-xs gap-1.5 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              <Play className="w-3.5 h-3.5" /> Run to Success
            </Button>
            <Button size="sm" variant="destructive" onClick={simulateFailure} className="text-xs gap-1.5">
              Simulate Failure
            </Button>
            <Button size="sm" variant="outline" onClick={simulateHold} className="text-xs gap-1.5 border-amber-300 text-amber-700 hover:bg-amber-50">
              Simulate Hold
            </Button>
          </div>
        )}

        {/* Success: LC Documents */}
        {outcome === "success" && <LCIssuanceResult />}

        {/* Failed: Upload Panel */}
        {outcome === "failed" && (
          <FailureUploadPanel type="failed" reasons={failReasons} onRetry={handleRetry} />
        )}

        {/* Hold: Upload Panel */}
        {outcome === "hold" && (
          <FailureUploadPanel type="hold" reasons={holdReasons} onRetry={handleRetry} />
        )}

        {/* Active Stage Detail (while running) */}
        {outcome === "running" && (activeStage || isSimulating) && (
          <div className="grid lg:grid-cols-3 gap-6">
            <ExecutionLog title={currentTitle} steps={currentSteps} />
            <ContextPanel {...contextContent} />
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Workflow;
