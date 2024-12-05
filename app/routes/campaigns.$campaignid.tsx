import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData, useLocation } from "@remix-run/react";
import { BarChart3, BarChartIcon, Calendar, Gauge, Trash } from "lucide-react";
import { useState } from "react";
import EditCampaign from "~/components/EditCampaign";
import MetricCard from "~/components/MetricCard";
import SidebarComp from "~/components/Sidebar";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Dialog, DialogTrigger } from "~/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "~/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { getCampaign } from "~/utils/actions";
import leads from "~/lib/data/Leads.json";
import { Separator } from "~/components/ui/separator";
import DeleteCampaignButton from "~/components/DeleteCampaignButton";
import { CalendarComp } from "~/components/ui/calendar";

export const loader: LoaderFunction = async () => {
  const data = await getCampaign();
  return json(data);
};

const SelectedCampaign = () => {
  const [campaignSchedule, setCampaignSchedule] = useState<Date[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<any>({});

  const campaigns = useLoaderData<typeof loader>();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const filteredCampaignArr = campaigns.filter(
    (campaign) => campaign._id === id,
  );
  const filteredCampaign = filteredCampaignArr[0];
  console.log(filteredCampaign);

  const campaignData = {
    id: 1,
    name: "Summer Sale 2024",
    status: "Active",
    description:
      "Promotional campaign for our summer collection, offering discounts on seasonal items.",
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    budget: 50000,
    spent: 32000,
    leads: 1250,
    conversions: 320,
    revenue: 128000,
    channels: ["Email", "Social Media", "Display Ads"],
    targetAudience: "Adults 25-45, interested in outdoor activities",
    goals: {
      leadsTarget: 2000,
      conversionsTarget: 500,
      revenueTarget: 200000,
    },
    performance: [
      { date: "2024-06-01", leads: 50, conversions: 10 },
      { date: "2024-06-08", leads: 120, conversions: 25 },
      { date: "2024-06-15", leads: 200, conversions: 45 },
      { date: "2024-06-22", leads: 280, conversions: 70 },
      { date: "2024-06-29", leads: 350, conversions: 90 },
      { date: "2024-07-06", leads: 450, conversions: 120 },
      { date: "2024-07-13", leads: 550, conversions: 150 },
      { date: "2024-07-20", leads: 700, conversions: 200 },
      { date: "2024-07-27", leads: 900, conversions: 260 },
      { date: "2024-08-03", leads: 1100, conversions: 290 },
      { date: "2024-08-10", leads: 1250, conversions: 320 },
    ],
  };

  return (
    <SidebarComp>
      <div className="flex flex-col p-6 gap-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between py-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {filteredCampaign.name}
            </h1>
            <p className="text-muted-foreground">
              Campaign ID: {filteredCampaign._id}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <EditCampaign
              selectedCampaign={filteredCampaign}
              campaignSchedule={filteredCampaign.schedule}
            />
            <DeleteCampaignButton selectedCampaign={filteredCampaign} />
          </div>
        </div>
        <Separator />
        <Tabs defaultValue="overview" className="w-full ">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-2 gap-2 text-sm">
                    <dt className="font-medium">Status</dt>
                    <dd>
                      <Badge
                        variant={
                          campaignData.status === "Active"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {campaignData.status}
                      </Badge>
                    </dd>
                    <dt className="font-medium">Start Date</dt>
                    <dd>{filteredCampaign.startDate}</dd>
                    <dt className="font-medium">End Date</dt>
                    <dd>{filteredCampaign.endDate}</dd>
                  </dl>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{campaignData.description}</p>
                </CardContent>
              </Card>
              <div className="flex flex-col w-full col-span-2 gap-1">
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                  Schedule
                </h2>
                <CalendarComp
                  className="flex justify-center w-full"
                  selected={filteredCampaign.schedule.map(
                    (date: string) => new Date(date),
                  )}
                  mode="multiple"
                />
              </div>
              {/* <Card>
                <CardHeader>
                  <CardTitle>Channels</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-inside list-disc">
                    {campaignData.channels.map((channel, index) => (
                      <li key={index}>{channel}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card> */}
            </div>
          </TabsContent>
          <TabsContent value="performance">
            <div className="grid gap-4 md:grid-cols-2  lg:grid-cols-3">
              <MetricCard
                title="Conversion Rate"
                value="18.5%"
                icon={BarChart3}
              />{" "}
              <MetricCard title="ROI" value="245%" icon={Gauge} />{" "}
              {/* <MetricCard
                title="Total Conversions"
                value={campaigns
                  .reduce((sum, c) => sum + c.conversions, 0)
                  .toString()}
                icon={BarChartIcon}
              /> */}
            </div>
          </TabsContent>
          <TabsContent value="audience">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Purchased</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <Dialog>
                    <DialogTrigger asChild>
                      <TableRow key={lead.id}>
                        <TableCell className="font-medium">
                          {lead.name}
                        </TableCell>
                        <TableCell>{lead.email}</TableCell>

                        <TableCell>{lead.campaign ?? "Unassigned"}</TableCell>
                        <TableCell>
                          <Badge variant={true ? "default" : "secondary"}>
                            Purchased
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>

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
          </TabsContent>
        </Tabs>
      </div>
    </SidebarComp>
  );
};

export default SelectedCampaign;
