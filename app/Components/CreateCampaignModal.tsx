import { Check, Plus } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { CalendarComp } from "~/components/ui/calendar";
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
import { Form } from "@remix-run/react";
import { ChangeEventHandler, useState } from "react";
import { setHours, setMinutes } from "date-fns";

const CreateCampaign = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [strategy, setStrategy] = useState<string>("Email");
  const [freqValue, setFreqValue] = useState("Weekly");
  const [timeValue, setTimeValue] = useState<string>("00:00");
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
    <Sheet>
      <Button asChild>
        <SheetTrigger onClick={() => setStartDate(undefined)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Campaign
        </SheetTrigger>
      </Button>
      <SheetContent>
        <Form method="post" action={`/dashboard`}>
          <SheetHeader>
            <SheetTitle>Create new campaign</SheetTitle>
            <SheetDescription>
              Insert the required inputs to create a new campaign
            </SheetDescription>
          </SheetHeader>
          <Separator className="my-4" />
          <div className="flex flex-col gap-2 py-1">
            <div className="flex items-center gap-3">
              <Label htmlFor="name" className="text-md">
                Name:
              </Label>
              <Input placeholder="untitled" name="name" id="name" />
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
          </div>
          <Separator />
          <div className="py-2 gap-2 flex flex-col items-start">
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
          </div>
          <Separator />
          <input
            type="text"
            value={startDate?.toISOString()}
            hidden
            name="startDate"
          />

          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit" className="my-2">
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
  );
};

export default CreateCampaign;
