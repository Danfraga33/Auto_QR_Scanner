import { LayoutDashboard, Sparkles, Users } from "lucide-react";
import { useState } from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";

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
