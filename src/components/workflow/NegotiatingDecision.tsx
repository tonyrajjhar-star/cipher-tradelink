import { CheckCircle2, XCircle, Calendar, User, FileSignature, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Props {
  outcome: "pass" | "fail";
}

export const NegotiatingDecision = ({ outcome }: Props) => {
  const isPass = outcome === "pass";

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border-2 shadow-elegant ${
        isPass ? "border-emerald-300 bg-gradient-to-br from-emerald-50 via-card to-card"
               : "border-rose-300 bg-gradient-to-br from-rose-50 via-card to-card"
      }`}
    >
      <div
        className={`absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-40 ${
          isPass ? "bg-emerald-300" : "bg-rose-300"
        }`}
      />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#3386C3]/10 blur-3xl" />

      <div className="relative p-8">
        {/* Hero verdict */}
        <div className="text-center mb-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">
            Negotiating Bank · Final Decision
          </p>
          <div className="relative inline-flex items-center justify-center">
            <div
              className={`w-28 h-28 rounded-full flex items-center justify-center shadow-2xl ${
                isPass
                  ? "bg-gradient-to-br from-emerald-400 to-emerald-600"
                  : "bg-gradient-to-br from-rose-400 to-rose-600"
              }`}
            >
              {isPass ? (
                <CheckCircle2 className="w-16 h-16 text-white drop-shadow-lg" strokeWidth={2.2} />
              ) : (
                <XCircle className="w-16 h-16 text-white drop-shadow-lg" strokeWidth={2.2} />
              )}
            </div>
            {isPass && <Sparkles className="absolute -top-2 -right-4 w-7 h-7 text-amber-400 animate-pulse" />}
          </div>

          <h2
            className={`mt-5 text-5xl md:text-6xl font-extrabold tracking-tight ${
              isPass ? "text-emerald-700" : "text-rose-700"
            }`}
          >
            {isPass ? "PASS" : "FAIL"}
          </h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-lg mx-auto leading-relaxed">
            {isPass
              ? "All documents validated against UCP 600. The transaction is cleared for payment under the Letter of Credit."
              : "Discrepancies identified across 4 documents. The transaction is held — beneficiary has been notified for remediation."}
          </p>
        </div>

        {/* Decision metadata */}
        <div className="grid sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
          <div className="rounded-xl border border-border bg-card/80 backdrop-blur p-4">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
              <User className="w-3 h-3 text-[#3386C3]" /> Decisioned By
            </div>
            <p className="text-sm font-bold text-foreground">Aisha Al-Rashid</p>
            <p className="text-[11px] text-muted-foreground">Senior Trade Officer · ID 4821</p>
          </div>

          <div className="rounded-xl border border-border bg-card/80 backdrop-blur p-4">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
              <Calendar className="w-3 h-3 text-[#3386C3]" /> Decision Time
            </div>
            <p className="text-sm font-bold text-foreground">Apr 10, 2026 · 15:42</p>
            <p className="text-[11px] text-muted-foreground">UTC+3 · Riyadh</p>
          </div>

          <div className="rounded-xl border border-border bg-card/80 backdrop-blur p-4">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
              <FileSignature className="w-3 h-3 text-[#3386C3]" /> Reason Code
            </div>
            <p className="text-sm font-bold text-foreground">
              {isPass ? "UCP-600.14 · Compliant" : "UCP-600.16 · Discrepant"}
            </p>
            <Badge
              variant="outline"
              className={`mt-1 text-[10px] ${
                isPass
                  ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                  : "bg-rose-100 text-rose-700 border-rose-200"
              }`}
            >
              {isPass ? "Auto-cleared" : "Manual review"}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};
