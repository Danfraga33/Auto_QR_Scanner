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

export default function NavCampaigns() {
  const campaigns = [
    { name: "Summer Sale", status: "active" },
    { name: "Product Launch", status: "scheduled" },
    { name: "Holiday Promo", status: "draft" },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Campaigns</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {campaigns.map((campaign) => (
            <SidebarMenuItem key={campaign.name}>
              <SidebarMenuButton asChild>
                <a href="#">
                  <Target className="h-4 w-4" />
                  <span>{campaign.name}</span>
                </a>
              </SidebarMenuButton>
              <Badge
                variant={campaign.status === "active" ? "default" : "secondary"}
                className="ml-auto"
              >
                {campaign.status}
              </Badge>
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Plus className="h-4 w-4" />
              <span>New Campaign</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
