import { useState, useCallback } from "react";
import { AppLayout } from "@/components/AppLayout";
import { useRole } from "@/contexts/RoleContext";
import {
  AlertTriangle,
  Play,
  CheckCircle2,
  ShieldCheck,
  ScanSearch,
  FileSearch,
  Landmark,
  Handshake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProcessRail } from "@/components/workflow/ProcessRail";
import { ExecutionLog } from "@/components/workflow/ExecutionLog";
import { LCStepsVisual } from "@/components/workflow/LCStepsVisual";
import { ChecksMetrics } from "@/components/workflow/ChecksMetrics";
import { ContextPanel } from "@/components/workflow/ContextPanel";
import { LCIssuanceResult } from "@/components/workflow/LCIssuanceResult";
import { FailureUploadPanel } from "@/components/workflow/FailureUploadPanel";
import { Stage3SuccessModal } from "@/components/workflow/Stage3SuccessModal";
import { NegotiatingDecision } from "@/components/workflow/NegotiatingDecision";
import { DocumentChecksTable } from "@/components/workflow/DocumentChecksTable";
import type { Stage, ValidationStep } from "@/components/workflow/WorkflowTypes";

type WorkflowOutcome = "running" | "success" | "failed" | "hold";
type Stage4Outcome = "idle" | "running" | "pass" | "fail";

const sanctionsSteps: ValidationStep[] = [
  { label: "Initiating AML & Sanctions Workflow", status: "completed", duration: "1.2s", explanation: "Establishes secure connection to sanctions databases and initializes screening parameters." },
  { label: "Sanctions & Watchlist Matching", status: "completed", duration: "3.8s", explanation: "Screens all parties against OFAC SDN, EU Consolidated, UN Sanctions, and proprietary watchlists." },
  { label: "Counterparty Verification", status: "running", explanation: "Validates beneficial ownership structures and cross-references with adverse media databases." },
  { label: "Restricted Goods & Ports Screening", status: "pending", explanation: "Checks commodity codes against dual-use and restricted goods lists; validates ports of origin/destination." },
  { label: "Composite Risk Scoring", status: "pending", explanation: "Aggregates all risk signals into a weighted composite score for decisioning." },
];

const lcIssuanceSteps: ValidationStep[] = [
  { label: "Parsing LC & Extracting Structured Metadata", status: "pending", explanation: "Parses the LC instrument and extracts structured metadata (parties, amounts, terms, dates) into a canonical schema." },
  { label: "Building Validation Manifests per Document", status: "pending", explanation: "Builds a per-document validation manifest defining which fields, rules, and signatures must be checked." },
  { label: "Extracting & Resolving Document Fields", status: "pending", explanation: "Extracts fields from each document and resolves them against the canonical LC metadata." },
  { label: "Executing Compliance Checks Against Business Rules", status: "pending", explanation: "Runs UCP 600, sanctions, and internal business-rule checks across all resolved fields." },
  { label: "Generating Validation Report", status: "pending", explanation: "Aggregates all findings into a structured validation report with pass/fail per rule." },
  { label: "Document Verification Process", status: "pending", explanation: "Final document verification: signatures, stamps, and tamper-evidence checks before issuance." },
];

const stage4Steps: ValidationStep[] = [
  { label: "Receiving Beneficiary Documents", status: "pending", explanation: "Intake of all 9 trade documents from the beneficiary's bank for examination." },
  { label: "OCR & Field Extraction Across Documents", status: "pending", explanation: "Extracts structured fields from each document for cross-referencing against LC terms." },
  { label: "Cross-Document Consistency Checks", status: "pending", explanation: "Verifies amount, dates, parties, and shipment details match across all documents." },
  { label: "UCP 600 Discrepancy Detection", status: "pending", explanation: "Applies UCP 600 articles to identify any discrepancies versus the LC." },
  { label: "Decisioning & Negotiation Outcome", status: "pending", explanation: "Final pass/fail decision with reason codes per UCP 600." },
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
  const [showStage3Modal, setShowStage3Modal] = useState(false);

  // Stage 4 state
  const [stage4Outcome, setStage4Outcome] = useState<Stage4Outcome>("idle");
  const [stage4StepsState, setStage4StepsState] = useState<ValidationStep[]>(stage4Steps);

  const now = () => {
    const d = new Date();
    return `Apr ${d.getDate()}, ${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`;
  };

  const simulateLC = useCallback(() => {
    setIsSimulating(true);
    setOutcome("running");
    let step = 0;
    const durations = ["1.0s", "2.8s", "3.4s", "2.1s", "1.9s", "1.4s"];

    const advance = () => {
      if (step >= lcIssuanceSteps.length) {
        setStages((prev) => prev.map((s) =>
          s.id === 3 ? { ...s, status: "completed" as const, confidence: 100, lastAction: now() } : s
        ));
        setOutcome("success");
        setIsSimulating(false);
        setTimeout(() => setShowStage3Modal(true), 600);
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
        setTimeout(advance, 500);
      }, 1200);
    };
    advance();
  }, []);

  const simulateSanctions = useCallback(() => {
    setIsSimulating(true);
    setOutcome("running");
    const durations = ["2.1s", "4.5s", "3.2s"];
    let step = 2;

    const advance = () => {
      if (step >= sanctionsSteps.length) {
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
        setTimeout(advance, 500);
      }, 1200);
    };
    advance();
  }, [simulateLC]);

  const simulateFailure = useCallback(() => {
    setIsSimulating(true);
    setOutcome("running");
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
    }, 1800);
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
    }, 1800);
  }, []);

  // Stage 4 simulation
  const startStage4 = useCallback(() => {
    setShowStage3Modal(false);
    setStage4Outcome("running");
    setStages((prev) => prev.map((s) =>
      s.id === 4 ? { ...s, status: "active" as const, confidence: 0, lastAction: now() } : s
    ));
    // Smooth scroll to stage 4 area
    setTimeout(() => {
      document.getElementById("stage-4")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);

    let step = 0;
    const durations = ["2.1s", "4.6s", "3.8s", "5.2s", "1.4s"];
    const advance = () => {
      if (step >= stage4Steps.length) {
        // 70% pass, 30% fail
        const pass = Math.random() > 0.3;
        setStages((prev) => prev.map((s) =>
          s.id === 4
            ? { ...s, status: pass ? "completed" as const : "failed" as const, confidence: 100, lastAction: now() }
            : s
        ));
        setStage4Outcome(pass ? "pass" : "fail");
        return;
      }
      setStage4StepsState((prev) => prev.map((s, i) =>
        i === step ? { ...s, status: "running" as const } : s
      ));
      setStages((prev) => prev.map((s) =>
        s.id === 4 ? { ...s, confidence: Math.round((step / stage4Steps.length) * 100) } : s
      ));
      setTimeout(() => {
        setStage4StepsState((prev) => prev.map((s, i) =>
          i === step ? { ...s, status: "completed" as const, duration: durations[step] } : s
        ));
        step++;
        setTimeout(advance, 400);
      }, 1100);
    };
    advance();
  }, []);

  const handleRetry = () => {
    setSanctionSteps(sanctionsSteps);
    setLcSteps(lcIssuanceSteps);
    setStages([
      { id: 1, title: "Application & Contract Validation", status: "completed", confidence: 100, lastAction: "Apr 10, 14:32" },
      { id: 2, title: "Sanctions Screening & Risk Control", status: "active", confidence: 68, lastAction: now() },
      { id: 3, title: "LC Issuance", status: "pending" },
    ]);
    setCurrentPhase("sanctions");
    setOutcome("running");
    setStage4Outcome("idle");
    setStage4StepsState(stage4Steps);
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
        {/* Validation Header */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/5 to-transparent" />
          <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -left-16 -bottom-16 w-56 h-56 rounded-full bg-secondary/20 blur-3xl" />

          <div className="relative p-6 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-elegant">
                <ShieldCheck className="w-8 h-8 text-white drop-shadow" strokeWidth={2} />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-card animate-pulse" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary mb-1">
                  TRADEFLOW · {roleName || "Issuing Bank"}
                </p>
                <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
                  Validation
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary bg-secondary/10 px-2.5 py-1 rounded-full border border-secondary/20">
                    <ScanSearch className="w-3.5 h-3.5" />
                    Live
                  </span>
                </h2>
                <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
                  <FileSearch className="w-3.5 h-3.5" />
                  4-stage compliance, issuance & negotiation pipeline
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {outcome === "success" && stage4Outcome === "idle" && (
                <Badge className="bg-secondary text-secondary-foreground border-0 text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> LC Issued
                </Badge>
              )}
              {stage4Outcome === "running" && (
                <Badge className="bg-[#3386C3] text-white border-0 text-xs uppercase tracking-wider">
                  <Handshake className="w-3 h-3 mr-1" /> Stage 4 Active
                </Badge>
              )}
              {stage4Outcome === "pass" && (
                <Badge className="bg-emerald-600 text-white border-0 text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Negotiation PASS
                </Badge>
              )}
              {stage4Outcome === "fail" && (
                <Badge className="bg-rose-600 text-white border-0 text-xs uppercase tracking-wider">
                  <AlertTriangle className="w-3 h-3 mr-1" /> Negotiation FAIL
                </Badge>
              )}
              {outcome === "running" && stage4Outcome === "idle" && (
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

        {/* Process Rail (now 4 stages) */}
        <ProcessRail stages={stages} />

        {/* Simulation Controls */}
        {!isSimulating && outcome === "running" && (
          <div className="flex flex-wrap items-center gap-3 p-4 rounded-lg border border-border bg-card shadow-sm">
            <div className="flex items-center gap-2 mr-2">
              <div className="w-1 h-5 bg-secondary rounded-full" />
              <span className="text-xs text-foreground font-semibold uppercase tracking-wider">Simulate Outcome</span>
            </div>
            <Button
              size="sm"
              onClick={simulateSanctions}
              className="text-xs gap-1.5 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            >
              <Play className="w-3.5 h-3.5" /> Run Stages 2 → 3
            </Button>
            <Button size="sm" variant="destructive" onClick={simulateFailure} className="text-xs gap-1.5">
              Simulate Failure
            </Button>
            <Button size="sm" variant="outline" onClick={simulateHold} className="text-xs gap-1.5 border-amber-300 text-amber-700 hover:bg-amber-50">
              Simulate Hold
            </Button>
          </div>
        )}

        {/* Success: LC Documents — Issuing */}
        {outcome === "success" && (
          <LCIssuanceResult format="pdf" />
        )}

        {/* Failed / Hold (Stage 2) */}
        {outcome === "failed" && (
          <FailureUploadPanel type="failed" reasons={failReasons} onRetry={handleRetry} />
        )}
        {outcome === "hold" && (
          <FailureUploadPanel type="hold" reasons={holdReasons} onRetry={handleRetry} />
        )}

        {/* Active Stage Detail (while Stages 2/3 running) */}
        {outcome === "running" && (activeStage || isSimulating) && (
          <div>
            {currentPhase === "lc" ? (
              <LCStepsVisual title={currentTitle} steps={currentSteps} />
            ) : (
              <ExecutionLog title={currentTitle} steps={currentSteps} />
            )}
          </div>
        )}
      </div>

      {/* Stage 3 success — generated tracker ID modal */}
      <Stage3SuccessModal
        open={showStage3Modal}
        onClose={() => setShowStage3Modal(false)}
        onProceed={() => setShowStage3Modal(false)}
      />
    </AppLayout>
  );
};

export default Workflow;
