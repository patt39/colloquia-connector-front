import { useMutationHandler, useQueryHandler } from "@/components/hooks";
import { User, UserForgotPasswordReq, UserLoginReq } from "@/types/users";
import { makeAxios } from "@/utils/end-point";

export const GetOneUserMeAPI = () => {
  return useQueryHandler<User>({
    queryKey: ["user"],
    queryFn: async () =>
      await makeAxios({
        method: "GET",
        endpoint: "/users/me",
      }),
    gcTime: 0,
  });
};

export const LoginUserAPI = () => {
  return useMutationHandler<UserLoginReq>({
    queryKeys: ["login"],
    mutationFn: async (payload) => {
      return await makeAxios({
        method: "POST",
        endpoint: "/login",
        body: payload,
      });
    },
  });
};

export const PasswordResetUserAPI = () => {
  return useMutationHandler<UserForgotPasswordReq & { origin: string }>({
    queryKeys: ["password-reset"],
    mutationFn: async (payload) => {
      return await makeAxios({
        method: "POST",
        endpoint: "/password/reset",
        body: payload,
      });
    },
  });
};
