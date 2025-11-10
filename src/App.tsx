import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import AccountDetail from "./pages/AccountDetail";
import AccountForm from "./pages/AccountForm";
import Clients from "./pages/Clients";
import ClientDetail from "./pages/ClientDetail";
import ClientForm from "./pages/ClientForm";
import GoogleAdsLayout from "./pages/google-ads/GoogleAdsLayout";
import Overview from "./pages/google-ads/Overview";
import Campaigns from "./pages/Campaigns";
import AdGroups from "./pages/AdGroups";
import Ads from "./pages/Ads";
import Assets from "./pages/Assets";
import Audience from "./pages/Audience";
import Keywords from "./pages/Keywords";
import Location from "./pages/Location";
import Content from "./pages/Content";
import ChangeHistory from "./pages/ChangeHistory";
import CampaignWizard from "./pages/CampaignWizard";
import CampaignDetail from "./pages/CampaignDetail";
import CampaignSettings from "./pages/campaign-detail/CampaignSettings";
import AdGroupsList from "./pages/campaign-detail/AdGroupsList";
import AdGroupForm from "./pages/campaign-detail/AdGroupForm";
import AssetsList from "./pages/campaign-detail/AssetsList";
import AssetsForm from "./pages/campaign-detail/AssetsForm";
import OtherSettings from "./pages/campaign-detail/OtherSettings";
import CampaignChangeHistory from "./pages/campaign-detail/ChangeHistory";
import AdEditor from "./pages/AdEditor";
import AddKeyword from "./pages/AddKeyword";
import AddNegativeKeyword from "./pages/AddNegativeKeyword";
import UploadKeywordsCSV from "./pages/UploadKeywordsCSV";
import AddAd from "./pages/AddAd";
import AddAdGroup from "./pages/AddAdGroup";
import AddAsset from "./pages/AddAsset";
import { Navigate } from "react-router-dom";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="accounts" element={<Accounts />} />
            <Route path="accounts/:id" element={<AccountDetail />} />
            <Route path="accounts/new" element={<AccountForm />} />
            <Route path="accounts/:id/edit" element={<AccountForm />} />
            <Route path="clients" element={<Clients />} />
            <Route path="clients/:id" element={<ClientDetail />} />
            <Route path="clients/new" element={<ClientForm />} />
            <Route path="clients/:id/edit" element={<ClientForm />} />
          </Route>
          
          {/* Google Ads Workspace */}
          <Route path="/google-ads" element={<GoogleAdsLayout />}>
            <Route path="overview" element={<Overview />} />
            <Route path="campaigns" element={<Campaigns />} />
            <Route path="ad-groups" element={<AdGroups />} />
            <Route path="ad-groups/new" element={<AddAdGroup />} />
            <Route path="ads" element={<Ads />} />
            <Route path="ads/new" element={<AddAd />} />
            <Route path="assets" element={<Assets />} />
            <Route path="assets/new" element={<AddAsset />} />
            <Route path="audience" element={<Audience />} />
            <Route path="keywords" element={<Keywords />} />
            <Route path="keywords/new" element={<AddKeyword />} />
            <Route path="keywords/negative/new" element={<AddNegativeKeyword />} />
            <Route path="keywords/upload" element={<UploadKeywordsCSV />} />
            <Route path="content" element={<Content />} />
            <Route path="location" element={<Location />} />
            <Route path="change-history" element={<ChangeHistory />} />
          </Route>
          
          <Route path="/campaigns/new" element={<CampaignWizard />} />
          <Route path="/campaigns/:id" element={<CampaignDetail />}>
            <Route index element={<CampaignSettings />} />
            <Route path="ad-groups" element={<AdGroupsList />} />
            <Route path="ad-groups/new" element={<AdGroupForm />} />
            <Route path="ad-groups/:adGroupId/edit" element={<AdGroupForm />} />
            <Route path="assets" element={<AssetsList />} />
            <Route path="assets/new" element={<AssetsForm />} />
            <Route path="assets/:assetId/edit" element={<AssetsForm />} />
            <Route path="other" element={<OtherSettings />} />
            <Route path="history" element={<CampaignChangeHistory />} />
          </Route>
          <Route path="/campaigns/:id/edit" element={<AdEditor />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
