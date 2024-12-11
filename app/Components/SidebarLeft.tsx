import CompanyName from "./CompanyName";
import NavCampaigns from "./NavCampaign";
import { NavMain } from "./NavMain";
import NavUser from "./NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "./ui/sidebar";
import marketingAppData from "../lib/data/marketingAppData.json";
import { ComponentProps } from "react";

function SidebarLeft({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0 bg-gray-200/50" {...props}>
      <SidebarHeader>
        <CompanyName />
        <NavMain />
      </SidebarHeader>
      <SidebarContent>
        <NavCampaigns />
        {/* <NavLeads /> */}
        {/* <NavAnalytics /> */}
      </SidebarContent>
      <NavUser />
      <SidebarRail />
    </Sidebar>
  );
}

export default SidebarLeft;
