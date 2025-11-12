import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AssetGenerationStepProps {
  data: {
    assetGroup: string;
  };
  onChange: (field: string, value: any) => void;
}

const availableAssetGroups = [
  { id: "1", name: "Brand Assets - Tech Startup" },
  { id: "2", name: "Product Images - Auto Glass" },
  { id: "3", name: "Service Assets - Windshield" },
];

export function AssetGenerationStep({ data, onChange }: AssetGenerationStepProps) {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Asset Group</CardTitle>
          <CardDescription>Select or create asset groups for your campaign</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="assetGroup">Select Assets</Label>
            <Select value={data.assetGroup} onValueChange={(value) => onChange("assetGroup", value)}>
              <SelectTrigger id="assetGroup">
                <SelectValue placeholder="Select an asset group" />
              </SelectTrigger>
              <SelectContent>
                {availableAssetGroups.map((group) => (
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
            onClick={() => navigate("/google-ads/assets")}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Create New Asset
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
