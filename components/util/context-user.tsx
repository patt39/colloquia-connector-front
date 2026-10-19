"use client";

import { GetOneUserMeAPI } from "@/endpoints/users";
// import { GetOneUserMeAPI, IpLocationAPI } from '@/api-site/user';
import { createContext, FC, ReactNode, useContext } from "react";
import type { User } from "@/types/users";

type ContextProps = {
  user?: User;
  status: "error" | "success" | "pending";
};

const initContextPropsState = {
  user: undefined,
  status: "pending",
} as ContextProps;

const CreateContext = createContext<ContextProps>(initContextPropsState);

const useAuthContext = () => {
  return useContext(CreateContext);
};

const ContextProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const { status, data: user } = GetOneUserMeAPI();

  return (
    <CreateContext.Provider
      value={{
        user: user,
        status: status,
      }}
    >
      {children}
    </CreateContext.Provider>
  );
};

export { ContextProvider, useAuthContext };
