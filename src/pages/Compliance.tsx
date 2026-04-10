import { AppLayout } from "@/components/AppLayout";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert, ShieldCheck, AlertTriangle, TrendingUp } from "lucide-react";

const metrics = [
  { label: "Cleared Today", value: 18, icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Pending Review", value: 4, icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Escalated", value: 2, icon: ShieldAlert, color: "text-destructive", bg: "bg-red-50" },
  { label: "Avg. Screening Time", value: "4.2s", icon: TrendingUp, color: "text-primary", bg: "bg-primary/5" },
];

const Compliance = () => (
  <AppLayout>
    <div className="space-y-6 animate-slide-up">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Compliance & Risk</h2>
        <p className="text-sm text-muted-foreground mt-1">Real-time compliance monitoring and risk control dashboard</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${m.bg}`}>
                  <Icon className={`w-4 h-4 ${m.color}`} />
                </div>
                <span className="text-2xl font-bold text-foreground">{m.value}</span>
              </div>
              <p className="text-sm font-medium text-foreground">{m.label}</p>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">Recent Compliance Events</h3>
        <div className="space-y-3">
          {[
            { time: "15:01", event: "Sanctions screening initiated for TXN-2026-0841", type: "info" },
            { time: "14:58", event: "OFAC partial match detected — Al Rajhi Trading Co.", type: "warning" },
            { time: "14:45", event: "SDN list match confirmed for Glencore Intl. — TXN-2026-0835 blocked", type: "error" },
            { time: "14:32", event: "Pre-issuance validation completed — TXN-2026-0841", type: "success" },
            { time: "14:20", event: "KYC verification passed — Samsung C&T", type: "success" },
          ].map((e, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
              <span className="text-xs font-mono text-muted-foreground mt-0.5 w-12 shrink-0">{e.time}</span>
              <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                e.type === "error" ? "bg-destructive" : e.type === "warning" ? "bg-amber-500" : e.type === "success" ? "bg-emerald-500" : "bg-primary"
              }`} />
              <p className="text-sm text-foreground">{e.event}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </AppLayout>
);

export default Compliance;
