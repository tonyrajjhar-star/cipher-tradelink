import { AppLayout } from "@/components/AppLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const queueItems = [
  { id: "TXN-2026-0841", task: "Review sanctions partial match", priority: "Critical", age: "45m", stage: "Sanctions Screening" },
  { id: "TXN-2026-0839", task: "Approve LC issuance", priority: "High", age: "1h 20m", stage: "LC Issuance" },
  { id: "TXN-2026-0837", task: "Request missing commercial invoice", priority: "Medium", age: "2h 10m", stage: "Document Validation" },
  { id: "TXN-2026-0833", task: "Begin application intake", priority: "Low", age: "30m", stage: "Application Validation" },
];

const priorityColor: Record<string, string> = {
  Critical: "bg-red-50 text-red-700 border-red-200",
  High: "bg-orange-50 text-orange-700 border-orange-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  Low: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const WorkQueue = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="space-y-6 animate-slide-up">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Work Queue</h2>
          <p className="text-sm text-muted-foreground mt-1">Prioritized tasks requiring your attention</p>
        </div>

        <div className="space-y-3">
          {queueItems.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-border bg-card p-4 flex items-center gap-4 hover:shadow-sm transition-shadow cursor-pointer"
              onClick={() => navigate("/workflow")}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-medium text-primary">{item.id}</span>
                  <Badge variant="outline" className={`text-[10px] ${priorityColor[item.priority]}`}>{item.priority}</Badge>
                </div>
                <p className="text-sm font-medium text-foreground">{item.task}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.stage}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {item.age}
              </div>
              <Button size="sm" variant="outline" className="text-xs gap-1 shrink-0">
                Action <ArrowRight className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default WorkQueue;
