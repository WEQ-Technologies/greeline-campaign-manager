import { LayoutDashboard, Megaphone, Layers, Target, Image, Users, Key, FileText, MapPin, History } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  { name: "Overview", href: "/google-ads/overview", icon: LayoutDashboard },
  { name: "Campaigns", href: "/google-ads/campaigns", icon: Megaphone },
  { name: "Ad Groups", href: "/google-ads/ad-groups", icon: Layers },
  { name: "Ads", href: "/google-ads/ads", icon: Target },
  { name: "Assets", href: "/google-ads/assets", icon: Image },
  { name: "Audience", href: "/google-ads/audience", icon: Users },
  { name: "Keywords", href: "/google-ads/keywords", icon: Key },
  { name: "Content", href: "/google-ads/content", icon: FileText },
  { name: "Location", href: "/google-ads/location", icon: MapPin },
  { name: "Change History", href: "/google-ads/change-history", icon: History },
];

export function GoogleAdsSidebar() {
  const location = useLocation();

  return (
    <div className="w-64 border-r border-border bg-card flex flex-col h-full">
      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted",
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
