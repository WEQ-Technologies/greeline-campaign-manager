import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Stepper } from "@/components/campaign-wizard/Stepper";
import { SelectClient } from "@/components/campaign-wizard/SelectClient";
import { CampaignSettings } from "@/components/campaign-wizard/CampaignSettings";
import { BudgetBidding } from "@/components/campaign-wizard/BudgetBidding";
import { LocationsTargeting } from "@/components/campaign-wizard/LocationsTargeting";
import { AdGroupsKeywords } from "@/components/campaign-wizard/AdGroupsKeywords";
import { AdsCreation } from "@/components/campaign-wizard/AdsCreation";
import { Extensions } from "@/components/campaign-wizard/Extensions";
import { ReviewLaunch } from "@/components/campaign-wizard/ReviewLaunch";
import { toast } from "sonner";

const steps = [
  { id: 0, title: "Client", description: "Select client" },
  { id: 1, title: "Settings", description: "Campaign details" },
  { id: 2, title: "Budget", description: "Budget & bidding" },
  { id: 3, title: "Targeting", description: "Locations & targeting" },
  { id: 4, title: "Keywords", description: "Ad groups & keywords" },
  { id: 5, title: "Ads", description: "Create ads" },
  { id: 6, title: "Extensions", description: "Ad extensions" },
  { id: 7, title: "Review", description: "Review & launch" },
];

export default function CampaignWizard() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    client: "",
    settings: { 
      name: "", 
      type: "", 
      objective: "",
      reachGoals: [] as string[],
      businessWebsiteUrl: "",
      phoneNumber: "",
      countryCode: "+1",
      salesConversionGoals: [] as string[],
      leadsConversionGoals: [] as string[],
      finalUrl: "",
    },
    budget: { 
      focusOn: "conversions",
      targetCpa: "",
      targetRoas: "",
      budgetType: "daily",
      averageDailyBudget: "",
      totalBudget: "",
      startDate: "",
      endDate: "",
      promotionMode: false,
      promotionStartDate: "",
      promotionEndDate: "",
    },
    targeting: { 
      locationType: "all-countries",
      customLocations: [] as string[],
      languages: [] as string[],
      adSchedule: [] as Array<{ days: string; startTime: string; endTime: string }>,
      devices: [] as string[],
      brandExclusions: [] as string[],
      ageExclusions: [] as string[],
      trackingTemplate: "",
      finalUrlSuffix: "",
      customParameters: [] as Array<{ name: string; value: string }>,
      pageFeed: "",
    },
    adGroups: { adGroups: [{ id: "1", name: "Ad Group 1", keywords: [] }] },
    ads: { headline1: "", headline2: "", headline3: "", description1: "", description2: "", finalUrl: "" },
    extensions: { 
      sitelinks: [] as Array<{ text: string; desc1: string; desc2: string; finalUrl: string; trackingUrl: string; startDate: string; endDate: string; }>,
      promotions: [] as Array<{ occasion: string; language: string; currency: string; promoType: string; amount: string; details: string; startDate: string; endDate: string; terms: string; }>,
      priceAssets: [] as Array<{ language: string; type: string; currency: string; qualifier: string; header: string; amount: string; unit: string; description: string; finalUrl: string; }>,
      calls: [] as Array<{ countryCode: string; phoneNumber: string; conversionAction: string; }>,
      callouts: [] as Array<{ text: string; startDate: string; endDate: string; }>,
      structuredSnippets: [] as Array<{ header: string; headerType: string; values: string[]; }>,
      leadForm: { headline: "", businessName: "", description: "", privacyPolicyUrl: "", submissionHeadline: "", submissionDescription: "", webhookUrl: "", formType: "" },
      displayPath: "",
      mobileFinalUrl: "",
      assetTracking: "",
      assetUrlSuffix: "",
      textCustomization: false,
      finalUrlExpansion: false,
      imageEnhancements: false,
      searchThemes: [] as string[],
      audienceName: "",
    },
  });

  const updateFormData = (section: string, data: any) => {
    setFormData((prev) => ({ ...prev, [section]: data }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleLaunch = () => {
    toast.success("Campaign created successfully!");
    navigate("/campaigns");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <SelectClient value={formData.client} onChange={(value) => updateFormData("client", value)} />;
      case 1:
        return (
          <CampaignSettings
            data={formData.settings}
            onChange={(field, value) => updateFormData("settings", { ...formData.settings, [field]: value })}
          />
        );
      case 2:
        return (
          <BudgetBidding
            data={formData.budget}
            onChange={(field, value) => updateFormData("budget", { ...formData.budget, [field]: value })}
          />
        );
      case 3:
        return (
          <LocationsTargeting
            data={formData.targeting}
            onChange={(field, value) => updateFormData("targeting", { ...formData.targeting, [field]: value })}
          />
        );
      case 4:
        return (
          <AdGroupsKeywords
            data={formData.adGroups}
            onChange={(field, value) => updateFormData("adGroups", { ...formData.adGroups, [field]: value })}
          />
        );
      case 5:
        return (
          <AdsCreation
            data={formData.ads}
            onChange={(field, value) => updateFormData("ads", { ...formData.ads, [field]: value })}
          />
        );
      case 6:
        return (
          <Extensions
            data={formData.extensions}
            onChange={(field, value) => updateFormData("extensions", { ...formData.extensions, [field]: value })}
          />
        );
      case 7:
        return <ReviewLaunch data={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/campaigns")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Campaign</h1>
          <p className="text-muted-foreground mt-1">Launch a new advertising campaign</p>
        </div>
      </div>

      <Stepper steps={steps} currentStep={currentStep} />

      <div className="min-h-[400px]">{renderStep()}</div>

      <div className="flex justify-between pt-4 border-t">
        <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        {currentStep === steps.length - 1 ? (
          <Button onClick={handleLaunch} className="bg-primary hover:bg-primary-hover">
            Launch Campaign
          </Button>
        ) : (
          <Button onClick={handleNext} className="bg-primary hover:bg-primary-hover">
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
