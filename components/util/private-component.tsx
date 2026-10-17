import { useRouter } from "next/router";
import { ComponentType, useEffect } from "react";
import { useAuthContext } from "./context-user";
import { LoadingFile } from "../ui-setting/loading-file";
import { ClientOnly } from "./client-only";
import { useInputState } from "../hooks";

const PrivateComponent = (Component: ComponentType) => {
  return function ProtectedRoute({ ...props }) {
    const { status } = useAuthContext();
    const { linkHref, userStorage } = useInputState();
    const { push, pathname } = useRouter();

    useEffect(() => {
      if (status === "error") {
        push(`/login${pathname ? `?redirect=${linkHref}` : ""}`);
      }
      // if (status === 'success' && userStorage?._count?.assignTypes < 1) {
      //   push(`/select/animal-type${pathname ? `?redirect=${linkHref}` : ''}`);
      // }
    }, [status, pathname, push, linkHref, userStorage]);
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

// import { useRouter } from 'next/router';
// import { ComponentType, useEffect } from 'react';
// import { ClientOnly } from './client-only';
// import { useAuthContext } from './context-user';
// import { LoadingFile } from '../ui-setting/loading-file';
// import { useInputState } from '../hooks';

// const PrivateComponent = (Component: ComponentType) => {
//   return function ProtectedRoute({ ...props }) {
//     const { status } = useAuthContext();
//     const { linkHref } = useInputState();
//     const { push, pathname } = useRouter();

//     useEffect(() => {
//       if (status === 'error') {
//         push(`/login${pathname ? `?redirect=${linkHref}` : ''}`);
//       }
//     }, [status, pathname, push, linkHref]);
//     return status === 'pending' ? (
//       <LoadingFile className="blur-2xs fixed inset-0 flex items-center justify-center" />
//     ) : (
//       <ClientOnly
//         fallback={
//           <LoadingFile className="blur-2xs fixed inset-0 flex items-center justify-center" />
//         }
//       >
//         <Component {...props} />
//       </ClientOnly>
//     );
//   };
// };

// export { PrivateComponent };
