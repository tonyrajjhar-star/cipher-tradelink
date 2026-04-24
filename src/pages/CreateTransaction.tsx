import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Upload, FileText, ArrowRight, CheckCircle2, X, Sparkles } from "lucide-react";
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
      <div className="max-w-3xl mx-auto space-y-6 animate-slide-up">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-elegant">
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full gradient-brand opacity-10 blur-3xl" />
          <div className="relative flex items-center gap-4">
            <div className="icon-3d w-12 h-12 rounded-2xl gradient-brand">
              <Sparkles className="w-6 h-6 text-white drop-shadow" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Create Transaction</h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                Upload your trade finance application package to initiate a new transaction.
              </p>
            </div>
          </div>
        </div>

        {/* Upload */}
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <FileText className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Application Document</h3>
            <Badge variant="outline" className="text-[10px] ml-auto bg-gradient-to-r from-primary/10 to-secondary/10 text-secondary border-primary/20">
              Required
            </Badge>
          </div>

          {!uploadedFile ? (
            <div
              className="relative border-2 border-dashed border-border rounded-2xl p-12 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all group"
              onClick={handleUpload}
            >
              <div className="absolute inset-0 rounded-2xl gradient-brand-soft opacity-0 group-hover:opacity-60 transition-opacity" />
              <div className="relative">
                <div className="icon-3d w-16 h-16 rounded-2xl gradient-brand mx-auto mb-4">
                  <Upload className="w-8 h-8 text-white drop-shadow" />
                </div>
                <p className="text-base font-semibold text-foreground">Drop your file here or click to upload</p>
                <p className="text-xs text-muted-foreground mt-2">
                  PDF, DOC, XLSX — Max 25 MB
                </p>
                <p className="text-[11px] text-muted-foreground/70 mt-3 max-w-sm mx-auto">
                  Upload a single consolidated document containing application form, sales contract, and supporting evidence.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4 p-5 rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50/60 to-emerald-50/20">
              <div className="icon-3d w-12 h-12 rounded-xl gradient-success">
                <FileText className="w-5 h-5 text-white drop-shadow" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{uploadedFile}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-[10px] bg-white text-emerald-700 border-emerald-200">
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
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline">Save as Draft</Button>
          <Button
            disabled={!uploadedFile}
            className="gap-1.5 gradient-brand text-white border-0 shadow-elegant hover:opacity-90"
            onClick={() => navigate("/workflow")}
          >
            Run Pre-Issuance Validation <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default CreateTransaction;
