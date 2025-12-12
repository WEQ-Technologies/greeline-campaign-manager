import { AlertCircle, RefreshCw, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useSync, ModuleName } from "@/hooks/use-sync";
import { useState } from "react";

interface SyncErrorBannerProps {
  module?: ModuleName;
  error?: string;
  onRetry?: () => void;
}

export function SyncErrorBanner({ module, error, onRetry }: SyncErrorBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  const { syncModule, syncAccount, accountStatus, modules, resetError } = useSync();

  const moduleState = module ? modules[module] : null;
  const hasError = module 
    ? moduleState?.status === "failed" 
    : accountStatus === "failed";

  if (!hasError || dismissed) return null;

  const errorMessage = error || moduleState?.error || "An error occurred during sync. Please try again.";

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else if (module) {
      syncModule(module);
    } else {
      resetError();
      syncAccount();
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    if (!module) {
      resetError();
    }
  };

  return (
    <Alert variant="destructive" className="relative">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle className="font-semibold">Sync Failed</AlertTitle>
      <AlertDescription className="mt-2">
        <p className="text-sm mb-3">{errorMessage}</p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRetry}
            className="gap-1.5 bg-background hover:bg-muted"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Retry Sync
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5"
            onClick={() => {/* Navigate to activity log */}}
          >
            <FileText className="w-3.5 h-3.5" />
            View Activity Log
          </Button>
        </div>
      </AlertDescription>

      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-6 w-6 hover:bg-destructive/20"
        onClick={handleDismiss}
      >
        <X className="w-4 h-4" />
      </Button>
    </Alert>
  );
}
