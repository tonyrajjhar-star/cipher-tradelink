import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Upload, FileText, ArrowRight, CheckCircle2, X, ShieldCheck, Lock, Clock } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const CreateTransaction = () => {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleUpload = () => {
    setUploadedFile("Trade_Application_Package.pdf");
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6 animate-slide-up">
        {/* Header — Rosano-style banner */}
        <div className="relative overflow-hidden rounded-lg bg-card border border-border shadow-sm">
          <div className="absolute top-0 left-0 bottom-0 w-1 bg-secondary" />
          <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-accent/70 blur-3xl" />
          <div className="relative p-6 flex items-center gap-5">
            <div className="relative w-14 h-14 shrink-0">
              <div className="absolute inset-0 rounded-2xl bg-primary blur-lg opacity-30 translate-y-1" />
              <div className="relative w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-elegant">
                <Upload className="w-7 h-7 text-primary-foreground" strokeWidth={2} />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-[10px] uppercase tracking-[0.25em] text-secondary font-semibold mb-1">
                Step 1 — Application Intake
              </p>
              <h2 className="text-2xl font-bold text-foreground">Create Transaction</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Upload your consolidated trade finance application package to initiate a new transaction.
              </p>
            </div>
          </div>
        </div>

        {/* Upload */}
        <div className="rounded-lg bg-card border border-border shadow-sm overflow-hidden">
          {/* Section header */}
          <div className="px-6 py-4 border-b border-border bg-muted/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Application Document</h3>
            </div>
            <Badge className="text-[10px] bg-secondary text-secondary-foreground border-0 uppercase tracking-wider">
              Required
            </Badge>
          </div>

          <div className="p-6">
            {!uploadedFile ? (
              <div
                className="relative border-2 border-dashed border-border rounded-lg p-14 text-center cursor-pointer hover:border-secondary hover:bg-accent/30 transition-all group"
                onClick={handleUpload}
              >
                <div className="relative">
                  {/* Peach circle backdrop */}
                  <div className="relative w-28 h-28 mx-auto mb-5 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-accent" />
                    <div className="relative w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-elegant group-hover:bg-secondary transition-colors">
                      <Upload className="w-8 h-8 text-white" strokeWidth={2} />
                    </div>
                  </div>
                  <p className="text-base font-bold text-foreground">Drop your file here or click to upload</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    PDF, DOC, XLSX — Max 25 MB
                  </p>
                  <p className="text-[11px] text-muted-foreground/70 mt-4 max-w-md mx-auto leading-relaxed">
                    Upload a single consolidated document containing the application form, sales contract,
                    and supporting evidence.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4 p-5 rounded-lg border border-border bg-accent/30">
                <div className="relative w-12 h-12 shrink-0">
                  <div className="absolute inset-0 rounded-xl bg-primary blur-md opacity-20" />
                  <div className="relative w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-sm">
                    <FileText className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{uploadedFile}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-[10px] bg-card text-secondary border-secondary/30">
                      <CheckCircle2 className="w-3 h-3 mr-1" /> Uploaded
                    </Badge>
                    <span className="text-[11px] text-muted-foreground">2.4 MB · just now</span>
                  </div>
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

            {/* Trust micro-row */}
            <div className="grid grid-cols-3 gap-3 mt-5">
              {[
                { Icon: Lock, label: "End-to-end encrypted" },
                { Icon: ShieldCheck, label: "Audit-logged upload" },
                { Icon: Clock, label: "Average screen ~2.4 min" },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <Icon className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action footer */}
        <div className="flex items-center justify-between gap-3 p-4 rounded-lg bg-card border border-border">
          <p className="text-[11px] text-muted-foreground">
            By proceeding, you confirm that uploaded documents are accurate and complete.
          </p>
          <div className="flex gap-3">
            <Button variant="outline">Save as Draft</Button>
            <Button
              disabled={!uploadedFile}
              className="gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              onClick={() => navigate("/workflow")}
            >
              Run Pre-Issuance Validation
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/20">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CreateTransaction;
