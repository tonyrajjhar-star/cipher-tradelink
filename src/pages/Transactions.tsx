import { AppLayout } from "@/components/AppLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Filter, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const transactions = [
  { id: "TXN-2026-0841", counterparty: "Al Rajhi Trading Co.", amount: "$2,450,000", stage: "Sanctions Screening", risk: "High", status: "On Hold", sla: "2h 15m" },
  { id: "TXN-2026-0839", counterparty: "Siemens AG", amount: "€1,200,000", stage: "LC Issuance", risk: "Low", status: "In Progress", sla: "4h 30m" },
  { id: "TXN-2026-0837", counterparty: "Tata Steel Ltd.", amount: "$890,000", stage: "Document Validation", risk: "Medium", status: "In Progress", sla: "1h 45m" },
  { id: "TXN-2026-0835", counterparty: "Glencore Intl.", amount: "$5,100,000", stage: "Sanctions Screening", risk: "Critical", status: "Failed", sla: "Expired" },
  { id: "TXN-2026-0833", counterparty: "Samsung C&T", amount: "$3,750,000", stage: "Application Validation", risk: "Low", status: "New", sla: "6h 00m" },
  { id: "TXN-2026-0831", counterparty: "Maersk Line", amount: "$1,680,000", stage: "LC Issuance", risk: "Low", status: "Completed", sla: "—" },
  { id: "TXN-2026-0829", counterparty: "Vale S.A.", amount: "$4,200,000", stage: "Sanctions Screening", risk: "Medium", status: "In Progress", sla: "3h 10m" },
];

const statusColor: Record<string, string> = {
  New: "bg-primary/10 text-primary",
  "In Progress": "bg-blue-50 text-blue-700",
  "On Hold": "bg-amber-50 text-amber-700",
  Failed: "bg-red-50 text-red-700",
  Completed: "bg-emerald-50 text-emerald-700",
};

const Transactions = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="space-y-6 animate-slide-up">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Transactions</h2>
            <p className="text-sm text-muted-foreground mt-1">All trade finance transactions across lifecycle stages</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search transactions…" className="pl-9 h-9 w-64 text-sm" />
            </div>
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <Filter className="w-3.5 h-3.5" /> Filters
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {["Transaction ID", "Counterparty", "Amount", "Stage", "Risk", "Status", "SLA", ""].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors cursor-pointer group" onClick={() => navigate("/workflow")}>
                  <td className="px-5 py-3.5 font-mono text-xs font-medium text-primary">{t.id}</td>
                  <td className="px-5 py-3.5 text-foreground">{t.counterparty}</td>
                  <td className="px-5 py-3.5 font-medium text-foreground">{t.amount}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{t.stage}</td>
                  <td className="px-5 py-3.5">
                    <Badge variant="outline" className="text-[10px]">{t.risk}</Badge>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium ${statusColor[t.status] || ""}`}>{t.status}</span>
                  </td>
                  <td className="px-5 py-3.5 text-xs font-mono text-muted-foreground">{t.sla}</td>
                  <td className="px-5 py-3.5">
                    <Button size="sm" variant="ghost" className="text-xs opacity-0 group-hover:opacity-100 gap-1">
                      Open <ArrowRight className="w-3 h-3" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
};

export default Transactions;
