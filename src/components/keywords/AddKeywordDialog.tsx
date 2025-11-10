import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface AddKeywordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddKeywordDialog({ open, onOpenChange }: AddKeywordDialogProps) {
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
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Keywords</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
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
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
