import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function AdGroupForm() {
  const navigate = useNavigate();
  const { id: campaignId, adGroupId } = useParams();
  const isEdit = !!adGroupId;

  const [formData, setFormData] = useState({
    name: "",
    finalUrl: "",
    displayPath1: "",
    displayPath2: "",
    headlines: ["", "", ""],
    longHeadlines: [""],
    descriptions: ["", ""],
    callToAction: "",
  });

  const [sitelinks, setSitelinks] = useState<Array<{
    text: string;
    desc1: string;
    desc2: string;
    finalUrl: string;
  }>>([]);

  const handleSave = () => {
    toast.success(isEdit ? "Ad Group updated successfully!" : "Ad Group created successfully!");
    navigate(`/campaigns/${campaignId}/ad-groups`);
  };

  const addSitelink = () => {
    setSitelinks([...sitelinks, { text: "", desc1: "", desc2: "", finalUrl: "" }]);
  };

  const removeSitelink = (index: number) => {
    setSitelinks(sitelinks.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(`/campaigns/${campaignId}/ad-groups`)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEdit ? "Edit Ad Group" : "Create Ad Group"}
          </h1>
          <p className="text-muted-foreground mt-1">Configure ad group settings and assets</p>
        </div>
      </div>

      <Tabs defaultValue="basics" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basics">Basics</TabsTrigger>
          <TabsTrigger value="ads">Ad Copy</TabsTrigger>
          <TabsTrigger value="extensions">Extensions</TabsTrigger>
          <TabsTrigger value="assets">Assets</TabsTrigger>
        </TabsList>

        <TabsContent value="basics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Ad Group Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Winter SUV Campaign"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="finalUrl">Final URL</Label>
                <Input
                  id="finalUrl"
                  value={formData.finalUrl}
                  onChange={(e) => setFormData({ ...formData, finalUrl: e.target.value })}
                  placeholder="https://example.com/landing-page"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="displayPath1">Display Path 1 (15 chars max)</Label>
                  <Input
                    id="displayPath1"
                    value={formData.displayPath1}
                    onChange={(e) => setFormData({ ...formData, displayPath1: e.target.value })}
                    maxLength={15}
                    placeholder="winter-sale"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="displayPath2">Display Path 2 (15 chars max)</Label>
                  <Input
                    id="displayPath2"
                    value={formData.displayPath2}
                    onChange={(e) => setFormData({ ...formData, displayPath2: e.target.value })}
                    maxLength={15}
                    placeholder="suvs"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ad Copy</CardTitle>
              <CardDescription>Create compelling headlines and descriptions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.headlines.map((headline, index) => (
                <div key={index} className="space-y-2">
                  <Label htmlFor={`headline-${index}`}>Headline {index + 1} (30 chars max)</Label>
                  <Input
                    id={`headline-${index}`}
                    value={headline}
                    onChange={(e) => {
                      const newHeadlines = [...formData.headlines];
                      newHeadlines[index] = e.target.value;
                      setFormData({ ...formData, headlines: newHeadlines });
                    }}
                    maxLength={30}
                    placeholder={`Enter headline ${index + 1}`}
                  />
                </div>
              ))}

              {formData.longHeadlines.map((headline, index) => (
                <div key={index} className="space-y-2">
                  <Label htmlFor={`long-headline-${index}`}>Long Headline {index + 1} (90 chars max)</Label>
                  <Input
                    id={`long-headline-${index}`}
                    value={headline}
                    onChange={(e) => {
                      const newHeadlines = [...formData.longHeadlines];
                      newHeadlines[index] = e.target.value;
                      setFormData({ ...formData, longHeadlines: newHeadlines });
                    }}
                    maxLength={90}
                    placeholder={`Enter long headline ${index + 1}`}
                  />
                </div>
              ))}

              {formData.descriptions.map((desc, index) => (
                <div key={index} className="space-y-2">
                  <Label htmlFor={`description-${index}`}>Description {index + 1} (90 chars max)</Label>
                  <Textarea
                    id={`description-${index}`}
                    value={desc}
                    onChange={(e) => {
                      const newDescs = [...formData.descriptions];
                      newDescs[index] = e.target.value;
                      setFormData({ ...formData, descriptions: newDescs });
                    }}
                    maxLength={90}
                    placeholder={`Enter description ${index + 1}`}
                    rows={2}
                  />
                </div>
              ))}

              <div className="space-y-2">
                <Label htmlFor="cta">Call to Action</Label>
                <Select value={formData.callToAction} onValueChange={(value) => setFormData({ ...formData, callToAction: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select CTA" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="learn-more">Learn More</SelectItem>
                    <SelectItem value="shop-now">Shop Now</SelectItem>
                    <SelectItem value="get-quote">Get Quote</SelectItem>
                    <SelectItem value="sign-up">Sign Up</SelectItem>
                    <SelectItem value="contact-us">Contact Us</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="extensions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Sitelinks</CardTitle>
                  <CardDescription>Add sitelink extensions to your ad group</CardDescription>
                </div>
                <Button onClick={addSitelink} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Sitelink
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {sitelinks.map((sitelink, index) => (
                <Card key={index}>
                  <CardContent className="pt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Sitelink {index + 1}</Label>
                      <Button variant="ghost" size="icon" onClick={() => removeSitelink(index)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <Input
                      placeholder="Sitelink text (25 chars max)"
                      value={sitelink.text}
                      maxLength={25}
                      onChange={(e) => {
                        const newSitelinks = [...sitelinks];
                        newSitelinks[index].text = e.target.value;
                        setSitelinks(newSitelinks);
                      }}
                    />
                    <Input
                      placeholder="Description 1 (35 chars max)"
                      value={sitelink.desc1}
                      maxLength={35}
                      onChange={(e) => {
                        const newSitelinks = [...sitelinks];
                        newSitelinks[index].desc1 = e.target.value;
                        setSitelinks(newSitelinks);
                      }}
                    />
                    <Input
                      placeholder="Description 2 (35 chars max)"
                      value={sitelink.desc2}
                      maxLength={35}
                      onChange={(e) => {
                        const newSitelinks = [...sitelinks];
                        newSitelinks[index].desc2 = e.target.value;
                        setSitelinks(newSitelinks);
                      }}
                    />
                    <Input
                      placeholder="Final URL"
                      value={sitelink.finalUrl}
                      onChange={(e) => {
                        const newSitelinks = [...sitelinks];
                        newSitelinks[index].finalUrl = e.target.value;
                        setSitelinks(newSitelinks);
                      }}
                    />
                  </CardContent>
                </Card>
              ))}
              {sitelinks.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No sitelinks added yet. Click "Add Sitelink" to create one.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Images & Videos</CardTitle>
              <CardDescription>Upload or select media assets for this ad group</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Drag and drop images or videos here, or click to browse
                </p>
                <Button variant="outline" className="mt-4">
                  Browse Files
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between pt-4 border-t">
        <Button variant="outline" onClick={() => navigate(`/campaigns/${campaignId}/ad-groups`)}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          {isEdit ? "Update Ad Group" : "Create Ad Group"}
        </Button>
      </div>
    </div>
  );
}
