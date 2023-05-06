import Head from "next/head";
import { useRouter } from "next/router";

import Overlay from "@/components/Common/Overlay";
import Lottie from "@/components/Common/Lottie";
import NewBookPostForm from "@/components/Book/NewBookPostForm";
import { BOOK_QUERY_KEY, usePost } from "@/query/book";

export default function AddBookPage() {
  const router = useRouter();
  const { mutate, isLoading } = usePost({ queryKey: [BOOK_QUERY_KEY] });

  if (isLoading)
    return (
      <Overlay>
        <Lottie className="w-20 h-20" src="/lottie/loading.json" loop={false} />
      </Overlay>
    );

  return (
    <>
      <Head>
        <title>책에 대해서</title>
      </Head>
      <div className="w-full pt-8 pb-10 lg:pt-12 lg:pb-14 max-w-10xl mx-auto px-6 my-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-100 sm:text-3xl md:text-4xl mb-6">
          어떤 책을 읽으셨나요?
        </h1>

        <div className="mt-6">
          <NewBookPostForm className="max-w-5xl" onSubmit={mutate} />
        </div>
      </div>
    </>
  );
}
