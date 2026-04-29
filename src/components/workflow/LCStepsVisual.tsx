import {
  CheckCircle2,
  Loader2,
  XCircle,
  AlertTriangle,
  FileCode2,
  ListChecks,
  ScanLine,
  ShieldCheck,
  FileBarChart,
  Stamp,
  Info,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { ValidationStep } from "./WorkflowTypes";

const STEP_ICONS = [FileCode2, ListChecks, ScanLine, ShieldCheck, FileBarChart, Stamp];

const statusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return (
        <Badge className="text-[10px] bg-emerald-100 text-emerald-700 border-emerald-200" variant="outline">
          <CheckCircle2 className="w-3 h-3 mr-1" /> Done
        </Badge>
      );
    case "running":
      return (
        <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20 animate-pulse">
          <Loader2 className="w-3 h-3 mr-1 animate-spin" /> Processing
        </Badge>
      );
    case "failed":
      return (
        <Badge variant="outline" className="text-[10px] bg-destructive/10 text-destructive border-destructive/20">
          <XCircle className="w-3 h-3 mr-1" /> Failed
        </Badge>
      );
    case "hold":
      return (
        <Badge variant="outline" className="text-[10px] bg-amber-100 text-amber-700 border-amber-200">
          <AlertTriangle className="w-3 h-3 mr-1" /> On Hold
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="text-[10px] bg-muted/40 text-muted-foreground border-border">
          Pending
        </Badge>
      );
  }
};

interface Props {
  title: string;
  steps: ValidationStep[];
}

export const LCStepsVisual = ({ title, steps }: Props) => {
  const completed = steps.filter((s) => s.status === "completed").length;
  const progress = (completed / steps.length) * 100;

  return (
    <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="relative flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-elegant">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">{title}</h3>
            <p className="text-[11px] text-muted-foreground uppercase tracking-wider">
              {completed} of {steps.length} steps completed
            </p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3 min-w-[180px]">
          <Progress value={progress} className="h-2 flex-1" />
          <span className="text-xs font-mono font-semibold text-foreground">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      <ol className="relative space-y-3">
        {/* connecting vertical line */}
        <span
          className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary/30 via-border to-border"
          aria-hidden
        />

        {steps.map((step, i) => {
          const Icon = STEP_ICONS[i] ?? FileCode2;
          const isActive = step.status === "running";
          const isDone = step.status === "completed";
          const isFailed = step.status === "failed";
          const isHold = step.status === "hold";

          return (
            <li
              key={i}
              className={`relative flex items-start gap-4 p-3 pr-4 rounded-xl border transition-all ${
                isActive
                  ? "border-primary/40 bg-primary/5 shadow-sm"
                  : isDone
                  ? "border-emerald-200 bg-emerald-50/40"
                  : isFailed
                  ? "border-destructive/30 bg-destructive/5"
                  : isHold
                  ? "border-amber-200 bg-amber-50/50"
                  : "border-border/60 bg-muted/10"
              }`}
            >
              {/* node icon */}
              <div
                className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-all ${
                  isActive
                    ? "bg-gradient-to-br from-primary to-secondary text-white"
                    : isDone
                    ? "bg-emerald-500 text-white"
                    : isFailed
                    ? "bg-destructive text-destructive-foreground"
                    : isHold
                    ? "bg-amber-500 text-white"
                    : "bg-card border border-border text-muted-foreground"
                }`}
              >
                {isActive ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : isDone ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
                <span className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-card border border-border text-[9px] font-bold text-foreground flex items-center justify-center">
                  {i + 1}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p
                    className={`text-sm font-semibold ${
                      step.status === "pending" ? "text-muted-foreground" : "text-foreground"
                    }`}
                  >
                    {step.label}
                  </p>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-3 h-3 text-muted-foreground/60 hover:text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs text-xs">
                      {step.explanation}
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                  {step.explanation}
                </p>
                {step.duration && (
                  <p className="text-[10px] text-muted-foreground mt-1 font-mono">
                    ⏱ {step.duration}
                  </p>
                )}
              </div>

              <div className="shrink-0">{statusBadge(step.status)}</div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
