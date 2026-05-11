import { useState, useCallback } from "react";
import { AppLayout } from "@/components/AppLayout";
import {
  Handshake,
  Upload,
  FileText,
  X,
  CheckCircle2,
  ArrowRight,
  KeyRound,
  Lock,
  ShieldCheck,
  Landmark,
  Eye,
  Sparkles,
  Paperclip,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProcessRail } from "@/components/workflow/ProcessRail";
import { LCStepsVisual } from "@/components/workflow/LCStepsVisual";
import { ChecksMetrics } from "@/components/workflow/ChecksMetrics";
import { NegotiatingDecision } from "@/components/workflow/NegotiatingDecision";
import { DocumentChecksTable } from "@/components/workflow/DocumentChecksTable";
import type { Stage, ValidationStep } from "@/components/workflow/WorkflowTypes";

const initialStage4Steps: ValidationStep[] = [
  { label: "Receiving Beneficiary Documents", status: "pending", explanation: "Intake of all 9 trade documents from the beneficiary's bank for examination." },
  { label: "OCR & Field Extraction Across Documents", status: "pending", explanation: "Extracts structured fields from each document for cross-referencing against LC terms." },
  { label: "Cross-Document Consistency Checks", status: "pending", explanation: "Verifies amount, dates, parties, and shipment details match across all documents." },
  { label: "UCP 600 Discrepancy Detection", status: "pending", explanation: "Applies UCP 600 articles to identify any discrepancies versus the LC." },
  { label: "Decisioning & Negotiation Outcome", status: "pending", explanation: "Final pass/fail decision with reason codes per UCP 600." },
];

type Phase = "intake" | "running" | "decisioned";

const NegotiatingBank = () => {
  const [trackerId, setTrackerId] = useState("");
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("intake");
  const [steps, setSteps] = useState<ValidationStep[]>(initialStage4Steps);
  const [outcome, setOutcome] = useState<"pass" | "fail">("pass");

  const [stages, setStages] = useState<Stage[]>([
    { id: 1, title: "Application & Contract Validation", status: "completed", confidence: 100, lastAction: "Apr 10, 14:32" },
    { id: 2, title: "Sanctions Screening & Risk Control", status: "completed", confidence: 100, lastAction: "Apr 10, 15:01" },
    { id: 3, title: "LC Issuance", status: "completed", confidence: 100, lastAction: "Apr 10, 15:18" },
    { id: 4, title: "Negotiating Bank — Document Verification", status: "pending" },
  ]);

  const trackerValid = trackerId.trim().length >= 4;
  const canProceed = trackerValid && uploadedFile;

  const handleProceed = useCallback(() => {
    setPhase("running");
    setStages((prev) => prev.map((s) => (s.id === 4 ? { ...s, status: "active", confidence: 0, lastAction: "now" } : s)));

    let step = 0;
    const durations = ["2.1s", "4.6s", "3.8s", "5.2s", "1.4s"];
    const advance = () => {
      if (step >= initialStage4Steps.length) {
        const pass = Math.random() > 0.3;
        setOutcome(pass ? "pass" : "fail");
        setStages((prev) =>
          prev.map((s) =>
            s.id === 4 ? { ...s, status: pass ? "completed" : "failed", confidence: 100, lastAction: "now" } : s,
          ),
        );
        setPhase("decisioned");
        return;
      }
      setSteps((prev) => prev.map((s, i) => (i === step ? { ...s, status: "running" } : s)));
      setStages((prev) =>
        prev.map((s) =>
          s.id === 4 ? { ...s, confidence: Math.round((step / initialStage4Steps.length) * 100) } : s,
        ),
      );
      setTimeout(() => {
        setSteps((prev) =>
          prev.map((s, i) => (i === step ? { ...s, status: "completed", duration: durations[step] } : s)),
        );
        step++;
        setTimeout(advance, 400);
      }, 1100);
    };
    advance();
  }, []);

  return (
    <AppLayout>
      <div className="space-y-6 animate-slide-up">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-2xl border-2 border-[#3386C3]/30 bg-gradient-to-br from-[#3386C3]/10 via-card to-card p-6 shadow-elegant">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#3386C3]/15 blur-3xl" />
          <div className="relative flex items-center gap-4 flex-wrap">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#3386C3] to-[#1F5E8A] flex items-center justify-center shadow-elegant">
              <Handshake className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#1F5E8A] mb-1">
                Stage 4 of 4
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
                Negotiating Bank — Document Verification
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Resume the validated LC by entering its tracker ID and submitting beneficiary documents for negotiation.
              </p>
            </div>
            <Badge variant="outline" className="bg-[#3386C3]/10 text-[#1F5E8A] border-[#3386C3]/30 text-xs">
              <Landmark className="w-3 h-3 mr-1" /> Negotiating Workflow
            </Badge>
          </div>
        </div>

        {/* Top Process Pipeline (always visible) */}
        <ProcessRail stages={stages} />

        {/* Intake form (Tracker ID + Upload) */}
        {phase === "intake" && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Tracker ID */}
            <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
              <div className="px-5 py-3 border-b border-border bg-muted/40 flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                  Tracker ID
                </h3>
              </div>
              <div className="p-5 space-y-3">
                <p className="text-xs text-muted-foreground">
                  Paste the generated Tracker ID issued at the end of LC Issuance (Stage 3).
                </p>
                <Input
                  placeholder="e.g. TRK-NEG-2026-0841"
                  value={trackerId}
                  onChange={(e) => setTrackerId(e.target.value)}
                  className="font-mono text-sm tracking-wider uppercase"
                />
                {trackerValid && (
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Tracker ID accepted — upload section unlocked.
                  </div>
                )}
              </div>
            </div>

            {/* Upload */}
            <div
              className={`rounded-xl border bg-card shadow-sm overflow-hidden transition-all ${
                trackerValid ? "border-border" : "border-border opacity-60 pointer-events-none"
              }`}
            >
              <div className="px-5 py-3 border-b border-border bg-muted/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                    Application Document
                  </h3>
                </div>
                {!trackerValid && (
                  <Badge variant="outline" className="text-[10px]">
                    <Lock className="w-3 h-3 mr-1" /> Locked
                  </Badge>
                )}
              </div>
              <div className="p-5">
                {!uploadedFile ? (
                  <div
                    className="relative border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-secondary hover:bg-accent/30 transition-all"
                    onClick={() => trackerValid && setUploadedFile("Beneficiary_Documents_Bundle.pdf")}
                  >
                    <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-primary flex items-center justify-center shadow-elegant">
                      <Upload className="w-7 h-7 text-white" />
                    </div>
                    <p className="text-sm font-bold text-foreground">Drop or click to upload</p>
                    <p className="text-[11px] text-muted-foreground mt-1">PDF, DOC, XLSX — Max 25 MB</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-accent/30">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{uploadedFile}</p>
                      <Badge variant="outline" className="mt-1 text-[10px] bg-card text-secondary border-secondary/30">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Uploaded
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setUploadedFile(null)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Proceed action footer */}
        {phase === "intake" && (
          <div className="flex items-center justify-between gap-3 p-4 rounded-lg bg-card border border-border">
            <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              Documents will be matched against the LC instrument identified by the Tracker ID.
            </p>
            <Button
              disabled={!canProceed}
              onClick={handleProceed}
              className="gap-2 bg-gradient-to-r from-[#3386C3] to-[#1F5E8A] hover:opacity-90 text-white border-0"
            >
              Proceed
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Running */}
        {phase === "running" && (
          <LCStepsVisual title="Negotiating Bank Document Verification Pipeline" steps={steps} />
        )}

        {/* Decisioned */}
        {phase === "decisioned" && (
          <>
            <NegotiatingDecision outcome={outcome} />
            <ChecksMetrics />
            <DocumentChecksTable />
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default NegotiatingBank;
