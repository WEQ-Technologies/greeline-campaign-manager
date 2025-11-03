import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Upload, X } from "lucide-react";

interface ExtensionsProps {
  data: {
    sitelinks: Array<{ 
      text: string; 
      desc1: string; 
      desc2: string; 
      finalUrl: string; 
      trackingUrl: string;
      startDate: string;
      endDate: string;
    }>;
    priceAssets: Array<{
      language: string;
      type: string;
      currency: string;
      qualifier: string;
      header: string;
      amount: string;
      unit: string;
      description: string;
      finalUrl: string;
    }>;
    calls: Array<{
      countryCode: string;
      phoneNumber: string;
      conversionAction: string;
    }>;
    callouts: Array<{ text: string; startDate: string; endDate: string }>;
    structuredSnippets: Array<{
      header: string;
      headerType: string;
      values: string[];
    }>;
    leadForm: {
      headline: string;
      businessName: string;
      description: string;
      privacyPolicyUrl: string;
      submissionHeadline: string;
      submissionDescription: string;
      webhookUrl: string;
      formType: string;
    };
    displayPath: string;
    mobileFinalUrl: string;
    assetTracking: string;
    assetUrlSuffix: string;
    textCustomization: boolean;
    finalUrlExpansion: boolean;
    imageEnhancements: boolean;
    searchThemes: string[];
    audienceName: string;
  };
  onChange: (field: string, value: any) => void;
}

export function Extensions({ data, onChange }: ExtensionsProps) {
  // Sitelinks functions
  const addSitelink = () => {
    onChange("sitelinks", [...data.sitelinks, { 
      text: "", desc1: "", desc2: "", finalUrl: "", trackingUrl: "", startDate: "", endDate: "" 
    }]);
  };

  const updateSitelink = (index: number, field: string, value: string) => {
    const updated = [...data.sitelinks];
    updated[index] = { ...updated[index], [field]: value };
    onChange("sitelinks", updated);
  };

  const removeSitelink = (index: number) => {
    onChange("sitelinks", data.sitelinks.filter((_, i) => i !== index));
  };

  // Price Assets functions
  const addPriceAsset = () => {
    onChange("priceAssets", [...data.priceAssets, {
      language: "English", type: "", currency: "USD", qualifier: "No", 
      header: "", amount: "", unit: "", description: "", finalUrl: ""
    }]);
  };

  const updatePriceAsset = (index: number, field: string, value: string) => {
    const updated = [...data.priceAssets];
    updated[index] = { ...updated[index], [field]: value };
    onChange("priceAssets", updated);
  };

  const removePriceAsset = (index: number) => {
    onChange("priceAssets", data.priceAssets.filter((_, i) => i !== index));
  };

  // Calls functions
  const addCall = () => {
    onChange("calls", [...data.calls, { countryCode: "+1", phoneNumber: "", conversionAction: "" }]);
  };

  const updateCall = (index: number, field: string, value: string) => {
    const updated = [...data.calls];
    updated[index] = { ...updated[index], [field]: value };
    onChange("calls", updated);
  };

  const removeCall = (index: number) => {
    onChange("calls", data.calls.filter((_, i) => i !== index));
  };

  // Callouts functions
  const addCallout = () => {
    onChange("callouts", [...data.callouts, { text: "", startDate: "", endDate: "" }]);
  };

  const updateCallout = (index: number, field: string, value: string) => {
    const updated = [...data.callouts];
    updated[index] = { ...updated[index], [field]: value };
    onChange("callouts", updated);
  };

  const removeCallout = (index: number) => {
    onChange("callouts", data.callouts.filter((_, i) => i !== index));
  };

  // Structured Snippets functions
  const addStructuredSnippet = () => {
    onChange("structuredSnippets", [...data.structuredSnippets, {
      header: "", headerType: "", values: []
    }]);
  };

  const updateStructuredSnippet = (index: number, field: string, value: any) => {
    const updated = [...data.structuredSnippets];
    updated[index] = { ...updated[index], [field]: value };
    onChange("structuredSnippets", updated);
  };

  const removeStructuredSnippet = (index: number) => {
    onChange("structuredSnippets", data.structuredSnippets.filter((_, i) => i !== index));
  };

  // Search Themes functions
  const addSearchTheme = (theme: string) => {
    if (theme && theme.length <= 80 && !data.searchThemes.includes(theme)) {
      onChange("searchThemes", [...data.searchThemes, theme]);
    }
  };

  const removeSearchTheme = (theme: string) => {
    onChange("searchThemes", data.searchThemes.filter((t) => t !== theme));
  };

  return (
    <Tabs defaultValue="sitelinks" className="w-full">
      <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
        <TabsTrigger value="sitelinks">Sitelinks</TabsTrigger>
        <TabsTrigger value="prices">Prices</TabsTrigger>
        <TabsTrigger value="calls">Calls</TabsTrigger>
        <TabsTrigger value="callouts">Callouts</TabsTrigger>
        <TabsTrigger value="snippets">Snippets</TabsTrigger>
        <TabsTrigger value="leadform">Lead Form</TabsTrigger>
        <TabsTrigger value="advanced">Advanced</TabsTrigger>
      </TabsList>

      {/* Sitelinks Tab */}
      <TabsContent value="sitelinks" className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Sitelinks</CardTitle>
                <CardDescription>Add up to 4 sitelinks</CardDescription>
              </div>
              <Button onClick={addSitelink} variant="outline" size="sm" disabled={data.sitelinks.length >= 4}>
                <Plus className="w-4 h-4 mr-2" />
                Add Sitelink
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.sitelinks.map((sitelink, index) => (
              <Card key={index} className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Sitelink {index + 1}</h4>
                    <Button variant="ghost" size="sm" onClick={() => removeSitelink(index)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Sitelink Text</Label>
                      <Input
                        placeholder="Up to 25 characters"
                        maxLength={25}
                        value={sitelink.text}
                        onChange={(e) => updateSitelink(index, "text", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Final URL</Label>
                      <Input
                        placeholder="https://example.com/page"
                        value={sitelink.finalUrl}
                        onChange={(e) => updateSitelink(index, "finalUrl", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description Line 1</Label>
                      <Input
                        placeholder="Up to 35 characters"
                        maxLength={35}
                        value={sitelink.desc1}
                        onChange={(e) => updateSitelink(index, "desc1", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description Line 2</Label>
                      <Input
                        placeholder="Up to 35 characters"
                        maxLength={35}
                        value={sitelink.desc2}
                        onChange={(e) => updateSitelink(index, "desc2", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input
                        type="date"
                        value={sitelink.startDate}
                        onChange={(e) => updateSitelink(index, "startDate", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input
                        type="date"
                        value={sitelink.endDate}
                        onChange={(e) => updateSitelink(index, "endDate", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </CardContent>
        </Card>
      </TabsContent>

      {/* Price Assets Tab */}
      <TabsContent value="prices" className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Price Assets</CardTitle>
                <CardDescription>Add up to 8 price assets</CardDescription>
              </div>
              <Button onClick={addPriceAsset} variant="outline" size="sm" disabled={data.priceAssets.length >= 8}>
                <Plus className="w-4 h-4 mr-2" />
                Add Price Asset
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.priceAssets.map((price, index) => (
              <Card key={index} className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Price Asset {index + 1}</h4>
                    <Button variant="ghost" size="sm" onClick={() => removePriceAsset(index)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Select value={price.type} onValueChange={(value) => updatePriceAsset(index, "type", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover">
                          <SelectItem value="service">Service</SelectItem>
                          <SelectItem value="product">Product</SelectItem>
                          <SelectItem value="tier">Tier</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Price Qualifier</Label>
                      <Select value={price.qualifier} onValueChange={(value) => updatePriceAsset(index, "qualifier", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-popover">
                          <SelectItem value="No">No Qualifier</SelectItem>
                          <SelectItem value="From">From</SelectItem>
                          <SelectItem value="Up to">Up to</SelectItem>
                          <SelectItem value="Average">Average</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Header</Label>
                      <Input
                        placeholder="e.g., Basic Plan"
                        maxLength={25}
                        value={price.header}
                        onChange={(e) => updatePriceAsset(index, "header", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Amount</Label>
                      <Input
                        type="number"
                        placeholder="99.99"
                        value={price.amount}
                        onChange={(e) => updatePriceAsset(index, "amount", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Unit</Label>
                      <Input
                        placeholder="per month"
                        maxLength={15}
                        value={price.unit}
                        onChange={(e) => updatePriceAsset(index, "unit", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Currency</Label>
                      <Select value={price.currency} onValueChange={(value) => updatePriceAsset(index, "currency", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-popover">
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="GBP">GBP</SelectItem>
                          <SelectItem value="INR">INR</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Description</Label>
                      <Input
                        placeholder="Brief description"
                        maxLength={60}
                        value={price.description}
                        onChange={(e) => updatePriceAsset(index, "description", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Final URL</Label>
                      <Input
                        placeholder="https://example.com/pricing"
                        value={price.finalUrl}
                        onChange={(e) => updatePriceAsset(index, "finalUrl", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </CardContent>
        </Card>
      </TabsContent>

      {/* Calls Tab */}
      <TabsContent value="calls" className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Call Extensions</CardTitle>
                <CardDescription>Add phone numbers for click-to-call</CardDescription>
              </div>
              <Button onClick={addCall} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Call
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.calls.map((call, index) => (
              <div key={index} className="flex gap-2 items-end">
                <div className="space-y-2 w-32">
                  <Label>Country Code</Label>
                  <Select value={call.countryCode} onValueChange={(value) => updateCall(index, "countryCode", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="+1">🇺🇸 +1</SelectItem>
                      <SelectItem value="+44">🇬🇧 +44</SelectItem>
                      <SelectItem value="+91">🇮🇳 +91</SelectItem>
                      <SelectItem value="+86">🇨🇳 +86</SelectItem>
                      <SelectItem value="+49">🇩🇪 +49</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 flex-1">
                  <Label>Phone Number</Label>
                  <Input
                    type="tel"
                    placeholder="Enter phone number"
                    value={call.phoneNumber}
                    onChange={(e) => updateCall(index, "phoneNumber", e.target.value)}
                  />
                </div>
                <div className="space-y-2 flex-1">
                  <Label>Conversion Action</Label>
                  <Select value={call.conversionAction} onValueChange={(value) => updateCall(index, "conversionAction", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="phone-lead">Phone Lead</SelectItem>
                      <SelectItem value="contact">Contact</SelectItem>
                      <SelectItem value="consultation">Consultation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeCall(index)}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>

      {/* Callouts Tab */}
      <TabsContent value="callouts" className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Callouts</CardTitle>
                <CardDescription>Add up to 20 callouts (25 chars each)</CardDescription>
              </div>
              <Button onClick={addCallout} variant="outline" size="sm" disabled={data.callouts.length >= 20}>
                <Plus className="w-4 h-4 mr-2" />
                Add Callout
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.callouts.map((callout, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-5 space-y-2">
                  <Label>Text</Label>
                  <Input
                    placeholder="e.g., Free Shipping"
                    maxLength={25}
                    value={callout.text}
                    onChange={(e) => updateCallout(index, "text", e.target.value)}
                  />
                </div>
                <div className="col-span-3 space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={callout.startDate}
                    onChange={(e) => updateCallout(index, "startDate", e.target.value)}
                  />
                </div>
                <div className="col-span-3 space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={callout.endDate}
                    onChange={(e) => updateCallout(index, "endDate", e.target.value)}
                  />
                </div>
                <Button variant="ghost" size="icon" className="col-span-1" onClick={() => removeCallout(index)}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>

      {/* Structured Snippets Tab */}
      <TabsContent value="snippets" className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Structured Snippets</CardTitle>
                <CardDescription>Highlight specific aspects of your products or services</CardDescription>
              </div>
              <Button onClick={addStructuredSnippet} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Snippet
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.structuredSnippets.map((snippet, index) => (
              <Card key={index} className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Snippet {index + 1}</h4>
                    <Button variant="ghost" size="sm" onClick={() => removeStructuredSnippet(index)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Header Type</Label>
                      <Select value={snippet.headerType} onValueChange={(value) => updateStructuredSnippet(index, "headerType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select header type" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover">
                          <SelectItem value="amenities">Amenities</SelectItem>
                          <SelectItem value="brands">Brands</SelectItem>
                          <SelectItem value="courses">Courses</SelectItem>
                          <SelectItem value="degree-programs">Degree Programs</SelectItem>
                          <SelectItem value="destinations">Destinations</SelectItem>
                          <SelectItem value="featured-hotels">Featured Hotels</SelectItem>
                          <SelectItem value="insurance-coverage">Insurance Coverage</SelectItem>
                          <SelectItem value="models">Models</SelectItem>
                          <SelectItem value="neighborhoods">Neighborhoods</SelectItem>
                          <SelectItem value="service-catalog">Service Catalog</SelectItem>
                          <SelectItem value="shows">Shows</SelectItem>
                          <SelectItem value="styles">Styles</SelectItem>
                          <SelectItem value="types">Types</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Header</Label>
                      <Input
                        placeholder="Will be set based on type"
                        value={snippet.header}
                        onChange={(e) => updateStructuredSnippet(index, "header", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Values (up to 10, 25 chars each)</Label>
                      <Input
                        placeholder="Press Enter to add value"
                        maxLength={25}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && snippet.values.length < 10) {
                            const value = e.currentTarget.value.trim();
                            if (value) {
                              updateStructuredSnippet(index, "values", [...snippet.values, value]);
                              e.currentTarget.value = "";
                            }
                          }
                        }}
                      />
                      <div className="flex flex-wrap gap-2 mt-2">
                        {snippet.values.map((value, vIndex) => (
                          <Badge key={vIndex} variant="secondary" className="gap-1">
                            {value}
                            <X
                              className="w-3 h-3 cursor-pointer"
                              onClick={() => {
                                const updated = snippet.values.filter((_, i) => i !== vIndex);
                                updateStructuredSnippet(index, "values", updated);
                              }}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </CardContent>
        </Card>
      </TabsContent>

      {/* Lead Form Tab */}
      <TabsContent value="leadform" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Lead Form</CardTitle>
            <CardDescription>Create a custom lead form for your campaign</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Form Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="form-headline">Headline (max 25 chars)</Label>
                  <Input
                    id="form-headline"
                    maxLength={25}
                    placeholder="Get a Free Quote"
                    value={data.leadForm.headline}
                    onChange={(e) => onChange("leadForm", { ...data.leadForm, headline: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="form-business">Business Name (max 30 chars)</Label>
                  <Input
                    id="form-business"
                    maxLength={30}
                    placeholder="Your Company Name"
                    value={data.leadForm.businessName}
                    onChange={(e) => onChange("leadForm", { ...data.leadForm, businessName: e.target.value })}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="form-description">Description (max 200 chars)</Label>
                  <Textarea
                    id="form-description"
                    maxLength={200}
                    placeholder="Tell us about your needs..."
                    value={data.leadForm.description}
                    onChange={(e) => onChange("leadForm", { ...data.leadForm, description: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Privacy & Background</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="privacy-url">Privacy Policy URL</Label>
                  <Input
                    id="privacy-url"
                    placeholder="https://example.com/privacy"
                    value={data.leadForm.privacyPolicyUrl}
                    onChange={(e) => onChange("leadForm", { ...data.leadForm, privacyPolicyUrl: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Background Image</Label>
                  <Button variant="outline" className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Form Submission Message</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Submission Headline</Label>
                  <Input
                    placeholder="Thank You!"
                    value={data.leadForm.submissionHeadline}
                    onChange={(e) => onChange("leadForm", { ...data.leadForm, submissionHeadline: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Submission Description</Label>
                  <Input
                    placeholder="We'll contact you soon"
                    value={data.leadForm.submissionDescription}
                    onChange={(e) => onChange("leadForm", { ...data.leadForm, submissionDescription: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Lead Delivery</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Webhook URL</Label>
                  <Input
                    placeholder="https://api.example.com/webhook"
                    value={data.leadForm.webhookUrl}
                    onChange={(e) => onChange("leadForm", { ...data.leadForm, webhookUrl: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Lead Form Type</Label>
                  <Select value={data.leadForm.formType} onValueChange={(value) => onChange("leadForm", { ...data.leadForm, formType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="more-volume">More Volume</SelectItem>
                      <SelectItem value="more-qualified">More Qualified</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Advanced Tab */}
      <TabsContent value="advanced" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Display & URL Options</CardTitle>
            <CardDescription>Configure advanced settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="display-path">Display Path</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">url/</span>
                <Input
                  id="display-path"
                  placeholder="path1/path2"
                  maxLength={30}
                  value={data.displayPath}
                  onChange={(e) => onChange("displayPath", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobile-url">Final URL for Mobile</Label>
              <Input
                id="mobile-url"
                placeholder="https://m.example.com"
                value={data.mobileFinalUrl}
                onChange={(e) => onChange("mobileFinalUrl", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="asset-tracking">Asset Group Tracking Template</Label>
              <Input
                id="asset-tracking"
                placeholder="https://example.com/track?..."
                value={data.assetTracking}
                onChange={(e) => onChange("assetTracking", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="asset-suffix">Asset Group URL Suffix</Label>
              <Input
                id="asset-suffix"
                placeholder="utm_source=google"
                value={data.assetUrlSuffix}
                onChange={(e) => onChange("assetUrlSuffix", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Asset Optimization</CardTitle>
            <CardDescription>Enable AI-powered optimizations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="text-custom">Text Customization</Label>
              <Checkbox
                id="text-custom"
                checked={data.textCustomization}
                onCheckedChange={(checked) => onChange("textCustomization", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="url-expansion">Final URL Expansion</Label>
              <Checkbox
                id="url-expansion"
                checked={data.finalUrlExpansion}
                onCheckedChange={(checked) => onChange("finalUrlExpansion", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="image-enhance">Enable Image/Video Enhancements</Label>
              <Checkbox
                id="image-enhance"
                checked={data.imageEnhancements}
                onCheckedChange={(checked) => onChange("imageEnhancements", checked)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Search Themes</CardTitle>
            <CardDescription>Add up to 80 character search themes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              placeholder="Enter search theme (max 80 chars)"
              maxLength={80}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addSearchTheme(e.currentTarget.value);
                  e.currentTarget.value = "";
                }
              }}
            />
            <p className="text-xs text-muted-foreground">Press Enter to add themes</p>
            <div className="flex flex-wrap gap-2">
              {data.searchThemes.map((theme, index) => (
                <Badge key={index} variant="secondary" className="gap-1">
                  {theme}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => removeSearchTheme(theme)} />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Audience Signal</CardTitle>
            <CardDescription>Create custom audience segments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="audience-name">Audience Name</Label>
              <Input
                id="audience-name"
                placeholder="e.g., High-Intent Shoppers"
                value={data.audienceName}
                onChange={(e) => onChange("audienceName", e.target.value)}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Configure interests, demographics, and custom segments for audience targeting
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
