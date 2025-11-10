import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface AddNegativeKeywordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddNegativeKeywordDialog({ open, onOpenChange }: AddNegativeKeywordDialogProps) {
  const { toast } = useToast();
  const [addTo, setAddTo] = useState("");
  const [level, setLevel] = useState("");
  const [keywords, setKeywords] = useState("");
  const [createList, setCreateList] = useState(false);
  const [listName, setListName] = useState("");
  const [matchType, setMatchType] = useState("");

  const handleSave = () => {
    if (!addTo || !level || !keywords || !matchType) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (createList && !listName) {
      toast({
        title: "Missing list name",
        description: "Please provide a name for the negative keyword list",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Negative keywords added",
      description: "Your negative keywords have been successfully added",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Negative Keywords</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="addTo">Add To</Label>
            <Select value={addTo} onValueChange={setAddTo}>
              <SelectTrigger id="addTo">
                <SelectValue placeholder="Select campaign or ad group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="brand-awareness">Brand Awareness Q1</SelectItem>
                <SelectItem value="holiday-special">Holiday Special</SelectItem>
                <SelectItem value="new-year-promo">New Year Promo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="level">Level</Label>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger id="level">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="campaign">Campaign</SelectItem>
                <SelectItem value="adgroup">Ad Group</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="negativeKeywords">Add Negative Keywords (one per line)</Label>
            <Textarea
              id="negativeKeywords"
              placeholder="Enter negative keywords, one per line"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              rows={5}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="createList"
              checked={createList}
              onCheckedChange={(checked) => setCreateList(checked as boolean)}
            />
            <Label htmlFor="createList" className="cursor-pointer">
              Create a List
            </Label>
          </div>

          {createList && (
            <div className="space-y-2">
              <Label htmlFor="listName">List Name</Label>
              <Input
                id="listName"
                placeholder="Enter list name"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
              />
            </div>
          )}

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
