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
import { useToast } from "@/hooks/use-toast";

const adGroups = [
  {
    id: "1",
    name: "SUV Models - Winter",
    client: "Tech Startup Inc",
    campaign: "Brand Awareness Q1",
    status: "active",
    biddingType: "Conversions",
    budget: "$500",
    clicks: 2340,
    conversions: 78,
  },
  {
    id: "2",
    name: "Sedan Specials",
    client: "Nations Auto Glass",
    campaign: "Holiday Special",
    status: "active",
    biddingType: "Conversion Value",
    budget: "$350",
    clicks: 1560,
    conversions: 45,
  },
  {
    id: "3",
    name: "Glass Repair - Emergency",
    client: "VW Heavy Up",
    campaign: "New Year Promo",
    status: "paused",
    biddingType: "Conversions",
    budget: "$400",
    clicks: 890,
    conversions: 32,
  },
];

export default function AdGroups() {
  const navigate = useNavigate();
  const { toast } = useToast();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ad Groups</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor all ad groups</p>
        </div>
        <Button onClick={() => toast({ title: "Feature coming soon", description: "Ad Group creation page is not yet available" })}>
          <Plus className="w-4 h-4 mr-2" />
          Create Ad Group
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Client Name</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Clients</SelectItem>
                  <SelectItem value="tech">Tech Startup Inc</SelectItem>
                  <SelectItem value="nations">Nations Auto Glass</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Campaign</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select campaign" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Campaigns</SelectItem>
                  <SelectItem value="brand">Brand Awareness Q1</SelectItem>
                  <SelectItem value="holiday">Holiday Special</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Ad Group</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select ad group" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Ad Groups</SelectItem>
                  <SelectItem value="suv">SUV Models - Winter</SelectItem>
                  <SelectItem value="sedan">Sedan Specials</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Account</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Accounts</SelectItem>
                  <SelectItem value="account1">Account 1</SelectItem>
                  <SelectItem value="account2">Account 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>


      {/* List View */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">List View</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ad Group Name</TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Bidding Type</TableHead>
                <TableHead className="text-right">Budget</TableHead>
                <TableHead className="text-right">Clicks</TableHead>
                <TableHead className="text-right">Conversions</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adGroups.map((group) => (
                <TableRow key={group.id}>
                  <TableCell className="font-medium">{group.name}</TableCell>
                  <TableCell>{group.client}</TableCell>
                  <TableCell>{group.campaign}</TableCell>
                  <TableCell>
                    <Badge variant={group.status === "active" ? "default" : "secondary"}>
                      {group.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{group.biddingType}</TableCell>
                  <TableCell className="text-right">{group.budget}</TableCell>
                  <TableCell className="text-right">{group.clicks.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{group.conversions}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-popover" align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Ad Group</DropdownMenuItem>
                        <DropdownMenuItem>Pause Ad Group</DropdownMenuItem>
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
