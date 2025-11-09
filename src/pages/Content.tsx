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

const contents = [
  {
    id: "1",
    name: "Winter Sale Landing Page",
    client: "Tech Startup Inc",
    campaign: "Brand Awareness Q1",
    type: "Landing Page",
    status: "active",
    visits: 3450,
    conversionRate: "4.2%",
  },
  {
    id: "2",
    name: "Holiday Email Template",
    client: "Nations Auto Glass",
    campaign: "Holiday Special",
    type: "Email",
    status: "active",
    visits: 2130,
    conversionRate: "3.8%",
  },
  {
    id: "3",
    name: "New Year Product Page",
    client: "VW Heavy Up",
    campaign: "New Year Promo",
    type: "Product Page",
    status: "paused",
    visits: 1890,
    conversionRate: "2.9%",
  },
];

export default function Content() {
  const navigate = useNavigate();
  const { toast } = useToast();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor all content</p>
        </div>
        <Button onClick={() => toast({ title: "Feature coming soon", description: "Content creation page is not yet available" })}>
          <Plus className="w-4 h-4 mr-2" />
          Create Content
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
                <TableHead>Content Name</TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Visits</TableHead>
                <TableHead className="text-right">Conversion Rate</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contents.map((content) => (
                <TableRow key={content.id}>
                  <TableCell className="font-medium">{content.name}</TableCell>
                  <TableCell>{content.client}</TableCell>
                  <TableCell>{content.campaign}</TableCell>
                  <TableCell>{content.type}</TableCell>
                  <TableCell>
                    <Badge variant={content.status === "active" ? "default" : "secondary"}>
                      {content.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{content.visits.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{content.conversionRate}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-popover" align="end">
                        <DropdownMenuItem>View Content</DropdownMenuItem>
                        <DropdownMenuItem>Edit Content</DropdownMenuItem>
                        <DropdownMenuItem>Publish Content</DropdownMenuItem>
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
