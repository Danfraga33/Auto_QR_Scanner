import { Target } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { Badge } from "./ui/badge";
import campaigns from "~/lib/data/campaigns.json";
import { NavLink, json, useLoaderData } from "@remix-run/react";
import { getCampaign } from "~/utils/actions";
import { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  const data = await getCampaign();
  return json(data);
};

export default function NavCampaigns() {
  const campaigns = useLoaderData<typeof loader>();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Campaigns</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {campaigns.map((campaign) => (
            <SidebarMenuItem key={campaign.id}>
              <SidebarMenuButton asChild>
                <NavLink to={`/campaigns/${campaign._id}`}>
                  <Target className="h-4 w-4" />
                  <span>{campaign.name}</span>
                </NavLink>
              </SidebarMenuButton>
              <Badge
                variant={
                  campaign.status.toLowerCase() === "active"
                    ? "default"
                    : "secondary"
                }
                className="ml-auto"
              >
                {campaign.status.toLowerCase()}
              </Badge>
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem></SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
