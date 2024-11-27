import { useState } from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import items from "~/lib/data/Nav.json";
export function NavMain() {
  const [isActive, setIsActive] = useState("");

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
