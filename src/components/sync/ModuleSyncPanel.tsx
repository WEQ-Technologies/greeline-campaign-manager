import { RefreshCw, CheckCircle2, AlertCircle, Clock, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSync, ModuleName } from "@/hooks/use-sync";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface ModuleSyncPanelProps {
  module: ModuleName;
  className?: string;
}

export function ModuleSyncPanel({ module, className }: ModuleSyncPanelProps) {
  const { modules, syncModule, globalLock } = useSync();
  const moduleState = modules[module];

  const formatDate = (date: Date | null) => {
    if (!date) return "Never synced";
    return format(date, "MMM d, h:mm a");
  };

  const getStatusIcon = () => {
    switch (moduleState.status) {
      case "syncing":
        return <RefreshCw className="w-4 h-4 animate-spin text-primary" />;
      case "completed":
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case "failed":
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = () => {
    switch (moduleState.status) {
      case "syncing":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
            <RefreshCw className="w-3 h-3 animate-spin" />
            Syncing
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-success/10 text-success">
            <CheckCircle2 className="w-3 h-3" />
            Synced
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-destructive/10 text-destructive">
            <AlertCircle className="w-3 h-3" />
            Failed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-muted text-muted-foreground">
            <Clock className="w-3 h-3" />
            Idle
          </span>
        );
    }
  };

  const isLocked = globalLock || moduleState.status === "syncing";

  return (
    <Card className={cn("relative overflow-hidden", className)}>
      {/* Lock Overlay */}
      {isLocked && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Sync in progress for this module...</span>
          </div>
        </div>
      )}

      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Status Icon */}
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
              {getStatusIcon()}
            </div>

            {/* Info */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Module Sync</span>
                {getStatusBadge()}
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>Last: {formatDate(moduleState.lastSynced)}</span>
                {moduleState.itemsUpdated > 0 && (
                  <>
                    <span className="text-muted-foreground">•</span>
                    <span className="flex items-center gap-1">
                      <Activity className="w-3 h-3" />
                      {moduleState.itemsUpdated} items updated
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Sync Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => syncModule(module)}
            disabled={isLocked}
            className="gap-1.5"
          >
            <RefreshCw className={cn("w-3.5 h-3.5", moduleState.status === "syncing" && "animate-spin")} />
            Sync This Module
          </Button>
        </div>

        {/* Error Message */}
        {moduleState.status === "failed" && moduleState.error && (
          <div className="mt-3 p-2 rounded-md bg-destructive/10 border border-destructive/20">
            <p className="text-xs text-destructive">{moduleState.error}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
