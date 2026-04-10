import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { FileBarChart, Download, Calendar } from "lucide-react";

const reports = [
  { name: "Daily Transaction Summary", date: "Apr 10, 2026", type: "Automated" },
  { name: "Compliance Screening Report", date: "Apr 10, 2026", type: "Automated" },
  { name: "LC Issuance Audit Trail", date: "Apr 9, 2026", type: "On-demand" },
  { name: "SLA Breach Analysis", date: "Apr 8, 2026", type: "Weekly" },
  { name: "Risk Exposure Summary", date: "Apr 7, 2026", type: "Automated" },
];

const Reports = () => (
  <AppLayout>
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Reports & Audit Logs</h2>
          <p className="text-sm text-muted-foreground mt-1">Regulatory-ready reports and complete audit trails</p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5 text-xs">
          <Calendar className="w-3.5 h-3.5" /> Date Range
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Report</th>
              <th className="text-left px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Date</th>
              <th className="text-left px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Type</th>
              <th className="text-left px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground"></th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r.name} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                <td className="px-5 py-3.5 flex items-center gap-2">
                  <FileBarChart className="w-4 h-4 text-primary" />
                  <span className="text-foreground font-medium">{r.name}</span>
                </td>
                <td className="px-5 py-3.5 text-muted-foreground">{r.date}</td>
                <td className="px-5 py-3.5 text-muted-foreground">{r.type}</td>
                <td className="px-5 py-3.5">
                  <Button variant="ghost" size="sm" className="text-xs gap-1">
                    <Download className="w-3 h-3" /> Download
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

export default Reports;
