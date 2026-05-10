import { useEffect, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { ProcessRail } from "@/components/workflow/ProcessRail";
import type { Stage as RailStage, StageStatus as RailStatus } from "@/components/workflow/WorkflowTypes";
import {
  Handshake,
  FileCheck2,
  PackageSearch,
  ShieldAlert,
  BadgeCheck,
  CheckCircle2,
  Loader2,
  Lock,
  Eye,
  FileText,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type StageStatus = "pending" | "running" | "completed" | "locked";

interface StageDef {
  id: number;
  title: string;
  description: string;
  icon: any;
  hasDocs?: boolean;
}

const STAGES: StageDef[] = [
  {
    id: 1,
    title: "LC Issuance Verification",
    icon: FileCheck2,
    description:
      "Confirms the underlying Letter of Credit is genuine and active. The system retrieves the issuing bank reference, validates the SWIFT MT700 message integrity, and reconciles the LC terms with the master record. Any tampering, expiry, or amendment mismatch is flagged before further processing. This safeguards the negotiating bank against fraudulent or superseded LC instruments.",
  },
  {
    id: 2,
    title: "Document Package Retrieval",
    icon: PackageSearch,
    description:
      "Securely retrieves the complete beneficiary document bundle from the courier or electronic vault. Each document is checksum-verified, timestamped, and indexed against the LC reference. Missing or unreadable items are surfaced for immediate operator action. The retrieved package becomes the single source of truth for downstream compliance and negotiation steps.",
    hasDocs: true,
  },
  {
    id: 3,
    title: "Compliance Risk Assessment",
    icon: ShieldAlert,
    description:
      "Runs the document set through sanctions, AML, dual-use goods, and jurisdictional risk engines. Beneficiary, applicant, vessel, and port data are screened against global watchlists in real time. Risk scores are aggregated and explained per UCP 600 and ICC guidance. Only packages within tolerance proceed to the negotiation approval stage.",
  },
  {
    id: 4,
    title: "Negotiation Approval",
    icon: BadgeCheck,
    description:
      "Final adjudication of the negotiation request based on prior verification, retrieval, and compliance results. The approver views consolidated discrepancy notes, risk indicators, and proposed value-date. Approval triggers funds reservation and notifies the issuing bank of negotiation. Rejection routes the case to the discrepancy queue with full audit trail.",
  },
];

const SAMPLE_DOCS = [
  { name: "Commercial Invoice.pdf", size: "248 KB" },
  { name: "Bill of Lading.pdf", size: "412 KB" },
  { name: "Packing List.pdf", size: "186 KB" },
  { name: "Certificate of Origin.pdf", size: "92 KB" },
  { name: "Insurance Certificate.pdf", size: "154 KB" },
  { name: "Inspection Report.pdf", size: "201 KB" },
];

const formatNow = () =>
  new Date().toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

interface PipelinePageProps {
  title: string;
  subtitle: string;
  stages: StageDef[];
  accent?: string;
}

const PipelinePage = ({ title, subtitle, stages, accent = "#3386C3" }: PipelinePageProps) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [statuses, setStatuses] = useState<StageStatus[]>(
    stages.map((_, i) => (i === 0 ? "running" : "locked")),
  );
  const [stageTime, setStageTime] = useState(formatNow());
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<string | null>(null);

  useEffect(() => {
    if (currentIdx >= stages.length) return;
    setStageTime(formatNow());
    const t = setTimeout(() => {
      setStatuses((prev) => {
        const next = [...prev];
        next[currentIdx] = "completed";
        if (currentIdx + 1 < stages.length) next[currentIdx + 1] = "running";
        return next;
      });
      setCurrentIdx((i) => i + 1);
    }, 4000);
    return () => clearTimeout(t);
  }, [currentIdx, stages.length]);

  const overallPct = Math.round(
    (statuses.filter((s) => s === "completed").length / stages.length) * 100,
  );

  return (
    <AppLayout>
      <div className="space-y-6 animate-slide-up">
        {/* Hero */}
        <div
          className="relative overflow-hidden rounded-2xl border-2 p-6 shadow-elegant bg-gradient-to-br from-card via-card to-card"
          style={{ borderColor: `${accent}40` }}
        >
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl"
            style={{ background: `${accent}26` }}
          />
          <div className="relative flex items-center gap-4 flex-wrap">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-elegant"
              style={{ background: `linear-gradient(135deg, ${accent}, #1F5E8A)` }}
            >
              <Handshake className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="text-[10px] font-bold uppercase tracking-[0.25em] mb-1"
                style={{ color: "#1F5E8A" }}
              >
                {subtitle}
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
                {title}
              </h2>
              <p className="text-xs text-muted-foreground mt-1 font-mono">
                Last update · {stageTime}
              </p>
            </div>
            <Badge
              variant="outline"
              className="text-xs"
              style={{ background: `${accent}1a`, color: "#1F5E8A", borderColor: `${accent}4d` }}
            >
              {overallPct}% complete
            </Badge>
          </div>

          {/* Progress bar */}
          <div className="relative mt-5 h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 transition-all duration-700 rounded-full"
              style={{
                width: `${overallPct}%`,
                background: `linear-gradient(90deg, ${accent}, #1F5E8A)`,
              }}
            />
          </div>
        </div>

        {/* Stages */}
        <div className="space-y-4">
          {stages.map((stage, idx) => {
            const status = statuses[idx];
            const Icon = stage.icon;
            const visible = status !== "locked";

            const tone =
              status === "completed"
                ? { chip: "bg-emerald-500 text-white", badge: "bg-emerald-50 text-emerald-700 border-emerald-200" }
                : status === "running"
                ? { chip: "text-white", badge: "bg-primary/10 text-primary border-primary/30" }
                : { chip: "bg-muted text-muted-foreground", badge: "bg-muted text-muted-foreground border-border" };

            return (
              <div
                key={stage.id}
                className={`rounded-xl border bg-card shadow-sm transition-all ${
                  visible ? "opacity-100" : "opacity-50"
                }`}
              >
                <div className="p-5 flex items-start gap-4">
                  <div
                    className={`relative w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${tone.chip}`}
                    style={
                      status === "running"
                        ? { background: `linear-gradient(135deg, ${accent}, #1F5E8A)` }
                        : undefined
                    }
                  >
                    {status === "locked" ? (
                      <Lock className="w-5 h-5" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-card border border-border text-[10px] font-bold flex items-center justify-center text-foreground">
                      {stage.id}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-foreground">
                        Stage {stage.id}: {stage.title}
                      </h3>
                      <Badge variant="outline" className={`text-[10px] ${tone.badge}`}>
                        {status === "completed" && (
                          <>
                            <CheckCircle2 className="w-3 h-3 mr-1" /> Completed
                          </>
                        )}
                        {status === "running" && (
                          <>
                            <Loader2 className="w-3 h-3 mr-1 animate-spin" /> In progress
                          </>
                        )}
                        {status === "locked" && (
                          <>
                            <Lock className="w-3 h-3 mr-1" /> Locked
                          </>
                        )}
                        {status === "pending" && "Pending"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-3xl">
                      {stage.description}
                    </p>

                    {stage.hasDocs && status !== "locked" && (
                      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
                        {SAMPLE_DOCS.map((d) => (
                          <button
                            key={d.name}
                            onClick={() => {
                              setPreviewDoc(d.name);
                              setPreviewOpen(true);
                            }}
                            className="flex items-center gap-2 p-2 rounded-lg border border-border bg-muted/40 hover:bg-accent/40 hover:border-primary/40 transition-all text-left"
                          >
                            <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                              <FileText className="w-4 h-4 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-foreground truncate">
                                {d.name}
                              </p>
                              <p className="text-[10px] text-muted-foreground">{d.size}</p>
                            </div>
                            <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Document preview dialog */}
        <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                {previewDoc}
              </DialogTitle>
            </DialogHeader>
            <div className="aspect-[4/5] rounded-lg border border-border bg-muted/40 flex flex-col items-center justify-center p-8">
              <div className="w-20 h-24 rounded-lg bg-card border border-border shadow-sm flex items-center justify-center mb-4">
                <FileText className="w-10 h-10 text-primary" />
              </div>
              <p className="text-sm font-semibold text-foreground">{previewDoc}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Document preview — original file securely stored.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-2 w-full max-w-md">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-16 rounded bg-card border border-border" />
                ))}
              </div>
            </div>
            <div className="flex justify-end">
              <Button variant="outline" size="sm" onClick={() => setPreviewOpen(false)}>
                <X className="w-3.5 h-3.5 mr-1" /> Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

const NegotiatingBankProcess = () => (
  <PipelinePage
    title="Negotiating Bank Process"
    subtitle="Negotiation Workflow · 4 Stages"
    stages={STAGES}
  />
);

export default NegotiatingBankProcess;
export { PipelinePage };
