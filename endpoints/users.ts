import { useQueryHandler } from "@/components/hooks";
import { User } from "@/types/users";
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
