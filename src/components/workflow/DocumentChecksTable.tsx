import { CheckCircle2, XCircle, FileText } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface DocRow {
  name: string;
  type: string;
  total: number;
  compliant: number;
  discrepant: number;
}

const rows: DocRow[] = [
  { name: "Packing List", type: "Packing List", total: 3, compliant: 2, discrepant: 1 },
  { name: "Phytosanitary Certificate", type: "Phytosanitary Certificate", total: 2, compliant: 2, discrepant: 0 },
  { name: "Quality and Weight Certificate", type: "Quality and Weight Certificate", total: 2, compliant: 2, discrepant: 0 },
  { name: "Insurance Certificate", type: "Insurance Certificate", total: 2, compliant: 2, discrepant: 0 },
  { name: "Vessel Hold Inspection Certificate", type: "Inspection Certificate", total: 2, compliant: 2, discrepant: 0 },
  { name: "Draft Survey Report", type: "Survey Report", total: 2, compliant: 1, discrepant: 1 },
  { name: "Bill of Lading", type: "Bill of Lading", total: 4, compliant: 0, discrepant: 4 },
  { name: "Commercial Invoice", type: "Commercial Invoice", total: 3, compliant: 0, discrepant: 3 },
  { name: "Certificate of Origin", type: "Certificate of Origin", total: 1, compliant: 0, discrepant: 1 },
];

// Heat-map cell helpers
const compliantBg = (n: number) => {
  if (n === 0) return "bg-muted/40 text-muted-foreground";
  if (n === 1) return "bg-emerald-50 text-emerald-700";
  if (n === 2) return "bg-emerald-100 text-emerald-700";
  return "bg-emerald-200 text-emerald-800";
};
const discrepantBg = (n: number) => {
  if (n === 0) return "bg-muted/40 text-muted-foreground";
  if (n === 1) return "bg-rose-50 text-rose-700";
  if (n === 2) return "bg-rose-100 text-rose-700";
  if (n === 3) return "bg-rose-200 text-rose-800";
  return "bg-rose-300 text-rose-900";
};

export const DocumentChecksTable = () => {
  const totals = rows.reduce(
    (a, r) => ({
      total: a.total + r.total,
      compliant: a.compliant + r.compliant,
      discrepant: a.discrepant + r.discrepant,
    }),
    { total: 0, compliant: 0, discrepant: 0 }
  );

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between flex-wrap gap-2 bg-gradient-to-r from-[#3386C3]/5 via-card to-card">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#3386C3]/10 flex items-center justify-center">
            <FileText className="w-4 h-4 text-[#3386C3]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">Document Verification — Per-Document Checks</h3>
            <p className="text-[11px] text-muted-foreground">
              Heat-mapped pass/fail across {rows.length} documents · {totals.total} total checks
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-semibold">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" /> {totals.compliant} Compliant
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-rose-100 text-rose-700 border border-rose-200">
            <XCircle className="w-3 h-3" /> {totals.discrepant} Discrepant
          </span>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30">
            <TableHead className="font-bold text-foreground">Document Name</TableHead>
            <TableHead className="font-bold text-foreground">Type</TableHead>
            <TableHead className="font-bold text-foreground text-center">Total Checks</TableHead>
            <TableHead className="font-bold text-foreground text-center">Compliant</TableHead>
            <TableHead className="font-bold text-foreground text-center">Discrepant</TableHead>
            <TableHead className="font-bold text-foreground text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => {
            const pass = r.discrepant === 0;
            return (
              <TableRow key={r.name} className="hover:bg-muted/20">
                <TableCell className="font-medium text-foreground">{r.name}</TableCell>
                <TableCell>
                  <a className="text-[#3386C3] hover:underline text-sm" href="#" onClick={(e) => e.preventDefault()}>
                    {r.type}
                  </a>
                </TableCell>
                <TableCell className="text-center font-mono font-semibold">{r.total}</TableCell>
                <TableCell className={`text-center font-mono font-bold ${compliantBg(r.compliant)}`}>
                  {r.compliant}
                </TableCell>
                <TableCell className={`text-center font-mono font-bold ${discrepantBg(r.discrepant)}`}>
                  {r.discrepant}
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      pass
                        ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                        : "bg-rose-100 text-rose-700 border border-rose-200"
                    }`}
                  >
                    {pass ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    {pass ? "PASS" : "FAIL"}
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
