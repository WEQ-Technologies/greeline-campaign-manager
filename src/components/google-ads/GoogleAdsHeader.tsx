import { Search, Bell, User } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function GoogleAdsHeader() {
  return (
    <header className="h-16 border-b border-border bg-card flex items-center px-6 gap-4">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-xs">
            GA
          </div>
          <span className="font-semibold text-foreground hidden sm:inline">Google Ads</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Select defaultValue="account1">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="account1">Account 1</SelectItem>
              <SelectItem value="account2">Account 2</SelectItem>
              <SelectItem value="account3">Account 3</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="client1">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select client" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="client1">Tech Startup Inc</SelectItem>
              <SelectItem value="client2">Nations Auto Glass</SelectItem>
              <SelectItem value="client3">VW Heavy Up</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Center - Search */}
      <div className="flex-1 max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search campaigns, ad groups, assets, or keywords..."
            className="pl-10 w-full"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5" />
        </Button>
        <Avatar>
          <AvatarFallback>
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
