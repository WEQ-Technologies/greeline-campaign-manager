import { Plus, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const ads = [
  {
    id: "1",
    name: "Winter SUV Special",
    client: "Tech Startup Inc",
    campaign: "Brand Awareness Q1",
    adGroup: "SUV Models - Winter",
    status: "active",
    impressions: 12450,
    clicks: 345,
    conversions: 23,
  },
  {
    id: "2",
    name: "Sedan Promo",
    client: "Nations Auto Glass",
    campaign: "Holiday Special",
    adGroup: "Sedan Specials",
    status: "active",
    impressions: 8320,
    clicks: 278,
    conversions: 18,
  },
  {
    id: "3",
    name: "Glass Repair Emergency",
    client: "VW Heavy Up",
    campaign: "New Year Promo",
    adGroup: "Glass Repair - Emergency",
    status: "paused",
    impressions: 5640,
    clicks: 156,
    conversions: 12,
  },
];

export default function Ads() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ads</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor all ads</p>
        </div>
        <Button onClick={() => navigate("/ads/new")}>
          <Plus className="w-4 h-4 mr-2" />
          Create Ad
        </Button>
      </div>

      {/* List View */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">List View</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ad Name</TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Ad Group</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Impressions</TableHead>
                <TableHead className="text-right">Clicks</TableHead>
                <TableHead className="text-right">Conversions</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ads.map((ad) => (
                <TableRow key={ad.id}>
                  <TableCell className="font-medium">{ad.name}</TableCell>
                  <TableCell>{ad.client}</TableCell>
                  <TableCell>{ad.campaign}</TableCell>
                  <TableCell>{ad.adGroup}</TableCell>
                  <TableCell>
                    <Badge variant={ad.status === "active" ? "default" : "secondary"}>
                      {ad.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{ad.impressions.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{ad.clicks}</TableCell>
                  <TableCell className="text-right">{ad.conversions}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-popover" align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Ad</DropdownMenuItem>
                        <DropdownMenuItem>Pause Ad</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
