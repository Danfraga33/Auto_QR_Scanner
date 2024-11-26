"use client";

import * as React from "react";
import {
  BarChart,
  Calendar,
  Edit,
  MoreHorizontal,
  Plus,
  Target,
  Trash,
} from "lucide-react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import SidebarComp from "~/components/Sidebar";

// Extended sample data for campaigns
const campaignsData = [
  {
    id: 1,
    name: "Summer Sale",
    status: "Active",
    leads: 1250,
    conversions: 320,
    startDate: "2024-06-01",
    endDate: "2024-08-31",
  },
  {
    id: 2,
    name: "Product Launch",
    status: "Scheduled",
    leads: 800,
    conversions: 0,
    startDate: "2024-09-15",
    endDate: "2024-10-15",
  },
  {
    id: 3,
    name: "Holiday Promo",
    status: "Draft",
    leads: 0,
    conversions: 0,
    startDate: "2024-12-01",
    endDate: "2024-12-31",
  },
  {
    id: 4,
    name: "Spring Collection",
    status: "Active",
    leads: 950,
    conversions: 180,
    startDate: "2024-03-01",
    endDate: "2024-05-31",
  },
  {
    id: 5,
    name: "Back to School",
    status: "Scheduled",
    leads: 600,
    conversions: 0,
    startDate: "2024-08-01",
    endDate: "2024-09-15",
  },
];

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = React.useState(campaignsData);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("All");

  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "All" || campaign.status === statusFilter),
  );

  const handleDeleteCampaign = (id: number) => {
    setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
  };

  return (
    <SidebarComp>
      <div className="flex flex-col gap-4 p-4 md:p-8">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Campaign
          </Button>
        </div>
        <Separator />
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <Input
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="md:w-[300px]"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="md:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Campaigns"
            value={campaigns.length.toString()}
            icon={Target}
          />
          <MetricCard
            title="Active Campaigns"
            value={campaigns
              .filter((c) => c.status === "Active")
              .length.toString()}
            icon={BarChart}
          />
          <MetricCard
            title="Total Leads"
            value={campaigns.reduce((sum, c) => sum + c.leads, 0).toString()}
            icon={Target}
          />
          <MetricCard
            title="Total Conversions"
            value={campaigns
              .reduce((sum, c) => sum + c.conversions, 0)
              .toString()}
            icon={BarChart}
          />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Campaign List</CardTitle>
            <CardDescription>Manage your marketing campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Leads</TableHead>
                  <TableHead>Conversions</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell className="font-medium">
                      {campaign.name}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          campaign.status === "Active" ? "default" : "secondary"
                        }
                      >
                        {campaign.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{campaign.startDate}</TableCell>
                    <TableCell>{campaign.endDate}</TableCell>
                    <TableCell>{campaign.leads}</TableCell>
                    <TableCell>{campaign.conversions}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="mr-2 h-4 w-4" />
                            View Schedule
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <BarChart className="mr-2 h-4 w-4" />
                            View Analytics
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDeleteCampaign(campaign.id)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
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
    </SidebarComp>
  );
}

function MetricCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
