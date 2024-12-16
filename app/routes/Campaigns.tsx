import {
  BarChartIcon,
  Calendar,
  CheckCheck,
  Edit,
  Mail,
  MoreHorizontal,
  Mouse,
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
import { Dialog, DialogTrigger } from "~/components/ui/dialog";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import MetricCard from "~/components/MetricCard";
import { Progress } from "~/components/ui/progress";
import { createCampaign, getCampaign } from "~/utils/actions";
import { ActionFunctionArgs, LoaderFunction, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { parseISO, isAfter, isBefore } from "date-fns";
import CreateCampaign from "~/components/CreateCampaignModal";

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();

  const name = body.get("name") as string;
  const strategy = body.get("strategy") as string;
  const freq = body.get("freq") as string;
  const startDate = body.get("startDate") as string;
  const startTime = body.get("startTime") as string;
  const endDate = "2024-12-27T14:00:00";
  const startingDate = new Date(startDate);
  const endingDate = new Date(endDate);

  const schedule: Date[] = [];
  if (freq === "Weekly") {
    while (startingDate <= endingDate) {
      schedule.push(new Date(startingDate));
      startingDate.setDate(startingDate.getDate() + 7);
    }
  } else if (freq === "Monthly") {
    while (startingDate <= endingDate) {
      schedule.push(new Date(startingDate));
      startingDate.setDate(startingDate.getDate() + 30);
    }
  }

  function checkStatus(startDate: string, endDate: string) {
    const start = parseISO(startDate);
    const currentDate = new Date();
    console.log("currentDate:", currentDate);
    console.log("start:", start);
    console.log("end", endDate);

    return isAfter(currentDate, start) && isBefore(currentDate, endDate)
      ? "Active"
      : "Scheduled";
  }

  const status = checkStatus(startDate, endDate);

  console.log("PRE", {
    name,
    status,
    strategy,
    startDate,
    startTime,
    schedule,
    freq,
    endDate,
  });

  const response = createCampaign({
    name,
    strategy,
    startDate,
    startTime,
    schedule,
    freq,
    status,
    endDate,
  });
  return response;
}

export const loader: LoaderFunction = async () => {
  const data = await getCampaign();
  return json(data);
};

export default function Dashboard() {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [campaignSchedule, setCampaignSchedule] = useState<Date[]>([]);
  // const [campaigns, setCampaigns] = useState(campaignsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedCampaign, setSelectedCampaign] = useState<any>({});

  const campaigns = useLoaderData<typeof loader>();
  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "All" || campaign.status === statusFilter),
  );

  return (
    <SidebarComp>
      <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
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
        <CreateCampaign />
      </div>

      <div className="grid gap-4 p-3 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard title="Active Campaigns" value="3" icon={Target} />

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
        {/* <MetricCard
              title="Total Leads"
              value={campaigns.reduce((sum, c) => sum + c.leads, 0).toString()}
              icon={Target}
            /> */}
      </div>
      <div className="p-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Campaign List</CardTitle>
            <CardDescription>Manage your marketing campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Freq</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>

                  <TableHead>Conversions</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.map((campaign) => (
                  <Dialog key={campaign.id}>
                    <DialogTrigger
                      onClick={() => {
                        setCampaignSchedule(campaign.schedule);
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
                              campaign.endDate === "Active"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {campaign.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{campaign.freq}</TableCell>
                        <TableCell>{campaign.startDate}</TableCell>
                        <TableCell>
                          {campaign.endDate ?? campaign.startDate}
                        </TableCell>
                        <TableCell>{campaign.conversions ?? 0}</TableCell>
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
                              <DropdownMenuItem>
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
      </div>
      {Object.keys(selectedCampaign).length > 0 ? (
        <Tabs defaultValue="performance" className="w-full">
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="performance">Overview</TabsTrigger>
          </TabsList>
          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle>
                      {selectedCampaign.name ?? "Performance"}
                    </CardTitle>
                    <CardDescription>
                      Campaign Performance Metrics
                    </CardDescription>
                  </div>{" "}
                  <Link to={`/campaigns/${selectedCampaign._id}`}>
                    <Button>Explore</Button>
                  </Link>
                </div>
              </CardHeader>

              <div className="flex flex-col gap-2 px-3 py-3">
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
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
                          value={
                            (selectedCampaign.conversions /
                              selectedCampaign.emailsSent) *
                            100
                          }
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
      ) : null}
    </SidebarComp>
  );
}
