import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useRole } from "@/contexts/RoleContext";
import {
  Landmark,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Eye,
  EyeOff,
  FileCheck2,
  Banknote,
  Ship,
  Building2,
  CircleDollarSign,
  ScrollText,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const Login = () => {
  const navigate = useNavigate();
  const { setRole } = useRole();
  const [email, setEmail] = useState("manager@tradeflow.bank");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setRole("issuing");
      navigate("/create");
    }, 600);
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left: Infographic brand panel */}
      <div className="hidden lg:flex w-[55%] relative overflow-hidden bg-[#0A1828]">
        {/* Decorative background layers */}
        <div className="absolute inset-0">
          {/* grid */}
          <div
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "linear-gradient(#3386C3 1px, transparent 1px), linear-gradient(90deg, #3386C3 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
          {/* glows */}
          <div className="absolute -top-32 -left-24 w-[420px] h-[420px] rounded-full bg-[#3386C3]/30 blur-3xl" />
          <div className="absolute bottom-[-120px] right-[-80px] w-[460px] h-[460px] rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-cyan-400/10 blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center backdrop-blur-sm">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-extrabold tracking-[0.18em]">TRADEFLOW</h1>
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/60">Banking for Trade</p>
            </div>
          </div>

          {/* Headline + 2D infographic */}
          <div className="space-y-10">
            <div>
              <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
                  Letter of Credit Platform
                </span>
              </div>
              <h2 className="text-4xl xl:text-5xl font-extrabold leading-[1.05] tracking-tight max-w-md">
                Issue, validate &<br />
                negotiate Letters<br />
                of Credit — securely.
              </h2>
              <p className="mt-4 text-sm text-white/65 max-w-sm leading-relaxed">
                A unified workspace for Issuing and Negotiating banks. Built on UCP 600 with auditable AI scrutiny.
              </p>
            </div>

            {/* 2D Trade-flow infographic */}
            <div className="relative max-w-lg">
              {/* connecting dotted track */}
              <svg
                className="absolute left-0 right-0 top-[34px] w-full h-2"
                viewBox="0 0 480 8"
                fill="none"
                preserveAspectRatio="none"
              >
                <line
                  x1="40"
                  y1="4"
                  x2="440"
                  y2="4"
                  stroke="#3386C3"
                  strokeWidth="2"
                  strokeDasharray="4 6"
                  strokeLinecap="round"
                />
              </svg>

              <div className="relative grid grid-cols-4 gap-2">
                {[
                  { icon: Building2, label: "Applicant", color: "bg-[#3386C3]" },
                  { icon: ScrollText, label: "Issue LC", color: "bg-cyan-500" },
                  { icon: Ship, label: "Shipment", color: "bg-amber-500" },
                  { icon: Banknote, label: "Settle", color: "bg-emerald-500" },
                ].map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div key={i} className="flex flex-col items-center text-center">
                      <div
                        className={`relative w-[68px] h-[68px] rounded-2xl ${s.color} flex items-center justify-center shadow-lg ring-4 ring-[#0A1828]`}
                      >
                        <Icon className="w-7 h-7 text-white" strokeWidth={2.2} />
                        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white text-[10px] font-extrabold text-[#0A1828] flex items-center justify-center">
                          {i + 1}
                        </span>
                      </div>
                      <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-white/85">
                        {s.label}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Stat tiles */}
              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  { k: "12,480", v: "LCs issued", icon: FileCheck2, tint: "text-cyan-300" },
                  { k: "$3.2B", v: "Settled volume", icon: CircleDollarSign, tint: "text-emerald-300" },
                  { k: "99.97%", v: "Audit pass rate", icon: CheckCircle2, tint: "text-amber-300" },
                ].map((t, i) => {
                  const Icon = t.icon;
                  return (
                    <div
                      key={i}
                      className="rounded-xl bg-white/5 border border-white/10 p-3 backdrop-blur-sm"
                    >
                      <Icon className={`w-4 h-4 ${t.tint}`} />
                      <p className="mt-2 text-lg font-extrabold text-white leading-none">{t.k}</p>
                      <p className="mt-1 text-[10px] uppercase tracking-wider text-white/55">{t.v}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer trust strip */}
          <div className="flex items-center gap-5 text-[10px] uppercase tracking-[0.2em] text-white/50">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              UCP 600
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-cyan-300" />
              SOC 2 · ISO 27001
            </span>
            <span>SWIFT MT700 ready</span>
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#3386C3]/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="w-full max-w-md relative">
          {/* Mobile brand */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-[#3386C3] flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-extrabold tracking-[0.18em] text-foreground">TRADEFLOW</h1>
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Banking for Trade</p>
            </div>
          </div>

          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-3 px-2.5 py-1 rounded-full bg-[#E1F0FA] border border-[#3386C3]/20">
              <Landmark className="w-3 h-3 text-[#1F5E8A]" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1F5E8A]">
                Issuing Bank Portal
              </span>
            </div>
            <h2 className="text-3xl font-extrabold text-foreground tracking-tight">Welcome back</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Sign in to access TRADEFLOW — the unified Issuing Bank workspace.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Email / Username
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11"
                  placeholder="you@bank.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  Password
                </Label>
                <button type="button" className="text-[11px] font-semibold text-[#3386C3] hover:underline">
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-11"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  tabIndex={-1}
                >
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <label htmlFor="remember" className="text-xs text-muted-foreground cursor-pointer">
                Keep me signed in on this device
              </label>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 text-sm font-bold gap-2 bg-[#3386C3] hover:bg-[#1F5E8A] text-white"
            >
              {loading ? "Signing in…" : "Sign in to TRADEFLOW"}
              <ArrowRight className="w-4 h-4" />
            </Button>

            <div className="flex items-center gap-3 text-[10px] text-muted-foreground pt-3 border-t border-border">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span className="leading-relaxed">
                Encrypted in transit. All sessions are logged for audit per UCP 600 & internal policy.
              </span>
            </div>
          </form>

          <p className="mt-8 text-center text-[11px] text-muted-foreground">
            © 2026 TRADEFLOW · Enterprise Banking Platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
