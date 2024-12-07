import { LoaderFunction, json, redirect } from "@remix-run/node";
import { useLoaderData, useLocation } from "@remix-run/react";
import {
  BarChart3,
  CheckCheck,
  Gauge,
  Link,
  Mail,
  MailIcon,
  MessageSquare,
  Mouse,
} from "lucide-react";
import { useState } from "react";
import EditCampaign from "~/components/EditCampaign";
import MetricCard from "~/components/MetricCard";
import SidebarComp from "~/components/Sidebar";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Dialog, DialogTrigger } from "~/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { getCampaign, updateCampaign } from "~/utils/actions";
import leads from "~/lib/data/Leads.json";
import { Separator } from "~/components/ui/separator";
import DeleteCampaignButton from "~/components/DeleteCampaignButton";
import { ActionFunctionArgs } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  const data = await getCampaign();
  return json(data);
};

export async function action({ request, params }: ActionFunctionArgs) {
  const campaignId = params.campaignid;
  if (!campaignId) return "Please select campaign";
  const body = await request.formData();

  const name = body.get("name");
  const freq = body.get("freq");

  try {
    const updatedCampaign = await updateCampaign({ campaignId, name, freq });
    console.log(updatedCampaign);

    return redirect("/dashboard");
  } catch (error) {
    return {
      success: false,
      message: "Error updating campaing:",
      error,
    };
  }
}

const SelectedCampaign = () => {
  const campaigns = useLoaderData<typeof loader>();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const filteredCampaignArr = campaigns.filter(
    (campaign) => campaign._id === id,
  );
  const filteredCampaign = filteredCampaignArr[0];

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
            <EditCampaign selectedCampaign={filteredCampaign} />
            <DeleteCampaignButton selectedCampaign={filteredCampaign} />
          </div>
        </div>
        <Separator />
        <Tabs defaultValue="overview" className="w-full">
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

              <div className="flex-1 col-span-2 w-full">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-center">
                        <MailIcon className="mr-2 h-5 w-5 text-muted-foreground" />
                        <span>Email blast sent to 10,000 subscribers</span>
                        <span className="ml-auto text-sm text-muted-foreground">
                          2 days ago
                        </span>
                      </li>
                      <li className="flex items-center">
                        <MessageSquare className="mr-2 h-5 w-5 text-muted-foreground" />
                        <span>
                          Social media post published on Facebook and Instagram
                        </span>
                        <span className="ml-auto text-sm text-muted-foreground">
                          4 days ago
                        </span>
                      </li>
                      <li className="flex items-center">
                        <Link className="mr-2 h-5 w-5 text-muted-foreground" />
                        <span>New landing page created for the campaign</span>
                        <span className="ml-auto text-sm text-muted-foreground">
                          1 week ago
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="performance" className="gap-4 flex flex-col">
            <div className="grid gap-4 md:grid-cols-2  lg:grid-cols-2">
              <MetricCard
                title="Conversion Rate"
                value="18.5%"
                icon={BarChart3}
              />
              <MetricCard title="ROI" value="245%" icon={Gauge} />{" "}
              {/* <MetricCard
                title="Total Conversions"
                value={campaigns
                  .reduce((sum, c) => sum + c.conversions, 0)
                  .toString()}
                icon={BarChartIcon}
              /> */}
            </div>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 ">
              <MetricCard title="Emails/SMS Sent" value="221" icon={Mail} />
              <MetricCard title="Delivery Rate" value="98%" icon={CheckCheck} />
              <MetricCard title="CTR" value="82%" icon={Mouse} />
            </div>
          </TabsContent>
          <TabsContent value="audience">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Campaign</TableHead>
                  <TableHead className="text-right">Purchased</TableHead>
                  {/* <TableHead className="text-right">Actions</TableHead> */}
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
                        <TableCell className="text-right">
                          <Badge variant={true ? "default" : "secondary"}>
                            Purchased
                          </Badge>
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
