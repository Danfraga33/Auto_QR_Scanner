import {
  BarChartIcon,
  Calendar,
  Check,
  CheckCheck,
  Edit,
  Mail,
  MoreHorizontal,
  Mouse,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import SidebarComp from "~/components/Sidebar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";
import { useState } from "react";
import campaignsData from "~/lib/data/campaigns.json";
import { CalendarComp } from "~/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import MetricCard from "~/components/MetricCard";
import { Progress } from "~/components/ui/progress";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Separator } from "~/components/ui/separator";

export default function CampaignsPage() {
  const [selected, setSelected] = useState<Date[]>([]);
  const [campaigns, setCampaigns] = useState(campaignsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedCampaign, setSelectedCampaign] = useState<any>({});
  const [freqValue, setFreqValue] = useState("Weekly");

  console.log(selectedCampaign);
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
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
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
          <Sheet>
            <Button asChild>
              <SheetTrigger>
                <Plus className="mr-2 h-4 w-4" />
                Create Campaign
              </SheetTrigger>
            </Button>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Create new campaign</SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </SheetDescription>
                <Separator className="my-4" />
                <div className="flex items-center gap-3">
                  <Label htmlFor="name" className="text-md">
                    Name:
                  </Label>
                  <Input value="Birthday Special" id="name" />
                </div>
                <div className="flex items-center gap-3">
                  <Label htmlFor="freq" className="text-md">
                    Frequency:
                  </Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="default" value={freqValue}>
                        {freqValue}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel onClick={() => setFreqValue("Daily")}>
                        Daily
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setFreqValue("Weekly")}>
                        Weekly
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setFreqValue("Monthly")}>
                        Monthly
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Separator />
                <Label className="text-sm">Pick Start and End Date:</Label>
                <div className="flex justify-center  items-center gap-3">
                  <CalendarComp selected={new Date()} />
                </div>
              </SheetHeader>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">
                    <span>
                      <Check />
                    </span>
                    Save campaign
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
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
            icon={BarChartIcon}
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
            icon={BarChartIcon}
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
                  <Dialog>
                    <DialogTrigger
                      onClick={() => {
                        setSelected([
                          new Date(campaign.startDate),
                          new Date(campaign.endDate),
                        ]);
                        setSelectedCampaign(campaign);
                      }}
                      asChild
                    >
                      <TableRow key={campaign.id}>
                        <TableCell className="font-medium">
                          {campaign.name}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              campaign.status === "Active"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {campaign.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {campaign.startDate.split("T")[0]}
                        </TableCell>
                        <TableCell>{campaign.endDate.split("T")[0]}</TableCell>
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
                                <BarChartIcon className="mr-2 h-4 w-4" />
                                View Analytics
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() =>
                                  handleDeleteCampaign(campaign.id)
                                }
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    </DialogTrigger>
                  </Dialog>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Tabs defaultValue="performance" className="w-full">
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle>Performance</CardTitle>
                    <CardDescription>
                      Campaign Performance Metrics
                    </CardDescription>
                  </div>

                  <Dialog>
                    <DialogTrigger
                      onClick={() =>
                        setSelected([
                          new Date(selectedCampaign.startDate),
                          new Date(selectedCampaign.endDate),
                        ])
                      }
                      asChild
                    >
                      <Button>Edit Campaign</Button>
                    </DialogTrigger>{" "}
                    <DialogContent className="sm:max-w-[39rem]">
                      <DialogHeader>
                        <DialogTitle>{selectedCampaign.name}</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input
                            id="name"
                            value={selectedCampaign.name}
                            className="col-span-3"
                            disabled
                          />
                          <Label htmlFor="status" className="text-right">
                            Status
                          </Label>
                          <Input
                            id="status"
                            value={selectedCampaign.status}
                            className="col-span-3"
                            disabled
                          />
                          <Label htmlFor="template" className="text-right">
                            Template
                          </Label>
                          <Input
                            id="template"
                            value="Template 1"
                            className="col-span-3"
                            disabled
                          />
                          <Label htmlFor="freq" className="text-right">
                            Frequency
                          </Label>
                          <Input
                            id="freq"
                            value={selectedCampaign.frequency ?? "Weekly"}
                            className="col-span-3"
                            disabled
                          />
                        </div>
                      </div>
                      <CalendarComp
                        className="flex justify-center w-full"
                        selected={selected}
                      />

                      <DialogFooter>
                        <Button type="submit">Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>

              <div className="flex flex-col px-3 gap-2 py-3">
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 ">
                  <MetricCard title="Emails/SMS Sent" value="221" icon={Mail} />
                  <MetricCard
                    title="Delivery Rate"
                    value="98%"
                    icon={CheckCheck}
                  />
                  <MetricCard title="CTR" value="82%" icon={Mouse} />
                </div>
                <div className="">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold">Conversion Rate</h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-sm">
                          <span>0%</span>
                          <span className="font-medium">100%</span>
                        </div>
                        <Progress
                          // value={
                          //   campaign.conversions / campaign.emailsSent ?? 32
                          // }
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarComp>
  );
}
