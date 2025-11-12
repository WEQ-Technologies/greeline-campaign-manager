import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Stepper } from "@/components/campaign-wizard/Stepper";
import { CampaignDetailsStep } from "@/components/campaign-wizard/CampaignDetailsStep";
import { SetBudgetStep } from "@/components/campaign-wizard/SetBudgetStep";
import { CampaignSettingsStep } from "@/components/campaign-wizard/CampaignSettingsStep";
import { AdsKeywordsStep } from "@/components/campaign-wizard/AdsKeywordsStep";
import { AssetGenerationStep } from "@/components/campaign-wizard/AssetGenerationStep";
import { SummaryStep } from "@/components/campaign-wizard/SummaryStep";
import { toast } from "sonner";

const steps = [
  { id: 0, title: "Campaign Details", description: "Basic information" },
  { id: 1, title: "Set Budget", description: "Budget & bidding" },
  { id: 2, title: "Campaign Settings", description: "Audience & targeting" },
  { id: 3, title: "Ads and Keywords", description: "Ad groups & keywords" },
  { id: 4, title: "Asset Generation", description: "Select assets" },
  { id: 5, title: "Summary", description: "Review & publish" },
];

export default function CampaignWizard() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    campaignDetails: {
      client: "Tech Startup Inc", // Pre-filled from header context
      campaignName: "",
      objective: "",
      campaignType: "",
    },
    budget: {
      focusOn: "conversion",
      targetCpa: "",
      targetRoas: "",
      budgetType: "daily",
      budgetAmount: "",
      startDate: "",
      endDate: "",
      noEndDate: false,
    },
    campaignSettings: {
      audience: "",
      locations: [] as string[],
      languages: [] as string[],
      adSchedule: [] as Array<{ days: string; startTime: string; endTime: string }>,
      trackingTemplate: "",
      finalUrlSuffix: "",
      customParameters: [] as Array<{ name: string; value: string }>,
      pageFeed: "",
    },
    adsKeywords: {
      adGroup: "",
      keywords: [] as string[],
    },
    assetGeneration: {
      assetGroup: "",
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
        return (
          <CampaignDetailsStep
            data={formData.campaignDetails}
            onChange={(field, value) => updateFormData("campaignDetails", { ...formData.campaignDetails, [field]: value })}
          />
        );
      case 1:
        return (
          <SetBudgetStep
            data={formData.budget}
            onChange={(field, value) => updateFormData("budget", { ...formData.budget, [field]: value })}
          />
        );
      case 2:
        return (
          <CampaignSettingsStep
            data={formData.campaignSettings}
            onChange={(field, value) => updateFormData("campaignSettings", { ...formData.campaignSettings, [field]: value })}
          />
        );
      case 3:
        return (
          <AdsKeywordsStep
            data={formData.adsKeywords}
            onChange={(field, value) => updateFormData("adsKeywords", { ...formData.adsKeywords, [field]: value })}
          />
        );
      case 4:
        return (
          <AssetGenerationStep
            data={formData.assetGeneration}
            onChange={(field, value) => updateFormData("assetGeneration", { ...formData.assetGeneration, [field]: value })}
          />
        );
      case 5:
        return <SummaryStep data={formData} />;
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
          <Button onClick={handleLaunch}>
            Publish Campaign
          </Button>
        ) : (
          <Button onClick={handleNext}>
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
