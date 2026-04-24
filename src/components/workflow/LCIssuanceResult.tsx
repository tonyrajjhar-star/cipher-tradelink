import { CheckCircle2, Download, Eye, FileBadge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const issuedDocument = {
  name: "Letter_of_Credit_TXN-2026-0841.pdf",
  type: "LC Instrument · UCP 600 Compliant",
  size: "248 KB",
  date: "Apr 10, 2026",
};

export const LCIssuanceResult = () => (
  <div className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-card shadow-elegant">
    {/* Gradient wash */}
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-card to-card" />
    <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full gradient-success opacity-10 blur-3xl" />

    <div className="relative p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="icon-3d w-12 h-12 rounded-2xl gradient-success">
          <CheckCircle2 className="w-6 h-6 text-white drop-shadow" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">LC Decision Finalized</h3>
          <p className="text-sm text-muted-foreground">
            Transaction TXN-2026-0841 has been successfully issued and locked for audit.
          </p>
        </div>
        <Badge className="ml-auto bg-emerald-100 text-emerald-700 border-emerald-200" variant="outline">
          Completed
        </Badge>
      </div>

      <div className="border-t border-emerald-200/60 pt-5">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
          Issued Document
        </h4>
        <div className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:shadow-md transition-all">
          <div className="icon-3d w-12 h-12 rounded-xl gradient-brand">
            <FileBadge className="w-5 h-5 text-white drop-shadow" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{issuedDocument.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {issuedDocument.type} · {issuedDocument.size} · {issuedDocument.date}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="text-xs gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              Preview
            </Button>
            <Button size="sm" className="text-xs gap-1.5 gradient-brand text-white border-0 hover:opacity-90">
              <Download className="w-3.5 h-3.5" />
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
