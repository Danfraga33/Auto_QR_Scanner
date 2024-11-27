import { BarChart3, Gauge, PieChart, Target } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

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

export default NavAnalytics;
