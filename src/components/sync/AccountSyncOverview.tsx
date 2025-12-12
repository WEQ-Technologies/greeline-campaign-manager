import { RefreshCw, Clock, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useSync } from "@/hooks/use-sync";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export function AccountSyncOverview() {
  const { accountStatus, lastAccountSync, nextScheduledSync, syncAccount, globalLock } = useSync();

  const formatDate = (date: Date | null) => {
    if (!date) return "Never";
    return format(date, "MMM d, yyyy h:mm a");
  };

  const getStatusIcon = () => {
    switch (accountStatus) {
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

  const getStatusText = () => {
    switch (accountStatus) {
      case "syncing":
        return "Syncing...";
      case "completed":
        return "Synced";
      case "failed":
        return "Failed";
      default:
        return "Idle";
    }
  };

  return (
    <TooltipProvider>
      <div className="flex items-center gap-3 px-3 py-2 bg-muted/50 rounded-lg border border-border">
        {/* Status Indicator */}
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <span className="text-xs font-medium text-muted-foreground">{getStatusText()}</span>
        </div>

        {/* Divider */}
        <div className="h-4 w-px bg-border" />

        {/* Last Synced */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-muted-foreground">Last:</span>
          <span className="text-xs font-medium">{formatDate(lastAccountSync)}</span>
        </div>

        {/* Divider */}
        <div className="h-4 w-px bg-border" />

        {/* Next Scheduled */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-muted-foreground">Next:</span>
          <span className="text-xs font-medium">{formatDate(nextScheduledSync)}</span>
        </div>

        {/* Sync Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={syncAccount}
              disabled={globalLock || accountStatus === "syncing"}
              className={cn(
                "ml-2 gap-1.5",
                accountStatus === "syncing" && "cursor-not-allowed"
              )}
            >
              <RefreshCw className={cn("w-3.5 h-3.5", accountStatus === "syncing" && "animate-spin")} />
              <span className="hidden sm:inline">Sync Account</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="max-w-xs">
            <p className="text-xs">
              Sync entire account with Google Ads. Rate limit: 10 syncs per hour. 
              Last sync may take 2-5 minutes depending on data volume.
            </p>
          </TooltipContent>
        </Tooltip>

        {/* Info Tooltip */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Info className="w-3.5 h-3.5 text-muted-foreground" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="max-w-xs">
            <p className="text-xs font-medium mb-1">Sync Rules:</p>
            <ul className="text-xs space-y-0.5 text-muted-foreground">
              <li>• Auto-sync every 6 hours</li>
              <li>• Manual sync limit: 10/hour</li>
              <li>• Changes sync within 15 minutes</li>
            </ul>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
