import { AppLayout } from "@/components/AppLayout";
import { useRole } from "@/contexts/RoleContext";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Clock,
  FileWarning,
  Loader2,
  PauseCircle,
  ShieldAlert,
  TrendingUp,
  XCircle,
  DollarSign,
  BarChart3,
  Globe,
  Users,
  Activity,
  Zap,
  Target,
  Timer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

/* ── Priority intelligence items ── */
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

/* ── Metric cards with gradients ── */
const metricCards = [
  {
    label: "Total Volume",
    value: "$48.2M",
    change: "+12.5%",
    trend: "up" as const,
    icon: DollarSign,
    gradient: "from-[hsl(216,92%,65%)] to-[hsl(237,51%,42%)]",
    iconBg: "bg-white/20",
  },
  {
    label: "Active Transactions",
    value: "48",
    change: "+8",
    trend: "up" as const,
    icon: Activity,
    gradient: "from-[hsl(152,60%,42%)] to-[hsl(152,60%,30%)]",
    iconBg: "bg-white/20",
  },
  {
    label: "Avg. Processing Time",
    value: "4.2h",
    change: "-18%",
    trend: "up" as const,
    icon: Timer,
    gradient: "from-[hsl(38,92%,50%)] to-[hsl(25,92%,45%)]",
    iconBg: "bg-white/20",
  },
  {
    label: "Compliance Rate",
    value: "97.8%",
    change: "+2.1%",
    trend: "up" as const,
    icon: Target,
    gradient: "from-[hsl(270,60%,55%)] to-[hsl(290,60%,40%)]",
    iconBg: "bg-white/20",
  },
];

/* ── Status distribution ── */
const statusCards = [
  { label: "New", count: 12, icon: TrendingUp, gradient: "from-[hsl(216,92%,65%)]/10 to-[hsl(216,92%,65%)]/5", iconGradient: "from-[hsl(216,92%,65%)] to-[hsl(237,51%,42%)]", textColor: "text-primary" },
  { label: "In Progress", count: 28, icon: Loader2, gradient: "from-[hsl(216,92%,75%)]/10 to-[hsl(216,92%,85%)]/5", iconGradient: "from-[hsl(216,92%,55%)] to-[hsl(216,92%,70%)]", textColor: "text-primary", detail: "Avg. 2.3 days in state" },
  { label: "On Hold", count: 5, icon: PauseCircle, gradient: "from-[hsl(38,92%,50%)]/10 to-[hsl(38,92%,50%)]/5", iconGradient: "from-[hsl(38,92%,50%)] to-[hsl(25,92%,45%)]", textColor: "text-warning", detail: "Avg. 2.3 days in state" },
  { label: "Failed", count: 3, icon: XCircle, gradient: "from-[hsl(0,72%,51%)]/10 to-[hsl(0,72%,51%)]/5", iconGradient: "from-[hsl(0,72%,51%)] to-[hsl(0,60%,40%)]", textColor: "text-destructive", detail: "Top cause: Sanctions match" },
];

/* ── Additional analytics ── */
const analyticsCards = [
  { label: "Countries Active", value: "24", icon: Globe, description: "Across 6 continents" },
  { label: "Counterparties", value: "156", icon: Users, description: "38 new this quarter" },
  { label: "SLA Compliance", value: "94.2%", icon: Zap, description: "Target: 95%" },
  { label: "Monthly Reports", value: "12", icon: BarChart3, description: "3 pending review" },
];

/* ── Transactions ── */
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

/* ── 3D Icon Component ── */
const Icon3D = ({ icon: Icon, gradient, size = "lg" }: { icon: React.ElementType; gradient: string; size?: "sm" | "lg" }) => {
  const dims = size === "lg" ? "w-12 h-12" : "w-10 h-10";
  const iconSize = size === "lg" ? "w-6 h-6" : "w-5 h-5";
  return (
    <div className={`relative ${dims}`}>
      {/* Shadow layer */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-40 blur-lg translate-y-1`} />
      {/* Icon body */}
      <div className={`relative ${dims} rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
        <Icon className={`${iconSize} text-white drop-shadow-sm`} />
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { roleName } = useRole();
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="space-y-6 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Operational Command Center</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Role: <span className="font-medium text-foreground">{roleName}</span> · Real-time operational intelligence
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[10px] gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </Badge>
            <span className="text-[10px] text-muted-foreground">Last sync: 12s ago</span>
          </div>
        </div>

        {/* ── Top Metric Cards with Gradient + 3D Icons ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metricCards.map((m) => (
            <div key={m.label} className="relative overflow-hidden rounded-xl border border-border bg-card p-5 group hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
              {/* Background gradient wash */}
              <div className={`absolute inset-0 bg-gradient-to-br ${m.gradient} opacity-[0.04] group-hover:opacity-[0.08] transition-opacity`} />
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <Icon3D icon={m.icon} gradient={m.gradient} />
                  <div className={`flex items-center gap-1 text-xs font-medium ${m.trend === "up" ? "text-emerald-600" : "text-destructive"}`}>
                    {m.trend === "up" ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                    {m.change}
                  </div>
                </div>
                <p className="text-2xl font-bold text-foreground tracking-tight">{m.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Priority Intelligence ── */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="p-5 bg-gradient-to-r from-amber-50/50 to-transparent border-b border-border">
            <div className="flex items-center gap-2">
              <Icon3D icon={AlertTriangle} gradient="from-[hsl(38,92%,50%)] to-[hsl(25,92%,45%)]" size="sm" />
              <div className="ml-1">
                <h3 className="text-sm font-semibold text-foreground">Priority Intelligence</h3>
                <p className="text-[10px] text-muted-foreground">System-generated action items requiring attention</p>
              </div>
              <Badge variant="outline" className="ml-auto text-[10px]">3 items</Badge>
            </div>
          </div>
          <div className="p-4 space-y-3">
            {priorities.map((p, i) => {
              const PIcon = p.icon;
              return (
                <div key={i} className="flex items-start gap-4 rounded-xl border border-border/60 p-4 hover:bg-muted/30 transition-all duration-200 hover:shadow-sm group">
                  <div className="relative">
                    <div className={`absolute inset-0 rounded-xl opacity-30 blur-md ${
                      p.type === "destructive" ? "bg-destructive" : p.type === "warning" ? "bg-warning" : "bg-muted-foreground"
                    }`} />
                    <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${
                      p.type === "destructive"
                        ? "bg-gradient-to-br from-[hsl(0,72%,51%)] to-[hsl(0,60%,40%)] text-white"
                        : p.type === "warning"
                        ? "bg-gradient-to-br from-[hsl(38,92%,50%)] to-[hsl(25,92%,45%)] text-white"
                        : "bg-gradient-to-br from-[hsl(220,10%,60%)] to-[hsl(220,10%,46%)] text-white"
                    }`}>
                      <PIcon className="w-4.5 h-4.5" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{p.message}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{p.reason}</p>
                    <div className="flex items-center gap-4 mt-2.5">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">Risk: <span className="font-semibold">{p.risk}</span></span>
                      <span className="text-[10px] text-muted-foreground">{p.action}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="shrink-0 text-xs gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                    Review <ArrowRight className="w-3 h-3" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Status Distribution + Analytics ── */}
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Status Cards */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {statusCards.map((s) => {
              const SIcon = s.icon;
              return (
                <div key={s.label} className="relative overflow-hidden rounded-xl border border-border bg-card p-5 hover:shadow-md transition-all duration-300 cursor-pointer group hover:-translate-y-0.5">
                  <div className={`absolute inset-0 bg-gradient-to-br ${s.gradient} transition-opacity`} />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <Icon3D icon={SIcon} gradient={s.iconGradient} size="sm" />
                      <span className={`text-3xl font-bold ${s.textColor}`}>{s.count}</span>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{s.label}</p>
                    {s.detail && <p className="text-[10px] text-muted-foreground mt-1">{s.detail}</p>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Analytics sidebar */}
          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Quick Analytics</h3>
            {analyticsCards.map((a) => {
              const AIcon = a.icon;
              return (
                <div key={a.label} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                    <AIcon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between">
                      <p className="text-xs text-muted-foreground">{a.label}</p>
                      <p className="text-sm font-bold text-foreground">{a.value}</p>
                    </div>
                    <p className="text-[10px] text-muted-foreground">{a.description}</p>
                  </div>
                </div>
              );
            })}

            {/* Pipeline progress */}
            <div className="pt-2 border-t border-border space-y-3">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Pipeline Health</h4>
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Completion Rate</span>
                  <span className="font-semibold text-foreground">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">SLA Adherence</span>
                  <span className="font-semibold text-foreground">94%</span>
                </div>
                <Progress value={94} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Auto-Approval</span>
                  <span className="font-semibold text-foreground">62%</span>
                </div>
                <Progress value={62} className="h-2" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Transaction Work Queue ── */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="p-5 border-b border-border flex items-center justify-between bg-gradient-to-r from-primary/5 to-transparent">
            <div className="flex items-center gap-3">
              <Icon3D icon={Activity} gradient="from-[hsl(216,92%,65%)] to-[hsl(237,51%,42%)]" size="sm" />
              <div>
                <h3 className="text-sm font-semibold text-foreground">Transaction Work Queue</h3>
                <p className="text-[10px] text-muted-foreground">5 transactions requiring attention</p>
              </div>
            </div>
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
