import { LayoutDashboard } from "lucide-react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { Link } from "@remix-run/react";

export default function CompanyName() {
  const company = { name: "Acme Inc", logo: LayoutDashboard };
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton className="w-fit px-1.5 py-6">
          <div className="flex aspect-square size-5 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            <company.logo className="size-10" />
          </div>
          <Link to="/">
            <span className="text-2xl  truncate font-semibold">
              {company.name}
            </span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
