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

const keywords = [
  {
    id: "1",
    keyword: "luxury suv winter tires",
    client: "Tech Startup Inc",
    campaign: "Brand Awareness Q1",
    adGroup: "SUV Models - Winter",
    matchType: "Broad Match",
    status: "active",
    avgCpc: "$2.45",
    impressions: 5420,
    clicks: 234,
  },
  {
    id: "2",
    keyword: "sedan lease deals",
    client: "Nations Auto Glass",
    campaign: "Holiday Special",
    adGroup: "Sedan Specials",
    matchType: "Phrase Match",
    status: "active",
    avgCpc: "$1.85",
    impressions: 3890,
    clicks: 187,
  },
  {
    id: "3",
    keyword: "emergency glass repair",
    client: "VW Heavy Up",
    campaign: "New Year Promo",
    adGroup: "Glass Repair - Emergency",
    matchType: "Exact Match",
    status: "paused",
    avgCpc: "$3.20",
    impressions: 2340,
    clicks: 98,
  },
];

export default function Keywords() {
  const navigate = useNavigate();
  const { toast } = useToast();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Keywords</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor all keywords</p>
        </div>
        <Button onClick={() => toast({ title: "Feature coming soon", description: "Keyword creation page is not yet available" })}>
          <Plus className="w-4 h-4 mr-2" />
          Add Keyword
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
                <TableHead>Keyword</TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Ad Group</TableHead>
                <TableHead>Match Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Avg CPC</TableHead>
                <TableHead className="text-right">Impressions</TableHead>
                <TableHead className="text-right">Clicks</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keywords.map((keyword) => (
                <TableRow key={keyword.id}>
                  <TableCell className="font-medium">{keyword.keyword}</TableCell>
                  <TableCell>{keyword.client}</TableCell>
                  <TableCell>{keyword.campaign}</TableCell>
                  <TableCell>{keyword.adGroup}</TableCell>
                  <TableCell>{keyword.matchType}</TableCell>
                  <TableCell>
                    <Badge variant={keyword.status === "active" ? "default" : "secondary"}>
                      {keyword.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{keyword.avgCpc}</TableCell>
                  <TableCell className="text-right">{keyword.impressions.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{keyword.clicks}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-popover" align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Keyword</DropdownMenuItem>
                        <DropdownMenuItem>Pause Keyword</DropdownMenuItem>
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
