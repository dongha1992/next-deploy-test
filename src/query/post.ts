import { POST_QUERY_KEY } from "@/pages";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// const queryClient = useQueryClient();
// const defaultMutationOptions = {
//   onError: (err, variables, recover) =>
//     typeof recover === "function" ? recover() : null,
//   onSettled: () = queryClient.invalidateQueries("list-items")
// };

function useUpdateLike(options = {}) {
  const queryClient = useQueryClient();
  return useMutation(
    async (id: number) => await axios.post(`api/posts/${id}/like`),
    {
      onSuccess: () => {
        // cache가 필요하면 실행
        // return queryClient.invalidateQueries([POST_QUERY_KEY]);
      },
      ...options,
    }
  );
}

function useDeleteLike(options = {}) {
  const queryClient = useQueryClient();
  return useMutation(
    async (id: number) => await axios.delete(`api/posts/${id}/like`),
    {
      onSuccess: () => {
        // cache가 필요하면 실행
        // return queryClient.invalidateQueries([POST_QUERY_KEY]);
      },
      ...options,
    }
  );
}

export { useUpdateLike, useDeleteLike };
