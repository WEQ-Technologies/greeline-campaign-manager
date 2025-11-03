import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Campaigns from "./pages/Campaigns";
import CampaignWizard from "./pages/CampaignWizard";
import CampaignDetail from "./pages/CampaignDetail";
import CampaignSettings from "./pages/campaign-detail/CampaignSettings";
import AdGroupsList from "./pages/campaign-detail/AdGroupsList";
import AdGroupForm from "./pages/campaign-detail/AdGroupForm";
import AssetsList from "./pages/campaign-detail/AssetsList";
import AssetsForm from "./pages/campaign-detail/AssetsForm";
import OtherSettings from "./pages/campaign-detail/OtherSettings";
import ChangeHistory from "./pages/campaign-detail/ChangeHistory";
import AdEditor from "./pages/AdEditor";
import NotFound from "./pages/NotFound";

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
            <Route path="clients" element={<Clients />} />
            <Route path="campaigns" element={<Campaigns />} />
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
            <Route path="history" element={<ChangeHistory />} />
          </Route>
          <Route path="/campaigns/:id/edit" element={<AdEditor />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
