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
import { cn } from "@/lib/utils";
import {
  Calendar,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react";
import { ReactNode } from "react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/" },
  { label: "Alumni Directory", icon: Users, to: "/" },
  { label: "Events", icon: Calendar, to: "/" },
  { label: "Forum/Chat", icon: MessageSquare, to: "/" },
  { label: "Settings", icon: Settings, to: "/" },
];

function Topbar() {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between gap-2 border-b bg-white/90 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <span className="text-lg font-semibold text-primary">Alumni Hub</span>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" className="hidden sm:inline-flex">
          Invite
        </Button>
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://i.pravatar.cc/64" alt="User" />
          <AvatarFallback>UK</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

export default function AlumniLayout({ children }: { children?: ReactNode }) {
  const location = useLocation();
  return (
    <SidebarProvider>
      <Sidebar className="border-r">
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
                      isActive={location.pathname === to}
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
