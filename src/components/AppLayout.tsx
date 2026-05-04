import { ReactNode } from "react";
import { useRole } from "@/contexts/RoleContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
  PlusCircle,
  Settings,
  Search,
  Bell,
  ChevronRight,
  LogOut,
  ShieldCheck,
  ChevronDown,
  History,
  UserCircle2,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BrandLogo } from "@/components/BrandLogo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DEMO_USER = {
  name: "Aisha Al-Rashid",
  role: "Manager",
  title: "Senior Trade Officer",
  lastLogin: "Apr 10, 2026 · 09:14",
  initials: "AA",
};

const menuSections = [
  {
    label: "Workflow",
    items: [
      { title: "Create Transaction", icon: PlusCircle, path: "/create" },
      { title: "Validation", icon: ShieldCheck, path: "/workflow" },
      { title: "Audit Trail", icon: History, path: "/workflow#audit" },
    ],
  },
  {
    label: "System",
    items: [
      { title: "Settings", icon: Settings, path: "/settings" },
    ],
  },
];

export const AppLayout = ({ children }: { children: ReactNode }) => {
  const { roleName } = useRole();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col shrink-0 relative border-r border-sidebar-border">
        <div className="absolute top-0 bottom-0 right-0 w-[3px] bg-sidebar-primary" />

        <div className="px-5 py-5 border-b border-sidebar-border">
          <BrandLogo
            wordmarkClassName="text-sidebar-foreground"
            taglineClassName="text-sidebar-foreground/60"
          />
        </div>

        <div className="px-5 py-4 border-b border-sidebar-border">
          <p className="text-[10px] uppercase tracking-widest text-sidebar-foreground/50 mb-2">
            Module
          </p>
          <div className="flex items-center gap-2 rounded-md bg-sidebar-accent px-3 py-2">
            <BadgeCheck className="w-3.5 h-3.5 text-sidebar-primary" />
            <span className="text-xs font-semibold text-sidebar-accent-foreground">
              TRADEFLOW · {roleName || "Issuing Bank"}
            </span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-6 overflow-y-auto">
          {menuSections.map((section) => (
            <div key={section.label}>
              <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40">
                {section.label}
              </p>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = location.pathname === item.path;
                  return (
                    <button
                      key={item.path}
                      onClick={() => navigate(item.path)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all relative group ${
                        active
                          ? "bg-sidebar-primary text-sidebar-primary-foreground font-semibold shadow-glow"
                          : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.title}</span>
                      {active && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-sidebar-border">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-card flex items-center px-6 gap-4 shrink-0">
          {/* Left: Role-based identity */}
          <div className="flex items-center gap-3 pr-4 mr-2 border-r border-border">
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-[#3386C3] to-[#1F5E8A] flex items-center justify-center text-white font-bold text-sm shadow-md">
              {DEMO_USER.initials}
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-card" />
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-foreground">{DEMO_USER.name}</span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#3386C3]/10 text-[#1F5E8A] border border-[#3386C3]/20">
                  {DEMO_USER.role}
                </span>
              </div>
              <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Last login · {DEMO_USER.lastLogin}
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by Transaction ID, LC, Customer, Country…"
                className="pl-9 h-10 text-sm bg-muted/60 border-transparent focus-visible:bg-card focus-visible:border-secondary/40"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-muted">
              <Bell className="w-4 h-4 text-foreground" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-secondary" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1.5 text-xs hover:bg-muted">
                  <UserCircle2 className="w-4 h-4" />
                  Profile
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60">
                <DropdownMenuLabel>
                  <div className="font-bold text-foreground">{DEMO_USER.name}</div>
                  <div className="text-[11px] font-normal text-muted-foreground">
                    {DEMO_USER.title}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  <Settings className="w-3.5 h-3.5 mr-2" /> Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <History className="w-3.5 h-3.5 mr-2" /> Activity log
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/")} className="text-destructive">
                  <LogOut className="w-3.5 h-3.5 mr-2" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6 gradient-mesh">{children}</main>
      </div>
    </div>
  );
};
