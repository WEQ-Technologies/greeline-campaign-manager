import { LayoutDashboard, UserCircle, Users, Megaphone, Layers, Image, Target, Key, MapPin, FileText, History } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.svg";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Account Management", href: "/accounts", icon: UserCircle },
  { name: "Clients", href: "/clients", icon: Users },
  { name: "Campaigns", href: "/campaigns", icon: Megaphone },
  { name: "Ad Groups", href: "/ad-groups", icon: Layers },
  { name: "Ads", href: "/ads", icon: Target },
  { name: "Assets", href: "/assets", icon: Image },
  { name: "Audience", href: "/audience", icon: Users },
  { name: "Keywords", href: "/keywords", icon: Key },
  { name: "Location", href: "/location", icon: MapPin },
  { name: "Change History", href: "/change-history", icon: History },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-screen w-64 flex-col bg-sidebar border-r border-sidebar-border">
      <div className="flex h-16 items-center px-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Campaign Manager" className="w-10 h-10" />
          <span className="text-lg font-semibold text-sidebar-foreground">Campaign Manager</span>
        </div>
      </div>

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
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50",
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-gradient-primary" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">Admin User</p>
            <p className="text-xs text-muted-foreground truncate">admin@greenlinenyc.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
