import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RoleProvider } from "@/contexts/RoleContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Workflow from "./pages/Workflow";
import Transactions from "./pages/Transactions";
import CreateTransaction from "./pages/CreateTransaction";
import Compliance from "./pages/Compliance";
import Reports from "./pages/Reports";
import WorkQueue from "./pages/WorkQueue";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <RoleProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/workflow" element={<Workflow />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/create" element={<CreateTransaction />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/queue" element={<WorkQueue />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </RoleProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
