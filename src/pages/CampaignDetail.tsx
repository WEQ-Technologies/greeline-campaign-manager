import { useParams, useNavigate, Outlet, useLocation } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ArrowLeft, Layers, Image, Settings, History, FolderKanban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CompactSyncButton } from "@/components/sync/CompactSyncButton";

const campaigns = [
  { id: "1", name: "Brand Awareness Q1", client: "Tech Startup Inc", type: "Search", goal: "Sales" },
  { id: "2", name: "Holiday Special", client: "Nations Auto Glass", type: "Performance Max", goal: "Leads" },
  { id: "3", name: "New Year Promo", client: "VW Heavy Up", type: "Search", goal: "Website Traffic" },
];

export default function CampaignDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const campaign = campaigns.find(c => c.id === id) || campaigns[0];
  
  const menuItems = [
    { title: "Campaign Settings", url: `/campaigns/${id}`, icon: FolderKanban },
    { title: "Ad Groups", url: `/campaigns/${id}/ad-groups`, icon: Layers },
    { title: "Assets", url: `/campaigns/${id}/assets`, icon: Image },
    { title: "Other", url: `/campaigns/${id}/other`, icon: Settings },
    { title: "Change History", url: `/campaigns/${id}/history`, icon: History },
  ];

  const isActive = (path: string) => {
    if (path === `/campaigns/${id}`) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r border-border">
          <div className="p-4 border-b border-border">
            <Button variant="ghost" size="sm" onClick={() => navigate("/google-ads/campaigns")} className="mb-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Campaigns
            </Button>
            <div>
              <h2 className="font-semibold text-lg">{campaign.name}</h2>
              <p className="text-sm text-muted-foreground">{campaign.client}</p>
              <p className="text-xs text-muted-foreground mt-1">{campaign.type} • {campaign.goal}</p>
            </div>
          </div>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Campaign Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        onClick={() => navigate(item.url)}
                        className={isActive(item.url) ? "bg-sidebar-accent" : ""}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1">
          <div className="border-b border-border p-4 flex items-center justify-between">
            <SidebarTrigger />
            <CompactSyncButton />
          </div>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
