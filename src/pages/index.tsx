import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth";
import { QueryClient, dehydrate } from "@tanstack/react-query";

import { options } from "./api/auth/[...nextauth]";
import Button from "@/components/Button";
import PostSmall from "@/components/PostSmall";
import useFormatUserAgent from "@/hooks/useFormatUserAgent";
import {
  POST_QUERY_KEY,
  useDeleteLike,
  useRefetchPostSearchQuery,
  useSearchPost,
  useUpdateLike,
} from "@/query/post";
import { apiClient } from "@/utils/api/apiClient";
import Lottie from "@/components/Common/Lottie";
import Overlay from "@/components/Common/Overlay";
import Input from "@/components/Input";
import useLottie from "@/hooks/useLottie";

export default function Home() {
  const [keyword, setKeyword] = useState<string>("");
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const router = useRouter();

  useFormatUserAgent();
  // const { isShow } = useLottie();

  const {
    data,
    isLoading: isPostsLoading,
    isSuccess,
  } = useSearchPost({
    query: keyword,
  });
  const refetchPostSearchQuery = useRefetchPostSearchQuery();

  const { mutate: postLikeMutation, isLoading: isLikeLoading } = useUpdateLike({
    queryKey: [POST_QUERY_KEY],
  });

  const { mutate: deleteLikeMutation, isLoading: isDeleteLikeLoading } =
    useDeleteLike({
      queryKey: [POST_QUERY_KEY],
    });

  function onMutateLikeHandler(isLiked: boolean, id: number) {
    isLiked ? deleteLikeMutation(id) : postLikeMutation(id);
  }

  function onSubmitSearch(e: any) {
    e.preventDefault();
    const { search } = e.target.elements;
    const keyword = search.value;

    setIsSearched(true);
    setKeyword(keyword);
  }

  useEffect(() => {
    return () => {
      refetchPostSearchQuery();
    };
  }, [refetchPostSearchQuery]);

  return (
    <>
      <div className="w-full pt-8 pb-10 mx-auto max-w-7xl px-4 bg-black relative">
        <div className="max-w-2xl mx-auto">
          <Input
            onSubmit={onSubmitSearch}
            name="search"
            button={<Button className="w-16 p-2 m-0">검색</Button>}
          />
          {/* {isShow && (
            <Lottie
              src="https://static.toss.im/lotties/confetti/confetti-explode.json"
              loop={false}
            />
          )} */}
          {(isLikeLoading || isDeleteLikeLoading || isPostsLoading) && (
            <Overlay>
              <Lottie
                className="w-20 h-20"
                src="/lottie/loading.json"
                loop={false}
              />
            </Overlay>
          )}
          {isSuccess && data.length === 0 && (
            <div className="mt-8">포스트가 존재하지 않습니다!</div>
          )}
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
        <div className="fixed bottom-10 left-50 z-50">
          <Button
            className="w-15 h-15 rounded-full text-lg hover:drop-shadow-2xl hover:animate-bounce duration-300"
            type="submit"
            onClick={() => router.push("/addPost")}
          >
            +
          </Button>
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
