import { Globe, MailCheck, Sparkles, Users } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

export default function NavLeads() {
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
