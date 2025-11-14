import { Plus, MoreVertical, Upload, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

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
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPageKeywords, setCurrentPageKeywords] = useState(1);
  const [itemsPerPageKeywords, setItemsPerPageKeywords] = useState(20);
  const [currentPageNegative, setCurrentPageNegative] = useState(1);
  const [itemsPerPageNegative, setItemsPerPageNegative] = useState(20);

  // Calculate pagination for keywords
  const totalPagesKeywords = Math.ceil(keywords.length / itemsPerPageKeywords);
  const startIndexKeywords = (currentPageKeywords - 1) * itemsPerPageKeywords;
  const endIndexKeywords = startIndexKeywords + itemsPerPageKeywords;
  const currentKeywords = keywords.slice(startIndexKeywords, endIndexKeywords);

  // Calculate pagination for negative keywords
  const totalPagesNegative = Math.ceil(negativeKeywords.length / itemsPerPageNegative);
  const startIndexNegative = (currentPageNegative - 1) * itemsPerPageNegative;
  const endIndexNegative = startIndexNegative + itemsPerPageNegative;
  const currentNegativeKeywords = negativeKeywords.slice(startIndexNegative, endIndexNegative);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Keywords</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor all keywords</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Filter</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setFilterOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setFilterOpen(false)}>
                    Apply
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
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
                  {currentKeywords.map((keyword) => (
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

          {/* Pagination for Keywords */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Rows per page:</span>
              <Select value={itemsPerPageKeywords.toString()} onValueChange={(value) => {
                setItemsPerPageKeywords(Number(value));
                setCurrentPageKeywords(1);
              }}>
                <SelectTrigger className="w-[70px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPageKeywords(1)}
                    disabled={currentPageKeywords === 1}
                    className="h-8 w-8"
                  >
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPageKeywords(prev => Math.max(prev - 1, 1))}
                    className={currentPageKeywords === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                {Array.from({ length: totalPagesKeywords }, (_, i) => i + 1)
                  .filter(page => page === 1 || page === totalPagesKeywords || Math.abs(page - currentPageKeywords) <= 1)
                  .map((page, index, array) => {
                    if (index > 0 && array[index - 1] !== page - 1) {
                      return <PaginationItem key={`ellipsis-${page}`}><PaginationEllipsis /></PaginationItem>;
                    }
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink onClick={() => setCurrentPageKeywords(page)} isActive={currentPageKeywords === page} className="cursor-pointer">
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPageKeywords(prev => Math.min(prev + 1, totalPagesKeywords))}
                    className={currentPageKeywords === totalPagesKeywords ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                <PaginationItem>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPageKeywords(totalPagesKeywords)}
                    disabled={currentPageKeywords === totalPagesKeywords}
                    className="h-8 w-8"
                  >
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
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
                  {currentNegativeKeywords.map((keyword) => (
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

          {/* Pagination for Negative Keywords */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Rows per page:</span>
              <Select value={itemsPerPageNegative.toString()} onValueChange={(value) => {
                setItemsPerPageNegative(Number(value));
                setCurrentPageNegative(1);
              }}>
                <SelectTrigger className="w-[70px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPageNegative(1)}
                    disabled={currentPageNegative === 1}
                    className="h-8 w-8"
                  >
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPageNegative(prev => Math.max(prev - 1, 1))}
                    className={currentPageNegative === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                {Array.from({ length: totalPagesNegative }, (_, i) => i + 1)
                  .filter(page => page === 1 || page === totalPagesNegative || Math.abs(page - currentPageNegative) <= 1)
                  .map((page, index, array) => {
                    if (index > 0 && array[index - 1] !== page - 1) {
                      return <PaginationItem key={`ellipsis-${page}`}><PaginationEllipsis /></PaginationItem>;
                    }
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink onClick={() => setCurrentPageNegative(page)} isActive={currentPageNegative === page} className="cursor-pointer">
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPageNegative(prev => Math.min(prev + 1, totalPagesNegative))}
                    className={currentPageNegative === totalPagesNegative ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                <PaginationItem>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPageNegative(totalPagesNegative)}
                    disabled={currentPageNegative === totalPagesNegative}
                    className="h-8 w-8"
                  >
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
