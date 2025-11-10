import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";

export default function AddAsset() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("headline");

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
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="overflow-x-auto">
              <TabsList className="inline-flex w-auto min-w-full">
                <TabsTrigger value="headline">Headline</TabsTrigger>
                <TabsTrigger value="long-headline">Long Headline</TabsTrigger>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
                <TabsTrigger value="sitelinks">Sitelinks</TabsTrigger>
                <TabsTrigger value="callouts">Callouts</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="headline" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="headlineText">Heading (up to 30 characters max)</Label>
                <Input
                  id="headlineText"
                  maxLength={30}
                  placeholder="Enter headline"
                />
              </div>
            </TabsContent>

            <TabsContent value="long-headline" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="longHeadlineText">Long headline (up to 90 characters max)</Label>
                <Input
                  id="longHeadlineText"
                  maxLength={90}
                  placeholder="Enter long headline"
                />
              </div>
            </TabsContent>

            <TabsContent value="description" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="descriptionText">Description (up to 90 characters max)</Label>
                <Textarea
                  id="descriptionText"
                  maxLength={90}
                  placeholder="Enter description"
                  rows={3}
                />
              </div>
            </TabsContent>

            <TabsContent value="images" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Add Images (Max file up to 5 images)</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Drag and drop images here, or click to browse
                  </p>
                  <Button variant="outline">
                    Browse Files
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="videos" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Add Videos (Max file up to 5 videos)</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Drag and drop videos here, or click to browse
                  </p>
                  <Button variant="outline">
                    Browse Files
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sitelinks" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="sitelinkText">Sitelink text</Label>
                <Input
                  id="sitelinkText"
                  placeholder="Enter sitelink text"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sitelinkDesc1">Description line 1</Label>
                <Input
                  id="sitelinkDesc1"
                  placeholder="Enter description line 1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sitelinkDesc2">Description line 2</Label>
                <Input
                  id="sitelinkDesc2"
                  placeholder="Enter description line 2"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sitelinkFinalUrl">Final URL</Label>
                <Input
                  id="sitelinkFinalUrl"
                  placeholder="https://example.com"
                />
              </div>
            </TabsContent>

            <TabsContent value="callouts" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="calloutText">Callout Text</Label>
                <Input
                  id="calloutText"
                  placeholder="Enter callout text (up to 25 characters max)"
                  maxLength={25}
                />
              </div>

              <div className="space-y-2">
                <Label>Assets Scheduling</Label>
                <Input type="date" placeholder="Start Date" className="mb-2" />
                <Input type="date" placeholder="End Date" />
              </div>
            </TabsContent>
          </Tabs>

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
