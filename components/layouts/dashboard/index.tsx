import { ReactNode, useState } from "react";

import { AppSidebar } from "@/components/layouts/dashboard/app-sidebar";
import { SiteHeader } from "@/components/layouts/dashboard/site-header";
import { HeaderSite } from "@/components/ui-setting";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { config } from "@/config";

interface IProps {
  title: string;
  subTitle?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
}

const LayoutDashboard = ({
  children,
  title,
  subTitle,
  description,
}: IProps) => {
  const localStorageCollapse = localStorage.getItem("collapse");
  const [collapse, setCollapse] = useState(
    localStorageCollapse
      ? localStorageCollapse === "true"
        ? true
        : false
      : true,
  );

  return (
    <>
      <HeaderSite
        title={title}
        description={`Quotation creation, invoicing and stock management software ${config.company.name}`}
      />
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 62)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
        open={collapse}
        onOpenChange={(i) => {
          setCollapse(i);
          localStorage.setItem("collapse", i.toString());
        }}
      >
        <AppSidebar variant="sidebar" />
        <SidebarInset>
          <SiteHeader />

          <div className="flex flex-1 flex-col bg-gray-50 dark:bg-background">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <div className="px-4 lg:px-6">
                  {subTitle && <p className="text-xl font-bold">{subTitle}</p>}

                  {description && (
                    <p className="my-2 text-sm text-gray-500">{description}</p>
                  )}
                  {children}
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export { LayoutDashboard };
