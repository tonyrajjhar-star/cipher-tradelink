import { ReactNode } from "react";
import { useRole } from "@/contexts/RoleContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
  PlusCircle,
  Settings,
  Search,
  Bell,
  User,
  ChevronRight,
  LogOut,
  ShieldCheck,
  Triangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const menuSections = [
  {
    label: "Workflow",
    items: [
      { title: "Create Transaction", icon: PlusCircle, path: "/create" },
      { title: "Validation", icon: ShieldCheck, path: "/workflow" },
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
  const { roleName, setRole } = useRole();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar — Rosano style: deep navy with orange accent bar */}
      <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col shrink-0 relative">
        {/* Orange accent bar on the right edge */}
        <div className="absolute top-0 bottom-0 right-0 w-1 bg-secondary" />

        {/* Brand */}
        <div className="px-5 py-5 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 flex items-center justify-center">
              {/* Stacked triangle logo (Rosano-inspired) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Triangle className="w-9 h-9 text-secondary" strokeWidth={2.5} />
              </div>
              <Triangle className="w-5 h-5 text-secondary fill-secondary relative" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-wider text-sidebar-foreground">TRADEFLOW</h1>
              <p className="text-[10px] text-sidebar-foreground/70 uppercase tracking-widest">Trade Finance</p>
            </div>
          </div>
        </div>

        {/* Role chip */}
        <div className="px-5 py-4 border-b border-sidebar-border">
          <p className="text-[10px] uppercase tracking-widest text-sidebar-foreground/50 mb-2">Operating Role</p>
          <div className="flex items-center gap-2 rounded-md bg-sidebar-accent px-3 py-2">
            <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse-soft" />
            <span className="text-xs font-semibold text-sidebar-foreground">{roleName || "Not Set"}</span>
          </div>
        </div>

        {/* Nav sections */}
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
                          ? "bg-secondary text-secondary-foreground font-semibold shadow-orange"
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

        {/* Logout */}
        <div className="p-3 border-t border-sidebar-border">
          <button
            onClick={() => { setRole(null); navigate("/"); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Switch Role</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 border-b border-border bg-card flex items-center px-6 gap-4 shrink-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by Transaction ID, LC, Customer, Country…"
                className="pl-9 h-10 text-sm bg-muted/60 border-transparent focus-visible:bg-card focus-visible:border-primary/30"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <span className="hidden md:inline text-xs text-muted-foreground">
              24/7 Trade Support <span className="font-semibold text-foreground">+1 (234) 500 0975</span>
            </span>
            <div className="w-px h-6 bg-border" />
            <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-muted">
              <Bell className="w-4 h-4 text-foreground" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-secondary" />
            </Button>
            <Button variant="ghost" size="sm" className="gap-2 text-sm hover:bg-muted">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="text-left leading-tight">
                <div className="text-xs font-semibold text-foreground">Operator</div>
                <div className="text-[10px] text-muted-foreground">Active session</div>
              </div>
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6 gradient-mesh">
          {children}
        </main>
      </div>
    </div>
  );
};
