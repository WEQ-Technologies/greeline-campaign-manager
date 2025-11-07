import { Plus, Play, Pause, MoreVertical, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const campaigns = [
  {
    id: 1,
    name: "Brand Awareness Q1",
    client: "Tech Startup Inc",
    account: "Account 1",
    campaignType: "Search",
    status: "active",
    budget: "$1,500",
    spent: "$1,245",
    clicks: 8450,
    conversions: 245,
  },
  {
    id: 2,
    name: "Holiday Special",
    client: "Nations Auto Glass",
    account: "Account 2",
    campaignType: "Display",
    status: "active",
    budget: "$800",
    spent: "$720",
    clicks: 3250,
    conversions: 98,
  },
  {
    id: 3,
    name: "New Year Promo",
    client: "VW Heavy Up",
    account: "Account 3",
    campaignType: "Video",
    status: "paused",
    budget: "$1,200",
    spent: "$850",
    clicks: 4120,
    conversions: 156,
  },
];

export default function Campaigns() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor all campaigns</p>
        </div>
        <Button 
          onClick={() => navigate("/campaigns/new")}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      {/* Selection Layer */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Selection Layer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <SelectItem value="vw">VW Heavy Up</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Account Name</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Accounts</SelectItem>
                  <SelectItem value="account1">Account 1</SelectItem>
                  <SelectItem value="account2">Account 2</SelectItem>
                  <SelectItem value="account3">Account 3</SelectItem>
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
                  <SelectItem value="newyear">New Year Promo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date Range</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
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
                <TableHead>Campaign Name</TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Campaign Type</TableHead>
                <TableHead className="text-right">Spend</TableHead>
                <TableHead className="text-right">Clicks</TableHead>
                <TableHead className="text-right">Conversions</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>{campaign.client}</TableCell>
                  <TableCell>{campaign.budget}</TableCell>
                  <TableCell>
                    <Badge
                      variant={campaign.status === "active" ? "default" : "secondary"}
                    >
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{campaign.account}</TableCell>
                  <TableCell>{campaign.campaignType}</TableCell>
                  <TableCell className="text-right">{campaign.spent}</TableCell>
                  <TableCell className="text-right">
                    {campaign.clicks.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">{campaign.conversions}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-popover" align="end">
                        <DropdownMenuItem onClick={() => navigate(`/campaigns/${campaign.id}`)}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/campaigns/${campaign.id}`)}>
                          Edit Campaign
                        </DropdownMenuItem>
                        <DropdownMenuItem>Pause Campaign</DropdownMenuItem>
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
