import { useUtils } from "@/components/hooks/use-utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { User } from "@/types/users";
import {
  CreditCardIcon,
  LogOutIcon,
  MoreVerticalIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

export function NavUser({ user }: { user: User }) {
  const { linkHref } = useUtils();
  const { push } = useRouter();
  const { isMobile } = useSidebar();

  const logoutUserItem = async () => {
    //await logoutUsersAPI();
    push(`/login?redirect=${linkHref}`);
    location.reload();
  };

  const subMenuItems = [
    {
      title: "Profile",
      href: "/settings/profile",
      icon: <UserIcon />,
    },
    {
      title: "Billing",
      href: "/settings/billing",
      icon: <CreditCardIcon />,
    },
  ];

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="cursor-pointer data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {/* <AvatarComponent
                preview={user?.profile?.image?.preview}
                className="size-8 rounded-full"
                value={`${user?.profile?.firstName} ${user?.profile?.lastName}`}
              />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{nameUser}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {user?.email}
                </span>
              </div> */}
              <MoreVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            {/* <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <AvatarComponent
                  preview={user?.profile?.image?.preview}
                  className="size-8 rounded-lg"
                  value={`${user?.profile?.firstName} ${user?.profile?.lastName}`}
                />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{nameUser}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel> */}
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {subMenuItems.map((item, index) => (
                <Link key={index} href={item.href}>
                  <DropdownMenuItem className="cursor-pointer">
                    {item.icon}
                    {item.title}
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => logoutUserItem()}
            >
              <LogOutIcon />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
