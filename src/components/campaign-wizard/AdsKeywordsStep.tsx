import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AdsKeywordsStepProps {
  data: {
    adGroup: string;
    keywords: string[];
  };
  onChange: (field: string, value: any) => void;
}

const availableAdGroups = [
  { id: "1", name: "Brand Keywords" },
  { id: "2", name: "Product Keywords" },
  { id: "3", name: "Service Keywords" },
];

const availableKeywords = [
  { id: "1", name: "auto glass repair" },
  { id: "2", name: "windshield replacement" },
  { id: "3", name: "car window repair" },
];

export function AdsKeywordsStep({ data, onChange }: AdsKeywordsStepProps) {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Ad Groups</CardTitle>
          <CardDescription>Select or create ad groups for your campaign</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="adGroup">Select Ad Group</Label>
            <Select value={data.adGroup} onValueChange={(value) => onChange("adGroup", value)}>
              <SelectTrigger id="adGroup">
                <SelectValue placeholder="Select an ad group" />
              </SelectTrigger>
              <SelectContent>
                {availableAdGroups.map((group) => (
                  <SelectItem key={group.id} value={group.id}>
                    {group.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate("/google-ads/ad-groups/add")}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Create New Ad Group
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Keywords</CardTitle>
          <CardDescription>Select or add keywords for your ad group</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="keywords">Select Keyword</Label>
            <Select
              value={data.keywords[0] || ""}
              onValueChange={(value) => onChange("keywords", [value])}
            >
              <SelectTrigger id="keywords">
                <SelectValue placeholder="Select keywords" />
              </SelectTrigger>
              <SelectContent>
                {availableKeywords.map((keyword) => (
                  <SelectItem key={keyword.id} value={keyword.id}>
                    {keyword.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate("/google-ads/keywords/add")}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Add Keywords
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
