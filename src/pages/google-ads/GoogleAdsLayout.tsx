import { Outlet } from "react-router-dom";
import { GoogleAdsHeader } from "@/components/google-ads/GoogleAdsHeader";
import { GoogleAdsSidebar } from "@/components/google-ads/GoogleAdsSidebar";

export default function GoogleAdsLayout() {
  return (
    <div className="flex flex-col h-screen bg-gradient-subtle">
      <GoogleAdsHeader />
      <div className="flex flex-1 overflow-hidden">
        <GoogleAdsSidebar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
