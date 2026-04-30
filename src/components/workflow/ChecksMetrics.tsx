import { useState } from "react";
import {
  ListChecks,
  ShieldCheck,
  AlertOctagon,
  HelpCircle,
  FileCheck2,
  Calculator,
  GitBranch,
  Network,
  RotateCcw,
  FileText,
  ChevronDown,
  CheckCircle2,
  XCircle,
  CircleSlash,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "primary" | "success" | "danger" | "muted" | "info" | "warning";

interface MetricItem {
  key: string;
  label: string;
  value: number;
  icon: React.ElementType;
  tone: Tone;
  detail: string;
}

const toneClasses: Record<Tone, { bg: string; text: string; border: string; iconBg: string }> = {
  primary: {
    bg: "bg-primary/5",
    text: "text-primary",
    border: "border-primary/20 hover:border-primary/40",
    iconBg: "bg-primary/10",
  },
  success: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200 hover:border-emerald-300",
    iconBg: "bg-emerald-100",
  },
  danger: {
    bg: "bg-destructive/5",
    text: "text-destructive",
    border: "border-destructive/20 hover:border-destructive/40",
    iconBg: "bg-destructive/10",
  },
  muted: {
    bg: "bg-muted/40",
    text: "text-muted-foreground",
    border: "border-border hover:border-foreground/20",
    iconBg: "bg-muted",
  },
  info: {
    bg: "bg-sky-50",
    text: "text-sky-700",
    border: "border-sky-200 hover:border-sky-300",
    iconBg: "bg-sky-100",
  },
  warning: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200 hover:border-amber-300",
    iconBg: "bg-amber-100",
  },
};

const summary: MetricItem[] = [
  {
    key: "total",
    label: "Total Checks Executed",
    value: 22,
    icon: ListChecks,
    tone: "primary",
    detail: "Across 8 documents — every rule evaluated end-to-end with full audit trace.",
  },
  {
    key: "compliant",
    label: "Compliant",
    value: 22,
    icon: ShieldCheck,
    tone: "success",
    detail: "100.0% of checks passed — all UCP 600, sanctions, and contract rules satisfied.",
  },
  {
    key: "discrepant",
    label: "Discrepant",
    value: 0,
    icon: AlertOctagon,
    tone: "danger",
    detail: "0.0% FAILED — Action required. No discrepancies detected in this LC package.",
  },
  {
    key: "na",
    label: "NA / Inconclusive",
    value: 0,
    icon: HelpCircle,
    tone: "muted",
    detail: "0.0% could not be assessed — every rule had sufficient data to resolve deterministically.",
  },
];

const breakdown: MetricItem[] = [
  {
    key: "lc-direct",
    label: "LC Direct Checks",
    value: 13,
    icon: FileCheck2,
    tone: "info",
    detail: "Pre-solved from LC fields — no rules needed. Direct field equality and presence checks.",
  },
  {
    key: "math",
    label: "Math C2 Checks",
    value: 1,
    icon: Calculator,
    tone: "info",
    detail: "Deterministic arithmetic — UCP. Tolerance, totals, and percentage validations.",
  },
  {
    key: "rules-path",
    label: "Needs Rules: Path",
    value: 6,
    icon: GitBranch,
    tone: "primary",
    detail: "Pre-solved from LC fields — no rules needed. Single-path rule resolution chain.",
  },
  {
    key: "rules-multi",
    label: "Needs Rules: Multi Path",
    value: 0,
    icon: Network,
    tone: "muted",
    detail: "Pre-solved from LC fields — no rules needed. No multi-path rule branches required.",
  },
  {
    key: "ucp-fallback",
    label: "UCP Only Fallback",
    value: 2,
    icon: RotateCcw,
    tone: "warning",
    detail: "Pre-solved from LC fields — no rules needed. UCP 600 fallback applied where contract was silent.",
  },
];

const passRate = 100.0;
const failRate = 0.0;
const naRate = 0.0;

export const ChecksMetrics = () => {
  const [openKey, setOpenKey] = useState<string | null>("compliant");

  const renderCard = (m: MetricItem) => {
    const t = toneClasses[m.tone];
    const open = openKey === m.key;
    const Icon = m.icon;
    return (
      <button
        key={m.key}
        onClick={() => setOpenKey(open ? null : m.key)}
        className={cn(
          "group relative text-left rounded-xl border p-4 transition-all",
          t.bg,
          t.border,
          open && "ring-2 ring-offset-1 ring-primary/30 shadow-sm"
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", t.iconBg)}>
            <Icon className={cn("w-5 h-5", t.text)} strokeWidth={2} />
          </div>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-muted-foreground transition-transform mt-1",
              open && "rotate-180"
            )}
          />
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-1">
            <span className={cn("text-2xl font-extrabold tracking-tight tabular-nums", t.text)}>
              {m.value}
            </span>
            <span className={cn("text-sm font-semibold", t.text)}>#</span>
          </div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-foreground/80 mt-1 leading-tight">
            {m.label}
          </p>
        </div>
        <div
          className={cn(
            "grid transition-all duration-300 ease-out",
            open ? "grid-rows-[1fr] mt-3 opacity-100" : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden">
            <p className="text-[11px] leading-relaxed text-muted-foreground border-t border-border/60 pt-2">
              {m.detail}
            </p>
          </div>
        </div>
      </button>
    );
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">Validation Checks Summary</h3>
            <p className="text-[11px] text-muted-foreground">
              Across 8 documents · Click any tile for details
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-semibold">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" /> {passRate.toFixed(1)}% passed
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-destructive/10 text-destructive border border-destructive/20">
            <XCircle className="w-3 h-3" /> {failRate.toFixed(1)}% failed
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-muted-foreground border border-border">
            <CircleSlash className="w-3 h-3" /> {naRate.toFixed(1)}% N/A
          </span>
        </div>
      </div>

      {/* Pass / Fail / NA bar */}
      <div className="mb-5">
        <div className="h-2 w-full rounded-full overflow-hidden bg-muted flex">
          <div className="bg-emerald-500" style={{ width: `${passRate}%` }} />
          <div className="bg-destructive" style={{ width: `${failRate}%` }} />
          <div className="bg-muted-foreground/30" style={{ width: `${naRate}%` }} />
        </div>
      </div>

      {/* Summary metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {summary.map(renderCard)}
      </div>

      {/* Breakdown header */}
      <div className="flex items-center gap-2 mb-3 mt-2">
        <div className="h-px flex-1 bg-border" />
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground flex items-center gap-1.5">
          <FileText className="w-3 h-3" /> Check Type Breakdown
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Breakdown grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {breakdown.map(renderCard)}
      </div>
    </div>
  );
};
