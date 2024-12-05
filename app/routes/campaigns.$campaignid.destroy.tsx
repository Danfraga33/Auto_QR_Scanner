import { ActionFunctionArgs, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { deleteCampaign } from "~/utils/actions";

export const action = async ({ params }: ActionFunctionArgs) => {
  console.log("DESTROY", params);
  if (!params.campaignid) return "No Campaign Selected";

  invariant(params, "No Campaign Deleted");
  await deleteCampaign(params.campaignid);

  return redirect("/Dashboard");
};
