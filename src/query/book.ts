// TODO: post query랑 중복 제거

import {
  setLikes,
  useBaseInfiniteScroll,
  useSyncMutation,
} from "@/hooks/query";
import {
  deleteBookApi,
  deleteBookCommentApi,
  deleteLikeApi,
  editBookApi,
  getBookDetailApi,
  getBooksApi,
  getBooksRecentApi,
  postBookApi,
  postBookCommentApi,
  postLikeApi,
} from "@/utils/api/book";
import { NaverBook } from "@/utils/api/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import router from "next/router";
import { useCallback } from "react";

export const BOOK_DETAIL_QUERY_KEY = "getBookDetail";
export const BOOK_QUERY_KEY = "getBooks";
export const BOOK_RECENT_KEY = "getRecentBooks";

interface Props {
  options?: any;
  queryKey: any[];
}

interface QueryProps {
  options?: any;
  query: string;
}

function useSearchPost({ query, options }: QueryProps) {
  return useQuery(getSearchPostConfig(query, options));
}

const getSearchPostConfig = (query: string, options = {}) => ({
  queryKey: [BOOK_QUERY_KEY, query],
  queryFn: () => getBooksApi({ query }),
  config: {
    onSucess: (books: any) => {
      // 개별 아이템 캐시 해야함
      // for (const book of books) {
      //   queryCache.setQueryData(
      //     [BOOK_DETAIL_QUERY_KEY, {id: book.id}],
      //     book,
      //   )
      // }
    },
    ...options,
  },
});

export interface InfiniteParams {
  size?: number;
  page?: number;
  query?: string;
}

const useGetInfiniteBooks = ({ page, size, query }: InfiniteParams) => {
  const fetchDatas = async ({ pageParam = 1 }) => {
    const { pagination, data } = await getBooksApi({
      page: pageParam,
      size,
      query,
    });

    return {
      result: data,
      nextPage: pageParam + 1,
      totalPage: pagination.totalPage,
    };
  };
  return useBaseInfiniteScroll(["infiniteBooks"], fetchDatas);
};

const useGetRecentBooks = ({ options }: any = {}) => {
  return useQuery([BOOK_RECENT_KEY], () => getBooksRecentApi(), {
    ...options,
  });
};

type Book = Omit<NaverBook, "title">;
export interface CreateBookData {
  title: string;
  body: string;
  book?: Book;
  image?: string;
  rating: number;
}

function useGetBookDetail(id: number) {
  return useQuery([BOOK_DETAIL_QUERY_KEY, id], () => getBookDetailApi(id), {
    onError: () => {
      router.push("/");
    },
    enabled: !!id,
  });
}
function useBookCreate({ options = {}, queryKey }: Props) {
  const queryClient = useQueryClient();
  return useMutation(({ ...data }: CreateBookData) => postBookApi(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
      router.replace("/book");
    },
    onError: async (error: any) => {
      console.error(error);
      alert("에러가 발생했습니다. 다시 시도해주세요.");
    },
    ...options,
  });
}

function useUpdateLike({ options = {}, queryKey }: Props) {
  const queryClient = useQueryClient();

  return useSyncMutation((id: number) => postLikeApi(id), {
    onSuccess: () => {
      // queryClient.invalidateQueries(queryKey);
      const { id, totalLikes, isLiked } = options;
      queryClient.setQueryData([BOOK_DETAIL_QUERY_KEY, id], (prev: any) => {
        if (prev) {
          return setLikes({
            prev,
            totalLikes,
            isLiked,
          });
        }
      });
    },
    onError: (error: any) => {
      console.error(error);
    },
    ...options,
  });
}

function useDeleteLike({ options = {}, queryKey }: Props) {
  const queryClient = useQueryClient();
  return useSyncMutation((id: number) => deleteLikeApi(id), {
    onSuccess: () => {
      // queryClient.invalidateQueries(queryKey);
      const { id, totalLikes, isLiked } = options;
      queryClient.setQueryData([BOOK_DETAIL_QUERY_KEY, id], (prev: any) => {
        if (prev) {
          return setLikes({
            prev,
            totalLikes,
            isLiked,
          });
        }
      });
    },
    onError: (error: any) => {
      console.error(error);
    },
    ...options,
  });
}

function usePostComment({ options = {}, queryKey }: Props) {
  const queryClient = useQueryClient();
  return useMutation(
    ({ data, id }: { data: string; id: number }) =>
      postBookCommentApi({ id, data }),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries(queryKey);
      },
      onError: async (error: any) => {
        console.error(error);
      },
      ...options,
    }
  );
}

function useDeletePost({ options = {}, queryKey }: Props) {
  const queryClient = useQueryClient();
  return useMutation((id: number) => deleteBookApi(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
    onError: (error: any) => {
      console.error(error);
      alert("해당 포스트의 작성자가 아닙니다.");
    },
    ...options,
  });
}

function useDeleteComment({ options = {}, queryKey }: Props) {
  const queryClient = useQueryClient();
  return useMutation(
    ({ commentId }: { commentId: number }) => deleteBookCommentApi(commentId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKey);
      },
      onError: (error: any) => {
        console.error(error);
        alert("해당 포스트의 작성자가 아닙니다.");
      },
      ...options,
    }
  );
}

function useEditPost({ options = {}, queryKey }: Props) {
  const queryClient = useQueryClient();
  return useMutation(
    ({
      data,
      id,
    }: {
      data: { body: string; userImages: string[]; rating: number };
      id: number;
    }) => {
      return editBookApi(id, data);
    },

    {
      onSuccess: (id: number) => {
        queryClient.invalidateQueries(queryKey);
        router.replace("/book");
      },
      onError: (error: any) => {
        console.error(error);
      },
      ...options,
    }
  );
}

function useRefetchPostSearchQuery() {
  const queryClient = useQueryClient();
  return useCallback(
    async function refetchPostSearchQuery() {
      queryClient.removeQueries([BOOK_QUERY_KEY]);
      await queryClient.prefetchQuery(getSearchPostConfig(""));
    },
    [queryClient]
  );
}

export {
  useSearchPost,
  useGetRecentBooks,
  useUpdateLike,
  useDeleteLike,
  usePostComment,
  useBookCreate,
  useDeletePost,
  useDeleteComment,
  useEditPost,
  useRefetchPostSearchQuery,
  useGetBookDetail,
  useGetInfiniteBooks,
};
