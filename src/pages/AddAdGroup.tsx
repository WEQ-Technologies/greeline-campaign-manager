import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { AssetFields } from "@/components/shared/AssetFields";

export default function AddAdGroup() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    adGroupType: "",
    adGroupName: "",
    specificWebpages: "",
    webpageRules: "",
    urlInclusions: "",
    urlExclusions: "",
    locationOfInterest: "",
    brandInclusions: "",
  });

  const handleSave = () => {
    toast({ title: "Success", description: "Ad Group created successfully" });
    navigate("/google-ads/ad-groups");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/google-ads/ad-groups")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add Ad Group</h1>
          <p className="text-muted-foreground mt-1">Create a new ad group for your campaigns</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ad Group Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="adGroupType">Select Ad group Type</Label>
            <Select value={formData.adGroupType} onValueChange={(value) => setFormData({ ...formData, adGroupType: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="dynamic">Dynamic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="adGroupName">Ad Group Name</Label>
            <Input
              id="adGroupName"
              value={formData.adGroupName}
              onChange={(e) => setFormData({ ...formData, adGroupName: e.target.value })}
              placeholder="Enter ad group name"
            />
          </div>

          {formData.adGroupType === "dynamic" && (
            <>
              <div className="space-y-2">
                <Label>Specific Webpages</Label>
                <div className="space-y-2">
                  <Input
                    placeholder="Use Exact URL"
                    value={formData.specificWebpages}
                    onChange={(e) => setFormData({ ...formData, specificWebpages: e.target.value })}
                  />
                  <Input
                    placeholder="Create rules to target webpage"
                    value={formData.webpageRules}
                    onChange={(e) => setFormData({ ...formData, webpageRules: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>All Webpages</Label>
                <Input placeholder="If Dynamic" disabled />
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label>Keywords</Label>
            <p className="text-sm text-muted-foreground">Fetch from Keywords list or show Add new keyword section</p>
          </div>

          <div className="space-y-2">
            <Label>Assets</Label>
            <AssetFields />
          </div>

          <div className="space-y-2">
            <Label htmlFor="urlInclusions">URL Inclusions</Label>
            <Input
              id="urlInclusions"
              value={formData.urlInclusions}
              onChange={(e) => setFormData({ ...formData, urlInclusions: e.target.value })}
              placeholder="Enter URL inclusions"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="urlExclusions">URL Exclusions</Label>
            <Input
              id="urlExclusions"
              value={formData.urlExclusions}
              onChange={(e) => setFormData({ ...formData, urlExclusions: e.target.value })}
              placeholder="Enter URL exclusions"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="locationOfInterest">Location of Interest</Label>
            <Input
              id="locationOfInterest"
              value={formData.locationOfInterest}
              onChange={(e) => setFormData({ ...formData, locationOfInterest: e.target.value })}
              placeholder="Enter location of interest"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="brandInclusions">Brand Inclusions</Label>
            <Input
              id="brandInclusions"
              value={formData.brandInclusions}
              onChange={(e) => setFormData({ ...formData, brandInclusions: e.target.value })}
              placeholder="Enter brand inclusions"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => navigate("/google-ads/ad-groups")}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
