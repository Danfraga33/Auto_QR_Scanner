import React, { ReactNode, useState } from "react";
import {
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  useSidebar,
} from "~/components/ui/sidebar";
import marketingAppData from "../lib/data/marketingAppData.json";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "~/components/ui/sidebar";
import {
  ArrowUpRight,
  BarChart3,
  Bell,
  ChevronsUpDown,
  Clock,
  Contact,
  Gauge,
  Globe,
  LayoutDashboard,
  MailCheck,
  PieChart,
  Plus,
  Settings,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

function NavMain() {
  const [isActive, setIsActive] = useState("");
  const items = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    { title: "Campaigns", icon: Target, href: "/campaigns" },
    { title: "Leads", icon: Users },
    { title: "Analytics", icon: BarChart3 },
  ];

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            className={isActive === item.title ? "bg-gray-200/80" : ""}
            onClick={() => setIsActive(item.title)}
            asChild
          >
            <a href={item.href}>
              <item.icon />
              <span>{item.title}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

function NavCampaigns() {
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

function SidebarLeft({ ...props }: React.ComponentProps<typeof Sidebar>) {
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

function NavLeads() {
  const leadCategories = [
    { name: "All Leads", icon: Users },
    { name: "Hot Leads", icon: Sparkles },
    { name: "Qualified Leads", icon: MailCheck },
    { name: "Cold Leads", icon: Globe },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Leads</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {leadCategories.map((category) => (
            <SidebarMenuItem key={category.name}>
              <SidebarMenuButton asChild>
                <a href="#">
                  <category.icon className="h-4 w-4" />
                  <span>{category.name}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function NavAnalytics() {
  const analyticsSections = [
    { name: "Performance", icon: BarChart3 },
    { name: "Conversion Rates", icon: PieChart },
    { name: "ROI Analysis", icon: Gauge },
    { name: "Lead Sources", icon: Target },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Analytics</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {analyticsSections.map((section) => (
            <SidebarMenuItem key={section.name}>
              <SidebarMenuButton asChild>
                <a href="#">
                  <section.icon className="h-4 w-4" />
                  <span>{section.name}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function CronJobsOverview({
  cronJobs,
}: {
  cronJobs: { name: string; schedule: string; status: string }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>CRON Jobs</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {cronJobs.map((job) => (
            <SidebarMenuItem key={job.name}>
              <SidebarMenuButton>
                <Clock className="h-4 w-4" />
                <span>{job.name}</span>
                <Badge
                  variant={job.status === "Active" ? "default" : "secondary"}
                  className="ml-auto"
                >
                  {job.status}
                </Badge>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
function UpcomingTasks() {
  const tasks = [
    { name: "Review campaign performance", due: "Today" },
    { name: "Update lead scoring model", due: "Tomorrow" },
    { name: "Prepare monthly report", due: "In 3 days" },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Upcoming Tasks</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {tasks.map((task) => (
            <SidebarMenuItem key={task.name}>
              <SidebarMenuButton>
                <span>{task.name}</span>
              </SidebarMenuButton>
              <SidebarMenuBadge>{task.due}</SidebarMenuBadge>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">AJ</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="start"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">AJ</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Contact className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <ArrowUpRight className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function SidebarRight({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>{children}</SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  );
};

export default SidebarComp;
