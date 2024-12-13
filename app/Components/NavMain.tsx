import { useState } from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import navLinks from "~/lib/data/Nav.json";
import { Link } from "@remix-run/react";
import { Search, icons } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function NavMain({ className, ...props }: SearchBarProps) {
  const [isActive, setIsActive] = useState("");
  const [query, setQuery] = useState("");

  const Icon = ({ name }: { name: string }) => {
    if (!name) {
      const LucideIcon = icons["arrow-big-right"];
      return <LucideIcon />;
    }
    const LucideIcon = icons[name];

    return <LucideIcon />;
  };
  return (
    <SidebarMenu className="gap-4">
      <Input
        type="search"
        placeholder="Search..."
        className="pr-10"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        {...props}
      />
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
      >
        <span className="sr-only">Search</span>
      </Button>

      <div className="gap-4">
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
                <Icon name={item.icon} />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </div>
    </SidebarMenu>
  );
}
