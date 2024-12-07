import { useState } from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import navLinks from "~/lib/data/Nav.json";
import { Link } from "@remix-run/react";
export function NavMain() {
  const [isActive, setIsActive] = useState("");

  return (
    <SidebarMenu>
      {navLinks.map((item) => (
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
