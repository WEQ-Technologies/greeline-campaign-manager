import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

export default function OtherSettings() {
  const { id: campaignId } = useParams();

  const [keywords, setKeywords] = useState<Array<{ text: string; matchType: string; bid: string }>>([
    { text: "winter suv sale", matchType: "broad", bid: "2.50" },
  ]);

  const [locations, setLocations] = useState<string[]>(["United States", "Canada"]);
  const [adSchedule, setAdSchedule] = useState<Array<{ days: string; startTime: string; endTime: string }>>([
    { days: "Monday-Friday", startTime: "09:00", endTime: "18:00" },
  ]);

  const addKeyword = () => {
    setKeywords([...keywords, { text: "", matchType: "broad", bid: "" }]);
  };

  const removeKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const addLocation = (location: string) => {
    if (location && !locations.includes(location)) {
      setLocations([...locations, location]);
    }
  };

  const removeLocation = (location: string) => {
    setLocations(locations.filter((l) => l !== location));
  };

  const addSchedule = () => {
    setAdSchedule([...adSchedule, { days: "", startTime: "", endTime: "" }]);
  };

  const removeSchedule = (index: number) => {
    setAdSchedule(adSchedule.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    toast.success("Settings updated successfully!");
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Other Settings</h1>
        <p className="text-muted-foreground mt-1">Configure keywords, targeting, and scheduling</p>
      </div>

      <Tabs defaultValue="keywords" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="location">Location Targeting</TabsTrigger>
          <TabsTrigger value="schedule">Ad Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="keywords" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Keywords</CardTitle>
                  <CardDescription>Manage keywords for Search campaigns</CardDescription>
                </div>
                <Button onClick={addKeyword} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Keyword
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {keywords.map((keyword, index) => (
                <Card key={index}>
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-12 gap-3 items-end">
                      <div className="col-span-5 space-y-2">
                        <Label>Keyword Text</Label>
                        <Input
                          value={keyword.text}
                          onChange={(e) => {
                            const newKeywords = [...keywords];
                            newKeywords[index].text = e.target.value;
                            setKeywords(newKeywords);
                          }}
                          placeholder="e.g., winter suv sale"
                        />
                      </div>
                      <div className="col-span-3 space-y-2">
                        <Label>Match Type</Label>
                        <Select
                          value={keyword.matchType}
                          onValueChange={(value) => {
                            const newKeywords = [...keywords];
                            newKeywords[index].matchType = value;
                            setKeywords(newKeywords);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="broad">Broad</SelectItem>
                            <SelectItem value="phrase">Phrase</SelectItem>
                            <SelectItem value="exact">Exact</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-3 space-y-2">
                        <Label>Bid ($)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={keyword.bid}
                          onChange={(e) => {
                            const newKeywords = [...keywords];
                            newKeywords[index].bid = e.target.value;
                            setKeywords(newKeywords);
                          }}
                          placeholder="2.50"
                        />
                      </div>
                      <div className="col-span-1">
                        <Button variant="ghost" size="icon" onClick={() => removeKeyword(index)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Settings</CardTitle>
              <CardDescription>Configure content and asset enhancements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pageFeed">Page Feed URLs</Label>
                <Input
                  id="pageFeed"
                  placeholder="Enter page feed URL or ID"
                />
              </div>

              <div className="space-y-3">
                <Label>Asset Enhancements</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox id="imageEnhancements" />
                  <label htmlFor="imageEnhancements" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Enable image enhancements
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="videoEnhancements" />
                  <label htmlFor="videoEnhancements" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Enable video enhancements
                  </label>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="finalUrlExpansion" />
                  <label htmlFor="finalUrlExpansion" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Enable Final URL Expansion
                  </label>
                </div>
                <p className="text-sm text-muted-foreground ml-6">
                  Allow Google to use additional pages from your website as landing pages
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excludedUrls">Excluded URLs</Label>
                <Input
                  id="excludedUrls"
                  placeholder="Enter URLs to exclude (comma-separated)"
                />
                <p className="text-xs text-muted-foreground">
                  Prevent specific pages from being used in Final URL Expansion
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="location" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Location Targeting</CardTitle>
              <CardDescription>Define where your ads will be shown</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Target Locations</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter location (city, state, country)"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        const input = e.target as HTMLInputElement;
                        addLocation(input.value);
                        input.value = "";
                      }
                    }}
                  />
                  <Button
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                      addLocation(input.value);
                      input.value = "";
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {locations.map((location) => (
                  <Badge key={location} variant="secondary" className="px-3 py-1">
                    {location}
                    <button
                      onClick={() => removeLocation(location)}
                      className="ml-2 hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>

              <div className="space-y-2">
                <Label>Quick Options</Label>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => addLocation("All Countries")}>
                    All Countries
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => addLocation("United States")}>
                    United States
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => addLocation("Current Location")}>
                    Current Location
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Ad Schedule</CardTitle>
                  <CardDescription>Set when your ads should run</CardDescription>
                </div>
                <Button onClick={addSchedule} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Schedule
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {adSchedule.map((schedule, index) => (
                <Card key={index}>
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-12 gap-3 items-end">
                      <div className="col-span-5 space-y-2">
                        <Label>Days</Label>
                        <Select
                          value={schedule.days}
                          onValueChange={(value) => {
                            const newSchedule = [...adSchedule];
                            newSchedule[index].days = value;
                            setAdSchedule(newSchedule);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select days" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="All Days">All Days</SelectItem>
                            <SelectItem value="Monday-Friday">Monday-Friday</SelectItem>
                            <SelectItem value="Saturday-Sunday">Saturday-Sunday</SelectItem>
                            <SelectItem value="Monday">Monday</SelectItem>
                            <SelectItem value="Tuesday">Tuesday</SelectItem>
                            <SelectItem value="Wednesday">Wednesday</SelectItem>
                            <SelectItem value="Thursday">Thursday</SelectItem>
                            <SelectItem value="Friday">Friday</SelectItem>
                            <SelectItem value="Saturday">Saturday</SelectItem>
                            <SelectItem value="Sunday">Sunday</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-3 space-y-2">
                        <Label>Start Time</Label>
                        <Input
                          type="time"
                          value={schedule.startTime}
                          onChange={(e) => {
                            const newSchedule = [...adSchedule];
                            newSchedule[index].startTime = e.target.value;
                            setAdSchedule(newSchedule);
                          }}
                        />
                      </div>
                      <div className="col-span-3 space-y-2">
                        <Label>End Time</Label>
                        <Input
                          type="time"
                          value={schedule.endTime}
                          onChange={(e) => {
                            const newSchedule = [...adSchedule];
                            newSchedule[index].endTime = e.target.value;
                            setAdSchedule(newSchedule);
                          }}
                        />
                      </div>
                      <div className="col-span-1">
                        <Button variant="ghost" size="icon" onClick={() => removeSchedule(index)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end pt-4 border-t">
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
}
