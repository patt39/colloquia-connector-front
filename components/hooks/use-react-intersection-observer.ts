import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

type UseReactIntersectionObserverProps = {
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetching: boolean;
};

export function useReactIntersectionObserver({
  fetchNextPage,
  hasNextPage,
  isFetching,
}: UseReactIntersectionObserverProps) {
  const { ref, inView, ...rest } = useInView({ threshold: 0 });
  const fetchingRef = useRef(false);

  useEffect(() => {
    if (!isFetching) {
      fetchingRef.current = false;
    }
  }, [isFetching]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetching && !fetchingRef.current) {
      fetchingRef.current = true;
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  return { ref };
}
