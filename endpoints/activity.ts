import { useInfiniteQueryHandlers, useQueryHandler } from "@/components/hooks";
import { makeAxios } from "@/utils/end-point";
import { PaginationReq } from "@/types/pagination";

export const GetInfiniteActivitiesAPI = (
  payload: {
    search?: string;
    take: number;
  } & PaginationReq,
) => {
  return useInfiniteQueryHandlers({
    queryKey: ["activities", "infinite", { ...payload }],
    queryFn: async ({ pageParam = 1 }) =>
      await makeAxios({
        method: "GET",
        endpoint: "/activities",
        queryParams: {
          ...payload,
          page: pageParam as number,
        },
      }),
    initialPageParam: 1,
  });
};

export const GetOneActivityAPI = (payload: { orderItemId?: string }) => {
  const { orderItemId } = payload;
  return useQueryHandler({
    queryKey: ["activity", { ...payload }],
    queryFn: async () =>
      await makeAxios({
        method: "GET",
        endpoint: "/activities/view",
        queryParams: { orderItemId },
      }),
    // staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
};
