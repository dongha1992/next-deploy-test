// TODO: post query랑 중복 제거
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import router from "next/router";

import { useSyncMutation } from "@/hooks/query";
import {
  deleteNovelApi,
  deleteNovelCommentApi,
  deleteNovelLikeApi,
  editNovelApi,
  getNovelsApi,
  postNovelApi,
  postNovelCommentApi,
  postNovelLikeApi,
} from "@/utils/api/novel";
import { CreateNovelData } from "@/utils/api/type";

export const NOVEL_DETAIL_QUERY_KEY = "getNovelDetail";
export const NOVELS_QUERY_KEY = "getNovels";

interface Props {
  options?: any;
  queryKey: any[];
}

const useGetNovels = ({ options }: any = {}) => {
  return useQuery([NOVELS_QUERY_KEY], () => getNovelsApi(), {
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
  });
};

function useNovelCreate({ options = {}, queryKey }: Props) {
  const queryClient = useQueryClient();
  return useMutation(({ ...data }: CreateNovelData) => postNovelApi(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
      router.replace("/read");
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

  return useSyncMutation((id: number) => postNovelLikeApi(id), {
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
  return useSyncMutation((id: number) => deleteNovelLikeApi(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
    onError: (error: any) => {
      console.error(error);
    },
    ...options,
  });
}

function useNovelComment({ options = {}, queryKey }: Props) {
  const queryClient = useQueryClient();
  return useMutation(
    ({ data, id }: { data: string; id: number }) =>
      postNovelCommentApi({ id, data }),
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

function useDeleteNovel({ options = {}, queryKey }: Props) {
  const queryClient = useQueryClient();
  return useMutation((id: number) => deleteNovelApi(id), {
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
    ({ commentId }: { commentId: number }) => deleteNovelCommentApi(commentId),
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

function useEditNovel({ options = {}, queryKey }: Props) {
  const queryClient = useQueryClient();
  return useMutation(
    ({ data, id }: { data: CreateNovelData; id: number }) => {
      return editNovelApi(id, data);
    },

    {
      onSuccess: (id: number) => {
        queryClient.invalidateQueries(queryKey);
        router.replace("/read");
      },
      onError: (error: any) => {
        console.error(error);
      },
      ...options,
    }
  );
}

export {
  useGetNovels,
  useUpdateLike,
  useDeleteLike,
  useNovelComment,
  useNovelCreate,
  useDeleteNovel,
  useDeleteComment,
  useEditNovel,
};
