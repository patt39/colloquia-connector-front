import { ThemeToggle } from "@/components/ui-setting";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { config } from "@/config";
import { capitalizeFirstLetter } from "@/utils";
import { SettingsIcon } from "lucide-react";
import { useRouter } from "next/router";

export function SiteHeader() {
  const { push } = useRouter();
  return (
    <header className="sticky top-0 z-20 flex h-(--header-height) shrink-0 items-center gap-2 bg-sidebar transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4 md:hidden"
        />
        <h1 className="text-base font-medium md:hidden">
          {capitalizeFirstLetter(config.company.name as string)}
        </h1>
        <div className="ml-auto flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="cursor-pointer"
            onClick={() => push(`/settings`)}
          >
            <SettingsIcon className="size-[1.2rem]" />
            <span className="sr-only">Settings</span>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
