import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, Smartphone, Monitor, Plus, MapPin } from "lucide-react";
import { toast } from "sonner";

const mockAdGroups = [
  {
    id: "1",
    name: "Brand Keywords",
    keywords: [
      { id: "1", keyword: "digital marketing", matchType: "broad", cpc: "2.50", status: "active" },
      { id: "2", keyword: "online advertising", matchType: "phrase", cpc: "3.20", status: "active" },
      { id: "3", keyword: "ppc services", matchType: "exact", cpc: "4.10", status: "paused" },
    ],
  },
  {
    id: "2",
    name: "Service Keywords",
    keywords: [
      { id: "4", keyword: "seo agency", matchType: "broad", cpc: "2.80", status: "active" },
      { id: "5", keyword: "social media marketing", matchType: "phrase", cpc: "2.95", status: "active" },
    ],
  },
];

const verifiedLocations = [
  { id: "1", address: "123 Main St, New York, NY", attached: true },
  { id: "2", address: "456 Oak Ave, Los Angeles, CA", attached: false },
  { id: "3", address: "789 Pine Rd, Chicago, IL", attached: true },
];

export default function AdEditor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("keywords");
  const [selectedAdGroup, setSelectedAdGroup] = useState("1");

  // Ad form state
  const [adData, setAdData] = useState({
    headline1: "Best Digital Marketing Services",
    headline2: "Expert Team Ready to Help",
    headline3: "Get Results Today",
    description1: "Transform your business with our proven digital marketing strategies.",
    description2: "Contact us for a free consultation and custom quote.",
    finalUrl: "https://www.example.com",
    status: true,
  });

  const currentGroup = mockAdGroups.find((g) => g.id === selectedAdGroup);

  const handleSave = () => {
    toast.success("Changes saved successfully!");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/campaigns")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Edit Campaign</h1>
            <p className="text-muted-foreground mt-1">Brand Awareness Q1</p>
          </div>
        </div>
        <Button onClick={handleSave} className="bg-primary hover:bg-primary-hover">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="keywords">Keywords & Ad Groups</TabsTrigger>
          <TabsTrigger value="ads">Ad Editor</TabsTrigger>
          <TabsTrigger value="locations">Location Extensions</TabsTrigger>
        </TabsList>

        {/* Keywords & Ad Groups Tab */}
        <TabsContent value="keywords" className="space-y-6">
          <div className="flex gap-2">
            {mockAdGroups.map((group) => (
              <Badge
                key={group.id}
                variant={selectedAdGroup === group.id ? "default" : "outline"}
                className="cursor-pointer px-4 py-2"
                onClick={() => setSelectedAdGroup(group.id)}
              >
                {group.name}
              </Badge>
            ))}
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Group
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{currentGroup?.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Keyword</TableHead>
                    <TableHead>Match Type</TableHead>
                    <TableHead>Max CPC</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentGroup?.keywords.map((keyword) => (
                    <TableRow key={keyword.id}>
                      <TableCell>
                        <Input defaultValue={keyword.keyword} className="max-w-xs" />
                      </TableCell>
                      <TableCell>
                        <Select defaultValue={keyword.matchType}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-popover">
                            <SelectItem value="broad">Broad</SelectItem>
                            <SelectItem value="phrase">Phrase</SelectItem>
                            <SelectItem value="exact">Exact</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          step="0.01"
                          defaultValue={keyword.cpc}
                          className="w-24"
                        />
                      </TableCell>
                      <TableCell>
                        <Badge variant={keyword.status === "active" ? "default" : "secondary"}>
                          {keyword.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Ad Editor Tab */}
        <TabsContent value="ads" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left: Editor */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Ad Editor</CardTitle>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="ad-status">Active</Label>
                    <Switch
                      id="ad-status"
                      checked={adData.status}
                      onCheckedChange={(checked) =>
                        setAdData({ ...adData, status: checked })
                      }
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Headline 1</Label>
                    <span className="text-xs text-muted-foreground">
                      {adData.headline1.length}/30
                    </span>
                  </div>
                  <Input
                    value={adData.headline1}
                    onChange={(e) => setAdData({ ...adData, headline1: e.target.value })}
                    maxLength={30}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Headline 2</Label>
                    <span className="text-xs text-muted-foreground">
                      {adData.headline2.length}/30
                    </span>
                  </div>
                  <Input
                    value={adData.headline2}
                    onChange={(e) => setAdData({ ...adData, headline2: e.target.value })}
                    maxLength={30}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Headline 3</Label>
                    <span className="text-xs text-muted-foreground">
                      {adData.headline3.length}/30
                    </span>
                  </div>
                  <Input
                    value={adData.headline3}
                    onChange={(e) => setAdData({ ...adData, headline3: e.target.value })}
                    maxLength={30}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Description 1</Label>
                    <span className="text-xs text-muted-foreground">
                      {adData.description1.length}/90
                    </span>
                  </div>
                  <Textarea
                    value={adData.description1}
                    onChange={(e) => setAdData({ ...adData, description1: e.target.value })}
                    maxLength={90}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Description 2</Label>
                    <span className="text-xs text-muted-foreground">
                      {adData.description2.length}/90
                    </span>
                  </div>
                  <Textarea
                    value={adData.description2}
                    onChange={(e) => setAdData({ ...adData, description2: e.target.value })}
                    maxLength={90}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Final URL</Label>
                  <Input
                    value={adData.finalUrl}
                    onChange={(e) => setAdData({ ...adData, finalUrl: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Right: Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="desktop">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="desktop">
                      <Monitor className="w-4 h-4 mr-2" />
                      Desktop
                    </TabsTrigger>
                    <TabsTrigger value="mobile">
                      <Smartphone className="w-4 h-4 mr-2" />
                      Mobile
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="desktop" className="mt-4">
                    <div className="border rounded-lg p-4 bg-card space-y-2">
                      <p className="text-xs text-muted-foreground">Ad • example.com</p>
                      <h3 className="text-lg text-primary font-medium">
                        {adData.headline1} | {adData.headline2}
                      </h3>
                      <p className="text-sm text-muted-foreground">{adData.description1}</p>
                      <p className="text-xs text-success">{adData.finalUrl}</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="mobile" className="mt-4">
                    <div className="border rounded-lg p-3 bg-card space-y-2 max-w-sm">
                      <p className="text-xs text-muted-foreground">Ad • example.com</p>
                      <h3 className="text-base text-primary font-medium">
                        {adData.headline1}
                      </h3>
                      <p className="text-xs text-muted-foreground">{adData.description1}</p>
                      <p className="text-xs text-success truncate">{adData.finalUrl}</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Location Extensions Tab */}
        <TabsContent value="locations">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <CardTitle>Location Extensions</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Address</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Attached to Campaign</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {verifiedLocations.map((location) => (
                    <TableRow key={location.id}>
                      <TableCell className="font-medium">{location.address}</TableCell>
                      <TableCell>
                        <Badge variant="default">Verified</Badge>
                      </TableCell>
                      <TableCell>
                        <Switch defaultChecked={location.attached} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
