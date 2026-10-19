import { ThemeToggle } from "@/components/ui-setting";
import { Button } from "@/components/ui/button";
import { config } from "@/config";
import { User } from "@/types/users";
import { capitalizeFirstLetter } from "@/utils/utils";
import { LogInIcon, UserPlusIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  user?: User;
  showDrawer?: () => void;
}

const HorizontalNavSite = ({ user, showDrawer }: Props) => {
  const { push } = useRouter();

  return (
    <header className="sticky top-0 z-20 border-b bg-white dark:bg-sidebar">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-14 items-center justify-between">
          <div className="-m-3 mr-0.5 flex items-center lg:hidden">
            <Button
              type="button"
              variant="ghost"
              onClick={showDrawer}
              className="cursor-pointer"
            >
              <svg
                className="size-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </Button>
          </div>

          <div className="flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              {/* <ImageLogo width={34} height={34} /> */}
              <span className="font-bold">
                {capitalizeFirstLetter(`${config.company.name}`)}
              </span>
            </Link>
          </div>

          <div className="ml-auto flex items-center justify-end space-x-2">
            <ThemeToggle />

            <div className="relative">
              <Button
                size="sm"
                variant="outline"
                className="cursor-pointer"
                onClick={() => push(`${user?.id ? `/dashboard` : `/login`}`)}
              >
                <LogInIcon className="mr-1 size-4 lg:hidden" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Login
                </span>
              </Button>
            </div>
            <div className="relative">
              <Button
                size="sm"
                variant="default"
                className="cursor-pointer"
                onClick={() => push(`${user?.id ? `/dashboard` : `/register`}`)}
              >
                <UserPlusIcon className="mr-1 size-4 lg:hidden" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Register
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export { HorizontalNavSite };
