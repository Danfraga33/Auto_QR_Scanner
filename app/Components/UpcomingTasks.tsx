import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

export default function UpcomingTasks() {
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
