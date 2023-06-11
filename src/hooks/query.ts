import {
  QueryFunction,
  QueryKey,
  useInfiniteQuery,
  useMutation,
} from "@tanstack/react-query";

//TODO: LIST 일 때 커버못함
interface Props {
  prev: any;
  id?: number;
  totalLikes: number;
  isLiked: boolean;
}
const setLikes = ({ prev, totalLikes, isLiked }: Props) => {
  let newLiked, newLikeCount;

  if (isLiked) {
    newLiked = false;
    if (totalLikes > 0) {
      newLikeCount = totalLikes - 1;
    } else {
      newLikeCount = 0;
    }
  } else {
    newLiked = true;
    newLikeCount = totalLikes + 1;
  }
  return {
    ...prev,
    isLiked: newLiked,
    totalLikes: newLikeCount,
  };
};

const useSyncMutation = (mutationFn: any, options: any) => {
  const mutationResults = useMutation(mutationFn, options);

  return {
    ...mutationResults,
    mutate: (...params: any) => {
      if (!mutationResults.isLoading) {
        mutationResults.mutate(...params);
      }
    },
  };
};

const useBaseInfiniteScroll = (
  key: QueryKey,
  fetchDatas: QueryFunction,
  enabled?: string
) => {
  return useInfiniteQuery(key, fetchDatas, {
    getNextPageParam: (lastPage: any, pages) => {
      if (lastPage.totalPage >= lastPage.nextPage) {
        return lastPage.nextPage;
      } else {
        return null;
      }
    },
    onSettled: () => {},
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: 1,
    cacheTime: 0,
    staleTime: 0,
  });
};
export { useSyncMutation, setLikes, useBaseInfiniteScroll };
