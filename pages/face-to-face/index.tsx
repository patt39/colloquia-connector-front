import { LayoutDashboard } from "@/components/layouts/dashboard";
import { Card } from "@/components/ui/card";
import { PrivateComponent } from "@/components/util/private-component";

const DashboardPage = () => {
  return (
    <>
      <LayoutDashboard title={"Dashboard"}>
        <div className="mt-8 flow-root">
          <Card className="rounded-lg p-4 shadow-none">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="mt-4 sm:mt-0"></div>
            </div>
          </Card>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default DashboardPage;
