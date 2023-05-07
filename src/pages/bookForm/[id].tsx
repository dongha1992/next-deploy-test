import Head from "next/head";

import { useRouter } from "next/router";
import { BOOK_DETAIL_QUERY_KEY, useEditPost } from "@/query/book";
import { useQuery } from "@tanstack/react-query";
import Overlay from "@/components/Common/Overlay";
import Lottie from "@/components/Common/Lottie";
import { getBookDetailApi } from "@/utils/api/book";
import NewBookPostForm from "@/components/Book/NewBookPostForm";
import BookInfo from "@/components/Book/BookInfo";

export default function PostForm() {
  const router = useRouter();
  const { id } = router.query;

  const { data: book, isLoading } = useQuery(
    [BOOK_DETAIL_QUERY_KEY, id],
    () => getBookDetailApi(Number(id)),
    {
      enabled: !!id,
    }
  );

  const { mutate: patchPostMutation, isLoading: postLoading } = useEditPost({
    queryKey: [BOOK_DETAIL_QUERY_KEY, id],
  });

  const onEditHandler = (e: any) => {
    e.preventDefault();
    const { text } = e.target.elements;
    if (!text.value) {
      alert("내용을 입력해주세요.");
      return;
    }

    patchPostMutation({ data: text.value, id: Number(id) });
  };

  if (isLoading || postLoading) {
    return (
      <Overlay>
        <Lottie className="w-20 h-20" src="/lottie/loading.json" loop={false} />
      </Overlay>
    );
  }

  return (
    <>
      <Head>
        <title>책에 대하여</title>
      </Head>

      <div className="w-full pt-8 pb-10 lg:pt-12 lg:pb-14 max-w-10xl mx-auto px-6 my-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-100 sm:text-3xl md:text-4xl mb-6">
          어떤 책을 읽으셨나요?
        </h1>
        <div className="mt-6">
          <BookInfo item={book} />
          <NewBookPostForm
            className="max-w-5xl mt-4"
            onSubmit={onEditHandler}
            value={book.body}
          />
        </div>
      </div>
    </>
  );
}
