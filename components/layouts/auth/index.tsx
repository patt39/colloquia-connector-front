import { useUtils } from "@/components/hooks/use-utils";
import { ButtonInput, HeaderSite, ThemeToggle } from "@/components/ui-setting";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/components/util/context-user";
import { config } from "@/config";
import { LogInIcon, LogOutIcon, UserPlusIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface IProps {
  title: string;
  children: React.ReactNode;
}

const LayoutAuth = ({ children, title }: IProps) => {
  const { query, push } = useRouter();
  const { status } = useAuthContext();
  const { linkHref, user } = useUtils();
  const { redirect } = query;

  const logoutUserItem = async () => {
    // await logoutUsersAPI();
    push(`/login?redirect=${linkHref}`);
    location.reload();
  };

  useEffect(() => {
    if (status === "success") {
      push(`/dashboard`);
    }
  }, [status, push]);

  return (
    <>
      <HeaderSite title={title} description={`Colloquia Connector`} />

      <header className="sticky top-0 z-20 border-b bg-white dark:bg-sidebar">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-14 items-center justify-between">
            <div className="flex xl:ml-0">
              <Link href="/">
                <div className="flex shrink-0 items-center">
                  <div className="block h-8 w-auto lg:hidden">
                    <div className="flex items-center">
                      <div className="relative shrink-0 cursor-pointer">
                        {/* <ImageLogo width={34} height={34} /> */}
                      </div>
                      <span className="cursor-pointer text-lg font-bold">
                        {config.company.name}
                      </span>
                    </div>
                  </div>
                  <div className="hidden h-8 w-auto lg:block">
                    <div className="flex items-center">
                      <div className="relative shrink-0 cursor-pointer">
                        {/* <ImageLogo width={34} height={34} /> */}
                      </div>
                      <div className="ml-2 cursor-pointer">
                        <p className="text-lg font-bold">
                          {config.company.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="ml-auto flex items-center justify-end space-x-2">
              <ThemeToggle />

              {!user?.id ? (
                <>
                  <div className="relative">
                    <Button
                      size="sm"
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() =>
                        push(`/login${redirect ? `?redirect=${redirect}` : ""}`)
                      }
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
                      onClick={() =>
                        push(
                          `/register${redirect ? `?redirect=${redirect}` : ""}`,
                        )
                      }
                    >
                      <UserPlusIcon className="mr-1 size-4 lg:hidden" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Register
                      </span>
                    </Button>
                  </div>
                </>
              ) : (
                <div className="relative">
                  <ButtonInput
                    size="sm"
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => logoutUserItem()}
                    icon={
                      <LogOutIcon className="size-4 text-gray-600 hover:text-indigo-600" />
                    }
                  >
                    Logout
                  </ButtonInput>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex min-h-screen flex-1 flex-col dark:bg-sidebar">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <main>
              {children}
              {/* <CookieConsent /> */}
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export { LayoutAuth };
