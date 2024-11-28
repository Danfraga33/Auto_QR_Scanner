import { BarChart, Calendar, Edit, MoreHorizontal, Trash } from "lucide-react";

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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";
import { CalendarComp } from "~/components/ui/calendar";
import { useState } from "react";
import campaignsData from "~/lib/data/campaigns.json";

const CampaignList = () => {
  const [selected, setSelected] = useState<Date[]>([]);
  const [campaigns, setCampaigns] = useState(campaignsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "All" || campaign.status === statusFilter),
  );
  return (
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
              <>
                <Dialog>
                  <DialogTrigger
                    onClick={() =>
                      setSelected([
                        new Date(campaign.startDate),
                        new Date(campaign.endDate),
                      ])
                    }
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
                      <TableCell>{campaign.startDate.split("T")[0]}</TableCell>
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
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-[39rem]">
                    <DialogHeader>
                      <DialogTitle>{campaign.name}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="name"
                          value={campaign.name}
                          className="col-span-3"
                          disabled
                        />
                        <Label htmlFor="status" className="text-right">
                          Status
                        </Label>
                        <Input
                          id="status"
                          value={campaign.status}
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
                          value={campaign.frequency ?? "Weekly"}
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
              </>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CampaignList;
