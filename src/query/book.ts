// TODO: post query랑 중복 제거

import { useSyncMutation } from "@/hooks/query";
import { apiClient } from "@/utils/api/apiClient";
import { getBooksApi, postBookApi } from "@/utils/api/book";
import { NaverBook } from "@/utils/api/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import router from "next/router";
import { useCallback } from "react";

export const BOOK_DETAIL_QUERY_KEY = "getBookDetaill";
export const BOOK_QUERY_KEY = "getBooks";

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
  queryFn: () => getBooksApi(query),
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

type Book = Omit<NaverBook, "title">;
export interface CreateBookData {
  title: string;
  body: string;
  book?: Book;
  image?: string;
}

function useBookCreate({ options = {}, queryKey }: Props) {
  const queryClient = useQueryClient();
  return useMutation(({ ...data }: CreateBookData) => postBookApi(data), {
    onSuccess: async () => {
      queryClient.invalidateQueries(queryKey);
      router.replace("/book");
    },
    onError: async (error: any) => {
      console.error(error);
    },
    ...options,
  });
}

function useUpdateLike({ options = {}, queryKey }: Props) {
  const queryClient = useQueryClient();

  return useSyncMutation(
    (id: number) => apiClient.post(`api/posts/${id}/like`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKey);
      },
      onError: (error: any) => {
        console.error(error);
      },
      ...options,
    }
  );
}

function useDeleteLike({ options = {}, queryKey }: Props) {
  const queryClient = useQueryClient();
  return useSyncMutation(
    (id: number) => apiClient.delete(`api/posts/${id}/like`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKey);
      },
      onError: (error: any) => {
        console.error(error);
      },
      ...options,
    }
  );
}

function usePostComment({ options = {}, queryKey }: Props) {
  const queryClient = useQueryClient();
  return useMutation(
    ({ data, id }: { data: any; id: number }) =>
      apiClient.post(`api/posts/${id}/comment`, { data }),
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
  return useMutation((id: number) => apiClient.delete(`api/posts/${id}`), {
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
    (id: number) => apiClient.delete(`api/posts/${id}/comment`),
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
    ({ data, id }: { data: any; id: number }) => {
      return apiClient.patch(`api/posts/${id}`, { data });
    },

    {
      onSuccess: (id: number) => {
        queryClient.invalidateQueries(queryKey);
        router.replace("/");
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
  useUpdateLike,
  useDeleteLike,
  usePostComment,
  useBookCreate,
  useDeletePost,
  useDeleteComment,
  useEditPost,
  useRefetchPostSearchQuery,
};
