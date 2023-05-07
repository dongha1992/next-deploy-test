import Head from "next/head";
import { useRouter } from "next/router";

import Overlay from "@/components/Common/Overlay";
import Lottie from "@/components/Common/Lottie";
import NewBookPostForm from "@/components/Book/NewBookPostForm";
import { BOOK_QUERY_KEY, usePost } from "@/query/book";
import { getNaverBooksApi } from "@/utils/api/naverBook";
import { useAsync } from "@/hooks/useAsync";
import SearchBookList from "@/components/Book/SearchBookList";
import { NaverBooks } from "@/utils/api/type";
import { SearchActiveIcon } from "@/utils/svg";
import Input from "@/components/Common/Input";
import Button from "@/components/Common/Button";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function AddBookPage() {
  const router = useRouter();
  const { data, run, isLoading } = useAsync<NaverBooks, Error>();
  const { mutate, isLoading: isPostLoading } = usePost({
    queryKey: [BOOK_QUERY_KEY],
  });

  const [selected, setSelected] = useState<string | null>(null);
  const [start, setStart] = useState<number>(1);
  const [query, setQuery] = useState<string>("");

  const totalBooksRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  totalBooksRef.current = data?.total;

  useLayoutEffect(() => {
    scrollToTop();
  });

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
    run(getNaverBooksApi(book.value, start));
  };

  const onPagination = (step: string) => {
    if (totalBooksRef?.current - 10 < start) return;
    if (step === "다음") {
      setStart((prev) => prev + 10);
    } else {
      if (start === 1) return;
      setStart((prev) => prev - 10);
    }
  };

  console.log(start);

  if (isPostLoading)
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
            selected={selected}
            setSelected={setSelected}
            onPagination={onPagination}
          />
          <NewBookPostForm
            className="max-w-5xl mt-4"
            onSubmit={mutate}
            onSearch={onSearchBookHandler}
          />
        </div>
      </div>
    </>
  );
}
