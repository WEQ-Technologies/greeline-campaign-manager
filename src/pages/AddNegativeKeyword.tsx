import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function AddNegativeKeyword() {
  const { toast } = useToast();
  const navigate = useNavigate();
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
    navigate("/google-ads/keywords");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/google-ads/keywords")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add Negative Keywords</h1>
          <p className="text-muted-foreground mt-1">Create negative keywords to exclude from your campaigns</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Negative Keyword Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => navigate("/google-ads/keywords")}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
