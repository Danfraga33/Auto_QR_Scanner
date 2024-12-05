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
import { Dialog, DialogTrigger } from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";
import { ChangeEventHandler, useState } from "react";
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
import { createCampaign, getCampaign } from "~/utils/actions";
import { ActionFunctionArgs, LoaderFunction, json } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { setHours, setMinutes, parseISO, isAfter, isBefore } from "date-fns";

// export const action = async ({ params }: ActionFunctionArgs) => {
//   invariant(params.contactId, "Missing contactId param");
//   await deleteCampaign();
//   return redirect("/");
// };

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

export default function CampaignsPage() {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [campaignSchedule, setCampaignSchedule] = useState<Date[]>([]);
  // const [campaigns, setCampaigns] = useState(campaignsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedCampaign, setSelectedCampaign] = useState<any>({});
  const [strategy, setStrategy] = useState<string>("Email");
  const [freqValue, setFreqValue] = useState("Weekly");
  const [timeValue, setTimeValue] = useState<string>("00:00");

  const campaigns = useLoaderData<typeof loader>();

  // console.log(selectedCampaign.schedule.map((date) => new Date(date)));
  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "All" || campaign.status === statusFilter),
  );

  const handleTimeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;
    if (!startDate) {
      setTimeValue(time);
      return;
    }

    const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
    const newSelectedDate = setHours(setMinutes(startDate, minutes), hours);
    setStartDate(newSelectedDate);
    setTimeValue(time);
  };

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
        <Sheet>
          <Button>
            <SheetTrigger onClick={() => setStartDate(undefined)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Campaign
            </SheetTrigger>
          </Button>
          <SheetContent>
            <Form method="post">
              <SheetHeader>
                <SheetTitle>Create new campaign</SheetTitle>
                <SheetDescription>
                  Insert the required inputs to create a new campaign
                </SheetDescription>
              </SheetHeader>
              <Separator className="my-4" />
              <div className="flex items-center gap-3">
                <Label htmlFor="name" className="text-md">
                  Name:
                </Label>
                <Input
                  placeholder="untitled"
                  name="name"
                  defaultValue="untitled"
                  id="name"
                />
              </div>
              <div className="flex items-center gap-3">
                <Label htmlFor="strategy">Strategy</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="default"
                      value={strategy}
                      onClick={() => setStrategy("Email")}
                    >
                      {strategy}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setStrategy("Email")}>
                      Email
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setStrategy("SMS")}>
                      SMS
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <input type="text" name="strategy" value={strategy} hidden />
              </div>
              <div className="flex items-center gap-3">
                <Label htmlFor="freq">Frequency:</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="default" value={freqValue}>
                      {freqValue}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setFreqValue("Daily")}>
                      Daily
                    </DropdownMenuItem>
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
                <input type="text" hidden value={freqValue} name="freq" />
              </div>
              <Separator />
              <Label className="text-sm">Pick Start and End Date:</Label>
              <Input
                type="time"
                value={timeValue}
                onChange={handleTimeChange}
                name="startTime"
              />
              <div className="flex justify-center items-center gap-3 py-3">
                <CalendarComp
                  selected={startDate}
                  onSelect={setStartDate}
                  mode="single"
                  footer={startDate ? `Selected: ${startDate}` : "Pick a day."}
                />
              </div>
              <Separator />
              <input
                type="text"
                value={startDate?.toISOString()}
                hidden
                name="startDate"
              />

              <SheetFooter>
                <SheetClose>
                  <Button type="submit" className="py-3">
                    <span>
                      <Check />
                    </span>
                    Save campaign
                  </Button>
                </SheetClose>
              </SheetFooter>
            </Form>
          </SheetContent>
        </Sheet>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                <TableHead>Freq</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>

                <TableHead>Conversions</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCampaigns.map((campaign) => (
                <Dialog>
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
                  </div>
                  <Button asChild>
                    {" "}
                    <Link to={`/campaigns/${selectedCampaign._id}`}>
                      Explore
                    </Link>
                  </Button>
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
