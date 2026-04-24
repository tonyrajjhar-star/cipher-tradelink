import { AlertTriangle, XCircle, Upload, RefreshCw, FileText, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface Props {
  type: "failed" | "hold";
  reasons: string[];
  onRetry: () => void;
}

export const FailureUploadPanel = ({ type, reasons, onRetry }: Props) => {
  const isFailed = type === "failed";
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const headerGradient = isFailed ? "gradient-danger" : "gradient-warning";

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border shadow-elegant ${
        isFailed ? "border-destructive/30" : "border-amber-200"
      }`}
    >
      <div
        className={`absolute inset-0 ${
          isFailed
            ? "bg-gradient-to-br from-destructive/5 via-card to-card"
            : "bg-gradient-to-br from-amber-50/70 via-card to-card"
        }`}
      />
      <div
        className={`absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-10 blur-3xl ${headerGradient}`}
      />

      <div className="relative p-6 space-y-5">
        <div className="flex items-center gap-3">
          <div className={`icon-3d w-12 h-12 rounded-2xl ${headerGradient}`}>
            {isFailed ? (
              <XCircle className="w-6 h-6 text-white drop-shadow" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-white drop-shadow" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {isFailed ? "Validation Failed" : "Validation On Hold"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isFailed
                ? "Critical issues detected. Correct and re-upload the required document."
                : "Pending clarification. Upload the supporting document to proceed."}
            </p>
          </div>
          <Badge
            className={`ml-auto ${
              isFailed
                ? "bg-destructive/10 text-destructive border-destructive/20"
                : "bg-amber-100 text-amber-700 border-amber-200"
            }`}
            variant="outline"
          >
            {isFailed ? "Failed" : "On Hold"}
          </Badge>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Blocking Issues
          </h4>
          {reasons.map((reason, i) => (
            <div
              key={i}
              className={`flex items-start gap-2.5 p-3 rounded-xl text-sm border ${
                isFailed
                  ? "bg-destructive/5 border-destructive/10 text-foreground"
                  : "bg-amber-50/60 border-amber-200/60 text-foreground"
              }`}
            >
              {isFailed ? (
                <XCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
              )}
              {reason}
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-5">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Upload Corrected Document
          </h4>

          {!uploadedFile ? (
            <div
              className="relative border-2 border-dashed border-muted-foreground/20 rounded-2xl p-8 text-center hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer group"
              onClick={() => setUploadedFile("Corrected_Trade_Document.pdf")}
            >
              <div className="icon-3d w-14 h-14 rounded-2xl gradient-brand mx-auto mb-3">
                <Upload className="w-7 h-7 text-white drop-shadow" />
              </div>
              <p className="text-sm font-medium text-foreground">
                Drag & drop your file here or click to browse
              </p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                PDF, DOCX, XLSX — Max 25 MB
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-4 p-4 rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50/60 to-emerald-50/10">
              <div className="icon-3d w-11 h-11 rounded-xl gradient-success">
                <FileText className="w-5 h-5 text-white drop-shadow" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{uploadedFile}</p>
                <Badge variant="outline" className="mt-1 text-[10px] bg-white text-emerald-700 border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Ready to validate
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-destructive"
                onClick={() => setUploadedFile(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={onRetry}
            disabled={!uploadedFile}
            className="text-xs gap-1.5 gradient-brand text-white border-0 hover:opacity-90"
          >
            <RefreshCw className="w-4 h-4" />
            Re-run Validation
          </Button>
        </div>
      </div>
    </div>
  );
};
