import { RefreshCw, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useSync } from "@/hooks/use-sync";
import { cn } from "@/lib/utils";

export function CompactSyncButton() {
  const { accountStatus, syncAccount, globalLock } = useSync();

  return (
    <TooltipProvider>
      <div className="flex items-center gap-1">
        {/* Sync Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={syncAccount}
              disabled={globalLock || accountStatus === "syncing"}
              className={cn(
                "gap-1.5 h-9",
                accountStatus === "syncing" && "cursor-not-allowed"
              )}
            >
              <RefreshCw className={cn("w-3.5 h-3.5", accountStatus === "syncing" && "animate-spin")} />
              <span className="hidden sm:inline">Sync</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="max-w-xs">
            <p className="text-xs">
              Sync entire account with Google Ads. Rate limit: 10 syncs per hour.
            </p>
          </TooltipContent>
        </Tooltip>

        {/* Info Tooltip */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Info className="w-4 h-4 text-muted-foreground" />
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
