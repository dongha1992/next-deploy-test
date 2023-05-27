import Head from "next/head";

import { useRouter } from "next/router";
import NewPostForm from "@/components/Post/NewPostForm";
import { POST_QUERY_KEY, usePost } from "@/query/post";
import Overlay from "@/components/Common/Overlay";
import Lottie from "@/components/Common/Lottie";

export default function AddPostPage() {
  const router = useRouter();
  const { mutate, isLoading } = usePost({ queryKey: [POST_QUERY_KEY] });

  if (isLoading)
    return (
      <Overlay>
        <Lottie
          className="w-20 h-20"
          src="https://assets2.lottiefiles.com/packages/lf20_userh0rw.json"
          loop={false}
        />
      </Overlay>
    );

  return (
    <>
      <Head>
        <title>코드 작성 테스트</title>
      </Head>
      <div className="w-full pt-8 pb-10 lg:pt-12 lg:pb-14 max-w-10xl mx-auto px-6 my-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-100 sm:text-3xl md:text-4xl mb-6">
          코드 만들기
        </h1>

        <div className="mt-6">
          <NewPostForm className="max-w-5xl" onSubmit={mutate} />
        </div>
      </div>
    </>
  );
}
