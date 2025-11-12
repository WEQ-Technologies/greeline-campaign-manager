import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { AssetFields } from "@/components/shared/AssetFields";

export default function AddAsset() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSave = () => {
    toast({ title: "Success", description: "Asset created successfully" });
    navigate("/google-ads/assets");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/google-ads/assets")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add Asset</h1>
          <p className="text-muted-foreground mt-1">Create creative assets for your campaigns</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Asset Type</CardTitle>
        </CardHeader>
        <CardContent>
          <AssetFields />

          <div className="flex justify-end gap-2 pt-6">
            <Button variant="outline" onClick={() => navigate("/google-ads/assets")}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
