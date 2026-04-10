import { CheckCircle2, Circle, Loader2, XCircle, AlertTriangle, Info, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { ValidationStep } from "./WorkflowTypes";

const stepIcon = (status: string) => {
  switch (status) {
    case "completed": return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
    case "running": return <Loader2 className="w-4 h-4 text-primary animate-spin" />;
    case "pending": return <Circle className="w-4 h-4 text-muted-foreground/30" />;
    case "failed": return <XCircle className="w-4 h-4 text-destructive" />;
    case "hold": return <AlertTriangle className="w-4 h-4 text-amber-500" />;
  }
};

interface Props {
  title: string;
  steps: ValidationStep[];
}

export const ExecutionLog = ({ title, steps }: Props) => {
  const completedSteps = steps.filter((s) => s.status === "completed").length;
  const progress = (completedSteps / steps.length) * 100;

  return (
    <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        </div>
        <span className="text-xs text-muted-foreground">{completedSteps}/{steps.length} steps completed</span>
      </div>

      <div className="space-y-1">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
              step.status === "running" ? "bg-primary/5"
              : step.status === "completed" ? "bg-muted/20"
              : step.status === "failed" ? "bg-destructive/5"
              : step.status === "hold" ? "bg-amber-50"
              : ""
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
              <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20 animate-pulse">
                Processing
              </Badge>
            )}
            {step.status === "failed" && (
              <Badge variant="outline" className="text-[10px] bg-destructive/10 text-destructive border-destructive/20">
                Failed
              </Badge>
            )}
            {step.status === "hold" && (
              <Badge variant="outline" className="text-[10px] bg-amber-100 text-amber-700 border-amber-200">
                On Hold
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
  );
};
