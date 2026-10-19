import * as React from "react";

import { NavMain } from "@/components/layouts/dashboard/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { config } from "@/config";
import { capitalizeFirstLetter } from "@/utils/utils";
import Link from "next/link";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  //const { user } = useAuthContext();
  return (
    <Sidebar collapsible="icon" {...props} className="border-none">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center justify-between">
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/dashboard">
                {/* <ImageLogo width={24} height={24} /> */}
                <span className="cursor-pointer text-lg font-bold">
                  {capitalizeFirstLetter(config.company.name as string)}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={user as User} />
      </SidebarFooter> */}
    </Sidebar>
  );
}
