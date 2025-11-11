import { LayoutDashboard, UserCircle, Users, Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.svg";
import { useState } from "react";
import { PlatformSelectionDialog } from "@/components/platform/PlatformSelectionDialog";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Clients", href: "/clients", icon: Users },
  { name: "Accounts", href: "/accounts", icon: UserCircle },
  { name: "Campaigns", href: "#", icon: Megaphone, special: "campaigns" },
];

export function Sidebar() {
  const location = useLocation();
  const [platformDialogOpen, setPlatformDialogOpen] = useState(false);

  return (
    <div className="flex h-screen w-64 flex-col bg-sidebar border-r border-sidebar-border">
      <div className="flex h-16 items-center px-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Launchpad" className="w-10 h-10" />
          <span className="text-lg font-semibold text-sidebar-foreground">Launchpad</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          
          if (item.special === "campaigns") {
            return (
              <button
                key={item.name}
                onClick={() => setPlatformDialogOpen(true)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </button>
            );
          }
          
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

      <PlatformSelectionDialog open={platformDialogOpen} onOpenChange={setPlatformDialogOpen} />

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
