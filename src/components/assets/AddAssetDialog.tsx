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
  const [activeTab, setActiveTab] = useState("price");

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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="price">Price</TabsTrigger>
            <TabsTrigger value="calls">Calls</TabsTrigger>
            <TabsTrigger value="callouts">Callouts</TabsTrigger>
            <TabsTrigger value="snippets">Structured Snippets</TabsTrigger>
            <TabsTrigger value="lead">Lead Form</TabsTrigger>
          </TabsList>

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
        </Tabs>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
