import {
  ArrowUpRight,
  BarChart3,
  Bell,
  Calendar,
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  Clock,
  Contact,
  Gauge,
  Globe,
  LayoutDashboard,
  MailCheck,
  MessageSquare,
  MoreHorizontal,
  PieChart,
  Plus,
  Search,
  Settings,
  Sparkles,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "~/components/ui/breadcrumb";
import { Button } from "~/components/ui/button";
import { Calendar as CalendarComponent } from "~/components/ui/calendar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import { Progress } from "~/components/ui/progress";
import { Separator } from "~/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "~/components/ui/sidebar";

// This is sample data for the marketing app.
const marketingAppData = {
  user: {
    name: "Alice Johnson",
    email: "alice@example.com",
    avatar: "/avatars/alice.jpg",
  },
  campaigns: [
    { name: "Summer Sale", status: "Active", leads: 1250, conversions: 320 },
    { name: "Product Launch", status: "Scheduled", leads: 800, conversions: 0 },
    { name: "Holiday Promo", status: "Draft", leads: 0, conversions: 0 },
  ],
  leadSources: [
    { name: "Website", count: 2500 },
    { name: "Social Media", count: 1800 },
    { name: "Email", count: 1200 },
    { name: "Referrals", count: 500 },
  ],
  cronJobs: [
    { name: "Daily Lead Nurturing", schedule: "0 9 * * *", status: "Active" },
    { name: "Weekly Newsletter", schedule: "0 10 * * 1", status: "Active" },
    { name: "Monthly Report", schedule: "0 9 1 * *", status: "Active" },
    { name: "Social Media Posts", schedule: "0 */4 * * *", status: "Paused" },
  ],
};

export default function MarketingApp() {
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
                    Marketing Dashboard
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard title="Total Leads" value="5,280" icon={Users} />
            <MetricCard
              title="Conversion Rate"
              value="18.5%"
              icon={BarChart3}
            />
            <MetricCard title="Active Campaigns" value="3" icon={Target} />
            <MetricCard title="ROI" value="245%" icon={Gauge} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <CampaignOverview campaigns={marketingAppData.campaigns} />
            <LeadSourcesChart leadSources={marketingAppData.leadSources} />
          </div>
        </div>
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  );
}

function SidebarLeft({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <CompanySwitcher />
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

function NavMain() {
  const items = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      isActive: true,
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
            className={item.isActive ? "bg-gray-200/80" : ""}
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

function CompanySwitcher() {
  const companies = [
    { name: "Acme Inc", logo: LayoutDashboard },
    { name: "Monsters Inc", logo: Users },
    { name: "Stark Industries", logo: Sparkles },
  ];
  const [activeCompany, setActiveCompany] = useState(companies[0]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton className="w-fit px-1.5">
          <div className="flex aspect-square size-5 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            <activeCompany.logo className="size-3" />
          </div>
          <span className="truncate font-semibold">{activeCompany.name}</span>
        </SidebarMenuButton>
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="w-fit px-1.5">
              <div className="flex aspect-square size-5 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                <activeCompany.logo className="size-3" />
              </div>
              <span className="truncate font-semibold">
                {activeCompany.name}
              </span>
              <ChevronDown className="opacity-50" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-64 rounded-lg"
            align="start"
            side="bottom"
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Switch Company
            </DropdownMenuLabel>
            {companies.map((company, index) => (
              <DropdownMenuItem
                key={company.name}
                onClick={() => setActiveCompany(company)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <company.logo className="size-4 shrink-0" />
                </div>
                {company.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">
                Add company
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function MetricCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string;
  icon: LucideIcon;
}) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">{title}</span>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="mt-2 text-2xl font-bold">{value}</div>
      </div>
    </div>
  );
}

function CampaignOverview({
  campaigns,
}: {
  campaigns: {
    name: string;
    status: string;
    leads: number;
    conversions: number;
  }[];
}) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold">Campaign Overview</h3>
        <div className="mt-4 space-y-4">
          {campaigns.map((campaign) => (
            <div
              key={campaign.name}
              className="flex items-center justify-between"
            >
              <div>
                <div className="font-medium">{campaign.name}</div>
                <div className="text-sm text-muted-foreground">
                  {campaign.status}
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">{campaign.leads} Leads</div>
                <div className="text-sm text-muted-foreground">
                  {campaign.conversions} Conversions
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LeadSourcesChart({
  leadSources,
}: {
  leadSources: { name: string; count: number }[];
}) {
  const total = leadSources.reduce((sum, source) => sum + source.count, 0);

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold">Lead Sources</h3>
        <div className="mt-4 space-y-4">
          {leadSources.map((source) => (
            <div key={source.name}>
              <div className="flex items-center justify-between text-sm">
                <span>{source.name}</span>
                <span className="font-medium">
                  {((source.count / total) * 100).toFixed(1)}%
                </span>
              </div>
              <Progress value={(source.count / total) * 100} className="mt-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
