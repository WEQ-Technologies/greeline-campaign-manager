import { Plus, MoreVertical, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

const keywords = [
  {
    id: "1",
    keyword: "luxury suv winter tires",
    campaign: "Brand Awareness Q1",
    adGroup: "SUV Models - Winter",
    matchType: "Broad",
    status: "Pending",
  },
  {
    id: "2",
    keyword: "sedan lease deals",
    campaign: "Holiday Special",
    adGroup: "Sedan Specials",
    matchType: "Phrase",
    status: "Under Review",
  },
  {
    id: "3",
    keyword: "emergency glass repair",
    campaign: "New Year Promo",
    adGroup: "Glass Repair - Emergency",
    matchType: "Exact",
    status: "Pending",
  },
];

const negativeKeywords = [
  {
    id: "1",
    keyword: "free",
    matchType: "Broad",
    addedTo: "Brand Awareness Q1",
    level: "Campaign",
  },
  {
    id: "2",
    keyword: "cheap",
    matchType: "Exact",
    addedTo: "Holiday Special",
    level: "Ad Group",
  },
  {
    id: "3",
    keyword: "discount",
    matchType: "Phrase",
    addedTo: "New Year Promo",
    level: "Campaign",
  },
];

export default function Keywords() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Keywords</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor all keywords</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/google-ads/keywords/upload")}>
            <Upload className="w-4 h-4 mr-2" />
            Upload CSV
          </Button>
          <Button onClick={() => navigate("/google-ads/keywords/new")}>
            <Plus className="w-4 h-4 mr-2" />
            Add Keywords
          </Button>
        </div>
      </div>

      <Tabs defaultValue="keywords" className="space-y-4">
        <TabsList>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="negative">Negative Keywords</TabsTrigger>
        </TabsList>

        <TabsContent value="keywords" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Keywords List</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Keyword</TableHead>
                    <TableHead>Match Type</TableHead>
                    <TableHead>Added To - Campaign</TableHead>
                    <TableHead>Added To - Ad Group</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {keywords.map((keyword) => (
                    <TableRow key={keyword.id}>
                      <TableCell className="font-medium">{keyword.keyword}</TableCell>
                      <TableCell>{keyword.matchType}</TableCell>
                      <TableCell>{keyword.campaign}</TableCell>
                      <TableCell>{keyword.adGroup}</TableCell>
                      <TableCell>
                        <Badge variant={keyword.status === "Pending" ? "secondary" : "default"}>
                          {keyword.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-popover" align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
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
        </TabsContent>

        <TabsContent value="negative" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => navigate("/google-ads/keywords/negative/new")}>
              <Plus className="w-4 h-4 mr-2" />
              Add Negative Keywords
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Negative Keywords List</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Negative Keyword or List Name</TableHead>
                    <TableHead>Match Type</TableHead>
                    <TableHead>Added To</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {negativeKeywords.map((keyword) => (
                    <TableRow key={keyword.id}>
                      <TableCell className="font-medium">{keyword.keyword}</TableCell>
                      <TableCell>{keyword.matchType}</TableCell>
                      <TableCell>{keyword.addedTo}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{keyword.level}</Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-popover" align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
