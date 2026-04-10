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
  const { roleName } = useRole();
  const [currentPhase, setCurrentPhase] = useState<"sanctions" | "lc">("sanctions");
  const [outcome, setOutcome] = useState<WorkflowOutcome>("running");
  const [sanctionSteps, setSanctionSteps] = useState<ValidationStep[]>(sanctionsSteps);
  const [lcSteps, setLcSteps] = useState<ValidationStep[]>(lcIssuanceSteps);
  const [stages, setStages] = useState<Stage[]>([
    { id: 1, title: "Application & Contract Validation", status: "completed", confidence: 100, lastAction: "Apr 10, 14:32" },
    { id: 2, title: "Sanctions Screening & Risk Control", status: "active", confidence: 68, lastAction: "Apr 10, 15:01" },
    { id: 3, title: "LC Issuance", status: "pending" },
  ]);
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
    let step = 0;
    const durations = ["1.0s", "2.8s", "3.4s", "2.1s", "1.9s"];

    const advance = () => {
      if (step >= lcIssuanceSteps.length) {
        // LC complete → success
        setStages((prev) => prev.map((s) =>
          s.id === 3 ? { ...s, status: "completed" as const, confidence: 100, lastAction: now() } : s
        ));
        setOutcome("success");
        setIsSimulating(false);
        return;
      }
      setLcSteps((prev) => prev.map((s, i) =>
        i === step ? { ...s, status: "running" as const } : s
      ));
      setStages((prev) => prev.map((s) =>
        s.id === 3 ? { ...s, confidence: Math.round((step / lcIssuanceSteps.length) * 100) } : s
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
  }, []);

  const simulateFailure = useCallback(() => {
    setIsSimulating(true);
    setOutcome("running");
    let step = 2;
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
  }, []);

  const simulateHold = useCallback(() => {
    setIsSimulating(true);
    setOutcome("running");
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
  }, []);

  const handleRetry = () => {
    // Reset to sanctions running state
    setSanctionSteps(sanctionsSteps);
    setLcSteps(lcIssuanceSteps);
    setStages([
      { id: 1, title: "Application & Contract Validation", status: "completed", confidence: 100, lastAction: "Apr 10, 14:32" },
      { id: 2, title: "Sanctions Screening & Risk Control", status: "active", confidence: 68, lastAction: now() },
      { id: 3, title: "LC Issuance", status: "pending" },
    ]);
    setCurrentPhase("sanctions");
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
        documents: ["Application Form.pdf", "Sales Contract.pdf", "Pro-forma Invoice.pdf"],
      }
    : {
        whatsHappening: "LC issuance workflow is validating UCP 600 compliance, checking article-level rules, and verifying trade terms against the contract.",
        whatToDo: "Monitor the validation progress. Once complete, review the issued LC documents and distribute to relevant parties.",
        ifNothing: "LC generation will complete automatically. Documents will be locked for audit. Beneficiary notification will be queued.",
        documents: ["Application Form.pdf", "Sales Contract.pdf", "Pro-forma Invoice.pdf", "Compliance Clearance Report.pdf"],
      };

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
          <div className="flex items-center gap-2">
            {outcome === "success" && (
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
                <CheckCircle2 className="w-3 h-3 mr-1" /> LC Issued
              </Badge>
            )}
            {outcome === "running" && (
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs">
                <AlertTriangle className="w-3 h-3 mr-1" /> {currentPhase === "sanctions" ? "Screening In Progress" : "LC Issuance In Progress"}
              </Badge>
            )}
            {outcome === "failed" && (
              <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 text-xs">
                Validation Failed
              </Badge>
            )}
            {outcome === "hold" && (
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs">
                <AlertTriangle className="w-3 h-3 mr-1" /> On Hold
              </Badge>
            )}
          </div>
        </div>

        {/* Process Rail */}
        <ProcessRail stages={stages} />

        {/* Simulation Controls */}
        {!isSimulating && outcome === "running" && currentPhase === "sanctions" && (
          <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card">
            <span className="text-xs text-muted-foreground font-medium">Simulate Outcome:</span>
            <Button size="sm" onClick={simulateSanctions} className="text-xs gap-1.5">
              <Play className="w-3.5 h-3.5" /> Run to Success
            </Button>
            <Button size="sm" variant="destructive" onClick={simulateFailure} className="text-xs gap-1.5">
              Simulate Failure
            </Button>
            <Button size="sm" variant="outline" onClick={simulateHold} className="text-xs gap-1.5 border-amber-200 text-amber-700 hover:bg-amber-50">
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
