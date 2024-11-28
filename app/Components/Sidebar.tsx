import { ComponentProps, ReactNode } from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "~/components/ui/sidebar";

import NavCampaigns from "./NavCampaign";
import { NavMain } from "./NavMain";
import { Separator } from "./ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "./ui/breadcrumb";
import { useLocation } from "@remix-run/react";
import CompanyName from "./CompanyName";
import NavUser from "./NavUser";
import marketingAppData from "../lib/data/marketingAppData.json";

function SidebarLeft({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <CompanyName />
        <NavMain />
      </SidebarHeader>
      <SidebarContent>
        <NavCampaigns />
        {/* <NavLeads /> */}
        {/* <NavAnalytics /> */}
      </SidebarContent>
      <NavUser user={marketingAppData.user} />
      <SidebarRail />
    </Sidebar>
  );
}

const SidebarComp = ({ children }: { children: ReactNode }) => {
  const path = useLocation()
    .pathname.trim()
    .replace("/", "")
    .replace(/^./, (char) => char.toUpperCase());

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
    </SidebarProvider>
  );
};

export default SidebarComp;
