import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, MapPin } from "lucide-react";

interface ExtensionsProps {
  data: {
    sitelinks: Array<{ text: string; url: string }>;
    callouts: string[];
    locations: string[];
  };
  onChange: (field: string, value: any) => void;
}

const verifiedLocations = [
  "123 Main St, New York, NY",
  "456 Oak Ave, Los Angeles, CA",
  "789 Pine Rd, Chicago, IL",
];

export function Extensions({ data, onChange }: ExtensionsProps) {
  const addSitelink = () => {
    onChange("sitelinks", [...data.sitelinks, { text: "", url: "" }]);
  };

  const updateSitelink = (index: number, field: string, value: string) => {
    const updated = [...data.sitelinks];
    updated[index] = { ...updated[index], [field]: value };
    onChange("sitelinks", updated);
  };

  const removeSitelink = (index: number) => {
    onChange("sitelinks", data.sitelinks.filter((_, i) => i !== index));
  };

  const addCallout = (callout: string) => {
    if (callout && !data.callouts.includes(callout)) {
      onChange("callouts", [...data.callouts, callout]);
    }
  };

  const removeCallout = (callout: string) => {
    onChange("callouts", data.callouts.filter((c) => c !== callout));
  };

  const toggleLocation = (location: string) => {
    const updated = data.locations.includes(location)
      ? data.locations.filter((l) => l !== location)
      : [...data.locations, location];
    onChange("locations", updated);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ad Extensions</CardTitle>
        <CardDescription>Enhance your ads with additional information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sitelinks */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Sitelinks</Label>
            <Button onClick={addSitelink} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Sitelink
            </Button>
          </div>
          {data.sitelinks.map((sitelink, index) => (
            <div key={index} className="grid grid-cols-12 gap-2">
              <Input
                placeholder="Link text (max 25 chars)"
                className="col-span-5"
                maxLength={25}
                value={sitelink.text}
                onChange={(e) => updateSitelink(index, "text", e.target.value)}
              />
              <Input
                placeholder="https://example.com/page"
                className="col-span-6"
                value={sitelink.url}
                onChange={(e) => updateSitelink(index, "url", e.target.value)}
              />
              <Button
                variant="ghost"
                size="icon"
                className="col-span-1"
                onClick={() => removeSitelink(index)}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>

        {/* Callouts */}
        <div className="space-y-3">
          <Label>Callouts</Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Free Shipping, 24/7 Support"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addCallout(e.currentTarget.value);
                  e.currentTarget.value = "";
                }
              }}
            />
          </div>
          <p className="text-xs text-muted-foreground">Press Enter to add callouts</p>
          {data.callouts.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {data.callouts.map((callout, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                >
                  {callout}
                  <Trash2
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => removeCallout(callout)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Location Extensions */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <Label>Location Extensions (from Google Business Profile)</Label>
          </div>
          <div className="space-y-2 border rounded-lg p-4">
            {verifiedLocations.map((location) => (
              <div key={location} className="flex items-center space-x-2">
                <Checkbox
                  id={location}
                  checked={data.locations.includes(location)}
                  onCheckedChange={() => toggleLocation(location)}
                />
                <Label htmlFor={location} className="font-normal cursor-pointer">
                  {location}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
