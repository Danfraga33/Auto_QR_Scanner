import { SheetDescription, SheetHeader, SheetTitle } from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { CalendarComp } from "./ui/calendar";

const CreateCampaign = () => {
  return (
    <SheetHeader>
      <SheetTitle>Create new campaign</SheetTitle>
      <SheetDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
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
        <Input value="Weekly" id="freq" />
      </div>
      <Separator />
      <div className=" items-center gap-3">
        <Label>Pick Start and End Date</Label>
        <CalendarComp />
      </div>
    </SheetHeader>
  );
};

export default CreateCampaign;
