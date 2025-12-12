import { RefreshCw, CheckCircle2, AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useSync } from "@/hooks/use-sync";
import { cn } from "@/lib/utils";

export function SyncProgressOverlay() {
  const { syncProgress, closeSyncProgress, accountStatus } = useSync();

  const isComplete = syncProgress.progress === 100;
  const isFailed = accountStatus === "failed";

  const getStatusIcon = () => {
    if (isFailed) {
      return <AlertCircle className="w-12 h-12 text-destructive" />;
    }
    if (isComplete) {
      return <CheckCircle2 className="w-12 h-12 text-success" />;
    }
    return <RefreshCw className="w-12 h-12 text-primary animate-spin" />;
  };

  const getStatusTitle = () => {
    if (isFailed) return "Sync Failed";
    if (isComplete) return "Sync Complete";
    return "Syncing in Progress";
  };

  return (
    <Dialog open={syncProgress.isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md [&>button]:hidden">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            {getStatusIcon()}
          </div>
          <DialogTitle className="text-center text-xl">
            {getStatusTitle()}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress value={syncProgress.progress} className="h-3" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Step {syncProgress.currentStepNumber} of {syncProgress.totalSteps}</span>
              <span>{Math.round(syncProgress.progress)}%</span>
            </div>
          </div>

          {/* Current Step */}
          <div className={cn(
            "p-4 rounded-lg border text-center",
            isFailed ? "bg-destructive/10 border-destructive/20" : "bg-muted/50 border-border"
          )}>
            <p className={cn(
              "text-sm font-medium",
              isFailed ? "text-destructive" : "text-foreground"
            )}>
              {syncProgress.currentStep}
            </p>
          </div>

          {/* Steps Indicator */}
          {!isComplete && !isFailed && (
            <div className="flex items-center justify-center gap-1">
              {Array.from({ length: syncProgress.totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    i < syncProgress.currentStepNumber
                      ? "bg-primary"
                      : i === syncProgress.currentStepNumber
                      ? "bg-primary animate-pulse"
                      : "bg-muted-foreground/30"
                  )}
                />
              ))}
            </div>
          )}

          {/* Close Button - Only enabled when complete or failed */}
          <div className="flex justify-center">
            <Button
              onClick={closeSyncProgress}
              disabled={!isComplete && !isFailed}
              variant={isFailed ? "destructive" : "default"}
              className="w-full max-w-xs"
            >
              {isFailed ? "Close & Retry Later" : isComplete ? "Done" : "Please wait..."}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
