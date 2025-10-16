import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface LocationsTargetingProps {
  data: {
    locations: string[];
    radius: string;
    languages: string[];
  };
  onChange: (field: string, value: any) => void;
}

const availableLanguages = ["English", "Spanish", "French", "German", "Chinese"];

export function LocationsTargeting({ data, onChange }: LocationsTargetingProps) {
  const addLocation = (location: string) => {
    if (location && !data.locations.includes(location)) {
      onChange("locations", [...data.locations, location]);
    }
  };

  const removeLocation = (location: string) => {
    onChange("locations", data.locations.filter((l) => l !== location));
  };

  const toggleLanguage = (language: string) => {
    const updated = data.languages.includes(language)
      ? data.languages.filter((l) => l !== language)
      : [...data.languages, language];
    onChange("languages", updated);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Locations & Targeting</CardTitle>
        <CardDescription>Define geographic and demographic targeting</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="location">Target Locations</Label>
          <div className="flex gap-2">
            <Input
              id="location"
              placeholder="Enter city, state, or country"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addLocation(e.currentTarget.value);
                  e.currentTarget.value = "";
                }
              }}
            />
          </div>
          <p className="text-xs text-muted-foreground">Press Enter to add locations</p>
          {data.locations.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {data.locations.map((location) => (
                <Badge key={location} variant="secondary" className="gap-1">
                  {location}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => removeLocation(location)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="radius">Target Radius (miles)</Label>
          <Input
            id="radius"
            type="number"
            placeholder="25"
            value={data.radius}
            onChange={(e) => onChange("radius", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            How far from target locations to show ads
          </p>
        </div>

        <div className="space-y-3">
          <Label>Languages</Label>
          <div className="space-y-2">
            {availableLanguages.map((language) => (
              <div key={language} className="flex items-center space-x-2">
                <Checkbox
                  id={language}
                  checked={data.languages.includes(language)}
                  onCheckedChange={() => toggleLanguage(language)}
                />
                <Label htmlFor={language} className="font-normal cursor-pointer">
                  {language}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
