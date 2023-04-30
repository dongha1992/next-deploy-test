import Head from "next/head";

import { useRouter } from "next/router";
import NewPostForm from "@/components/NewPostForm";
import { POST_DETAIL_QUERY_KEY, useEditPost } from "@/query/post";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/utils/api/apiClient";
import Overlay from "@/components/Common/Overlay";
import Lottie from "@/components/Common/Lottie";
import PostSkeleton from "@/components/Layout/PostSkeleton";

export default function PostForm() {
  const router = useRouter();
  const { id } = router.query;

  const { data: post, isLoading } = useQuery(
    [POST_DETAIL_QUERY_KEY, id],
    () => apiClient.get(`api/posts/${id}`).then(({ data }) => data),
    {
      enabled: !!id,
    }
  );

  const { mutate: patchPostMutation, isLoading: postLoading } = useEditPost({
    queryKey: [POST_DETAIL_QUERY_KEY, id],
  });

  const onEditHandler = (data: any) => {
    patchPostMutation({ data, id: Number(id) });
  };

  if (postLoading)
    return (
      <Overlay>
        <Lottie className="w-20 h-20" src="/lottie/loading.json" loop={false} />
      </Overlay>
    );

  return (
    <>
      <Head>
        <title>코드 작성 테스트</title>
      </Head>
      <div className="w-full pt-8 pb-10 lg:pt-12 lg:pb-14 max-w-10xl mx-auto px-6 my-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-100 sm:text-3xl md:text-4xl mb-6">
          코드 편집하기
        </h1>
        <div className="mt-6">
          <NewPostForm
            className="max-w-5xl"
            onSubmit={onEditHandler}
            defaultCode={post?.code}
            defaultLanguage={post?.language}
          />
        </div>
      </div>
    </>
  );
}
