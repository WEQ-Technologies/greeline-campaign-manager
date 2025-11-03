import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Upload } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AssetsForm() {
  const navigate = useNavigate();
  const { id: campaignId, assetId } = useParams();
  const isEdit = !!assetId;

  const [assetType, setAssetType] = useState<string>("image");
  const [formData, setFormData] = useState({
    businessName: "",
    logo: "",
    mainColor: "#4CAF50",
    accentColor: "#FF5722",
    font: "",
    shortHeadline: "",
    longHeadline: "",
    description1: "",
    description2: "",
    description3: "",
    description4: "",
  });

  const handleSave = () => {
    toast.success(isEdit ? "Asset updated successfully!" : "Asset created successfully!");
    navigate(`/campaigns/${campaignId}/assets`);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(`/campaigns/${campaignId}/assets`)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEdit ? "Edit Asset" : "Add Asset"}
          </h1>
          <p className="text-muted-foreground mt-1">Manage creative assets and brand guidelines</p>
        </div>
      </div>

      <Tabs defaultValue="brand" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="brand">Brand Guidelines</TabsTrigger>
          <TabsTrigger value="text">Text Assets</TabsTrigger>
          <TabsTrigger value="media">Media Assets</TabsTrigger>
          <TabsTrigger value="extensions">Extensions</TabsTrigger>
        </TabsList>

        <TabsContent value="brand" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Brand Guidelines</CardTitle>
              <CardDescription>Define your brand identity for consistent ad creation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="Your Business Name"
                  maxLength={30}
                />
              </div>

              <div className="space-y-2">
                <Label>Brand Logo</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">Upload your logo (PNG, JPG, SVG)</p>
                  <Button variant="outline" size="sm">
                    Browse Files
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mainColor">Main Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="mainColor"
                      type="color"
                      value={formData.mainColor}
                      onChange={(e) => setFormData({ ...formData, mainColor: e.target.value })}
                      className="w-20 h-10"
                    />
                    <Input
                      value={formData.mainColor}
                      onChange={(e) => setFormData({ ...formData, mainColor: e.target.value })}
                      placeholder="#4CAF50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accentColor">Accent Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="accentColor"
                      type="color"
                      value={formData.accentColor}
                      onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                      className="w-20 h-10"
                    />
                    <Input
                      value={formData.accentColor}
                      onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                      placeholder="#FF5722"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="font">Brand Font</Label>
                <Select value={formData.font} onValueChange={(value) => setFormData({ ...formData, font: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="roboto">Roboto</SelectItem>
                    <SelectItem value="open-sans">Open Sans</SelectItem>
                    <SelectItem value="lato">Lato</SelectItem>
                    <SelectItem value="montserrat">Montserrat</SelectItem>
                    <SelectItem value="poppins">Poppins</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="text" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Headlines</CardTitle>
              <CardDescription>Create short and long headlines for your ads</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shortHeadline">Short Headline (30 chars max)</Label>
                <Input
                  id="shortHeadline"
                  value={formData.shortHeadline}
                  onChange={(e) => setFormData({ ...formData, shortHeadline: e.target.value })}
                  maxLength={30}
                  placeholder="e.g., Winter Sale - Save 30%"
                />
                <p className="text-xs text-muted-foreground">{formData.shortHeadline.length}/30</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="longHeadline">Long Headline (90 chars max)</Label>
                <Input
                  id="longHeadline"
                  value={formData.longHeadline}
                  onChange={(e) => setFormData({ ...formData, longHeadline: e.target.value })}
                  maxLength={90}
                  placeholder="e.g., Experience Premium Quality Winter Products - Up to 30% Off All Models"
                />
                <p className="text-xs text-muted-foreground">{formData.longHeadline.length}/90</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Descriptions</CardTitle>
              <CardDescription>Add up to 4 descriptions (90 chars each)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="space-y-2">
                  <Label htmlFor={`description${num}`}>Description {num}</Label>
                  <Textarea
                    id={`description${num}`}
                    value={formData[`description${num}` as keyof typeof formData]}
                    onChange={(e) =>
                      setFormData({ ...formData, [`description${num}`]: e.target.value })
                    }
                    maxLength={90}
                    rows={2}
                    placeholder={`Enter description ${num}`}
                  />
                  <p className="text-xs text-muted-foreground">
                    {String(formData[`description${num}` as keyof typeof formData]).length}/90
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Images</CardTitle>
              <CardDescription>Upload images for your ads (recommended sizes: 1200x628, 1200x1200)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drag and drop images here, or click to browse
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  Supports: JPG, PNG, GIF (max 5MB each)
                </p>
                <Button variant="outline">Browse Images</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Videos</CardTitle>
              <CardDescription>Upload videos or add YouTube links</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="youtubeUrl">YouTube URL</Label>
                <Input
                  id="youtubeUrl"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or upload video</span>
                </div>
              </div>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">Upload video file (MP4, max 100MB)</p>
                <Button variant="outline" size="sm">
                  Browse Videos
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="extensions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Display Path</CardTitle>
              <CardDescription>Customize the display URL path</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Display Path Format: url/path1/path2</Label>
                <div className="flex gap-2 items-center">
                  <span className="text-sm text-muted-foreground">url/</span>
                  <Input placeholder="path1" maxLength={15} className="flex-1" />
                  <span className="text-sm text-muted-foreground">/</span>
                  <Input placeholder="path2" maxLength={15} className="flex-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between pt-4 border-t">
        <Button variant="outline" onClick={() => navigate(`/campaigns/${campaignId}/assets`)}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          {isEdit ? "Update Asset" : "Add Asset"}
        </Button>
      </div>
    </div>
  );
}
