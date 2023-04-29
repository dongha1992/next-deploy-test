import { apiClient } from "@/utils/api/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const POST_DETAIL_QUERY_KEY = "getPostDetail";
export const POST_QUERY_KEY = "getPost";

// const defaultMutationOptions = {
//   onError: (err, variables, recover) =>
//     typeof recover === "function" ? recover() : null,
//   onSettled: () = queryClient.invalidateQueries("list-items")
// };

interface Props {
  options?: any;
  queryKey: any[];
}

function useUpdateLike({ options = {}, queryKey }: Props) {
  const queryClient = useQueryClient();
  return useMutation((id: number) => apiClient.post(`api/posts/${id}/like`), {
    onSuccess: async () => {
      queryClient.invalidateQueries(queryKey);
    },
    onError: async (error: any) => {
      console.error(error);
    },
    ...options,
  });
}

function useDeleteLike({ options = {}, queryKey }: Props) {
  const queryClient = useQueryClient();
  return useMutation((id: number) => apiClient.delete(`api/posts/${id}/like`), {
    onSuccess: async () => {
      queryClient.invalidateQueries(queryKey);
    },
    onError: async (error: any) => {
      console.error(error);
    },
    ...options,
  });
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

export { useUpdateLike, useDeleteLike, usePostComment };
