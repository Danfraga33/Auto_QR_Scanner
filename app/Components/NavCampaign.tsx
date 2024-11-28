import { Plus, Target } from "lucide-react";
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
import { Link } from "@remix-run/react";
import { Sheet } from "./ui/sheet";

export default function NavCampaigns() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Campaigns</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {campaigns.map((campaign) => (
            <SidebarMenuItem key={campaign.name}>
              <SidebarMenuButton asChild>
                <Link to="/campaigns">
                  <Target className="h-4 w-4" />
                  <span>{campaign.name}</span>
                </Link>
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
