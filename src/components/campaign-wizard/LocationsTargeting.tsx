import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { X, Plus, Trash2 } from "lucide-react";

interface LocationsTargetingProps {
  data: {
    locationType: string;
    customLocations: string[];
    languages: string[];
    adSchedule: Array<{ days: string; startTime: string; endTime: string }>;
    devices: string[];
    brandExclusions: string[];
    ageExclusions: string[];
    trackingTemplate: string;
    finalUrlSuffix: string;
    customParameters: Array<{ name: string; value: string }>;
    pageFeed: string;
  };
  onChange: (field: string, value: any) => void;
}

const availableLanguages = ["English", "Spanish", "French", "German", "Chinese", "Hindi", "Arabic", "Portuguese", "Russian", "Japanese"];
const availableDevices = ["Computers", "Mobile Devices", "TV Screens", "Tablets"];
const ageRanges = ["18-24", "25-34", "35-44", "45-54", "55-65", "65+", "Unknown"];
const brandsList = ["Brand A", "Brand B", "Brand C", "Brand D", "Brand E"];

export function LocationsTargeting({ data, onChange }: LocationsTargetingProps) {
  const addCustomLocation = (location: string) => {
    if (location && !data.customLocations.includes(location)) {
      onChange("customLocations", [...data.customLocations, location]);
    }
  };

  const removeCustomLocation = (location: string) => {
    onChange("customLocations", data.customLocations.filter((l) => l !== location));
  };

  const toggleLanguage = (language: string) => {
    const updated = data.languages.includes(language)
      ? data.languages.filter((l) => l !== language)
      : [...data.languages, language];
    onChange("languages", updated);
  };

  const toggleDevice = (device: string) => {
    const updated = data.devices.includes(device)
      ? data.devices.filter((d) => d !== device)
      : [...data.devices, device];
    onChange("devices", updated);
  };

  const toggleAge = (age: string) => {
    const updated = data.ageExclusions.includes(age)
      ? data.ageExclusions.filter((a) => a !== age)
      : [...data.ageExclusions, age];
    onChange("ageExclusions", updated);
  };

  const toggleBrand = (brand: string) => {
    const updated = data.brandExclusions.includes(brand)
      ? data.brandExclusions.filter((b) => b !== brand)
      : [...data.brandExclusions, brand];
    onChange("brandExclusions", updated);
  };

  const addSchedule = () => {
    onChange("adSchedule", [...data.adSchedule, { days: "all", startTime: "09:00", endTime: "17:00" }]);
  };

  const updateSchedule = (index: number, field: string, value: string) => {
    const updated = [...data.adSchedule];
    updated[index] = { ...updated[index], [field]: value };
    onChange("adSchedule", updated);
  };

  const removeSchedule = (index: number) => {
    onChange("adSchedule", data.adSchedule.filter((_, i) => i !== index));
  };

  const addCustomParameter = () => {
    onChange("customParameters", [...data.customParameters, { name: "", value: "" }]);
  };

  const updateCustomParameter = (index: number, field: string, value: string) => {
    const updated = [...data.customParameters];
    updated[index] = { ...updated[index], [field]: value };
    onChange("customParameters", updated);
  };

  const removeCustomParameter = (index: number) => {
    onChange("customParameters", data.customParameters.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Location</CardTitle>
          <CardDescription>Choose where your ads will be shown</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup value={data.locationType} onValueChange={(value) => onChange("locationType", value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all-countries" id="all-countries" />
              <Label htmlFor="all-countries" className="font-normal cursor-pointer">All Countries</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="current" id="current" />
              <Label htmlFor="current" className="font-normal cursor-pointer">Current Location</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="custom" id="custom" />
              <Label htmlFor="custom" className="font-normal cursor-pointer">Enter Custom Location</Label>
            </div>
          </RadioGroup>

          {data.locationType === "custom" && (
            <div className="space-y-2 pl-6">
              <Input
                placeholder="Enter city, state, or country"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addCustomLocation(e.currentTarget.value);
                    e.currentTarget.value = "";
                  }
                }}
              />
              <p className="text-xs text-muted-foreground">Press Enter to add locations</p>
              {data.customLocations.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {data.customLocations.map((location) => (
                    <Badge key={location} variant="secondary" className="gap-1">
                      {location}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => removeCustomLocation(location)} />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Languages</CardTitle>
          <CardDescription>Select target languages</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Ad Schedule</CardTitle>
              <CardDescription>Set specific days and times</CardDescription>
            </div>
            <Button onClick={addSchedule} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Schedule
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.adSchedule.map((schedule, index) => (
            <div key={index} className="grid grid-cols-12 gap-2 items-center">
              <Select
                value={schedule.days}
                onValueChange={(value) => updateSchedule(index, "days", value)}
              >
                <SelectTrigger className="col-span-4">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Days</SelectItem>
                  <SelectItem value="weekdays">Monday-Friday</SelectItem>
                  <SelectItem value="weekend">Saturday-Sunday</SelectItem>
                  <SelectItem value="monday">Monday</SelectItem>
                  <SelectItem value="tuesday">Tuesday</SelectItem>
                  <SelectItem value="wednesday">Wednesday</SelectItem>
                  <SelectItem value="thursday">Thursday</SelectItem>
                  <SelectItem value="friday">Friday</SelectItem>
                  <SelectItem value="saturday">Saturday</SelectItem>
                  <SelectItem value="sunday">Sunday</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="time"
                className="col-span-3"
                value={schedule.startTime}
                onChange={(e) => updateSchedule(index, "startTime", e.target.value)}
              />
              <span className="col-span-1 text-center text-muted-foreground">to</span>
              <Input
                type="time"
                className="col-span-3"
                value={schedule.endTime}
                onChange={(e) => updateSchedule(index, "endTime", e.target.value)}
              />
              <Button
                variant="ghost"
                size="icon"
                className="col-span-1"
                onClick={() => removeSchedule(index)}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Devices</CardTitle>
          <CardDescription>Choose device types</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {availableDevices.map((device) => (
              <div key={device} className="flex items-center space-x-2">
                <Checkbox
                  id={device}
                  checked={data.devices.includes(device)}
                  onCheckedChange={() => toggleDevice(device)}
                />
                <Label htmlFor={device} className="font-normal cursor-pointer">
                  {device}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Brand Exclusions</CardTitle>
          <CardDescription>Exclude specific brands</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {brandsList.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={data.brandExclusions.includes(brand)}
                  onCheckedChange={() => toggleBrand(brand)}
                />
                <Label htmlFor={`brand-${brand}`} className="font-normal cursor-pointer">
                  {brand}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Age Exclusions</CardTitle>
          <CardDescription>Exclude specific age ranges</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {ageRanges.map((age) => (
              <div key={age} className="flex items-center space-x-2">
                <Checkbox
                  id={`age-${age}`}
                  checked={data.ageExclusions.includes(age)}
                  onCheckedChange={() => toggleAge(age)}
                />
                <Label htmlFor={`age-${age}`} className="font-normal cursor-pointer">
                  {age}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Campaign URL Options</CardTitle>
          <CardDescription>Add tracking and custom parameters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tracking-template">Tracking Template URL</Label>
            <Input
              id="tracking-template"
              placeholder="https://example.com/track?..."
              value={data.trackingTemplate}
              onChange={(e) => onChange("trackingTemplate", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="final-url-suffix">Final URL Suffix</Label>
            <Input
              id="final-url-suffix"
              placeholder="utm_source=google&utm_medium=cpc"
              value={data.finalUrlSuffix}
              onChange={(e) => onChange("finalUrlSuffix", e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Custom Parameters</Label>
              <Button onClick={addCustomParameter} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Parameter
              </Button>
            </div>
            {data.customParameters.map((param, index) => (
              <div key={index} className="grid grid-cols-12 gap-2">
                <Input
                  placeholder="Name"
                  className="col-span-5"
                  value={param.name}
                  onChange={(e) => updateCustomParameter(index, "name", e.target.value)}
                />
                <Input
                  placeholder="Value"
                  className="col-span-6"
                  value={param.value}
                  onChange={(e) => updateCustomParameter(index, "value", e.target.value)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="col-span-1"
                  onClick={() => removeCustomParameter(index)}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Page Feed</CardTitle>
          <CardDescription>Add page feed for dynamic content</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Enter page feed URL"
            value={data.pageFeed}
            onChange={(e) => onChange("pageFeed", e.target.value)}
          />
        </CardContent>
      </Card>
    </div>
  );
}
