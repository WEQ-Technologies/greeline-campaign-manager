import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface AddKeywordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function AddKeywordDialog({ open, onOpenChange, onSuccess }: AddKeywordDialogProps) {
  const { toast } = useToast();
  const [campaign, setCampaign] = useState("");
  const [adGroup, setAdGroup] = useState("");
  const [keywords, setKeywords] = useState("");
  const [matchType, setMatchType] = useState("");

  const handleSave = () => {
    if (!campaign || !adGroup || !keywords || !matchType) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Keywords added",
      description: "Your keywords have been successfully added",
    });
    
    // Reset form
    setCampaign("");
    setAdGroup("");
    setKeywords("");
    setMatchType("");
    
    onOpenChange(false);
    onSuccess?.();
  };

  const handleCancel = () => {
    // Reset form on cancel
    setCampaign("");
    setAdGroup("");
    setKeywords("");
    setMatchType("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add Keywords</DialogTitle>
          <p className="text-sm text-muted-foreground">Create new keywords for your campaigns</p>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <h3 className="font-semibold">Keyword Details</h3>
            
            <div className="space-y-2">
              <Label htmlFor="campaign">Campaign</Label>
              <Select value={campaign} onValueChange={setCampaign}>
                <SelectTrigger id="campaign">
                  <SelectValue placeholder="Select campaign" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="brand-awareness">Brand Awareness Q1</SelectItem>
                  <SelectItem value="holiday-special">Holiday Special</SelectItem>
                  <SelectItem value="new-year-promo">New Year Promo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="adGroup">Ad Group</Label>
              <Select value={adGroup} onValueChange={setAdGroup}>
                <SelectTrigger id="adGroup">
                  <SelectValue placeholder="Select ad group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="suv-winter">SUV Models - Winter</SelectItem>
                  <SelectItem value="sedan-specials">Sedan Specials</SelectItem>
                  <SelectItem value="glass-repair">Glass Repair - Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="keywords">Add Keywords (one per line)</Label>
              <Textarea
                id="keywords"
                placeholder="Enter keywords, one per line"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                rows={5}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="matchType">Match Type</Label>
              <Select value={matchType} onValueChange={setMatchType}>
                <SelectTrigger id="matchType">
                  <SelectValue placeholder="Select match type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="broad">Broad</SelectItem>
                  <SelectItem value="exact">Exact</SelectItem>
                  <SelectItem value="phrase">Phrase</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
