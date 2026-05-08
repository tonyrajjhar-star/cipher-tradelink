import {
  CheckCircle2,
  Loader2,
  XCircle,
  AlertTriangle,
  Clock,
  FileSignature,
  ShieldCheck,
  BadgeCheck,
  Sparkles,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { Stage, StageStatus } from "./WorkflowTypes";

const stageIcons = [FileSignature, ShieldCheck, BadgeCheck, Sparkles];

const tone = (status: StageStatus) => {
  switch (status) {
    case "completed":
      return {
        chip: "bg-emerald-50 text-emerald-700 border-emerald-200",
        flat: "bg-emerald-500 text-white",
        bar: "bg-emerald-500",
        connector: "bg-emerald-500",
        label: "Completed",
        text: "text-emerald-700",
      };
    case "active":
      return {
        chip: "bg-primary/10 text-primary border-primary/30",
        flat: "bg-[hsl(var(--secondary))] text-white",
        bar: "bg-[hsl(var(--secondary))]",
        connector: "bg-[hsl(var(--secondary))]",
        label: "In Progress",
        text: "text-primary",
      };
    case "failed":
      return {
        chip: "bg-destructive/10 text-destructive border-destructive/30",
        flat: "bg-rose-500 text-white",
        bar: "bg-rose-500",
        connector: "bg-muted",
        label: "Failed",
        text: "text-destructive",
      };
    case "hold":
      return {
        chip: "bg-amber-50 text-amber-700 border-amber-200",
        flat: "bg-amber-500 text-white",
        bar: "bg-amber-500",
        connector: "bg-muted",
        label: "On Hold",
        text: "text-amber-700",
      };
    default:
      return {
        chip: "bg-muted text-muted-foreground border-border",
        flat: "bg-muted text-muted-foreground",
        bar: "bg-muted",
        connector: "bg-muted",
        label: "Pending",
        text: "text-muted-foreground",
      };
  }
};

const StatusBadge = ({ status }: { status: StageStatus }) => {
  const t = tone(status);
  const Icon =
    status === "completed"
      ? CheckCircle2
      : status === "active"
      ? Loader2
      : status === "failed"
      ? XCircle
      : status === "hold"
      ? AlertTriangle
      : Clock;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${t.chip}`}
    >
      <Icon className={`w-3 h-3 ${status === "active" ? "animate-spin" : ""}`} />
      {t.label}
    </span>
  );
};

const StageFlatIcon = ({
  Icon,
  status,
  number,
}: {
  Icon: typeof FileSignature;
  status: StageStatus;
  number: number;
}) => {
  const t = tone(status);
  const isPending = status === "pending";
  return (
    <div className="relative w-12 h-12 shrink-0">
      <div
        className={`w-12 h-12 rounded-lg flex items-center justify-center ${
          isPending ? "bg-muted text-muted-foreground" : t.flat
        }`}
      >
        <Icon className="w-6 h-6" strokeWidth={2} />
      </div>
      <span
        className={`absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center bg-card border ${
          isPending ? "text-muted-foreground border-border" : `${t.text} border-current`
        }`}
      >
        {number}
      </span>
    </div>
  );
};

export const ProcessRail = ({ stages }: { stages: Stage[] }) => {
  const completedCount = stages.filter((s) => s.status === "completed").length;
  const overall = Math.round((completedCount / stages.length) * 100);

  return (
    <div className="relative rounded-2xl border border-border bg-card overflow-hidden">
      {/* header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-gradient-to-r from-card to-muted/30">
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-[hsl(var(--secondary))] to-[hsl(var(--primary))] flex items-center justify-center shadow-md">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground leading-tight">Process Pipeline</h3>
            <p className="text-[10px] text-muted-foreground">
              {completedCount} of {stages.length} stages complete
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Progress value={overall} className="h-2 w-32" />
          <span className="text-xs font-mono font-semibold text-foreground tabular-nums">
            {overall}%
          </span>
        </div>
      </div>

      {/* stages */}
      <div className="relative px-5 py-6">
        <div className="flex items-stretch gap-0">
          {stages.map((stage, i) => {
            const Icon = stageIcons[i % stageIcons.length];
            const t = tone(stage.status);
            return (
              <div key={stage.id} className="flex items-stretch flex-1 min-w-0">
                <div
                  className={`relative flex-1 rounded-xl p-4 border transition-all ${
                    stage.status === "active"
                      ? "border-primary/30 bg-gradient-to-br from-primary/5 to-card shadow-sm"
                      : stage.status === "completed"
                      ? "border-emerald-200/70 bg-gradient-to-br from-emerald-50/60 to-card"
                      : stage.status === "failed"
                      ? "border-destructive/30 bg-destructive/5"
                      : stage.status === "hold"
                      ? "border-amber-200 bg-amber-50/50"
                      : "border-dashed border-border bg-muted/10"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Stage3DIcon Icon={Icon} status={stage.status} number={stage.id} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                          Stage {stage.id}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-foreground leading-snug line-clamp-2">
                        {stage.title}
                      </p>
                      <div className="mt-2">
                        <StatusBadge status={stage.status} />
                      </div>
                    </div>
                  </div>

                  {stage.confidence !== undefined && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-medium">
                          Confidence
                        </span>
                        <span className="text-[10px] font-mono font-semibold text-foreground">
                          {stage.confidence}%
                        </span>
                      </div>
                      <div className="relative h-1.5 w-full rounded-full bg-muted overflow-hidden">
                        <div
                          className={`absolute inset-y-0 left-0 rounded-full ${t.bar} transition-all duration-700`}
                          style={{ width: `${stage.confidence}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {stage.lastAction && (
                    <p className="mt-2 text-[10px] text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {stage.lastAction}
                    </p>
                  )}
                </div>

                {i < stages.length - 1 && (
                  <div className="flex items-center px-1.5">
                    <div className="relative w-8 h-1 rounded-full bg-muted overflow-hidden">
                      <div
                        className={`absolute inset-y-0 left-0 ${
                          stage.status === "completed" ? "w-full" : "w-0"
                        } ${t.connector} transition-all duration-700`}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
