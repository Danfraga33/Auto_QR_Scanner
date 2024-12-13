import CompanyName from "./CompanyName";
import NavCampaigns from "./NavCampaign";
import { NavMain } from "./NavMain";
import NavUser from "./NavUser";
import { Separator } from "./ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "./ui/sidebar";
import { ComponentProps } from "react";

function SidebarLeft({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="border-r-0 custom-gray rounded-tr-3xl shadow-lg"
      {...props}
    >
      <SidebarHeader>
        <CompanyName />
        <NavMain />
      </SidebarHeader>
      <Separator role="contentinfo" />
      <SidebarContent>
        <NavCampaigns />
        {/* <NavLeads /> */}
        {/* <NavAnalytics /> */}
      </SidebarContent>
      <Separator />
      <NavUser />
      <SidebarRail />
    </Sidebar>
  );
}

export default SidebarLeft;
