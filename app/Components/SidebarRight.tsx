import CronJobsOverview from "./CronJobsOverview";
import NavUser from "./NavUser";
import UpcomingTasks from "./UpcomingTasks";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "./ui/sidebar";
import marketingAppData from "../lib/data/marketingAppData.json";
import { Plus } from "lucide-react";
import { ComponentProps } from "react";

function SidebarRight({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="none"
      className="sticky hidden lg:flex top-0 h-svh border-l"
      {...props}
    >
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <NavUser user={marketingAppData.user} />
      </SidebarHeader>
      <SidebarContent>
        <CronJobsOverview cronJobs={marketingAppData.cronJobs} />
        <SidebarSeparator className="mx-0" />
        <UpcomingTasks />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Plus />
              <span>New CRON Job</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default SidebarRight;
