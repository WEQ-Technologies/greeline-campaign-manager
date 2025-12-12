import { RefreshCw, Lock } from "lucide-react";
import { useSync } from "@/hooks/use-sync";

export function GlobalSyncLock() {
  const { globalLock, syncProgress } = useSync();

  if (!globalLock) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-card border border-border rounded-xl p-8 shadow-lg max-w-md text-center space-y-4">
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <RefreshCw className="w-8 h-8 text-primary animate-spin" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-warning flex items-center justify-center">
              <Lock className="w-3 h-3 text-warning-foreground" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Account Sync in Progress</h3>
          <p className="text-sm text-muted-foreground">
            The system is currently syncing your Google Ads account. 
            All editing features are temporarily disabled.
          </p>
        </div>

        <div className="pt-2">
          <p className="text-xs text-muted-foreground">
            Current: {syncProgress.currentStep}
          </p>
        </div>
      </div>
    </div>
  );
}
