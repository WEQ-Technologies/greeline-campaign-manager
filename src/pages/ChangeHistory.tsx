import { MoreVertical, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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

const historyData = [
  {
    id: "1",
    date: "2025-01-20 14:30:00",
    user: "john@weqtech.com",
    client: "Tech Startup Inc",
    campaign: "Brand Awareness Q1",
    module: "Campaign",
    fieldChanged: "Budget",
    oldValue: "$1,200",
    newValue: "$1,500",
  },
  {
    id: "2",
    date: "2025-01-19 10:15:00",
    user: "sarah@weqtech.com",
    client: "Nations Auto Glass",
    campaign: "Holiday Special",
    module: "Ad Group",
    fieldChanged: "Status",
    oldValue: "Paused",
    newValue: "Active",
  },
  {
    id: "3",
    date: "2025-01-18 16:45:00",
    user: "mike@weqtech.com",
    client: "VW Heavy Up",
    campaign: "New Year Promo",
    module: "Asset",
    fieldChanged: "Headline",
    oldValue: "Winter Sale",
    newValue: "Winter Sale - Up to 30% Off",
  },
];

function getModuleBadgeVariant(module: string) {
  switch (module) {
    case "Campaign":
      return "default";
    case "Ad Group":
      return "secondary";
    case "Asset":
      return "outline";
    default:
      return "secondary";
  }
}

export default function ChangeHistory() {
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // Calculate pagination
  const totalPages = Math.ceil(historyData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = historyData.slice(startIndex, endIndex);

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Change History</h1>
          <p className="text-muted-foreground mt-1">Track all changes made across campaigns</p>
        </div>
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
      </div>

      {/* List View */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Change Log</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date / Time</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>Field Changed</TableHead>
                <TableHead>Old Value</TableHead>
                <TableHead>New Value</TableHead>
              </TableRow>
            </TableHeader>
          <TableBody>
            {currentItems.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.date}</TableCell>
                  <TableCell>{record.user}</TableCell>
                  <TableCell>{record.client}</TableCell>
                  <TableCell>{record.campaign}</TableCell>
                  <TableCell>
                    <Badge variant={getModuleBadgeVariant(record.module)}>
                      {record.module}
                    </Badge>
                  </TableCell>
                  <TableCell>{record.fieldChanged}</TableCell>
                  <TableCell className="text-muted-foreground">{record.oldValue}</TableCell>
                  <TableCell className="font-medium">{record.newValue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
        </Table>
      </CardContent>
    </Card>

    {/* Pagination */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Rows per page:</span>
        <Select value={itemsPerPage.toString()} onValueChange={(value) => {
          setItemsPerPage(Number(value));
          setCurrentPage(1);
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
              onClick={goToFirstPage}
              disabled={currentPage === 1}
              className="h-8 w-8"
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious 
              onClick={goToPreviousPage}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(page => {
              return page === 1 || 
                     page === totalPages || 
                     Math.abs(page - currentPage) <= 1;
            })
            .map((page, index, array) => {
              if (index > 0 && array[index - 1] !== page - 1) {
                return (
                  <PaginationItem key={`ellipsis-${page}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
          <PaginationItem>
            <PaginationNext 
              onClick={goToNextPage}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
          <PaginationItem>
            <Button
              variant="outline"
              size="icon"
              onClick={goToLastPage}
              disabled={currentPage === totalPages}
              className="h-8 w-8"
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  </div>
);
}
