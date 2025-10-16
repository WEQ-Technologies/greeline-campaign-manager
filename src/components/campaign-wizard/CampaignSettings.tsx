import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CampaignSettingsProps {
  data: {
    name: string;
    type: string;
    objective: string;
  };
  onChange: (field: string, value: string) => void;
}

export function CampaignSettings({ data, onChange }: CampaignSettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Settings</CardTitle>
        <CardDescription>Configure basic campaign details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="campaign-name">Campaign Name</Label>
          <Input
            id="campaign-name"
            placeholder="e.g., Summer Sale 2025"
            value={data.name}
            onChange={(e) => onChange("name", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="campaign-type">Campaign Type</Label>
          <Select value={data.type} onValueChange={(value) => onChange("type", value)}>
            <SelectTrigger id="campaign-type">
              <SelectValue placeholder="Select campaign type" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="google-search">Google Search Ads</SelectItem>
              <SelectItem value="facebook">Facebook Ads</SelectItem>
              <SelectItem value="instagram">Instagram Ads</SelectItem>
              <SelectItem value="linkedin">LinkedIn Ads</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="objective">Campaign Objective</Label>
          <Select value={data.objective} onValueChange={(value) => onChange("objective", value)}>
            <SelectTrigger id="objective">
              <SelectValue placeholder="Select objective" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="leads">Generate Leads</SelectItem>
              <SelectItem value="traffic">Website Traffic</SelectItem>
              <SelectItem value="conversions">Conversions</SelectItem>
              <SelectItem value="awareness">Brand Awareness</SelectItem>
              <SelectItem value="engagement">Engagement</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
