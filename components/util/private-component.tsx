import { useRouter } from "next/router";
import { ComponentType, useEffect } from "react";
import { useAuthContext } from "./context-user";
import { LoadingFile } from "../ui-setting/loading-file";
import { ClientOnly } from "./client-only";
import { useUtils } from "../hooks/use-utils";

const PrivateComponent = (Component: ComponentType) => {
  return function ProtectedRoute({ ...props }) {
    const { status } = useAuthContext();
    const { linkHref, user } = useUtils();
    const { push, pathname } = useRouter();

    useEffect(() => {
      if (status === "error") {
        push(`/login${pathname ? `?redirect=${linkHref}` : ""}`);
      }
    }, [status, pathname, push, linkHref, user]);
    return status === "pending" ? (
      <LoadingFile className="blur-2xs fixed inset-0 flex items-center justify-center" />
    ) : (
      <ClientOnly
        fallback={
          <LoadingFile className="blur-2xs fixed inset-0 flex items-center justify-center" />
        }
      >
        <Component {...props} />
      </ClientOnly>
    );
  };
};

export { PrivateComponent };
