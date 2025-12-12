import { RefreshCw, Check, AlertTriangle, Edit3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useSync, ModuleName, ItemSyncStatus } from "@/hooks/use-sync";
import { cn } from "@/lib/utils";

interface SyncStatusBadgeProps {
  itemId: string;
  module: ModuleName;
  showSyncButton?: boolean;
  className?: string;
}

export function SyncStatusBadge({ itemId, module, showSyncButton = true, className }: SyncStatusBadgeProps) {
  const { getItemStatus, syncItem, globalLock, modules } = useSync();
  const itemStatus = getItemStatus(itemId);
  const moduleStatus = modules[module];

  const isLocked = globalLock || moduleStatus.status === "syncing" || itemStatus.isLocked;

  const getStatusConfig = (status: ItemSyncStatus) => {
    switch (status) {
      case "synced":
        return {
          label: "Synced",
          icon: Check,
          variant: "outline" as const,
          className: "border-success/30 text-success bg-success/10",
        };
      case "modified-locally":
        return {
          label: "Modified",
          icon: Edit3,
          variant: "outline" as const,
          className: "border-warning/30 text-warning bg-warning/10",
        };
      case "out-of-sync":
        return {
          label: "Out of Sync",
          icon: AlertTriangle,
          variant: "outline" as const,
          className: "border-destructive/30 text-destructive bg-destructive/10",
        };
      case "syncing":
        return {
          label: "Syncing",
          icon: RefreshCw,
          variant: "outline" as const,
          className: "border-primary/30 text-primary bg-primary/10",
        };
    }
  };

  const config = getStatusConfig(itemStatus.status);
  const Icon = config.icon;

  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-1.5", className)}>
        <Badge variant={config.variant} className={cn("gap-1 text-xs", config.className)}>
          <Icon className={cn("w-3 h-3", itemStatus.status === "syncing" && "animate-spin")} />
          {config.label}
        </Badge>

        {showSyncButton && itemStatus.status !== "syncing" && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => syncItem(itemId, module)}
                disabled={isLocked}
              >
                <RefreshCw className="w-3 h-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p className="text-xs">Sync this item with Google Ads</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
}
