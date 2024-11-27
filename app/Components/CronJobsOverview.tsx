import { Clock } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { Badge } from "./ui/badge";

export default function CronJobsOverview({
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
