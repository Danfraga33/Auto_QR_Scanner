import React from "react";
import { Dialog, DialogFooter } from "./ui/dialog";
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
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Form } from "@remix-run/react";
import { Trash } from "lucide-react";

const DeleteCampaignButton = ({ selectedCampaign }) => {
  return (
    <Dialog>
      <AlertDialog key={selectedCampaign._id}>
        <Button variant="destructive" className="text-gray-400" asChild>
          <AlertDialogTrigger className="text-white">
            <Trash className="mr-2 h-4 w-4" />
            Delete Campaign
          </AlertDialogTrigger>
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
    </Dialog>
  );
};

export default DeleteCampaignButton;
