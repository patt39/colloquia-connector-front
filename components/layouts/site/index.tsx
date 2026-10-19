import { HeaderSite } from "@/components/ui-setting";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { HorizontalNavSite } from "./horizontal-nav-site";
import { useUtils } from "@/components/hooks/use-utils";

interface IProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

const LayoutSite = ({ children, title, className }: IProps) => {
  const { user } = useUtils();
  const [isOpen, setIsOpen] = useState(false);
  const showDrawer = () => {
    setIsOpen((i: boolean) => !i);
  };
  return (
    <>
      <HeaderSite
        title={title}
        description="Free software for creating quotes and invoices and managing stock"
      />

      {/* <div className="min-h-screen space-y-5"> */}
      <HorizontalNavSite showDrawer={showDrawer} user={user} />

      {/* Fix Drawer */}
      <Sheet onOpenChange={setIsOpen} open={isOpen} defaultOpen={isOpen}>
        <SheetTrigger asChild>
          {/* <Button variant="outline">Open</Button> */}
        </SheetTrigger>
        <SheetContent
          side="left"
          className="dark:border-input dark:bg-background"
        >
          <div className="flex flex-col overflow-y-auto pt-5">
            {/* <VerticalNavSite /> */}
          </div>
        </SheetContent>
      </Sheet>
      {/*End Fix Drawer */}

      <div
        className={cn(
          "flex min-h-screen flex-1 flex-col dark:bg-sidebar",
          className,
        )}
      >
        <main>{children}</main>
      </div>

      {/* </div> */}
    </>
  );
};

export { LayoutSite };
