import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Plus, Trash2, Upload } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function AssetFields() {
  const [activeTab, setActiveTab] = useState("business-names");
  
  const [assetName, setAssetName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [logos, setLogos] = useState<string[]>([]);
  const [finalUrl, setFinalUrl] = useState("");
  const [headlines, setHeadlines] = useState<string[]>([""]);
  const [longHeadlines, setLongHeadlines] = useState<string[]>([""]);
  const [descriptions, setDescriptions] = useState<string[]>([""]);
  const [images, setImages] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([""]);
  const [sitelinks, setSitelinks] = useState<Array<{ text: string; desc1: string; desc2: string; url: string; trackingUrl: string; urlSuffix: string; mobileUrl: boolean; cta: string }>>([]);
  const [promotions, setPromotions] = useState<Array<{ occasion: string; language: string; currency: string; type: string; amount: string; item: string; finalUrl: string; details: string; detailsValue: string }>>([]);
  const [priceAssets, setPriceAssets] = useState<Array<{ type: string; header: string; amount: string; description: string; finalUrl: string; currency: string; qualifier: string }>>([]);
  const [calls, setCalls] = useState<Array<{ countryCode: string; phoneNumber: string; conversionAction: string }>>([]);
  const [callouts, setCallouts] = useState<string[]>([""]);
  const [structuredSnippets, setStructuredSnippets] = useState<Array<{ header: string; headerType: string; values: string[] }>>([{ header: "", headerType: "", values: [""] }]);
  const [leadForms, setLeadForms] = useState<Array<{ headline: string; businessName: string; description: string; privacyUrl: string; submissionHeadline: string; submissionDesc: string; cta: string }>>([]);
  const [displayPaths, setDisplayPaths] = useState<Array<{ path1: string; path2: string; mobileUrl: string; destUrl: string }>>([]);
  const [urlOptions, setUrlOptions] = useState({ trackingTemplate: "", urlSuffix: "", customParams: [{ name: "", value: "" }] });

  return (
    <Card className="p-4">
      <div className="mb-6">
        <Label htmlFor="asset-name">Asset Name</Label>
        <Input
          id="asset-name"
          placeholder="Enter asset name"
          value={assetName}
          onChange={(e) => setAssetName(e.target.value)}
          className="mt-2"
        />
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="overflow-x-auto">
          <TabsList className="inline-flex w-auto min-w-full">
            <TabsTrigger value="business-names">Business Names</TabsTrigger>
            <TabsTrigger value="logos">Brand Logos</TabsTrigger>
            <TabsTrigger value="final-url">Final URL</TabsTrigger>
            <TabsTrigger value="headline">Headlines</TabsTrigger>
            <TabsTrigger value="long-headline">Long Headlines</TabsTrigger>
            <TabsTrigger value="description">Descriptions</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="sitelinks">Sitelinks</TabsTrigger>
            <TabsTrigger value="promotions">Promotions</TabsTrigger>
            <TabsTrigger value="prices">Price</TabsTrigger>
            <TabsTrigger value="calls">Calls</TabsTrigger>
            <TabsTrigger value="callouts">Callouts</TabsTrigger>
            <TabsTrigger value="snippets">Structured Snippets</TabsTrigger>
            <TabsTrigger value="lead-form">Lead Form</TabsTrigger>
            <TabsTrigger value="display-path">Display Path</TabsTrigger>
            <TabsTrigger value="url-options">URL Options</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="business-names" className="space-y-4 mt-4">
          <div className="space-y-3">
            <Label>Business Name</Label>
            <Input
              placeholder="Enter business name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </div>
        </TabsContent>

        <TabsContent value="logos" className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <Label>Brand Logos (up to 5)</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => logos.length < 5 && setLogos([...logos, ""])}
              disabled={logos.length >= 5}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Logo
            </Button>
          </div>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-4">
              Upload logo files (PNG, SVG recommended)
            </p>
            <Button variant="outline" type="button">
              Browse Files
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">{logos.length}/5 logos</p>
        </TabsContent>

        <TabsContent value="final-url" className="space-y-4 mt-4">
          <div className="space-y-3">
            <Label>Final URL</Label>
            <Input
              type="url"
              placeholder="https://example.com"
              value={finalUrl}
              onChange={(e) => setFinalUrl(e.target.value)}
            />
          </div>
        </TabsContent>

        <TabsContent value="headline" className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <Label>Headlines (up to 15, 30 characters max each)</Label>
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
                    maxLength={30}
                    placeholder={`Headline ${index + 1}`}
                    value={headline}
                    onChange={(e) => {
                      const updated = [...headlines];
                      updated[index] = e.target.value;
                      setHeadlines(updated);
                    }}
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
        </TabsContent>

        <TabsContent value="long-headline" className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <Label>Long Headlines (up to 5, 90 characters max each)</Label>
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
                    maxLength={90}
                    placeholder={`Long headline ${index + 1}`}
                    value={headline}
                    onChange={(e) => {
                      const updated = [...longHeadlines];
                      updated[index] = e.target.value;
                      setLongHeadlines(updated);
                    }}
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
        </TabsContent>

        <TabsContent value="description" className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <Label>Descriptions (up to 5, 90 characters max each)</Label>
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
          <div className="space-y-3">
            {descriptions.map((description, index) => (
              <div key={index} className="flex gap-2 items-start">
                <div className="flex-1 space-y-1">
                  <Textarea
                    maxLength={90}
                    placeholder={`Description ${index + 1}`}
                    value={description}
                    onChange={(e) => {
                      const updated = [...descriptions];
                      updated[index] = e.target.value;
                      setDescriptions(updated);
                    }}
                    rows={2}
                  />
                  <p className="text-xs text-muted-foreground">{description.length}/90</p>
                </div>
                {descriptions.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDescriptions(descriptions.filter((_, i) => i !== index))}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">{descriptions.length}/5 descriptions</p>
        </TabsContent>

        <TabsContent value="images" className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <Label>Images (up to 20)</Label>
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
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-4">
              Upload image files (JPG, PNG, max 5MB each)
            </p>
            <Button variant="outline" type="button">
              Browse Files
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">{images.length}/20 images</p>
        </TabsContent>

        <TabsContent value="videos" className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <Label>Videos (up to 5)</Label>
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
          <div className="space-y-3">
            {videos.map((video, index) => (
              <div key={index} className="flex gap-2 items-start">
                <div className="flex-1">
                  <Input
                    placeholder="YouTube URL or upload video"
                    value={video}
                    onChange={(e) => {
                      const updated = [...videos];
                      updated[index] = e.target.value;
                      setVideos(updated);
                    }}
                  />
                </div>
                {videos.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setVideos(videos.filter((_, i) => i !== index))}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center mt-4">
            <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">Or upload video files (MP4, max 100MB)</p>
            <Button variant="outline" type="button" size="sm">
              Browse Files
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">{videos.length}/5 videos</p>
        </TabsContent>

        <TabsContent value="prices" className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <Label>Price Assets (up to 8)</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => priceAssets.length < 8 && setPriceAssets([...priceAssets, { type: "", header: "", amount: "", description: "", finalUrl: "", currency: "USD", qualifier: "" }])}
              disabled={priceAssets.length >= 8}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Price
            </Button>
          </div>
          <div className="space-y-3">
            {priceAssets.map((price, index) => (
              <div key={index} className="border rounded-lg p-3 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Price {index + 1}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setPriceAssets(priceAssets.filter((_, i) => i !== index))}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs">Language</Label>
                    <Select
                      value={price.type}
                      onValueChange={(value) => {
                        const updated = [...priceAssets];
                        updated[index].type = value;
                        setPriceAssets(updated);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Type</Label>
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
                  <div className="space-y-1">
                    <Label className="text-xs">Currency</Label>
                    <Select
                      value={price.currency}
                      onValueChange={(value) => {
                        const updated = [...priceAssets];
                        updated[index].currency = value;
                        setPriceAssets(updated);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                        <SelectItem value="INR">INR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Price Qualifier</Label>
                    <Select
                      value={price.qualifier}
                      onValueChange={(value) => {
                        const updated = [...priceAssets];
                        updated[index].qualifier = value;
                        setPriceAssets(updated);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no">No</SelectItem>
                        <SelectItem value="from">From</SelectItem>
                        <SelectItem value="upto">Up to</SelectItem>
                        <SelectItem value="average">Average</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Amount</Label>
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
                  <div className="col-span-2 space-y-1">
                    <Label className="text-xs">Header</Label>
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
                  <div className="col-span-2 space-y-1">
                    <Label className="text-xs">Description</Label>
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
                  <div className="col-span-2 space-y-1">
                    <Label className="text-xs">Final URL</Label>
                    <Input
                      type="url"
                      placeholder="https://example.com"
                      value={price.finalUrl}
                      onChange={(e) => {
                        const updated = [...priceAssets];
                        updated[index].finalUrl = e.target.value;
                        setPriceAssets(updated);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">{priceAssets.length}/8 price assets</p>
        </TabsContent>

        <TabsContent value="callouts" className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <Label>Callouts (up to 20, 25 characters max each)</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => callouts.length < 20 && setCallouts([...callouts, ""])}
              disabled={callouts.length >= 20}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Callout
            </Button>
          </div>
          <div className="space-y-3">
            {callouts.map((callout, index) => (
              <div key={index} className="flex gap-2 items-start">
                <div className="flex-1 space-y-1">
                  <Input
                    maxLength={25}
                    placeholder={`Callout ${index + 1}`}
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
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCallouts(callouts.filter((_, i) => i !== index))}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">{callouts.length}/20 callouts</p>
        </TabsContent>

        <TabsContent value="snippets" className="space-y-4 mt-4">
          <div className="space-y-4">
            {structuredSnippets.map((snippet, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Snippet {index + 1}</span>
                  {structuredSnippets.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setStructuredSnippets(structuredSnippets.filter((_, i) => i !== index))}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs">Header</Label>
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
                        <SelectItem value="amenities">Amenities</SelectItem>
                        <SelectItem value="brands">Brands</SelectItem>
                        <SelectItem value="services">Services</SelectItem>
                        <SelectItem value="types">Types</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Header Type</Label>
                    <Select
                      value={snippet.headerType}
                      onValueChange={(value) => {
                        const updated = [...structuredSnippets];
                        updated[index].headerType = value;
                        setStructuredSnippets(updated);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Values (up to 10, 25 characters max each)</Label>
                  {snippet.values.map((value, valueIndex) => (
                    <div key={valueIndex} className="flex gap-2">
                      <Input
                        maxLength={25}
                        placeholder={`Value ${valueIndex + 1}`}
                        value={value}
                        onChange={(e) => {
                          const updated = [...structuredSnippets];
                          updated[index].values[valueIndex] = e.target.value;
                          setStructuredSnippets(updated);
                        }}
                      />
                      {snippet.values.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const updated = [...structuredSnippets];
                            updated[index].values = updated[index].values.filter((_, i) => i !== valueIndex);
                            setStructuredSnippets(updated);
                          }}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  ))}
                  {snippet.values.length < 10 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const updated = [...structuredSnippets];
                        updated[index].values.push("");
                        setStructuredSnippets(updated);
                      }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Value
                    </Button>
                  )}
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => structuredSnippets.length < 10 && setStructuredSnippets([...structuredSnippets, { header: "", headerType: "", values: [""] }])}
              disabled={structuredSnippets.length >= 10}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Structured Snippet
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="sitelinks" className="space-y-4 mt-4">
          <div className="space-y-4">
            {sitelinks.map((sitelink, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Sitelink {index + 1}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSitelinks(sitelinks.filter((_, i) => i !== index))}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs">Sitelink Text</Label>
                    <Input
                      placeholder="Enter sitelink text"
                      value={sitelink.text}
                      onChange={(e) => {
                        const updated = [...sitelinks];
                        updated[index].text = e.target.value;
                        setSitelinks(updated);
                      }}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Description Line 1</Label>
                    <Input
                      placeholder="Description line 1"
                      value={sitelink.desc1}
                      onChange={(e) => {
                        const updated = [...sitelinks];
                        updated[index].desc1 = e.target.value;
                        setSitelinks(updated);
                      }}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Description Line 2</Label>
                    <Input
                      placeholder="Description line 2"
                      value={sitelink.desc2}
                      onChange={(e) => {
                        const updated = [...sitelinks];
                        updated[index].desc2 = e.target.value;
                        setSitelinks(updated);
                      }}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Final URL</Label>
                    <Input
                      type="url"
                      placeholder="https://example.com"
                      value={sitelink.url}
                      onChange={(e) => {
                        const updated = [...sitelinks];
                        updated[index].url = e.target.value;
                        setSitelinks(updated);
                      }}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Call to Action</Label>
                    <Select
                      value={sitelink.cta}
                      onValueChange={(value) => {
                        const updated = [...sitelinks];
                        updated[index].cta = value;
                        setSitelinks(updated);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select CTA" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="learn-more">Learn More</SelectItem>
                        <SelectItem value="shop-now">Shop Now</SelectItem>
                        <SelectItem value="sign-up">Sign Up</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSitelinks([...sitelinks, { text: "", desc1: "", desc2: "", url: "", trackingUrl: "", urlSuffix: "", mobileUrl: false, cta: "" }])}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Sitelink
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="promotions" className="space-y-4 mt-4">
          <div className="space-y-4">
            {promotions.map((promo, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Promotion {index + 1}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setPromotions(promotions.filter((_, i) => i !== index))}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Occasion</Label>
                    <Select
                      value={promo.occasion}
                      onValueChange={(value) => {
                        const updated = [...promotions];
                        updated[index].occasion = value;
                        setPromotions(updated);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select occasion" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="holiday">Holiday</SelectItem>
                        <SelectItem value="seasonal">Seasonal</SelectItem>
                        <SelectItem value="clearance">Clearance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs">Language</Label>
                    <Select
                      value={promo.language}
                      onValueChange={(value) => {
                        const updated = [...promotions];
                        updated[index].language = value;
                        setPromotions(updated);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs">Item (max 20 characters)</Label>
                    <Input
                      maxLength={20}
                      placeholder="Item name"
                      value={promo.item}
                      onChange={(e) => {
                        const updated = [...promotions];
                        updated[index].item = e.target.value;
                        setPromotions(updated);
                      }}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Final URL</Label>
                    <Input
                      type="url"
                      placeholder="https://example.com"
                      value={promo.finalUrl}
                      onChange={(e) => {
                        const updated = [...promotions];
                        updated[index].finalUrl = e.target.value;
                        setPromotions(updated);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPromotions([...promotions, { occasion: "", language: "", currency: "", type: "", amount: "", item: "", finalUrl: "", details: "", detailsValue: "" }])}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Promotion
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="calls" className="space-y-4 mt-4">
          <div className="space-y-4">
            {calls.map((call, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Call {index + 1}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCalls(calls.filter((_, i) => i !== index))}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Country Code</Label>
                    <Select
                      value={call.countryCode}
                      onValueChange={(value) => {
                        const updated = [...calls];
                        updated[index].countryCode = value;
                        setCalls(updated);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="+1">+1 (US)</SelectItem>
                        <SelectItem value="+44">+44 (UK)</SelectItem>
                        <SelectItem value="+91">+91 (India)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs">Phone Number</Label>
                    <Input
                      placeholder="Phone number"
                      value={call.phoneNumber}
                      onChange={(e) => {
                        const updated = [...calls];
                        updated[index].phoneNumber = e.target.value;
                        setCalls(updated);
                      }}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-xs">Conversion Action</Label>
                    <Select
                      value={call.conversionAction}
                      onValueChange={(value) => {
                        const updated = [...calls];
                        updated[index].conversionAction = value;
                        setCalls(updated);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select action" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="call">Call</SelectItem>
                        <SelectItem value="lead">Lead</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCalls([...calls, { countryCode: "", phoneNumber: "", conversionAction: "" }])}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Call
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="lead-form" className="space-y-4 mt-4">
          <div className="space-y-4">
            {leadForms.map((form, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Lead Form {index + 1}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setLeadForms(leadForms.filter((_, i) => i !== index))}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs">Headline (max 25 characters)</Label>
                    <Input
                      maxLength={25}
                      placeholder="Enter headline"
                      value={form.headline}
                      onChange={(e) => {
                        const updated = [...leadForms];
                        updated[index].headline = e.target.value;
                        setLeadForms(updated);
                      }}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Business Name (max 30 characters)</Label>
                    <Input
                      maxLength={30}
                      placeholder="Enter business name"
                      value={form.businessName}
                      onChange={(e) => {
                        const updated = [...leadForms];
                        updated[index].businessName = e.target.value;
                        setLeadForms(updated);
                      }}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Description (max 200 characters)</Label>
                    <Textarea
                      maxLength={200}
                      placeholder="Enter description"
                      value={form.description}
                      onChange={(e) => {
                        const updated = [...leadForms];
                        updated[index].description = e.target.value;
                        setLeadForms(updated);
                      }}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Privacy Policy URL</Label>
                    <Input
                      type="url"
                      placeholder="https://example.com/privacy"
                      value={form.privacyUrl}
                      onChange={(e) => {
                        const updated = [...leadForms];
                        updated[index].privacyUrl = e.target.value;
                        setLeadForms(updated);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLeadForms([...leadForms, { headline: "", businessName: "", description: "", privacyUrl: "", submissionHeadline: "", submissionDesc: "", cta: "" }])}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Lead Form
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="display-path" className="space-y-4 mt-4">
          <div className="space-y-4">
            {displayPaths.map((path, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Display Path {index + 1}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDisplayPaths(displayPaths.filter((_, i) => i !== index))}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Path 1 (max 15 characters)</Label>
                    <Input
                      maxLength={15}
                      placeholder="path1"
                      value={path.path1}
                      onChange={(e) => {
                        const updated = [...displayPaths];
                        updated[index].path1 = e.target.value;
                        setDisplayPaths(updated);
                      }}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Path 2 (max 15 characters)</Label>
                    <Input
                      maxLength={15}
                      placeholder="path2"
                      value={path.path2}
                      onChange={(e) => {
                        const updated = [...displayPaths];
                        updated[index].path2 = e.target.value;
                        setDisplayPaths(updated);
                      }}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-xs">Destination URL</Label>
                    <Input
                      type="url"
                      placeholder="https://example.com"
                      value={path.destUrl}
                      onChange={(e) => {
                        const updated = [...displayPaths];
                        updated[index].destUrl = e.target.value;
                        setDisplayPaths(updated);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDisplayPaths([...displayPaths, { path1: "", path2: "", mobileUrl: "", destUrl: "" }])}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Display Path
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="url-options" className="space-y-4 mt-4">
          <div className="space-y-3">
            <div>
              <Label>Tracking Template</Label>
              <Input
                placeholder="Enter tracking template URL"
                value={urlOptions.trackingTemplate}
                onChange={(e) => setUrlOptions({ ...urlOptions, trackingTemplate: e.target.value })}
              />
            </div>
            <div>
              <Label>Final URL Suffix</Label>
              <Input
                placeholder="Enter URL suffix"
                value={urlOptions.urlSuffix}
                onChange={(e) => setUrlOptions({ ...urlOptions, urlSuffix: e.target.value })}
              />
            </div>
            <div>
              <Label>Custom Parameters</Label>
              {urlOptions.customParams.map((param, index) => (
                <div key={index} className="flex gap-2 mt-2">
                  <Input
                    placeholder="Name"
                    value={param.name}
                    onChange={(e) => {
                      const updated = [...urlOptions.customParams];
                      updated[index].name = e.target.value;
                      setUrlOptions({ ...urlOptions, customParams: updated });
                    }}
                  />
                  <Input
                    placeholder="Value"
                    value={param.value}
                    onChange={(e) => {
                      const updated = [...urlOptions.customParams];
                      updated[index].value = e.target.value;
                      setUrlOptions({ ...urlOptions, customParams: updated });
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      const updated = urlOptions.customParams.filter((_, i) => i !== index);
                      setUrlOptions({ ...urlOptions, customParams: updated });
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => setUrlOptions({ ...urlOptions, customParams: [...urlOptions.customParams, { name: "", value: "" }] })}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Parameter
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
