import {
  PropsWithChildren,
  ReactNode,
  Suspense,
  useEffect,
  useState,
} from "react";

const useIsClient = () => {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

export const ClientOnly = ({
  children,
  fallback,
}: PropsWithChildren<{ fallback: ReactNode }>) => {
  const isClient = useIsClient();

  if (!isClient) {
    return <>{fallback}</>;
  }

  return <Suspense fallback={fallback}>{children}</Suspense>;
};
