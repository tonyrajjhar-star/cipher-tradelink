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
        ring: "ring-emerald-300/60",
        chip: "bg-emerald-50 text-emerald-700 border-emerald-200",
        glow: "shadow-[0_10px_30px_-12px_rgba(16,185,129,0.55)]",
        plinth: "from-emerald-400 via-emerald-500 to-emerald-600",
        bar: "bg-gradient-to-r from-emerald-400 to-emerald-600",
        connector: "bg-gradient-to-r from-emerald-500 to-emerald-400",
        label: "Completed",
        text: "text-emerald-700",
      };
    case "active":
      return {
        ring: "ring-primary/50",
        chip: "bg-primary/10 text-primary border-primary/30",
        glow: "shadow-[0_14px_36px_-10px_hsl(var(--secondary)/0.55)]",
        plinth: "from-[hsl(var(--secondary))] via-[hsl(var(--secondary))] to-[hsl(var(--secondary)/0.7)]",
        bar: "bg-gradient-to-r from-[hsl(var(--secondary))] to-[hsl(var(--secondary)/0.6)]",
        connector: "bg-gradient-to-r from-[hsl(var(--secondary))] to-muted",
        label: "In Progress",
        text: "text-primary",
      };
    case "failed":
      return {
        ring: "ring-destructive/50",
        chip: "bg-destructive/10 text-destructive border-destructive/30",
        glow: "shadow-[0_10px_30px_-12px_rgba(239,68,68,0.55)]",
        plinth: "from-rose-400 via-rose-500 to-rose-600",
        bar: "bg-gradient-to-r from-rose-400 to-rose-600",
        connector: "bg-muted",
        label: "Failed",
        text: "text-destructive",
      };
    case "hold":
      return {
        ring: "ring-amber-300/60",
        chip: "bg-amber-50 text-amber-700 border-amber-200",
        glow: "shadow-[0_10px_30px_-12px_rgba(245,158,11,0.55)]",
        plinth: "from-amber-300 via-amber-400 to-amber-500",
        bar: "bg-gradient-to-r from-amber-400 to-amber-500",
        connector: "bg-muted",
        label: "On Hold",
        text: "text-amber-700",
      };
    default:
      return {
        ring: "ring-border",
        chip: "bg-muted text-muted-foreground border-border",
        glow: "",
        plinth: "from-muted-foreground/30 via-muted-foreground/20 to-muted-foreground/10",
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

const Stage3DIcon = ({
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
    <div className="relative w-16 h-16 shrink-0">
      {/* base plinth shadow */}
      <div
        className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-14 h-3 rounded-full blur-md opacity-70 bg-gradient-to-r ${t.plinth}`}
      />
      {/* back layer */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${t.plinth} translate-y-1 opacity-90`}
      />
      {/* front face */}
      <div
        className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${t.plinth} ring-1 ${t.ring} ${t.glow} flex items-center justify-center overflow-hidden`}
      >
        {/* glossy highlight */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/35 to-transparent" />
        <Icon
          className={`relative w-7 h-7 ${
            isPending ? "text-muted-foreground" : "text-white drop-shadow"
          }`}
          strokeWidth={2.2}
        />
        {/* corner stage number */}
        <span
          className={`absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center bg-card border ${
            isPending ? "text-muted-foreground border-border" : `${t.text} border-current`
          }`}
        >
          {number}
        </span>
      </div>
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
