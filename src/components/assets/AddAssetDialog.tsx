import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

export function AddAssetDialog() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("headline");

  // Price Asset Form
  const [priceForm, setPriceForm] = useState({
    headline: "",
    type: "",
    category: "",
    text: "",
    priceQualifier: "",
    occasion: "",
    language: "",
    list: "",
    description: "",
    finalUrl: "",
    trackingUrl: "",
    urlSuffix: "",
  });

  // Calls Form
  const [callsForm, setCallsForm] = useState({
    displayNumber: "",
    phoneNumber: "",
    conversionAction: "",
  });

  // Callouts Form
  const [calloutsForm, setCalloutsForm] = useState({
    calloutText: "",
    startDate: "",
    endDate: "",
    selectDays: "",
  });

  // Structured Snippets Form
  const [snippetsForm, setSnippetsForm] = useState({
    header: "",
    values: "",
    startDate: "",
    endDate: "",
  });

  // Lead Form
  const [leadForm, setLeadForm] = useState({
    businessName: "",
    headline: "",
    description: "",
    callToAction: "",
    privacyPolicyUrl: "",
    backgroundImage: "",
  });

  const handleSave = () => {
    toast({ title: "Success", description: "Asset created successfully" });
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Asset
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Asset</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="overflow-x-auto">
            <TabsList className="inline-flex w-auto min-w-full">
              <TabsTrigger value="headline">Headline</TabsTrigger>
              <TabsTrigger value="long-headline">Long Headline</TabsTrigger>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="sitelinks">Sitelinks</TabsTrigger>
              <TabsTrigger value="promotion">Promotion</TabsTrigger>
              <TabsTrigger value="price">Price</TabsTrigger>
              <TabsTrigger value="calls">Calls</TabsTrigger>
              <TabsTrigger value="callouts">Callouts</TabsTrigger>
              <TabsTrigger value="snippets">Structured Snippets</TabsTrigger>
              <TabsTrigger value="lead">Lead Form</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
            </TabsList>
          </div>

          {/* Headline Tab */}
          <TabsContent value="headline" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="headlineText">Heading (up to 30 characters max)</Label>
              <Input
                id="headlineText"
                maxLength={30}
                placeholder="Enter headline"
              />
            </div>
          </TabsContent>

          {/* Long Headline Tab */}
          <TabsContent value="long-headline" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="longHeadlineText">Long headline (up to 90 characters max)</Label>
              <Input
                id="longHeadlineText"
                maxLength={90}
                placeholder="Enter long headline"
              />
            </div>
          </TabsContent>

          {/* Description Tab */}
          <TabsContent value="description" className="space-y-4">
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

          {/* Images Tab */}
          <TabsContent value="images" className="space-y-4">
            <div className="space-y-2">
              <Label>Add Videos (Max file up to 5 videos)</Label>
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

          {/* Videos Tab */}
          <TabsContent value="videos" className="space-y-4">
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

          {/* Sitelinks Tab */}
          <TabsContent value="sitelinks" className="space-y-4">
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

            <div className="space-y-2">
              <Label>Tracking URL/URL option</Label>
              <Input placeholder="Final URL suffix" className="mb-2" />
              <Input placeholder="Custom parameters: Name, Value" />
            </div>

            <div className="space-y-2">
              <Label>Assets Scheduling</Label>
              <Input type="date" placeholder="Start Date and End Date" className="mb-2" />
              <Input placeholder="Select Days and time" />
            </div>

            <div className="space-y-2">
              <Label>Call to Action</Label>
              <p className="text-sm text-muted-foreground">(List the Actions)</p>
            </div>
          </TabsContent>

          {/* Promotion Tab */}
          <TabsContent value="promotion" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="promotionType">Type (Standard/Promotional)</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="promotional">Promotional</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="promotionLanguage">Language (Browser)</Label>
              <Select>
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

            <div className="space-y-2">
              <Label htmlFor="promotionOccasion">Promotion (Spec)[occasion] (Enter amount [min/max] Date [Min 25]</Label>
              <Input
                id="promotionOccasion"
                placeholder="Enter promotion details"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="promotionCode">Promotion Details[promotion] (enter value [Promotion 15]</Label>
              <Input
                id="promotionCode"
                placeholder="Enter promotion code"
              />
            </div>

            <div className="space-y-2">
              <Label>Tracking URL/URL option</Label>
              <Input placeholder="Final URL suffix" className="mb-2" />
              <Input placeholder="Custom parameters: Name, Value" />
            </div>

            <div className="space-y-2">
              <Label>Use a different final URL for mobile: Checkbox</Label>
              <Input type="checkbox" className="w-4 h-4" />
            </div>

            <div className="space-y-2">
              <Label>Assets Scheduling</Label>
              <Input type="date" placeholder="Start Date and End Date" className="mb-2" />
              <Input placeholder="Select Days and time" />
            </div>

            <div className="space-y-2">
              <Label>Call to Action</Label>
              <p className="text-sm text-muted-foreground">(List the Actions)</p>
            </div>

            <div className="space-y-2">
              <Label>Additional promotional terms and conditions</Label>
              <Textarea
                placeholder="Enter terms and conditions"
                rows={3}
              />
            </div>
          </TabsContent>

          {/* Price Tab */}
          <TabsContent value="price" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="priceHeadline">Headline</Label>
              <Select value={priceForm.headline} onValueChange={(value) => setPriceForm({ ...priceForm, headline: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select headline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="dynamic">Dynamic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priceType">Type (Dropdown)</Label>
              <Select value={priceForm.type} onValueChange={(value) => setPriceForm({ ...priceForm, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="from">From</SelectItem>
                  <SelectItem value="up-to">Up to</SelectItem>
                  <SelectItem value="average">Average</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priceCategory">Category (Dropdown)</Label>
              <Select value={priceForm.category} onValueChange={(value) => setPriceForm({ ...priceForm, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="service">Service</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="subscription">Subscription</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priceText">Text (25 chars max)</Label>
              <Input
                id="priceText"
                value={priceForm.text}
                onChange={(e) => setPriceForm({ ...priceForm, text: e.target.value })}
                maxLength={25}
                placeholder="Enter price text"
              />
            </div>

            <div className="space-y-2">
              <Label>Price Assets</Label>
              <div className="space-y-2">
                <Input placeholder="Priority" />
                <Input placeholder="Occasion" />
                <Input placeholder="Language/Currency (Spec, Currency, Type, Average)" />
                <Input placeholder="List (Dropdown)" />
                <Input placeholder="Description" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tracking URL/URL option</Label>
              <Input placeholder="Final URL suffix" />
              <Input placeholder="Custom parameters: Name, Value" />
            </div>

            <div className="space-y-2">
              <Label>Assets Scheduling</Label>
              <Input type="date" placeholder="Start Date and End Date" className="mb-2" />
              <Input placeholder="Select Days and time" />
            </div>

            <div className="space-y-2">
              <Label>Call to Action</Label>
              <p className="text-sm text-muted-foreground">(List the Actions)</p>
            </div>

            <div className="space-y-2">
              <Label>Additional Information</Label>
              <p className="text-sm text-muted-foreground">Show promotional terms and conditions</p>
            </div>
          </TabsContent>

          {/* Calls Tab */}
          <TabsContent value="calls" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayNumber">Display Number (Dropdown)</Label>
              <Select value={callsForm.displayNumber} onValueChange={(value) => setCallsForm({ ...callsForm, displayNumber: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select display number" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main">Main Number</SelectItem>
                  <SelectItem value="support">Support Number</SelectItem>
                  <SelectItem value="sales">Sales Number</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={callsForm.phoneNumber}
                onChange={(e) => setCallsForm({ ...callsForm, phoneNumber: e.target.value })}
                placeholder="Enter phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="conversionAction">Conversion Action (Dropdown)</Label>
              <Select value={callsForm.conversionAction} onValueChange={(value) => setCallsForm({ ...callsForm, conversionAction: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select conversion action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="call">Track Calls</SelectItem>
                  <SelectItem value="none">No Tracking</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          {/* Callouts Tab */}
          <TabsContent value="callouts" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="calloutText">Callout Text</Label>
              <Input
                id="calloutText"
                value={calloutsForm.calloutText}
                onChange={(e) => setCalloutsForm({ ...calloutsForm, calloutText: e.target.value })}
                placeholder="Enter callout text (up to 25 characters max)"
                maxLength={25}
              />
            </div>

            <div className="space-y-2">
              <Label>Assets Scheduling</Label>
              <Input 
                type="date" 
                placeholder="Start Date" 
                value={calloutsForm.startDate}
                onChange={(e) => setCalloutsForm({ ...calloutsForm, startDate: e.target.value })}
                className="mb-2" 
              />
              <Input 
                type="date" 
                placeholder="End Date"
                value={calloutsForm.endDate}
                onChange={(e) => setCalloutsForm({ ...calloutsForm, endDate: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Select Days and time</Label>
              <Input
                placeholder="Select specific days and time"
                value={calloutsForm.selectDays}
                onChange={(e) => setCalloutsForm({ ...calloutsForm, selectDays: e.target.value })}
              />
            </div>
          </TabsContent>

          {/* Structured Snippets Tab */}
          <TabsContent value="snippets" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="snippetHeader">Header (Dropdown)</Label>
              <Select value={snippetsForm.header} onValueChange={(value) => setSnippetsForm({ ...snippetsForm, header: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select header" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="types">Types</SelectItem>
                  <SelectItem value="brands">Brands</SelectItem>
                  <SelectItem value="services">Services</SelectItem>
                  <SelectItem value="models">Models</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="snippetValues">Values (up to 10 values of 25 characters max)</Label>
              <Textarea
                id="snippetValues"
                value={snippetsForm.values}
                onChange={(e) => setSnippetsForm({ ...snippetsForm, values: e.target.value })}
                placeholder="Enter values separated by commas"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Assets Scheduling</Label>
              <Input 
                type="date" 
                placeholder="Start Date"
                value={snippetsForm.startDate}
                onChange={(e) => setSnippetsForm({ ...snippetsForm, startDate: e.target.value })}
                className="mb-2" 
              />
              <Input 
                type="date" 
                placeholder="End Date"
                value={snippetsForm.endDate}
                onChange={(e) => setSnippetsForm({ ...snippetsForm, endDate: e.target.value })}
              />
            </div>
          </TabsContent>

          {/* Lead Form Tab */}
          <TabsContent value="lead" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                value={leadForm.businessName}
                onChange={(e) => setLeadForm({ ...leadForm, businessName: e.target.value })}
                placeholder="Enter business name (Input max 25 characters)"
                maxLength={25}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="leadHeadline">Headline (Input max 30 characters)</Label>
              <Input
                id="leadHeadline"
                value={leadForm.headline}
                onChange={(e) => setLeadForm({ ...leadForm, headline: e.target.value })}
                placeholder="Enter headline"
                maxLength={30}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="leadDescription">Description (Input max 200 char)</Label>
              <Textarea
                id="leadDescription"
                value={leadForm.description}
                onChange={(e) => setLeadForm({ ...leadForm, description: e.target.value })}
                placeholder="Enter description"
                maxLength={200}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Qualifying questions</Label>
              <p className="text-sm text-muted-foreground">Question: Input, Optional: toggle</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="callToAction">Call to Action</Label>
              <Select value={leadForm.callToAction} onValueChange={(value) => setLeadForm({ ...leadForm, callToAction: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select CTA" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="learn-more">Learn More</SelectItem>
                  <SelectItem value="get-quote">Get Quote</SelectItem>
                  <SelectItem value="sign-up">Sign Up</SelectItem>
                  <SelectItem value="contact-us">Contact Us</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="privacyPolicy">Display Policy URL - Input</Label>
              <Input
                id="privacyPolicy"
                value={leadForm.privacyPolicyUrl}
                onChange={(e) => setLeadForm({ ...leadForm, privacyPolicyUrl: e.target.value })}
                placeholder="https://example.com/privacy"
              />
            </div>

            <div className="space-y-2">
              <Label>Background Image - image upload</Label>
              <Button variant="outline" className="w-full">
                Upload Background Image
              </Button>
            </div>
          </TabsContent>

          {/* Location Tab */}
          <TabsContent value="location" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="locationAddress">Business Address</Label>
              <Input
                id="locationAddress"
                placeholder="Enter business address"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="locationCity">City</Label>
              <Input
                id="locationCity"
                placeholder="Enter city"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="locationState">State/Region</Label>
              <Input
                id="locationState"
                placeholder="Enter state or region"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="locationZip">ZIP/Postal Code</Label>
              <Input
                id="locationZip"
                placeholder="Enter ZIP or postal code"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="locationCountry">Country</Label>
              <Select>
                <SelectTrigger id="locationCountry">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="locationPhone">Phone Number</Label>
              <Input
                id="locationPhone"
                placeholder="Enter phone number"
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
