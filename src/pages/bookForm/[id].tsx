import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

import { BOOK_DETAIL_QUERY_KEY, useEditPost } from "@/query/book";
import Overlay from "@/components/Common/Overlay";
import Lottie from "@/components/Common/Lottie";
import { getBookDetailApi } from "@/utils/api/book";
import NewBookPostForm from "@/components/Book/NewBookPostForm";
import BookInfo from "@/components/Book/BookInfo";
import useRating from "@/hooks/useRating";

export default function PostForm() {
  const [images, setImages] = useState<any>([]);
  const router = useRouter();

  const { id } = router.query;

  const { data: book, isLoading } = useQuery(
    [BOOK_DETAIL_QUERY_KEY, id],
    () => getBookDetailApi(Number(id)),
    {
      onSuccess: (data) => {},
      enabled: !!id,
    }
  );

  const { ratingGenerator, rating } = useRating({
    userRating: book?.rating,
    isReadOnly: false,
  });

  const { mutate: patchPostMutation, isLoading: postLoading } = useEditPost({
    queryKey: [BOOK_DETAIL_QUERY_KEY, id],
  });

  const removeImageHandler = (index: number) => {
    setImages((prev: any) =>
      prev.filter((_: string, idx: number) => idx !== index)
    );
  };

  const onEditHandler = (e: any) => {
    e.preventDefault();
    const { text } = e.target.elements;
    if (!text.value) {
      alert("내용을 입력해주세요.");
      return;
    }

    // userImages: images,

    patchPostMutation({
      data: { body: text.value, userImages: images, rating },
      id: Number(id),
    });
  };

  useEffect(() => {
    //FIXME: 이게 맞나.?
    setImages(book?.userImages);
  }, [setImages, book]);

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
          <div className="flex justify-end w-full">{ratingGenerator}</div>
          <NewBookPostForm
            className="max-w-5xl mt-4"
            onSubmit={onEditHandler}
            value={book.body}
            setImages={setImages}
            removeImageHandler={removeImageHandler}
            images={images}
          />
        </div>
      </div>
    </>
  );
}
