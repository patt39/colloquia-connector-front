import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { HomeIcon, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

type NavbarProps = {
  title: string;
  url: string;
  className?: string;
  icon: LucideIcon;
};

export function NavMain() {
  const navigationItems: NavbarProps[] = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: HomeIcon,
    },
  ];

  return (
    <>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {navigationItems.map((item) => (
              <NavbarMainItem
                key={item.title}
                item={item}
                className="group/collapsible"
              />
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
}

function NavbarMainItem({
  item,
  className,
}: {
  item: NavbarProps;
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const currentPath = router.asPath;

  const isActive = pathname?.startsWith(item.url) || item.url === currentPath;
  return (
    <SidebarMenuItem key={item.title}>
      <Link href={item.url}>
        <SidebarMenuButton
          tooltip={item.title}
          className={cn(
            "cursor-pointer my-0.5",
            className,
            isActive ? `bg-primary text-white duration-200 ease-linear` : "",
          )}
        >
          {item.icon && <item.icon />}
          <span className="font-semibold">{item.title}</span>
        </SidebarMenuButton>
      </Link>
    </SidebarMenuItem>
  );
}
