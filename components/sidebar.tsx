import {
  CalendarSync,
  ChartArea,
  ChevronUp,
  CircleDollarSign,
  Dumbbell,
  Home,
  LogOut,
  Settings,
  User2,
  UserCircle,
  UserRound,
  UserRoundCheck,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "./ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/auth";

const items = [
  {
    title: "Home",
    url: "/admin/dashboard",
    icon: Home,
  },
  {
    title: "Analytics",
    url: "/admin/analytics",
    icon: ChartArea,
  },
  {
    title: "Attendance",
    url: "/admin/attendance",
    icon: UserRoundCheck,
  },
  {
    title: "Members",
    url: "/admin/members",
    icon: UserRound,
  },
  {
    title: "Payments",
    url: "/admin/payments",
    icon: CircleDollarSign,
  },
  {
    title: "Plans",
    url: "/admin/plans",
    icon: CalendarSync,
  },
  {
    title: "trainers",
    url: "/admin/trainers",
    icon: Dumbbell,
  },
];

export default async function AppSidebar() {
  const session = await auth();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={"/"}>
                <Image
                  src="/images/logo.png"
                  alt="logo"
                  width={30}
                  height={30}
                />
                <span className="uppercase text-2xl font-bold tracking-wider">
                  FITX
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <div className="flex justify-between w-full">
                    <div className="flex items-center gap-2">
                    <User2 /> {session?.user?.name}
                  </div>
                  <div>
                    <ChevronUp />
                  </div>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <UserCircle /> Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings /> Settings{" "}
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive">
                  <LogOut /> Sign out{" "}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
