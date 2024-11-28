import { useState } from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import items from "~/lib/data/Nav.json";
import { Link } from "@remix-run/react";
export function NavMain() {
  const [isActive, setIsActive] = useState("");
  console.log(isActive);
  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            className="hover:underline hover:transition-all"
            onClick={() => {
              setIsActive(item.title);
            }}
            isActive={true}
            asChild
          >
            <Link to={item.href ?? "/"}>
              <item.icon />

              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
