import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Plus, X } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

interface CampaignSettingsStepProps {
  data: {
    audience: string;
    locations: string[];
    languages: string[];
    adSchedule: Array<{ days: string; startTime: string; endTime: string }>;
    trackingTemplate: string;
    finalUrlSuffix: string;
    customParameters: Array<{ name: string; value: string }>;
    pageFeed: string;
  };
  onChange: (field: string, value: any) => void;
}

const availableAudiences = [
  { id: "1", name: "Tech Enthusiasts 25-45" },
  { id: "2", name: "Auto Owners - Premium" },
  { id: "3", name: "Local Glass Service Seekers" },
];

const availableLanguages = ["English", "Spanish", "French", "German", "Chinese"];

export function CampaignSettingsStep({ data, onChange }: CampaignSettingsStepProps) {
  const [createAudienceOpen, setCreateAudienceOpen] = useState(false);
  const [newLocation, setNewLocation] = useState("");

  const addLocation = () => {
    if (newLocation.trim()) {
      onChange("locations", [...data.locations, newLocation.trim()]);
      setNewLocation("");
    }
  };

  const removeLocation = (index: number) => {
    onChange("locations", data.locations.filter((_, i) => i !== index));
  };

  const toggleLanguage = (language: string) => {
    if (data.languages.includes(language)) {
      onChange("languages", data.languages.filter((l) => l !== language));
    } else {
      onChange("languages", [...data.languages, language]);
    }
  };

  const addScheduleEntry = () => {
    onChange("adSchedule", [...data.adSchedule, { days: "", startTime: "", endTime: "" }]);
  };

  const updateScheduleEntry = (index: number, field: string, value: string) => {
    const updated = [...data.adSchedule];
    updated[index] = { ...updated[index], [field]: value };
    onChange("adSchedule", updated);
  };

  const removeScheduleEntry = (index: number) => {
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
    <div className="space-y-4">
      <Collapsible defaultOpen>
        <Card>
          <CollapsibleTrigger className="w-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="text-left">
                <CardTitle>Audience</CardTitle>
                <CardDescription>Select or create audience segments</CardDescription>
              </div>
              <ChevronDown className="h-5 w-5 transition-transform duration-200" />
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="audience">Select Audience</Label>
                <Select value={data.audience} onValueChange={(value) => onChange("audience", value)}>
                  <SelectTrigger id="audience">
                    <SelectValue placeholder="Select an audience" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableAudiences.map((aud) => (
                      <SelectItem key={aud.id} value={aud.id}>
                        {aud.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Dialog open={createAudienceOpen} onOpenChange={setCreateAudienceOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Audience
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create Audience</DialogTitle>
                  </DialogHeader>
                  <div className="py-4 space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Please use the below link for Audience creation
                    </p>
                    <Button 
                      className="w-full" 
                      onClick={() => window.open('https://ads.google.com/aw/audiences', '_blank')}
                    >
                      Open Google Ads
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      <Collapsible>
        <Card>
          <CollapsibleTrigger className="w-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="text-left">
                <CardTitle>Location</CardTitle>
                <CardDescription>Target specific locations</CardDescription>
              </div>
              <ChevronDown className="h-5 w-5 transition-transform duration-200" />
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter location"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addLocation()}
                />
                <Button onClick={addLocation}>Add</Button>
              </div>
              <div className="space-y-2">
                {data.locations.map((location, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                    <span className="text-sm">{location}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLocation(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      <Collapsible>
        <Card>
          <CollapsibleTrigger className="w-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="text-left">
                <CardTitle>Languages</CardTitle>
                <CardDescription>Select target languages</CardDescription>
              </div>
              <ChevronDown className="h-5 w-5 transition-transform duration-200" />
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-3">
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
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      <Collapsible>
        <Card>
          <CollapsibleTrigger className="w-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="text-left">
                <CardTitle>Ad Schedule</CardTitle>
                <CardDescription>Set when your ads will run</CardDescription>
              </div>
              <ChevronDown className="h-5 w-5 transition-transform duration-200" />
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <Button variant="outline" onClick={addScheduleEntry} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Schedule
              </Button>
              {data.adSchedule.map((schedule, index) => (
                <div key={index} className="p-4 border rounded-md space-y-3">
                  <div className="flex justify-between items-center">
                    <Label>Schedule {index + 1}</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeScheduleEntry(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid gap-3">
                    <Input
                      placeholder="Days (e.g., Mon-Fri)"
                      value={schedule.days}
                      onChange={(e) => updateScheduleEntry(index, "days", e.target.value)}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="time"
                        placeholder="Start Time"
                        value={schedule.startTime}
                        onChange={(e) => updateScheduleEntry(index, "startTime", e.target.value)}
                      />
                      <Input
                        type="time"
                        placeholder="End Time"
                        value={schedule.endTime}
                        onChange={(e) => updateScheduleEntry(index, "endTime", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      <Collapsible>
        <Card>
          <CollapsibleTrigger className="w-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="text-left">
                <CardTitle>Campaign URL Options</CardTitle>
                <CardDescription>Configure tracking and URL parameters</CardDescription>
              </div>
              <ChevronDown className="h-5 w-5 transition-transform duration-200" />
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="trackingTemplate">Tracking Template</Label>
                <Input
                  id="trackingTemplate"
                  placeholder="Enter tracking template URL"
                  value={data.trackingTemplate}
                  onChange={(e) => onChange("trackingTemplate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="finalUrlSuffix">Final URL Suffix</Label>
                <Input
                  id="finalUrlSuffix"
                  placeholder="Enter final URL suffix"
                  value={data.finalUrlSuffix}
                  onChange={(e) => onChange("finalUrlSuffix", e.target.value)}
                />
              </div>
              <div className="space-y-3">
                <Label>Custom Parameters</Label>
                <Button variant="outline" onClick={addCustomParameter} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Parameter
                </Button>
                {data.customParameters.map((param, index) => (
                  <div key={index} className="grid grid-cols-[1fr,1fr,auto] gap-2">
                    <Input
                      placeholder="Name"
                      value={param.name}
                      onChange={(e) => updateCustomParameter(index, "name", e.target.value)}
                    />
                    <Input
                      placeholder="Value"
                      value={param.value}
                      onChange={(e) => updateCustomParameter(index, "value", e.target.value)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCustomParameter(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      <Collapsible>
        <Card>
          <CollapsibleTrigger className="w-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="text-left">
                <CardTitle>Page Feed</CardTitle>
                <CardDescription>Configure page feed settings</CardDescription>
              </div>
              <ChevronDown className="h-5 w-5 transition-transform duration-200" />
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="pageFeed">Page Feed URL</Label>
                <Input
                  id="pageFeed"
                  placeholder="Enter page feed URL"
                  value={data.pageFeed}
                  onChange={(e) => onChange("pageFeed", e.target.value)}
                />
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
}
