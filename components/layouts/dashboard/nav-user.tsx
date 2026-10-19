import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useUtils } from "@/hooks"
import { logoutUsersAPI } from "@/requests/user"
import { User } from "@/types/user"
import { capitalizeFirstLetter } from "@/utils"
import {
  BanknoteIcon,
  BellIcon,
  Building2Icon,
  CreditCardIcon,
  LogOutIcon,
  MoreVerticalIcon,
  UserIcon,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/router"
import { AvatarComponent } from "../../ui-setting"

export function NavUser({ user }: { user: User }) {
  const { t, linkHref } = useUtils()
  const { push } = useRouter()
  const { isMobile } = useSidebar()

  const nameUser =
    capitalizeFirstLetter(user?.profile?.firstName) +
    " " +
    capitalizeFirstLetter(user?.profile?.lastName)

  const logoutUserItem = async () => {
    await logoutUsersAPI()
    push(`/login?redirect=${linkHref}`)
    location.reload()
  }

  const subMenuItems = [
    {
      title: t.formatMessage({ id: "UTIL.PROFILE" }),
      href: "/settings/profile",
      icon: <UserIcon />,
    },
    {
      title: t.formatMessage({ id: "UTIL.BILLING" }),
      href: "/settings/billing",
      icon: <CreditCardIcon />,
    },
    {
      title: t.formatMessage({ id: "MENU.PAYMENTS" }),
      href: "/settings/payments",
      icon: <BanknoteIcon />,
    },
    {
      title: t.formatMessage({ id: "MENU.NOTIFICATION" }),
      href: "/notifications",
      icon: <BellIcon />,
    },
    {
      title: t.formatMessage({ id: "MENU.ORGANIZATION" }),
      href: "/settings/organizations",
      icon: <Building2Icon />,
    },
  ]

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="cursor-pointer data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <AvatarComponent
                preview={user?.profile?.image?.preview}
                className="size-8 rounded-full"
                value={`${user?.profile?.firstName} ${user?.profile?.lastName}`}
              />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{nameUser}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {user?.email}
                </span>
              </div>
              <MoreVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
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
            </DropdownMenuLabel>
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
              {t.formatMessage({ id: "MENU.LOGOUT" })}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
