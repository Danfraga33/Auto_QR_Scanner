import { Dialog } from "./ui/dialog";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";
import { CalendarComp } from "~/components/ui/calendar";
import { Form } from "@remix-run/react";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Edit } from "lucide-react";

const EditCampaign = ({
  selectedCampaign,
  campaignSchedule,
}: {
  campaignSchedule: Date[];
}) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">
          <Edit className="mr-2 h-4 w-4" />
          Edit Campaign
        </Button>
      </DialogTrigger>
      <DialogContent aria-description="campaign" className="sm:max-w-[39rem]">
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
            />
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Input
              id="status"
              value={selectedCampaign.status}
              className="col-span-3"
            />
            <Label htmlFor="template" className="text-right">
              Template
            </Label>
            <Input id="template" value="Template 1" className="col-span-3" />
            <Label htmlFor="freq" className="text-right">
              Frequency
            </Label>
            <Input
              id="freq"
              value={selectedCampaign.frequency ?? "Weekly"}
              className="col-span-3"
            />
          </div>
        </div>
        <CalendarComp
          className="flex justify-center w-full"
          selected={campaignSchedule.map((date: string) => new Date(date))}
          mode="multiple"
        />

        <DialogFooter>
          <AlertDialog key={selectedCampaign._id}>
            <Button variant="secondary" className="text-gray-400" asChild>
              <AlertDialogTrigger>Delete</AlertDialogTrigger>
            </Button>
            <AlertDialogContent aria-description="Deleting Campaign">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  campaign.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <Form action="destroy" method="post">
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button variant="destructive" type="submit" asChild>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </Button>
                </AlertDialogFooter>
              </Form>
            </AlertDialogContent>
          </AlertDialog>
          <Button type="submit" variant="default">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCampaign;
