import { ReactNode } from "react";
import { useRole } from "@/contexts/RoleContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
  PlusCircle,
  ListTodo,
  FolderOpen,
  ShieldCheck,
  FileBarChart,
  Settings,
  Scale,
  Search,
  Bell,
  User,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const menuItems = [
  { title: "Create Transaction", icon: PlusCircle, path: "/create" },
  { title: "Work Queue", icon: ListTodo, path: "/queue" },
  { title: "Transactions", icon: FolderOpen, path: "/transactions" },
  { title: "Compliance & Risk", icon: ShieldCheck, path: "/compliance" },
  { title: "Reports & Audit", icon: FileBarChart, path: "/reports" },
  { title: "Settings", icon: Settings, path: "/settings" },
];

export const AppLayout = ({ children }: { children: ReactNode }) => {
  const { roleName, setRole } = useRole();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card flex flex-col shrink-0">
        {/* Brand */}
        <div className="p-5 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="icon-3d w-9 h-9 rounded-xl gradient-brand shadow-elegant">
              <Scale className="w-4 h-4 text-white drop-shadow-sm" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-foreground">TradeFlow</h1>
              <p className="text-[10px] text-muted-foreground">Import & Export</p>
            </div>
          </div>
        </div>

        {/* Role Badge */}
        <div className="px-4 py-3 border-b border-border">
          <div className="flex items-center gap-2 rounded-lg gradient-brand-soft px-3 py-2 border border-primary/10">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
            <span className="text-xs font-medium text-secondary">{roleName}</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  active
                    ? "gradient-brand text-white font-medium shadow-elegant"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.title}</span>
                {active && <ChevronRight className="w-3 h-3 ml-auto" />}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-border">
          <button
            onClick={() => { setRole(null); navigate("/"); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Switch Role</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-14 border-b border-border bg-card/80 backdrop-blur-md flex items-center px-6 gap-4 shrink-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by Transaction ID, LC, Customer, Country…"
                className="pl-9 h-9 text-sm bg-muted/40 border-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
            </Button>
            <div className="w-px h-6 bg-border" />
            <Button variant="ghost" size="sm" className="gap-2 text-sm">
              <div className="w-7 h-7 rounded-full gradient-brand flex items-center justify-center shadow-sm">
                <User className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-muted-foreground">Operator</span>
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
