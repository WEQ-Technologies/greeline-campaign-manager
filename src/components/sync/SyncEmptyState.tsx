import { RefreshCw, CloudOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSync, ModuleName } from "@/hooks/use-sync";

interface SyncEmptyStateProps {
  module: ModuleName;
  onSync?: () => void;
}

export function SyncEmptyState({ module, onSync }: SyncEmptyStateProps) {
  const { syncModule, modules, globalLock } = useSync();
  const moduleState = modules[module];

  const handleSync = () => {
    if (onSync) {
      onSync();
    } else {
      syncModule(module);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
        <CloudOff className="w-10 h-10 text-muted-foreground" />
      </div>

      <h3 className="text-lg font-semibold mb-2">No Sync Activity Yet</h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-6">
        This module hasn't been synced with Google Ads yet. 
        Run your first sync to import data.
      </p>

      <Button
        onClick={handleSync}
        disabled={globalLock || moduleState.status === "syncing"}
        className="gap-2"
      >
        <RefreshCw className="w-4 h-4" />
        Run First Sync
      </Button>
    </div>
  );
}
