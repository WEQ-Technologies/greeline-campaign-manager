import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface AdsCreationProps {
  data: {
    headline1: string;
    headline2: string;
    headline3: string;
    description1: string;
    description2: string;
    finalUrl: string;
  };
  onChange: (field: string, value: string) => void;
}

export function AdsCreation({ data, onChange }: AdsCreationProps) {
  const headline1Length = data.headline1.length;
  const headline2Length = data.headline2.length;
  const headline3Length = data.headline3.length;
  const desc1Length = data.description1.length;
  const desc2Length = data.description2.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Ads</CardTitle>
        <CardDescription>Write compelling ad copy with character limits</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Headline 1 (Required)</Label>
            <span className={`text-xs ${headline1Length > 30 ? "text-destructive" : "text-muted-foreground"}`}>
              {headline1Length}/30
            </span>
          </div>
          <Input
            value={data.headline1}
            onChange={(e) => onChange("headline1", e.target.value)}
            maxLength={30}
            placeholder="Best Service in Your Area"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Headline 2</Label>
            <span className={`text-xs ${headline2Length > 30 ? "text-destructive" : "text-muted-foreground"}`}>
              {headline2Length}/30
            </span>
          </div>
          <Input
            value={data.headline2}
            onChange={(e) => onChange("headline2", e.target.value)}
            maxLength={30}
            placeholder="Fast & Reliable Solutions"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Headline 3</Label>
            <span className={`text-xs ${headline3Length > 30 ? "text-destructive" : "text-muted-foreground"}`}>
              {headline3Length}/30
            </span>
          </div>
          <Input
            value={data.headline3}
            onChange={(e) => onChange("headline3", e.target.value)}
            maxLength={30}
            placeholder="Get Started Today"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Description 1 (Required)</Label>
            <span className={`text-xs ${desc1Length > 90 ? "text-destructive" : "text-muted-foreground"}`}>
              {desc1Length}/90
            </span>
          </div>
          <Textarea
            value={data.description1}
            onChange={(e) => onChange("description1", e.target.value)}
            maxLength={90}
            placeholder="Discover our premium services designed to meet your needs."
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Description 2</Label>
            <span className={`text-xs ${desc2Length > 90 ? "text-destructive" : "text-muted-foreground"}`}>
              {desc2Length}/90
            </span>
          </div>
          <Textarea
            value={data.description2}
            onChange={(e) => onChange("description2", e.target.value)}
            maxLength={90}
            placeholder="Contact us today for a free consultation and quote."
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label>Final URL (Required)</Label>
          <Input
            value={data.finalUrl}
            onChange={(e) => onChange("finalUrl", e.target.value)}
            placeholder="https://www.example.com"
            type="url"
          />
        </div>
      </CardContent>
    </Card>
  );
}
