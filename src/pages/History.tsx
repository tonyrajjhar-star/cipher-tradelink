import { AppLayout } from "@/components/AppLayout";
import { AuditTrail } from "@/components/workflow/AuditTrail";
import { History as HistoryIcon } from "lucide-react";

const History = () => (
  <AppLayout>
    <div className="space-y-6 animate-slide-up">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-[#3386C3]/10 via-transparent to-transparent" />
        <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-[#3386C3]/15 blur-3xl" />
        <div className="relative p-6 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#3386C3] to-[#1F5E8A] flex items-center justify-center shadow-elegant">
            <HistoryIcon className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#1F5E8A] mb-1">
              TRADEFLOW · Audit
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
              History
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Complete audit trail of stage events, actors, and decisions across the LC lifecycle.
            </p>
          </div>
        </div>
      </div>

      <AuditTrail />
    </div>
  </AppLayout>
);

export default History;
