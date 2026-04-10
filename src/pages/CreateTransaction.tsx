import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, Info, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";

const CreateTransaction = () => {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleUpload = () => {
    setUploadedFiles(["Application_Form.pdf", "Sales_Contract.pdf"]);
  };

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-6 animate-slide-up">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Create Transaction</h2>
          <p className="text-sm text-muted-foreground mt-1">Initiate a new trade finance transaction. All fields marked with * are mandatory.</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium">Applicant Name *</Label>
              <Input placeholder="Enter applicant name" className="h-10" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium">Beneficiary Name *</Label>
              <Input placeholder="Enter beneficiary name" className="h-10" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium">LC Amount *</Label>
              <Input placeholder="0.00" type="number" className="h-10" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium">Currency *</Label>
              <Select>
                <SelectTrigger className="h-10"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD</SelectItem>
                  <SelectItem value="eur">EUR</SelectItem>
                  <SelectItem value="gbp">GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium">Transaction Type *</Label>
              <Select>
                <SelectTrigger className="h-10"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="import">Import LC</SelectItem>
                  <SelectItem value="export">Export LC</SelectItem>
                  <SelectItem value="standby">Standby LC</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-medium">Description of Goods</Label>
            <Textarea placeholder="Describe goods or services covered by this LC…" rows={3} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium">Port of Loading</Label>
              <Input placeholder="e.g., Shanghai, China" className="h-10" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium">Port of Discharge</Label>
              <Input placeholder="e.g., Rotterdam, Netherlands" className="h-10" />
            </div>
          </div>
        </div>

        {/* Document Upload */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Supporting Documents</h3>
            <Tooltip>
              <TooltipTrigger><Info className="w-3.5 h-3.5 text-muted-foreground" /></TooltipTrigger>
              <TooltipContent className="text-xs max-w-xs">Upload application form, sales contract, pro-forma invoice, and any additional supporting documents.</TooltipContent>
            </Tooltip>
          </div>

          {uploadedFiles.length === 0 ? (
            <div
              className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-colors"
              onClick={handleUpload}
            >
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm font-medium text-foreground">Drop files here or click to upload</p>
              <p className="text-xs text-muted-foreground mt-1">PDF, DOC, XLSX — Max 25MB per file</p>
            </div>
          ) : (
            <div className="space-y-2">
              {uploadedFiles.map((f) => (
                <div key={f} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground flex-1">{f}</span>
                  <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> Uploaded
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline">Save as Draft</Button>
          <Button className="gap-1.5" onClick={() => navigate("/workflow")}>
            Run Pre-Issuance Validation <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default CreateTransaction;
