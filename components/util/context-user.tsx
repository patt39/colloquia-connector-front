"use client";

// import { GetOneUserMeAPI, IpLocationAPI } from '@/api-site/user';
import { createContext, FC, ReactNode, useContext } from "react";

type ContextProps = {
  userStorage?: any;
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
  // const { status, data: user } = GetOneUserMeAPI();

  return (
    <CreateContext.Provider
      value={{
        // userStorage: user,
        // ipLocation,
        // status: status,
        ...initContextPropsState,
      }}
    >
      {children}
    </CreateContext.Provider>
  );
};

export { ContextProvider, useAuthContext };
