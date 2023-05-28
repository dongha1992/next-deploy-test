import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth";
import { QueryClient, dehydrate } from "@tanstack/react-query";

import { options } from "./api/auth/[...nextauth]";
import Button from "@/components/Common/Button";
import PostSmall from "@/components/Post/PostSmall";
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
import Input from "@/components/Common/Input";

import Layout from "@/components/Layout";
import Navigation from "@/components/Common/Navigation";
import { SearchActiveIcon } from "@/utils/svg";
import { useSession } from "next-auth/react";
import { popupState } from "@/store/common";
import { useRecoilState } from "recoil";

export default function Home() {
  const [keyword, setKeyword] = useState<string>("");

  const { status } = useSession();
  const [popup, setPopup] = useRecoilState(popupState);

  const isUnauthenticated = status === "unauthenticated";
  const router = useRouter();

  useFormatUserAgent();

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

    setKeyword(keyword);
  }

  useEffect(() => {
    return () => {
      refetchPostSearchQuery();
    };
  }, [refetchPostSearchQuery]);

  useEffect(() => {
    setPopup({
      message: (
        <>
          <p>테스트 페이지입니다</p>
          <p className="text-sm">
            이 페이지에 뭘 해야 할까요,,, 아이디어 주세요,,,
          </p>
        </>
      ),
      isOpen: true,
    });
  }, [setPopup]);

  return (
    <>
      <div className="w-full pt-8 pb-12 mx-auto max-w-7xl px-4 bg-black relative">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={onSubmitSearch}>
            <Input
              left={<SearchActiveIcon />}
              name="search"
              button={
                <Button type="submit" className="w-16 p-2 m-0">
                  검색
                </Button>
              }
            />
          </form>
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
            <div className="mt-8">
              {keyword}에 대한 포스트가 존재하지 않습니다!
            </div>
          )}
          <ul className="mt-8">
            {data?.map((post: any) => (
              <li key={post.id}>
                <PostSmall
                  post={post}
                  href={isUnauthenticated ? "/auth/signin" : `/post/${post.id}`}
                  user={post.user}
                  className="my-10"
                  onLike={() =>
                    isUnauthenticated
                      ? router.push("/auth/signin")
                      : onMutateLikeHandler(post.isLiked, post.id)
                  }
                  onComment={() =>
                    isUnauthenticated
                      ? router.push("/auth/signin")
                      : router.push(`post/${post.id}`)
                  }
                  onShare={() => console.log("share post", post.id)}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="fixed bottom-20 left-50 z-50">
          <Button
            className="w-15 h-15 rounded-full text-lg hover:drop-shadow-2xl hover:animate-bounce duration-300"
            type="submit"
            onClick={() =>
              router.push(isUnauthenticated ? "/auth/signin" : "/addPost")
            }
          >
            +
          </Button>
        </div>
      </div>
    </>
  );
}

Home.getLayout = (page: ReactElement) => {
  return <Layout bottom={<Navigation />}>{page}</Layout>;
};

async function getPost() {
  const posts = await apiClient.get("api/posts").then(({ data }) => data);
  return posts;
}

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, options);

  const userAgent = context.req
    ? context.req.headers["user-agent"] || ""
    : navigator.userAgent;

  // if (!session) {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: "/auth/signin",
  //     },
  //     props: {},
  //   };
  // }

  // const posts = await axios
  //   .get(`${process.env.NEXTAUTH_URL}/api/posts`)
  //   .then(({ data }) => data);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([POST_QUERY_KEY], getPost);

  return {
    props: { dehydratedProps: dehydrate(queryClient) },
  };
}
