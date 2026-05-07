import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RoleProvider } from "@/contexts/RoleContext";
import Login from "./pages/Login";
import Workflow from "./pages/Workflow";
import CreateTransaction from "./pages/CreateTransaction";
import History from "./pages/History";
import NegotiatingBank from "./pages/NegotiatingBank";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import { ThemeApplier } from "./components/ThemeApplier";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <RoleProvider>
        <ThemeApplier />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/create" element={<CreateTransaction />} />
            <Route path="/workflow" element={<Workflow />} />
            <Route path="/negotiating" element={<NegotiatingBank />} />
            <Route path="/history" element={<History />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </RoleProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

