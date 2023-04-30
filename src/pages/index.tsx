import router, { useRouter } from "next/router";
import { getServerSession } from "next-auth";
import {
  QueryClient,
  dehydrate,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { options } from "./api/auth/[...nextauth]";
import Button from "@/components/Button";
import PostSmall from "@/components/PostSmall";
import axios from "axios";
import useFormatUserAgent from "@/hooks/useFormatUserAgent";
import { POST_QUERY_KEY, useDeleteLike, useUpdateLike } from "@/query/post";
import { apiClient } from "@/utils/api/apiClient";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();

  useFormatUserAgent();

  const { data } = useQuery([POST_QUERY_KEY], getPost);

  const { mutate: postLikeMutation } = useUpdateLike({
    queryKey: [POST_QUERY_KEY],
  });

  const { mutate: deleteLikeMutation } = useDeleteLike({
    queryKey: [POST_QUERY_KEY],
  });

  function onMutateLikeHandler(isLiked: boolean, id: number) {
    console.log(isLiked, "IS LIKED");
    isLiked ? deleteLikeMutation(id) : postLikeMutation(id);
  }

  return (
    <>
      <div className="w-full pt-8 pb-10 mx-auto max-w-7xl px-4">
        <div className="max-w-2xl mx-auto">
          <Button type="submit" onClick={() => router.push("/addPost")}>
            글쓰기
          </Button>

          <ul className="mt-8">
            {data?.map((post: any) => (
              <li key={post.id}>
                <PostSmall
                  post={post}
                  href={`/post/${post.id}`}
                  user={post.user}
                  className="my-10"
                  onLike={() => onMutateLikeHandler(post.isLiked, post.id)}
                  onComment={() => router.push(`post/${post.id}`)}
                  onShare={() => console.log("share post", post.id)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

async function getPost() {
  const posts = await apiClient.get("api/posts").then(({ data }) => data);
  return posts;
}

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, options);

  const userAgent = context.req
    ? context.req.headers["user-agent"] || ""
    : navigator.userAgent;

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/signin",
      },
      props: {},
    };
  }
  // const posts = await axios
  //   .get(`${process.env.NEXTAUTH_URL}/api/posts`)
  //   .then(({ data }) => data);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([POST_QUERY_KEY], getPost);

  return {
    props: { dehydratedProps: dehydrate(queryClient) },
  };
}

// /** unmount가 된 컴포넌트에서 상태 업데이트를 하려고 할 때 메모리 릭 에러 나오는데 그거 방지용
//  *  주로 fetch 후 state 업데이트 하는 컴포넌트에서 state 업데이트 전 router로 컴포넌트 변경할 때 발생
//  *  사용법 :
//  *  const safeSetState = useSafeDispatch(unSafeSetState)
//  *  safeSetState(...)
//  */

// function useSafeDispatch(dispatch: Dispatch<any>): Dispatch<any> {
//   const mountedRef = useRef<boolean>(false);

//   useLayoutEffect((): void | any => {
//     mountedRef.current = true;
//     return () => (mountedRef.current = false);
//   }, []);

//   return useCallback(
//     (action) => {
//       return mountedRef.current ? dispatch({ ...action }) : 0;
//     },
//     [dispatch]
//   );
// }
