import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useRole } from "@/contexts/RoleContext";
import { Landmark, Mail, Lock, ArrowRight, ShieldCheck, Globe2, TrendingUp, Eye, EyeOff } from "lucide-react";
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
      {/* Left: Brand panel */}
      <div className="hidden lg:flex w-[55%] relative overflow-hidden bg-gradient-to-br from-[#0B1F33] via-[#143E5F] to-[#1F5E8A]">
        {/* Pattern */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute -top-24 -left-20 w-[28rem] h-[28rem] rounded-full bg-[#3386C3]/30 blur-3xl" />
        <div className="absolute -bottom-32 -right-20 w-[34rem] h-[34rem] rounded-full bg-[#5BA3D6]/20 blur-3xl" />

        {/* Floating finance ticker shapes */}
        <div className="absolute top-1/4 right-16 w-44 h-28 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-4 rotate-[-6deg]">
          <div className="flex items-center justify-between text-white/80 text-[10px] font-semibold tracking-wider">
            <span>USD/EUR</span>
            <span className="text-emerald-400">+0.42%</span>
          </div>
          <div className="mt-2 flex items-end gap-1 h-10">
            {[40, 60, 35, 78, 55, 88, 70, 92].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm bg-[#5BA3D6]" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        <div className="absolute bottom-1/4 left-12 w-52 h-32 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-4 rotate-[4deg]">
          <div className="text-white/80 text-[10px] font-semibold tracking-wider mb-1">LC ISSUED · 24H</div>
          <div className="text-2xl font-extrabold text-white">$48.2M</div>
          <div className="text-[10px] text-emerald-400 font-semibold mt-1">▲ 12.4% vs yesterday</div>
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#5BA3D6]" />
            </div>
            <div>
              <h1 className="text-base font-extrabold tracking-[0.18em]">TRADEFLOW</h1>
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/60">Banking for Trade</p>
            </div>
          </div>

          <div className="max-w-md">
            <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-semibold uppercase tracking-wider">Enterprise Trade Finance</span>
            </div>
            <h2 className="text-4xl xl:text-5xl font-extrabold leading-[1.1] tracking-tight">
              Issue, validate &<br />
              negotiate Letters<br />
              of Credit — <span className="text-[#5BA3D6]">securely.</span>
            </h2>
            <p className="mt-5 text-white/70 text-sm leading-relaxed max-w-sm">
              UCP 600 compliant. Sanctions-screened. Audit-ready at every stage of the LC lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-md">
            {[
              { v: "UCP 600", l: "Compliant" },
              { v: "ISO 27001", l: "Certified" },
              { v: "OFAC/EU", l: "Screened" },
            ].map((t) => (
              <div key={t.v} className="border-l-2 border-[#5BA3D6]/60 pl-3">
                <div className="text-sm font-bold">{t.v}</div>
                <div className="text-[10px] text-white/50 uppercase tracking-wider">{t.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#3386C3]/10 blur-3xl" />
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
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1F5E8A]">Issuing Bank Portal</span>
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
