// TODO: post query랑 중복 제거

import { useSyncMutation } from "@/hooks/query";
import { apiClient } from "@/utils/api/apiClient";
import {
  deleteBookApi,
  deleteBookCommentApi,
  deleteLikeApi,
  editBookApi,
  getBooksApi,
  postBookApi,
  postBookCommentApi,
  postLikeApi,
} from "@/utils/api/book";
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

  return useSyncMutation((id: number) => postLikeApi(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
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
      queryClient.invalidateQueries(queryKey);
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
  return useMutation((id: number) => deleteBookCommentApi(id), {
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

function useEditPost({ options = {}, queryKey }: Props) {
  const queryClient = useQueryClient();
  return useMutation(
    ({ data, id }: { data: { body: string }; id: number }) => {
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
  useUpdateLike,
  useDeleteLike,
  usePostComment,
  useBookCreate,
  useDeletePost,
  useDeleteComment,
  useEditPost,
  useRefetchPostSearchQuery,
};
