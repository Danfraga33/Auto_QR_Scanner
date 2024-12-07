import { Dialog, DialogClose } from "./ui/dialog";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
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
import { Edit } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useState } from "react";

const EditCampaign = ({ selectedCampaign }) => {
  const [freqValue, setFreqValue] = useState(selectedCampaign.freq);
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">
          <Edit className="mr-2 h-4 w-4" />
          Edit Campaign
        </Button>
      </DialogTrigger>
      <DialogContent aria-description="campaign" className="sm:max-w-[39rem]">
        <Form method="post" action={`/campaigns/${selectedCampaign._id}`}>
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
                placeholder={selectedCampaign.name}
                className="col-span-3"
                name="name"
              />
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
          </div>
          <CalendarComp
            className="flex justify-center w-full"
            selected={selectedCampaign.schedule.map(
              (date: string) => new Date(date),
            )}
            mode="multiple"
          />

          <DialogFooter>
            <Button type="submit" variant="default">
              Save changes
            </Button>
            <DialogClose>
              <Button type="submit" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCampaign;
