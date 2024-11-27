import React, { ComponentProps, ReactNode } from "react";
import {
  SidebarFooter,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import marketingAppData from "../lib/data/marketingAppData.json";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "~/components/ui/sidebar";
import { Plus } from "lucide-react";

import NavCampaigns from "./NavCampaign";
import { NavMain } from "./NavMain";
import NavUser from "./NavUser";
import CronJobsOverview from "./CronJobsOverview";
import UpcomingTasks from "./UpcomingTasks";
import NavAnalytics from "./NavAnalytics";
import NavLeads from "./NavLeads";
import { Separator } from "./ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "./ui/breadcrumb";
import { useLocation } from "@remix-run/react";

function SidebarLeft({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <NavMain />
      </SidebarHeader>
      <SidebarContent>
        <NavCampaigns />
        <NavLeads />
        <NavAnalytics />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

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

const SidebarComp = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  let route = location.pathname.trim().replace("/", "");
  let path = route.charAt(0).toUpperCase() + route.slice(1);
  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">
                    {path}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        {children}
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  );
};

export default SidebarComp;
