import { CheckCircle2, Download, Eye, FileText, FileBadge, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { LCDocument } from "./WorkflowTypes";

const lcDocuments: LCDocument[] = [
  { name: "Letter_of_Credit_TXN-2026-0841.pdf", type: "LC Instrument", size: "248 KB", date: "Apr 10, 2026" },
  { name: "SWIFT_MT700_TXN-2026-0841.pdf", type: "SWIFT Message", size: "32 KB", date: "Apr 10, 2026" },
  { name: "Compliance_Clearance_Report.pdf", type: "Compliance Report", size: "156 KB", date: "Apr 10, 2026" },
  { name: "UCP600_Validation_Summary.pdf", type: "UCP 600 Report", size: "89 KB", date: "Apr 10, 2026" },
];

const docIcon = (type: string) => {
  if (type.includes("LC")) return <FileBadge className="w-5 h-5 text-primary" />;
  if (type.includes("SWIFT")) return <FileCheck className="w-5 h-5 text-secondary" />;
  return <FileText className="w-5 h-5 text-muted-foreground" />;
};

export const LCIssuanceResult = () => (
  <div className="rounded-xl border border-emerald-200 bg-emerald-50/30 p-6 space-y-6">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
        <CheckCircle2 className="w-6 h-6 text-emerald-600" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-foreground">LC Decision Finalized</h3>
        <p className="text-sm text-muted-foreground">Transaction TXN-2026-0841 has been successfully issued and locked for audit.</p>
      </div>
      <Badge className="ml-auto bg-emerald-100 text-emerald-700 border-emerald-200" variant="outline">
        Completed
      </Badge>
    </div>

    <div className="border-t border-emerald-200 pt-5">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Issued Documents</h4>
      <div className="space-y-3">
        {lcDocuments.map((doc) => (
          <div
            key={doc.name}
            className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:shadow-sm transition-all"
          >
            {docIcon(doc.type)}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
              <p className="text-xs text-muted-foreground">{doc.type} · {doc.size} · {doc.date}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="text-xs gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                Preview
              </Button>
              <Button variant="default" size="sm" className="text-xs gap-1.5">
                <Download className="w-3.5 h-3.5" />
                Download
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="flex items-center gap-3 pt-2">
      <Button variant="outline" className="text-xs gap-1.5">
        <Download className="w-4 h-4" />
        Download All Documents
      </Button>
    </div>
  </div>
);
