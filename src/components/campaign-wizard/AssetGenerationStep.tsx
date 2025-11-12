import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AddAssetDialog } from "./dialogs/AddAssetDialog";

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
  const [assetDialogOpen, setAssetDialogOpen] = useState(false);

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
            onClick={() => setAssetDialogOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Asset
          </Button>
        </CardContent>
      </Card>

      <AddAssetDialog 
        open={assetDialogOpen} 
        onOpenChange={setAssetDialogOpen}
        onSuccess={() => {
          // Refresh assets list or update state as needed
        }}
      />
    </div>
  );
}
