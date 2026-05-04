import { useState, useMemo } from "react";
import {
  History,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  FileText,
  Filter,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type AuditStatus = "Completed" | "Pending" | "Rejected" | "On Hold";

interface AuditEntry {
  stage: number;
  stageTitle: string;
  status: AuditStatus;
  user: string;
  role: string;
  timestamp: string;
  files: number;
  rejected: string[];
  hold: string;
}

const data: AuditEntry[] = [
  {
    stage: 1,
    stageTitle: "Application & Contract Validation",
    status: "Completed",
    user: "M. Khalid",
    role: "Application Officer",
    timestamp: "Apr 10, 2026 · 14:32",
    files: 4,
    rejected: [],
    hold: "",
  },
  {
    stage: 2,
    stageTitle: "Sanctions Screening & Risk Control",
    status: "Completed",
    user: "S. Tariq",
    role: "Compliance Officer",
    timestamp: "Apr 10, 2026 · 15:01",
    files: 3,
    rejected: [],
    hold: "",
  },
  {
    stage: 3,
    stageTitle: "LC Issuance",
    status: "Completed",
    user: "F. Habibi",
    role: "Issuance Manager",
    timestamp: "Apr 10, 2026 · 15:18",
    files: 1,
    rejected: [],
    hold: "",
  },
  {
    stage: 4,
    stageTitle: "Negotiating Bank — Document Verification",
    status: "On Hold",
    user: "A. Al-Rashid",
    role: "Senior Trade Officer",
    timestamp: "Apr 10, 2026 · 15:42",
    files: 9,
    rejected: ["Bill of Lading", "Commercial Invoice", "Certificate of Origin", "Draft Survey Report"],
    hold: "Awaiting beneficiary clarification on consignee mismatch (Bill of Lading vs LC field 50).",
  },
];

const statusBadge = (s: AuditStatus) => {
  const map: Record<AuditStatus, { c: string; i: typeof CheckCircle2 }> = {
    Completed: { c: "bg-emerald-100 text-emerald-700 border-emerald-200", i: CheckCircle2 },
    Pending: { c: "bg-muted text-muted-foreground border-border", i: Clock },
    Rejected: { c: "bg-rose-100 text-rose-700 border-rose-200", i: XCircle },
    "On Hold": { c: "bg-amber-100 text-amber-700 border-amber-200", i: AlertTriangle },
  };
  const m = map[s];
  const Icon = m.i;
  return (
    <Badge variant="outline" className={`text-[10px] font-bold ${m.c}`}>
      <Icon className="w-3 h-3 mr-1" /> {s}
    </Badge>
  );
};

export const AuditTrail = () => {
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");

  const filtered = useMemo(
    () =>
      data.filter((d) => {
        if (stage !== "all" && String(d.stage) !== stage) return false;
        if (status !== "all" && d.status !== status) return false;
        if (search) {
          const q = search.toLowerCase();
          if (
            !d.stageTitle.toLowerCase().includes(q) &&
            !d.user.toLowerCase().includes(q) &&
            !d.role.toLowerCase().includes(q)
          )
            return false;
        }
        return true;
      }),
    [search, stage, status]
  );

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center gap-3 flex-wrap bg-gradient-to-r from-[#3386C3]/5 via-card to-card">
        <div className="flex items-center gap-2 mr-auto">
          <div className="w-8 h-8 rounded-lg bg-[#3386C3]/10 flex items-center justify-center">
            <History className="w-4 h-4 text-[#3386C3]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">History & Audit Trail</h3>
            <p className="text-[11px] text-muted-foreground">
              {filtered.length} of {data.length} stage events
            </p>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search stage, user…"
            className="pl-9 h-9 w-56 text-xs"
          />
        </div>
        <Select value={stage} onValueChange={setStage}>
          <SelectTrigger className="h-9 w-32 text-xs">
            <Filter className="w-3 h-3 mr-1" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All stages</SelectItem>
            <SelectItem value="1">Stage 1</SelectItem>
            <SelectItem value="2">Stage 2</SelectItem>
            <SelectItem value="3">Stage 3</SelectItem>
            <SelectItem value="4">Stage 4</SelectItem>
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="h-9 w-36 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
            <SelectItem value="On Hold">On Hold</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30">
            <TableHead className="font-bold text-foreground">Stage</TableHead>
            <TableHead className="font-bold text-foreground">Status</TableHead>
            <TableHead className="font-bold text-foreground">User</TableHead>
            <TableHead className="font-bold text-foreground">Timestamp</TableHead>
            <TableHead className="font-bold text-foreground text-center">Files</TableHead>
            <TableHead className="font-bold text-foreground">Rejected / Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((d) => (
            <TableRow key={d.stage} className="hover:bg-muted/20 align-top">
              <TableCell>
                <div className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#3386C3]/10 text-[#3386C3] font-bold text-xs flex items-center justify-center shrink-0">
                    {d.stage}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{d.stageTitle}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{statusBadge(d.status)}</TableCell>
              <TableCell>
                <p className="text-sm font-semibold text-foreground">{d.user}</p>
                <p className="text-[11px] text-muted-foreground">{d.role}</p>
              </TableCell>
              <TableCell className="text-xs text-muted-foreground font-mono">{d.timestamp}</TableCell>
              <TableCell className="text-center">
                <span className="inline-flex items-center gap-1 text-xs font-mono">
                  <FileText className="w-3 h-3 text-muted-foreground" />
                  {d.files}
                </span>
              </TableCell>
              <TableCell>
                {d.rejected.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-1">
                    {d.rejected.map((r) => (
                      <Badge key={r} variant="outline" className="text-[10px] bg-rose-50 text-rose-700 border-rose-200">
                        {r}
                      </Badge>
                    ))}
                  </div>
                )}
                {d.hold && (
                  <p className="text-[11px] text-amber-700 italic leading-snug">⚠ {d.hold}</p>
                )}
                {!d.hold && d.rejected.length === 0 && (
                  <span className="text-[11px] text-muted-foreground">—</span>
                )}
              </TableCell>
            </TableRow>
          ))}
          {filtered.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-sm text-muted-foreground py-8">
                No audit entries match these filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
