import { AppLayout } from "@/components/AppLayout";
import { useRole } from "@/contexts/RoleContext";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  FileWarning,
  Loader2,
  PauseCircle,
  ShieldAlert,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const priorities = [
  {
    message: "2 Transactions Blocked by Compliance",
    reason: "Sanctions watchlist partial match detected on beneficiary entity.",
    risk: "High",
    action: "Review matches and escalate or clear",
    icon: ShieldAlert,
    type: "destructive" as const,
  },
  {
    message: "1 LC Awaiting Final Issuance",
    reason: "All validations passed. Pending operator confirmation.",
    risk: "Medium",
    action: "Confirm and issue LC",
    icon: Clock,
    type: "warning" as const,
  },
  {
    message: "3 Documents Missing Client Clarification",
    reason: "Incomplete beneficiary declarations on commercial invoices.",
    risk: "Low",
    action: "Send clarification request to client",
    icon: FileWarning,
    type: "default" as const,
  },
];

const statusCards = [
  { label: "New", count: 12, icon: TrendingUp, color: "text-primary", bg: "bg-primary/5" },
  { label: "In Progress", count: 28, icon: Loader2, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "On Hold", count: 5, icon: PauseCircle, color: "text-amber-600", bg: "bg-amber-50", detail: "Avg. 2.3 days in state" },
  { label: "Failed", count: 3, icon: XCircle, color: "text-destructive", bg: "bg-red-50", detail: "Top cause: Sanctions match" },
];

const transactions = [
  { id: "TXN-2026-0841", counterparty: "Al Rajhi Trading Co.", amount: "$2,450,000", currency: "USD", stage: "Sanctions Screening", risk: "High", status: "On Hold", sla: "2h 15m", reason: "Pending OFAC clearance" },
  { id: "TXN-2026-0839", counterparty: "Siemens AG", amount: "€1,200,000", currency: "EUR", stage: "LC Issuance", risk: "Low", status: "In Progress", sla: "4h 30m" },
  { id: "TXN-2026-0837", counterparty: "Tata Steel Ltd.", amount: "$890,000", currency: "USD", stage: "Document Validation", risk: "Medium", status: "In Progress", sla: "1h 45m" },
  { id: "TXN-2026-0835", counterparty: "Glencore Intl.", amount: "$5,100,000", currency: "USD", stage: "Sanctions Screening", risk: "Critical", status: "Failed", sla: "Expired", reason: "SDN list match confirmed" },
  { id: "TXN-2026-0833", counterparty: "Samsung C&T", amount: "$3,750,000", currency: "USD", stage: "Application Validation", risk: "Low", status: "New", sla: "6h 00m" },
];

const riskBadge = (risk: string) => {
  const styles: Record<string, string> = {
    Low: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Medium: "bg-amber-50 text-amber-700 border-amber-200",
    High: "bg-orange-50 text-orange-700 border-orange-200",
    Critical: "bg-red-50 text-red-700 border-red-200",
  };
  return <Badge variant="outline" className={`text-[10px] font-medium ${styles[risk] || ""}`}>{risk}</Badge>;
};

const statusBadge = (status: string) => {
  const styles: Record<string, string> = {
    New: "bg-primary/10 text-primary",
    "In Progress": "bg-blue-50 text-blue-700",
    "On Hold": "bg-amber-50 text-amber-700",
    Failed: "bg-red-50 text-red-700",
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium ${styles[status] || ""}`}>{status}</span>;
};

const Dashboard = () => {
  const { roleName } = useRole();
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="space-y-6 animate-slide-up">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-foreground">Operational Command Center</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Role: <span className="font-medium text-foreground">{roleName}</span> · Real-time operational intelligence
          </p>
        </div>

        {/* Priority Intelligence */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-semibold text-foreground">Priority Intelligence</h3>
            <Badge variant="outline" className="ml-auto text-[10px]">System-generated</Badge>
          </div>
          <div className="space-y-3">
            {priorities.map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={i} className="flex items-start gap-4 rounded-lg border border-border/60 p-4 hover:bg-muted/30 transition-colors">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    p.type === "destructive" ? "bg-red-50 text-destructive" : p.type === "warning" ? "bg-amber-50 text-amber-600" : "bg-muted text-muted-foreground"
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{p.message}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{p.reason}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[10px] text-muted-foreground">Risk: <span className="font-medium">{p.risk}</span></span>
                      <span className="text-[10px] text-muted-foreground">Action: {p.action}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="shrink-0 text-xs gap-1">
                    Review <ArrowRight className="w-3 h-3" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statusCards.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="rounded-xl border border-border bg-card p-4 hover:shadow-sm transition-shadow cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${s.bg}`}>
                    <Icon className={`w-4 h-4 ${s.color}`} />
                  </div>
                  <span className="text-2xl font-bold text-foreground">{s.count}</span>
                </div>
                <p className="text-sm font-medium text-foreground">{s.label}</p>
                {s.detail && <p className="text-[10px] text-muted-foreground mt-1">{s.detail}</p>}
              </div>
            );
          })}
        </div>

        {/* Work Queue */}
        <div className="rounded-xl border border-border bg-card">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Transaction Work Queue</h3>
            <Button variant="outline" size="sm" className="text-xs" onClick={() => navigate("/transactions")}>
              View All
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Transaction ID</th>
                  <th className="text-left px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Counterparty</th>
                  <th className="text-left px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Amount</th>
                  <th className="text-left px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Stage</th>
                  <th className="text-left px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Risk</th>
                  <th className="text-left px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                  <th className="text-left px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">SLA</th>
                  <th className="text-left px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr
                    key={t.id}
                    className="border-b border-border/50 hover:bg-muted/20 transition-colors cursor-pointer group"
                    onClick={() => navigate("/workflow")}
                  >
                    <td className="px-5 py-3 font-mono text-xs font-medium text-primary">{t.id}</td>
                    <td className="px-5 py-3 text-foreground">{t.counterparty}</td>
                    <td className="px-5 py-3 font-medium text-foreground">{t.amount}</td>
                    <td className="px-5 py-3 text-muted-foreground">{t.stage}</td>
                    <td className="px-5 py-3">{riskBadge(t.risk)}</td>
                    <td className="px-5 py-3">{statusBadge(t.status)}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-mono ${t.sla === "Expired" ? "text-destructive font-medium" : "text-muted-foreground"}`}>{t.sla}</span>
                    </td>
                    <td className="px-5 py-3">
                      <Button size="sm" variant="ghost" className="text-xs opacity-0 group-hover:opacity-100 transition-opacity gap-1">
                        Open <ArrowRight className="w-3 h-3" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
