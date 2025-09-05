import { Outlet, Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Calendar,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
  Search,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/" },
  { label: "Alumni Directory", icon: Users, to: "/directory" },
  { label: "Events", icon: Calendar, to: "/events" },
  { label: "Forum/Chat", icon: MessageSquare, to: "/forum" },
  { label: "Settings", icon: Settings, to: "/settings" },
];

function Topbar() {
  return (
    <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b bg-white/90 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="md:hidden" />
        <div>
          <div className="text-lg font-semibold text-primary">Alumni Hub</div>
          <div className="text-xs text-muted-foreground">Admin Dashboard</div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <h1 className="text-lg font-semibold text-slate-800">Dashboard</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2">
          <div className="relative w-72">
            <Input placeholder="Search alumni, events..." />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>

        <Button className="hidden sm:inline-flex">Invite Alumni</Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-md">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://i.pravatar.cc/64" alt="User" />
                <AvatarFallback>UK</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default function AlumniLayout({ children }: { children?: ReactNode }) {
  const location = useLocation();
  return (
    <SidebarProvider>
      <Sidebar className="border-r" collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-1.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white font-bold">
              A
            </div>
            <div>
              <div className="text-sm font-semibold">Alumni Hub</div>
              <div className="text-xs text-muted-foreground">
                CSE Association
              </div>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs uppercase tracking-wide text-muted-foreground">
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map(({ label, icon: Icon, to }) => (
                  <SidebarMenuItem key={label}>
                    <SidebarMenuButton
                      asChild
                      isActive={
                        location.pathname === to ||
                        location.pathname.startsWith(to + "/")
                      }
                    >
                      <Link to={to} className="flex items-center gap-2">
                        <Icon className="text-primary" />
                        <span>{label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter>
          <div className="rounded-md bg-muted/50 p-3 text-xs text-muted-foreground">
            Tip: Press ⌘/Ctrl + B to toggle the sidebar
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="bg-slate-50">
        <Topbar />
        <div className={cn("mx-auto w-full max-w-7xl p-4 md:p-6")}>
          {children ?? <Outlet />}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
