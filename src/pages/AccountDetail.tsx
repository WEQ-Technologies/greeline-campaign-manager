import { ArrowLeft, Megaphone, Users, Layers, Image, Target, MapPin, FileText, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const accountDetails = {
  id: 1,
  name: "Tech Startup Google Ads",
  searchLinked: true,
  budget: "$5,000",
  adAccounts: "123-456-7890",
  status: "active",
};

const navigationItems = [
  { name: "Campaigns", icon: Megaphone, href: "/campaigns" },
  { name: "Ads", icon: FileText, href: "/campaigns" },
  { name: "Ad Groups", icon: Layers, href: "/campaigns/1/ad-groups" },
  { name: "Assets", icon: Image, href: "/campaigns/1/assets" },
  { name: "Audiences", icon: Users, href: "/campaigns" },
  { name: "Keywords", icon: Target, href: "/campaigns/1/other" },
  { name: "Locations", icon: MapPin, href: "/campaigns" },
  { name: "Content", icon: FileText, href: "/campaigns" },
  { name: "Change History", icon: History, href: "/campaigns/1/history" },
];

export default function AccountDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/accounts")}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{accountDetails.name}</h1>
          <p className="text-muted-foreground mt-1">Account ID: {id}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Search Linked</p>
              <p className="text-lg font-medium">
                {accountDetails.searchLinked ? "Yes" : "No"}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Budget</p>
              <p className="text-lg font-medium">{accountDetails.budget}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Ad Account IDs</p>
              <p className="text-lg font-medium font-mono">{accountDetails.adAccounts}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="text-lg font-medium capitalize">{accountDetails.status}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Navigation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {navigationItems.map((item) => (
            <Card
              key={item.name}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(item.href)}
            >
              <CardContent className="flex items-center gap-4 p-6">
                <div className="p-3 rounded-lg bg-primary/10">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    View {item.name.toLowerCase()} for this account
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
