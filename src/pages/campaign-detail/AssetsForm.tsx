import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Upload, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AssetsForm() {
  const navigate = useNavigate();
  const { id: campaignId, assetId } = useParams();
  const isEdit = !!assetId;

  const [formData, setFormData] = useState({
    finalUrl: "",
  });

  const [logos, setLogos] = useState<string[]>([]);
  const [headlines, setHeadlines] = useState<string[]>([""]);
  const [longHeadlines, setLongHeadlines] = useState<string[]>([""]);
  const [descriptions, setDescriptions] = useState<string[]>([""]);
  const [images, setImages] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([""]);

  const [sitelinks, setSitelinks] = useState<Array<{
    text: string;
    desc1: string;
    desc2: string;
    finalUrl: string;
  }>>([]);

  const [priceAssets, setPriceAssets] = useState<Array<{
    type: string;
    header: string;
    amount: string;
    description: string;
  }>>([]);

  const [calls, setCalls] = useState<Array<{
    countryCode: string;
    phoneNumber: string;
  }>>([]);

  const [callouts, setCallouts] = useState<string[]>([""]);

  const [structuredSnippets, setStructuredSnippets] = useState<Array<{
    header: string;
    values: string[];
  }>>([]);

  const handleSave = () => {
    toast.success(isEdit ? "Asset updated successfully!" : "Asset created successfully!");
    navigate(`/campaigns/${campaignId}/assets`);
  };

  const addSitelink = () => {
    setSitelinks([...sitelinks, { text: "", desc1: "", desc2: "", finalUrl: "" }]);
  };

  const removeSitelink = (index: number) => {
    setSitelinks(sitelinks.filter((_, i) => i !== index));
  };

  const addCall = () => {
    setCalls([...calls, { countryCode: "+1", phoneNumber: "" }]);
  };

  const removeCall = (index: number) => {
    setCalls(calls.filter((_, i) => i !== index));
  };

  const addCallout = () => {
    if (callouts.length < 20) {
      setCallouts([...callouts, ""]);
    }
  };

  const removeCallout = (index: number) => {
    if (callouts.length > 1) {
      setCallouts(callouts.filter((_, i) => i !== index));
    }
  };

  const addPriceAsset = () => {
    if (priceAssets.length < 8) {
      setPriceAssets([...priceAssets, { type: "", header: "", amount: "", description: "" }]);
    }
  };

  const removePriceAsset = (index: number) => {
    setPriceAssets(priceAssets.filter((_, i) => i !== index));
  };

  const addStructuredSnippet = () => {
    if (structuredSnippets.length < 10) {
      setStructuredSnippets([...structuredSnippets, { header: "", values: [] }]);
    }
  };

  const removeStructuredSnippet = (index: number) => {
    setStructuredSnippets(structuredSnippets.filter((_, i) => i !== index));
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
          <p className="text-muted-foreground mt-1">Manage creative assets</p>
        </div>
      </div>

      <Tabs defaultValue="logos" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-11">
          <TabsTrigger value="logos">Logos</TabsTrigger>
          <TabsTrigger value="finalUrl">URL</TabsTrigger>
          <TabsTrigger value="headlines">Headlines</TabsTrigger>
          <TabsTrigger value="descriptions">Descriptions</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="sitelinks">Sitelinks</TabsTrigger>
          <TabsTrigger value="prices">Prices</TabsTrigger>
          <TabsTrigger value="calls">Calls</TabsTrigger>
          <TabsTrigger value="callouts">Callouts</TabsTrigger>
          <TabsTrigger value="snippets" className="hidden lg:block">Snippets</TabsTrigger>
        </TabsList>

        <TabsContent value="logos" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Brand Logos</CardTitle>
                  <CardDescription>Upload up to 5 logos</CardDescription>
                </div>
                <Button 
                  onClick={() => logos.length < 5 && setLogos([...logos, ""])} 
                  variant="outline" 
                  size="sm"
                  disabled={logos.length >= 5}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Logo
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Upload logo files (PNG, SVG recommended)
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  Up to 5 logos
                </p>
                <Button variant="outline">Browse Logos</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{logos.length}/5 logos uploaded</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="finalUrl" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Final URL</CardTitle>
              <CardDescription>The landing page URL for your ads</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="finalUrl">Final URL</Label>
                <Input
                  id="finalUrl"
                  type="url"
                  value={formData.finalUrl}
                  onChange={(e) => setFormData({ ...formData, finalUrl: e.target.value })}
                  placeholder="https://www.example.com/landing-page"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="headlines" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Headlines</CardTitle>
                  <CardDescription>Add up to 15 headlines (30 chars) and 5 long headlines (90 chars)</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Headlines (up to 15, 30 chars max)</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => headlines.length < 15 && setHeadlines([...headlines, ""])}
                    disabled={headlines.length >= 15}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Headline
                  </Button>
                </div>
                <div className="space-y-3">
                  {headlines.map((headline, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <div className="flex-1 space-y-1">
                        <Input
                          value={headline}
                          onChange={(e) => {
                            const updated = [...headlines];
                            updated[index] = e.target.value;
                            setHeadlines(updated);
                          }}
                          maxLength={30}
                          placeholder={`Headline ${index + 1}`}
                        />
                        <p className="text-xs text-muted-foreground">{headline.length}/30</p>
                      </div>
                      {headlines.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setHeadlines(headlines.filter((_, i) => i !== index))}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">{headlines.length}/15 headlines</p>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <Label>Long Headlines (up to 5, 90 chars max)</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => longHeadlines.length < 5 && setLongHeadlines([...longHeadlines, ""])}
                    disabled={longHeadlines.length >= 5}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Long Headline
                  </Button>
                </div>
                <div className="space-y-3">
                  {longHeadlines.map((headline, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <div className="flex-1 space-y-1">
                        <Input
                          value={headline}
                          onChange={(e) => {
                            const updated = [...longHeadlines];
                            updated[index] = e.target.value;
                            setLongHeadlines(updated);
                          }}
                          maxLength={90}
                          placeholder={`Long headline ${index + 1}`}
                        />
                        <p className="text-xs text-muted-foreground">{headline.length}/90</p>
                      </div>
                      {longHeadlines.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setLongHeadlines(longHeadlines.filter((_, i) => i !== index))}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">{longHeadlines.length}/5 long headlines</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="descriptions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Descriptions</CardTitle>
                  <CardDescription>Add up to 5 descriptions (90 chars each)</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => descriptions.length < 5 && setDescriptions([...descriptions, ""])}
                  disabled={descriptions.length >= 5}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Description
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {descriptions.map((description, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <div className="flex-1 space-y-1">
                    <Label>Description {index + 1}</Label>
                    <Textarea
                      value={description}
                      onChange={(e) => {
                        const updated = [...descriptions];
                        updated[index] = e.target.value;
                        setDescriptions(updated);
                      }}
                      maxLength={90}
                      rows={2}
                      placeholder={`Enter description ${index + 1}`}
                    />
                    <p className="text-xs text-muted-foreground">{description.length}/90</p>
                  </div>
                  {descriptions.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDescriptions(descriptions.filter((_, i) => i !== index))}
                      className="mt-6"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  )}
                </div>
              ))}
              <p className="text-xs text-muted-foreground">{descriptions.length}/5 descriptions</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Images</CardTitle>
                  <CardDescription>Upload up to 20 images (recommended sizes: 1200x628, 1200x1200)</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => images.length < 20 && setImages([...images, ""])}
                  disabled={images.length >= 20}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Image
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drag and drop images here, or click to browse
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  Supports: JPG, PNG, GIF (max 5MB each, up to 20 images)
                </p>
                <Button variant="outline">Browse Images</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{images.length}/20 images uploaded</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Videos</CardTitle>
                  <CardDescription>Add up to 5 videos via YouTube link or upload</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => videos.length < 5 && setVideos([...videos, ""])}
                  disabled={videos.length >= 5}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Video
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {videos.map((video, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <div className="flex-1">
                    <Label>Video {index + 1}</Label>
                    <Input
                      value={video}
                      onChange={(e) => {
                        const updated = [...videos];
                        updated[index] = e.target.value;
                        setVideos(updated);
                      }}
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                  </div>
                  {videos.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setVideos(videos.filter((_, i) => i !== index))}
                      className="mt-6"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  )}
                </div>
              ))}
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
              <p className="text-xs text-muted-foreground">{videos.length}/5 videos</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sitelinks" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Sitelinks</CardTitle>
                  <CardDescription>Add additional links to your ads</CardDescription>
                </div>
                <Button onClick={addSitelink} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Sitelink
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {sitelinks.map((sitelink, index) => (
                <Card key={index} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Sitelink {index + 1}</h4>
                      <Button variant="ghost" size="sm" onClick={() => removeSitelink(index)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                    <div className="grid gap-3">
                      <div className="space-y-2">
                        <Label>Sitelink Text (25 chars max)</Label>
                        <Input
                          maxLength={25}
                          placeholder="e.g., Shop Now"
                          value={sitelink.text}
                          onChange={(e) => {
                            const updated = [...sitelinks];
                            updated[index].text = e.target.value;
                            setSitelinks(updated);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Description 1 (35 chars max)</Label>
                        <Input
                          maxLength={35}
                          placeholder="First description line"
                          value={sitelink.desc1}
                          onChange={(e) => {
                            const updated = [...sitelinks];
                            updated[index].desc1 = e.target.value;
                            setSitelinks(updated);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Description 2 (35 chars max)</Label>
                        <Input
                          maxLength={35}
                          placeholder="Second description line"
                          value={sitelink.desc2}
                          onChange={(e) => {
                            const updated = [...sitelinks];
                            updated[index].desc2 = e.target.value;
                            setSitelinks(updated);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Final URL</Label>
                        <Input
                          type="url"
                          placeholder="https://www.example.com/page"
                          value={sitelink.finalUrl}
                          onChange={(e) => {
                            const updated = [...sitelinks];
                            updated[index].finalUrl = e.target.value;
                            setSitelinks(updated);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prices" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Price Assets</CardTitle>
                  <CardDescription>Add up to 8 price assets to showcase your products and pricing</CardDescription>
                </div>
                <Button 
                  onClick={addPriceAsset} 
                  variant="outline" 
                  size="sm"
                  disabled={priceAssets.length >= 8}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Price
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {priceAssets.map((price, index) => (
                <Card key={index} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Price {index + 1}</h4>
                      <Button variant="ghost" size="sm" onClick={() => removePriceAsset(index)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label>Type</Label>
                        <Select
                          value={price.type}
                          onValueChange={(value) => {
                            const updated = [...priceAssets];
                            updated[index].type = value;
                            setPriceAssets(updated);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="product">Product</SelectItem>
                            <SelectItem value="service">Service</SelectItem>
                            <SelectItem value="subscription">Subscription</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Amount</Label>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="99.99"
                          value={price.amount}
                          onChange={(e) => {
                            const updated = [...priceAssets];
                            updated[index].amount = e.target.value;
                            setPriceAssets(updated);
                          }}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Header</Label>
                        <Input
                          placeholder="e.g., Premium Plan"
                          value={price.header}
                          onChange={(e) => {
                            const updated = [...priceAssets];
                            updated[index].header = e.target.value;
                            setPriceAssets(updated);
                          }}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Description</Label>
                        <Textarea
                          placeholder="Brief description"
                          value={price.description}
                          onChange={(e) => {
                            const updated = [...priceAssets];
                            updated[index].description = e.target.value;
                            setPriceAssets(updated);
                          }}
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
              <p className="text-xs text-muted-foreground">{priceAssets.length}/8 price assets</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calls" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Call Extensions</CardTitle>
                  <CardDescription>Add phone numbers to your ads</CardDescription>
                </div>
                <Button onClick={addCall} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Call
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {calls.map((call, index) => (
                <Card key={index} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Call {index + 1}</h4>
                      <Button variant="ghost" size="sm" onClick={() => removeCall(index)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-12 gap-3">
                      <div className="col-span-4 space-y-2">
                        <Label>Country Code</Label>
                        <Input
                          placeholder="+1"
                          value={call.countryCode}
                          onChange={(e) => {
                            const updated = [...calls];
                            updated[index].countryCode = e.target.value;
                            setCalls(updated);
                          }}
                        />
                      </div>
                      <div className="col-span-8 space-y-2">
                        <Label>Phone Number</Label>
                        <Input
                          placeholder="555-123-4567"
                          value={call.phoneNumber}
                          onChange={(e) => {
                            const updated = [...calls];
                            updated[index].phoneNumber = e.target.value;
                            setCalls(updated);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="callouts" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Callouts</CardTitle>
                  <CardDescription>Add up to 20 callouts (25 chars max each) to highlight key selling points</CardDescription>
                </div>
                <Button 
                  onClick={addCallout} 
                  variant="outline" 
                  size="sm"
                  disabled={callouts.length >= 20}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Callout
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {callouts.map((callout, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <div className="flex-1 space-y-1">
                    <Input
                      maxLength={25}
                      placeholder={`Callout ${index + 1} (e.g., Free Shipping)`}
                      value={callout}
                      onChange={(e) => {
                        const updated = [...callouts];
                        updated[index] = e.target.value;
                        setCallouts(updated);
                      }}
                    />
                    <p className="text-xs text-muted-foreground">{callout.length}/25</p>
                  </div>
                  {callouts.length > 1 && (
                    <Button variant="ghost" size="icon" onClick={() => removeCallout(index)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  )}
                </div>
              ))}
              <p className="text-xs text-muted-foreground">{callouts.length}/20 callouts</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="snippets" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Structured Snippets</CardTitle>
                  <CardDescription>Add up to 10 snippets to highlight specific aspects of your products or services</CardDescription>
                </div>
                <Button 
                  onClick={addStructuredSnippet} 
                  variant="outline" 
                  size="sm"
                  disabled={structuredSnippets.length >= 10}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Snippet
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {structuredSnippets.map((snippet, index) => (
                <Card key={index} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Snippet {index + 1}</h4>
                      <Button variant="ghost" size="sm" onClick={() => removeStructuredSnippet(index)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label>Header</Label>
                        <Select
                          value={snippet.header}
                          onValueChange={(value) => {
                            const updated = [...structuredSnippets];
                            updated[index].header = value;
                            setStructuredSnippets(updated);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select header" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="brands">Brands</SelectItem>
                            <SelectItem value="models">Models</SelectItem>
                            <SelectItem value="services">Services</SelectItem>
                            <SelectItem value="types">Types</SelectItem>
                            <SelectItem value="styles">Styles</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Values (comma-separated, up to 10 values, 25 chars max each)</Label>
                        <Textarea
                          placeholder="Value 1, Value 2, Value 3"
                          rows={2}
                          value={snippet.values.join(", ")}
                          onChange={(e) => {
                            const updated = [...structuredSnippets];
                            const values = e.target.value.split(",").map(v => v.trim().slice(0, 25));
                            updated[index].values = values.slice(0, 10);
                            setStructuredSnippets(updated);
                          }}
                        />
                        <p className="text-xs text-muted-foreground">{snippet.values.length}/10 values</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
              <p className="text-xs text-muted-foreground">{structuredSnippets.length}/10 structured snippets</p>
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
