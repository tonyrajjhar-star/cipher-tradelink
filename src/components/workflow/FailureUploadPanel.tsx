import { AlertTriangle, XCircle, Upload, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Props {
  type: "failed" | "hold";
  reasons: string[];
  onRetry: () => void;
}

export const FailureUploadPanel = ({ type, reasons, onRetry }: Props) => {
  const isFailed = type === "failed";

  return (
    <div className={`rounded-xl border p-6 space-y-5 ${
      isFailed ? "border-destructive/30 bg-destructive/5" : "border-amber-200 bg-amber-50/30"
    }`}>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          isFailed ? "bg-destructive/10" : "bg-amber-100"
        }`}>
          {isFailed
            ? <XCircle className="w-6 h-6 text-destructive" />
            : <AlertTriangle className="w-6 h-6 text-amber-600" />
          }
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {isFailed ? "Validation Failed" : "Validation On Hold"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {isFailed
              ? "Critical issues detected. Correct and re-upload required documents."
              : "Pending clarification. Upload supporting documents to proceed."
            }
          </p>
        </div>
        <Badge className={`ml-auto ${
          isFailed ? "bg-destructive/10 text-destructive border-destructive/20" : "bg-amber-100 text-amber-700 border-amber-200"
        }`} variant="outline">
          {isFailed ? "Failed" : "On Hold"}
        </Badge>
      </div>

      <div className="space-y-2">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Blocking Issues</h4>
        {reasons.map((reason, i) => (
          <div key={i} className={`flex items-start gap-2 p-3 rounded-lg text-sm ${
            isFailed ? "bg-destructive/5 text-foreground" : "bg-amber-50 text-foreground"
          }`}>
            {isFailed
              ? <XCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
              : <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            }
            {reason}
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-5">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Upload Corrected Documents</h4>
        <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center hover:border-primary/40 transition-colors cursor-pointer">
          <Upload className="w-8 h-8 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Drag & drop files here or click to browse</p>
          <p className="text-xs text-muted-foreground/60 mt-1">PDF, DOCX, XLSX — Max 25 MB per file</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={onRetry} className="text-xs gap-1.5">
          <RefreshCw className="w-4 h-4" />
          Re-run Validation
        </Button>
      </div>
    </div>
  );
};
