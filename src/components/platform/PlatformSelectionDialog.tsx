import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface PlatformSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PlatformSelectionDialog({ open, onOpenChange }: PlatformSelectionDialogProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContinue = () => {
    if (selectedPlatform === "google") {
      navigate("/google-ads/overview");
      onOpenChange(false);
    } else if (selectedPlatform === "meta") {
      toast({
        title: "Coming Soon",
        description: "Meta Ads integration is coming soon.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select a Platform to Manage Campaigns</DialogTitle>
          <DialogDescription>
            Choose which platform you'd like to view or manage campaigns for.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-6">
          <RadioGroup value={selectedPlatform} onValueChange={setSelectedPlatform}>
            <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
              <RadioGroupItem value="google" id="google" />
              <Label htmlFor="google" className="flex-1 cursor-pointer">
                <div className="font-medium">⭕ Google Ads</div>
                <div className="text-sm text-muted-foreground">Manage Google Ads campaigns</div>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer mt-3">
              <RadioGroupItem value="meta" id="meta" />
              <Label htmlFor="meta" className="flex-1 cursor-pointer">
                <div className="font-medium">⭕ Meta Ads</div>
                <div className="text-sm text-muted-foreground">Coming Soon</div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleContinue} disabled={!selectedPlatform}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
