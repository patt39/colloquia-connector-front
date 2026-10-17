import type { TInfiniteQueryResult } from "@/types/pagination";
import {
  MutationOptions,
  QueryFunction,
  QueryKey,
  QueryObserverOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useReactIntersectionObserver } from "./use-react-intersection-observer";

/**
 * @description Use infinite query handlers
 * @param queryKey - Query key
 * @param initialPageParam - Initial page param
 * @param queryFn - Query function
 * @returns {data: T[], ...rest} - Data and rest of the query result
 */
export function useInfiniteQueryHandlers<T>({
  queryFn,
  queryKey,
  initialPageParam = 1,
}: {
  queryKey: QueryKey;
  initialPageParam?: number;
  queryFn: QueryFunction;
}) {
  const { data, ...rest } = useInfiniteQuery({
    queryKey,
    initialPageParam,
    getNextPageParam: (lastPage: TInfiniteQueryResult<T>) =>
      lastPage.data.next_page ?? undefined,
    getPreviousPageParam: (firstPage: TInfiniteQueryResult<T>) =>
      firstPage.data.previous_page ?? undefined,
    queryFn: queryFn as QueryFunction<
      TInfiniteQueryResult<T>,
      QueryKey,
      number
    >,
  });

  const preValue = data?.pages[0]?.data;
  const lastPage = data?.pages[data.pages.length - 1]?.data;
  // Hook d'intersection sécurisé avec !isFetching
  const { ref } = useReactIntersectionObserver({
    hasNextPage: rest.hasNextPage,
    fetchNextPage: rest.fetchNextPage,
    isFetching: rest.isFetching,
  });

  return {
    ...rest,
    ref,
    data: {
      totalValue: preValue?.total,
      nextPage: preValue?.next_page,
      totalPage: preValue?.total_page,
      valueCount: preValue?.total_value,
      value: (data?.pages.flatMap((page: any) => page?.data?.value ?? []) ??
        []) as T[],
    },
  };
}
/**
 * @description Use query handlers
 * @param queryKey - Query key
 * @param queryFn - Query function
 * @param options - Query options
 * @returns {data: T, ...rest} - Data and rest of the query result
 */

export function useQueryHandler<T>({
  queryFn,
  queryKey,
  ...options
}: {
  queryKey: QueryKey;
  queryFn: QueryFunction;
} & QueryObserverOptions) {
  const { data, ...rest } = useQuery({
    queryKey,
    queryFn,
    ...options,
  });

  return {
    ...rest,
    data: (data as AxiosResponse<T>)?.data as T,
  };
}

/**
 * @description Use mutation handlers
 * @param queryKeys - Query keys
 * @param onSuccess - On success callback
 * @param onError - On error callback
 * @returns {handleError, handleSettled, handleSuccess} - Error, settled, and success handlers
 */
function invalidateQueries({
  queryKeys,
  onSuccess,
  onError,
}: {
  queryKeys: QueryKey;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}) {
  const queryClient = useQueryClient();

  const handleError = async (error: any) => {
    if (onError) {
      onError(error);
    }
  };

  const handleSettled = async () => {
    // Invalidate all queries matching the prefixes
    await Promise.all(
      queryKeys.map((key) =>
        queryClient.invalidateQueries({
          queryKey: Array.isArray(key) ? key : [key],
          refetchType: "active",
        }),
      ),
    );
  };

  const handleSuccess = async () => {
    if (onSuccess) {
      onSuccess();
    }
  };

  return {
    handleError,
    handleSettled,
    handleSuccess,
  };
}

/**
 * @description Use mutation handlers
 * @param queryKeys - Query keys
 * @param onSuccess - On success callback
 * @param onError - On error callback
 * @returns {handleError, handleSettled, handleSuccess} - Error, settled, and success handlers
 */

type MutationHandlerOptions<TVariables> = {
  queryKeys: QueryKey;
  mutationFn: (variables: TVariables) => Promise<any>;
  onSuccess?: () => void;
  onError?: (error: any) => void;
};

/**
 * @description Generic reusable mutation hook
 * @param queryKeys - Query keys to invalidate on settled
 * @param axiosConfig - Function receiving variables and returning a makeAxios config
 * @param mutationFn - Custom async mutation function (use for complex logic)
 * @param onSuccess - On success callback
 * @param onError - On error callback
 * @returns useMutation result
 *
 * @example
 * // With mutationFn (for conditional logic)
 * const { mutate } = useMutationHandler<ExpenseReq & { expenseId?: string }>({
 *   queryKeys: ['expenses', 'expense'],
 *   mutationFn: async ({ expenseId, ...payload }) =>
 *     expenseId
 *       ? makeAxios({ method: 'PUT', endpoint: '/expenses/:expenseId', body: payload, urlParams: { expenseId } })
 *       : makeAxios({ method: 'POST', endpoint: '/expenses', body: payload }),
 * });
 */
export function useMutationHandler<TVariables = void>({
  mutationFn,
  onSuccess,
  onError,
  queryKeys,
  ...options
}: MutationHandlerOptions<TVariables> &
  Omit<MutationOptions<any, any, TVariables>, "mutationFn">) {
  const { handleError, handleSettled, handleSuccess } = invalidateQueries({
    queryKeys,
    onSuccess,
    onError,
  });

  return useMutation<AxiosResponse, any, TVariables>({
    ...options,
    mutationFn,
    mutationKey: queryKeys,
    onError: handleError,
    onSettled: handleSettled,
    onSuccess: handleSuccess,
  });
}
