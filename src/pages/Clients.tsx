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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, MoreVertical, CheckCircle2, XCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";

const clients = [
  {
    id: 1,
    name: "Tech Startup Inc",
    adsAccountsStatus: "active",
    adsAccountCount: 2,
    campaignsCount: 3,
    totalBudgetAllocated: "$5,000",
    totalBudgetSpent: "$4,250",
    percentSpent: 85,
    googleAdsAccountCount: 1,
    fbAdsAccountCount: 1,
    connections: {
      google: true,
      meta: true,
    },
  },
  {
    id: 2,
    name: "Nations Auto Glass",
    adsAccountsStatus: "active",
    adsAccountCount: 1,
    campaignsCount: 2,
    totalBudgetAllocated: "$2,500",
    totalBudgetSpent: "$1,825",
    percentSpent: 73,
    googleAdsAccountCount: 1,
    fbAdsAccountCount: 0,
    connections: {
      google: true,
      meta: false,
    },
  },
  {
    id: 3,
    name: "VW Heavy Up",
    adsAccountsStatus: "deactive",
    adsAccountCount: 1,
    campaignsCount: 1,
    totalBudgetAllocated: "$1,200",
    totalBudgetSpent: "$852",
    percentSpent: 71,
    googleAdsAccountCount: 1,
    fbAdsAccountCount: 0,
    connections: {
      google: true,
      meta: false,
    },
  },
  {
    id: 4,
    name: "Volkswagen",
    adsAccountsStatus: "deactive",
    adsAccountCount: 0,
    campaignsCount: 0,
    totalBudgetAllocated: "$0",
    totalBudgetSpent: "$0",
    percentSpent: 0,
    googleAdsAccountCount: 0,
    fbAdsAccountCount: 0,
    connections: {
      google: false,
      meta: false,
    },
  },
];

export default function Clients() {
  const navigate = useNavigate();
  const [clientStatus, setClientStatus] = useState<Record<number, string>>(
    Object.fromEntries(clients.map((c) => [c.id, c.adsAccountsStatus]))
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // Calculate pagination
  const totalPages = Math.ceil(clients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = clients.slice(startIndex, endIndex);

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const toggleStatus = (id: number) => {
    setClientStatus((prev) => ({
      ...prev,
      [id]: prev[id] === "active" ? "deactive" : "active",
    }));
  };

  return (
    <TooltipProvider>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Client Management</h1>
            <p className="text-muted-foreground mt-1">Manage your client accounts</p>
          </div>
          <Button 
            className="bg-primary hover:bg-primary-hover"
            onClick={() => navigate("/clients/new")}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Client
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client Name</TableHead>
                  <TableHead>Ads Accounts Status</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      Campaigns Count
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>This includes both Google and Meta campaigns</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      Total Budget Allocated
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Cumulative budget of all campaigns across platforms</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TableHead>
                  <TableHead>Total Budget Spent</TableHead>
                  <TableHead>% Spent</TableHead>
                  <TableHead>Connections</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>
                      <Badge
                        variant={client.adsAccountsStatus === "active" ? "default" : "secondary"}
                      >
                        {client.adsAccountsStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>{client.campaignsCount}</TableCell>
                    <TableCell>{client.totalBudgetAllocated}</TableCell>
                    <TableCell>{client.totalBudgetSpent}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-muted rounded-full h-2 max-w-[60px]">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${client.percentSpent}%` }}
                          />
                        </div>
                        <span className="text-sm">{client.percentSpent}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {client.connections.google && (
                          <div className="flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4 text-success" />
                            <span className="text-sm">Google ({client.googleAdsAccountCount})</span>
                          </div>
                        )}
                        {client.connections.meta && (
                          <div className="flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4 text-success" />
                            <span className="text-sm">Meta ({client.fbAdsAccountCount})</span>
                          </div>
                        )}
                        {!client.connections.google && !client.connections.meta && (
                          <span className="text-sm text-muted-foreground">No connections</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-popover" align="end">
                          <DropdownMenuItem onClick={() => navigate(`/clients/${client.id}`)}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toggleStatus(client.id)}>
                            Update Status
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate(`/clients/${client.id}/edit`)}>
                            Edit
                          </DropdownMenuItem>
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
    </TooltipProvider>
  );
}
