import { useMemo, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  LayoutDashboard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Row = {
  id: string;
  date: string;
  applicantName: string;
  amount: number;
  bankCustomer: string;
  country: string;
};

const COUNTRIES = ["UAE", "Germany", "India", "Singapore", "USA", "UK", "Japan", "Saudi Arabia"];
const BANK_CUSTOMERS = ["HSBC", "Citi", "Standard Chartered", "BNP Paribas", "Deutsche Bank"];

const ROWS: Row[] = Array.from({ length: 20 }).map((_, i) => ({
  id: `LCR-2026-${String(1001 + i).padStart(4, "0")}`,
  date: `2026-04-${String(((i * 3) % 27) + 1).padStart(2, "0")}`,
  applicantName: [
    "Al Rajhi Trading Co.",
    "Siemens AG",
    "Tata Steel Ltd.",
    "Glencore Intl.",
    "Samsung C&T",
    "Maersk Line",
    "Vale S.A.",
    "Mitsui & Co.",
    "BP Oil Trading",
    "Olam International",
  ][i % 10],
  amount: 250000 + ((i * 173_500) % 5_000_000),
  bankCustomer: BANK_CUSTOMERS[i % BANK_CUSTOMERS.length],
  country: COUNTRIES[i % COUNTRIES.length],
}));

type SortKey = keyof Pick<Row, "date" | "applicantName" | "amount" | "bankCustomer" | "country">;
const PAGE_SIZE = 5;

const fmtAmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

const LCRequestDashboard = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState<string>("all");
  const [bankFilter, setBankFilter] = useState<string>("all");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let r = ROWS.filter((x) => {
      const q = search.trim().toLowerCase();
      const matchesQ =
        !q ||
        x.applicantName.toLowerCase().includes(q) ||
        x.id.toLowerCase().includes(q) ||
        x.bankCustomer.toLowerCase().includes(q) ||
        x.country.toLowerCase().includes(q);
      const matchesCountry = countryFilter === "all" || x.country === countryFilter;
      const matchesBank = bankFilter === "all" || x.bankCustomer === bankFilter;
      return matchesQ && matchesCountry && matchesBank;
    });
    r = [...r].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp = typeof av === "number" ? (av as number) - (bv as number) : String(av).localeCompare(String(bv));
      return sortDir === "asc" ? cmp : -cmp;
    });
    return r;
  }, [search, countryFilter, bankFilter, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleSort = (k: SortKey) => {
    if (sortKey === k) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(k);
      setSortDir("asc");
    }
  };

  const SortIcon = ({ k }: { k: SortKey }) =>
    sortKey !== k ? (
      <ArrowUpDown className="w-3 h-3 opacity-40" />
    ) : sortDir === "asc" ? (
      <ArrowUp className="w-3 h-3 text-primary" />
    ) : (
      <ArrowDown className="w-3 h-3 text-primary" />
    );

  const headers: { key: SortKey; label: string }[] = [
    { key: "date", label: "Date" },
    { key: "applicantName", label: "Applicant Name" },
    { key: "amount", label: "Amount" },
    { key: "bankCustomer", label: "Bank Customer" },
    { key: "country", label: "Country" },
  ];

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-6 animate-slide-up">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">LC Request Received Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Inbound Letter of Credit requests pending intake & validation
              </p>
            </div>
          </div>
          <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
            {filtered.length} Requests
          </Badge>
        </div>

        {/* Filter bar */}
        <div className="rounded-xl border border-border bg-card p-4 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by applicant, ID, bank, country…"
              className="pl-9 h-10 text-sm"
            />
          </div>
          <Select
            value={countryFilter}
            onValueChange={(v) => {
              setCountryFilter(v);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[160px] h-10 text-sm">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              {COUNTRIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={bankFilter}
            onValueChange={(v) => {
              setBankFilter(v);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[180px] h-10 text-sm">
              <SelectValue placeholder="Bank Customer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Bank Customers</SelectItem>
              {BANK_CUSTOMERS.map((b) => (
                <SelectItem key={b} value={b}>
                  {b}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs h-10"
            onClick={() => {
              setSearch("");
              setCountryFilter("all");
              setBankFilter("all");
              setPage(1);
            }}
          >
            <Filter className="w-3.5 h-3.5" /> Reset
          </Button>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="w-10 px-5 py-3" />
                {headers.map((h) => (
                  <th key={h.key} className="text-left px-5 py-3">
                    <button
                      onClick={() => toggleSort(h.key)}
                      className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground"
                    >
                      {h.label} <SortIcon k={h.key} />
                    </button>
                  </th>
                ))}
                <th className="w-32 px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-sm text-muted-foreground">
                    No matching LC requests.
                  </td>
                </tr>
              )}
              {pageRows.map((row) => {
                const selected = selectedId === row.id;
                return (
                  <tr
                    key={row.id}
                    onClick={() => setSelectedId(row.id)}
                    className={`border-b border-border/50 cursor-pointer transition-colors ${
                      selected ? "bg-primary/5" : "hover:bg-muted/20"
                    }`}
                  >
                    <td className="px-5 py-3.5">
                      <input
                        type="radio"
                        name="lc-select"
                        checked={selected}
                        onChange={() => setSelectedId(row.id)}
                        className="accent-primary w-4 h-4"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                    <td className="px-5 py-3.5 font-mono text-xs text-muted-foreground">{row.date}</td>
                    <td className="px-5 py-3.5 text-foreground font-medium">{row.applicantName}</td>
                    <td className="px-5 py-3.5 text-foreground">{fmtAmt(row.amount)}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{row.bankCustomer}</td>
                    <td className="px-5 py-3.5">
                      <Badge variant="outline" className="text-[10px]">
                        {row.country}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <Button
                        size="sm"
                        disabled={!selected}
                        className="gap-1.5 text-xs bg-secondary hover:bg-secondary/90 text-secondary-foreground disabled:opacity-40"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate("/create");
                        }}
                      >
                        Proceed <ArrowRight className="w-3 h-3" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-muted/20">
            <p className="text-xs text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)}
              </span>{" "}
              of <span className="font-semibold text-foreground">{filtered.length}</span> requests
            </p>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              {Array.from({ length: totalPages }).map((_, i) => {
                const p = i + 1;
                return (
                  <Button
                    key={p}
                    variant={p === page ? "default" : "outline"}
                    size="sm"
                    className="h-8 min-w-8 text-xs"
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </Button>
                );
              })}
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default LCRequestDashboard;
