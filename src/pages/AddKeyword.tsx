import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function AddKeyword() {
  const { toast } = useToast();
  const navigate = useNavigate();
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
          <h1 className="text-3xl font-bold tracking-tight">Add Keywords</h1>
          <p className="text-muted-foreground mt-1">Create new keywords for your campaigns</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Keyword Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
