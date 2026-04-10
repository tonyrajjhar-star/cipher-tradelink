import { CheckCircle2, Circle, Loader2, XCircle, AlertTriangle, ChevronRight, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Scale } from "lucide-react";
import type { Stage, StageStatus } from "./WorkflowTypes";

const stageStatusIcon = (status: StageStatus) => {
  switch (status) {
    case "completed": return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
    case "active": return <Loader2 className="w-5 h-5 text-primary animate-spin" />;
    case "pending": return <Circle className="w-5 h-5 text-muted-foreground/40" />;
    case "failed": return <XCircle className="w-5 h-5 text-destructive" />;
    case "hold": return <AlertTriangle className="w-5 h-5 text-amber-500" />;
  }
};

export const ProcessRail = ({ stages }: { stages: Stage[] }) => (
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
              : stage.status === "failed"
              ? "border-destructive/30 bg-destructive/5"
              : stage.status === "hold"
              ? "border-amber-200 bg-amber-50/50"
              : "border-border bg-muted/20"
          }`}>
            <div className="flex items-center gap-3">
              {stageStatusIcon(stage.status)}
              <div className="min-w-0">
                <p className={`text-xs font-medium ${
                  stage.status === "active" ? "text-primary"
                  : stage.status === "completed" ? "text-emerald-700"
                  : stage.status === "failed" ? "text-destructive"
                  : stage.status === "hold" ? "text-amber-700"
                  : "text-muted-foreground"
                }`}>
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
);
