import {
  ReactElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Head from "next/head";
import router, { useRouter } from "next/router";

import Overlay from "@/components/Common/Overlay";
import Lottie from "@/components/Common/Lottie";
import NewBookPostForm from "@/components/Book/NewBookPostForm";
import { BOOK_QUERY_KEY, useBookCreate } from "@/query/book";

import { useAsync } from "@/hooks/useAsync";
import SearchBookList from "@/components/Book/SearchBookList";
import { NaverBook, NaverBooks } from "@/utils/api/type";
import { SearchActiveIcon } from "@/utils/svg";
import Input from "@/components/Common/Input";
import Button from "@/components/Common/Button";
import BookInfo from "@/components/Book/BookInfo";
import { getNaverBooksApi } from "@/utils/api/naver";
import useRating from "@/hooks/useRating";
import Layout from "@/components/Layout";
import Header from "@/components/Common/Header";

// BookForm page와 중복임

export default function AddBookPage() {
  const { data, run, isLoading, setReset, isSuccess } = useAsync<
    NaverBooks,
    Error
  >();

  const {
    mutate: mutateAddBookPost,
    isLoading: isPostLoading,
    isSuccess: isPostSuccess,
  } = useBookCreate({
    queryKey: [BOOK_QUERY_KEY],
  });

  const [selectedBook, setSelectedBook] = useState<NaverBook | null>(null);
  const [start, setStart] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [images, setImages] = useState<any>([]);

  const totalBooksRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  totalBooksRef.current = data?.total;

  const { ratingGenerator, rating } = useRating({ isReadOnly: false });

  useLayoutEffect(() => {
    scrollToTop();
  }, [start]);

  useEffect(() => {
    if (start >= 1 && query) {
      run(getNaverBooksApi(query, start));
    }
  }, [query, start, run]);

  function scrollToTop() {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }

  const onSearchBookHandler = (e: any) => {
    e.preventDefault();
    const { book } = e.target.elements;

    if (!book.value) {
      alert("검색어를 입력해주세요.");
      return;
    }
    setQuery(book.value);
    setStart(1);
    setSelectedBook(null);
    run(getNaverBooksApi(book.value, start));
  };

  const onPagination = (step: string) => {
    if (step === "다음") {
      if (totalBooksRef?.current - 10 <= start) return;
      setStart((prev) => prev + 10);
    } else {
      if (start === 1) return;
      setStart((prev) => prev - 10);
    }
    // setSelectedBook(null);
  };

  const onSelectedBook = (book: NaverBook) => {
    setSelectedBook(book);
  };

  const removeImageHandler = (index: number) => {
    setImages((prev: any) =>
      prev.filter((_: string, idx: number) => idx !== index)
    );
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { text } = e.target.elements;
    if (!text.value) {
      alert("내용을 입력해주세요.");
      return;
    }

    let book;

    if (selectedBook) {
      const { title, ...rest } = selectedBook;
      book = rest;
    }

    // TODO: 이미지 최적화 하려면 여기서 key를 통일해줘야 함

    const data = {
      book,
      rating,
      body: text.value,
      title: selectedBook?.title ?? "",
      userImages: images,
    };
    mutateAddBookPost(data);
    text.value = "";
  };

  return (
    <>
      <Head>
        <title>{selectedBook?.author ?? ""}</title>
      </Head>
      {isPostLoading && (
        <Overlay>
          <Lottie
            src="https://assets8.lottiefiles.com/private_files/lf30_gqirhcr7.json"
            loop={false}
          />
        </Overlay>
      )}
      <div className="w-full pb-10 lg:pt-12 lg:pb-14 max-w-10xl mx-auto px-4 my-4">
        <h1 className="text-xl font-bold tracking-tight text-gray-100 sm:text-2xl md:text-3xl mb-6">
          어떤 책을 읽으셨나요?
        </h1>
        <div className="mt-6">
          {selectedBook ? (
            <div className="relative">
              <BookInfo item={selectedBook} />
              <button
                className="absolute right-0 top-0 text-lg"
                onClick={() => setSelectedBook(null)}
              >
                X
              </button>
            </div>
          ) : (
            <>
              <form onSubmit={onSearchBookHandler} action="#" method="POST">
                <Input
                  className="mb-6"
                  left={<SearchActiveIcon />}
                  name="book"
                  placeholder="책 제목을 알려주세요."
                  button={<Button className="w-16 p-2 m-0">검색</Button>}
                />
              </form>
              <SearchBookList
                ref={containerRef}
                bookList={data?.items}
                selectedBook={selectedBook}
                onSelectedBook={onSelectedBook}
                onPagination={onPagination}
              />
            </>
          )}
          {isSuccess && data?.items.length == 0 && (
            <div>결과가 없습니다! 다시 검색 해주세요.</div>
          )}
          <div className="flex justify-end w-full my-2">
            {ratingGenerator({ width: 24, height: 24 })}
          </div>
          <NewBookPostForm
            className="max-w-5xl mt-4"
            onSubmit={handleSubmit}
            setImages={setImages}
            removeImageHandler={removeImageHandler}
            images={images}
          />
        </div>
      </div>
    </>
  );
}

AddBookPage.getLayout = (page: ReactElement) => {
  return <Layout top={<Header />}>{page}</Layout>;
};
