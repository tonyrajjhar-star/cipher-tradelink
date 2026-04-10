import { AppLayout } from "@/components/AppLayout";
import { Settings } from "lucide-react";

const SettingsPage = () => (
  <AppLayout>
    <div className="space-y-6 animate-slide-up">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Settings</h2>
        <p className="text-sm text-muted-foreground mt-1">Platform configuration and user preferences</p>
      </div>
      <div className="rounded-xl border border-border bg-card p-12 text-center">
        <Settings className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
        <p className="text-sm text-muted-foreground">Settings panel — configure notifications, compliance thresholds, and display preferences.</p>
      </div>
    </div>
  </AppLayout>
);

export default SettingsPage;
