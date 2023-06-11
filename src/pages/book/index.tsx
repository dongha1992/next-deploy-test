import Layout from "@/components/Layout";
import Navigation from "@/components/Common/Navigation";
import { ReactElement, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth";
import { QueryClient, dehydrate } from "@tanstack/react-query";

import Button from "@/components/Common/Button";
import useFormatUserAgent from "@/hooks/useFormatUserAgent";
import {
  BOOK_QUERY_KEY,
  useDeleteLike,
  useGetInfiniteBooks,
  useRefetchPostSearchQuery,
  useSearchPost,
  useUpdateLike,
} from "@/query/book";
import Lottie from "@/components/Common/Lottie";
import Overlay from "@/components/Common/Overlay";
import Input from "@/components/Common/Input";
import { options } from "../api/auth/[...nextauth]";
import BookPost from "@/components/Book/BookPost";
import { getBooksApi } from "@/utils/api/book";
import { useSession } from "next-auth/react";
import useCheckAuth from "@/hooks/useCheckAuth";
import { SearchActiveIcon } from "@/utils/svg";
import Border from "@/components/Common/Border";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

function BookPage() {
  const [keyword, setKeyword] = useState<string>("");
  const [isSearched, setIsSearched] = useState<boolean>(false);

  const childRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const { status } = useSession();

  const isUnauthenticated = status === "unauthenticated";
  const router = useRouter();

  const { checkAuthHandler } = useCheckAuth();

  useFormatUserAgent();

  // const {
  //   data,
  //   isLoading: isBooksLoading,
  //   isSuccess,
  // } = useSearchPost({
  //   query: keyword,
  // });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isSuccess,
    isLoading: isBooksLoading,
  } = useGetInfiniteBooks({ size: 5, page: 1, query: keyword });

  const refetchPostSearchQuery = useRefetchPostSearchQuery();

  // const { mutate: postLikeMutation, isLoading: isLikeLoading } = useUpdateLike({
  //   queryKey: [BOOK_QUERY_KEY],
  // });

  // const { mutate: deleteLikeMutation, isLoading: isDeleteLikeLoading } =
  //   useDeleteLike({
  //     queryKey: [BOOK_QUERY_KEY],
  //   });

  // const onMutateLikeHandler = (isLiked: boolean, id: number) => {
  //   isLiked ? deleteLikeMutation(id) : postLikeMutation(id);
  // };

  const { page } = useIntersectionObserver({
    fetchNextPage,
    totalPage: data?.pages[0]?.totalPage!,
    currentPage: data?.pages.length!,
    childRef,
    parentRef,
    isFetching,
  });

  const onSubmitSearch = (e: any) => {
    e.preventDefault();
    const { search } = e.target.elements;
    const keyword = search.value;

    setIsSearched(true);
    setKeyword(keyword);
    search.value = "";
  };

  useEffect(() => {
    return () => {
      refetchPostSearchQuery();
    };
  }, [refetchPostSearchQuery]);

  const hasNotData = data?.pages[0]?.result?.length === 0;

  return (
    <>
      <div
        className="w-full pt-8 pb-14 mx-auto max-w-7xl px-4 bg-black relative"
        ref={parentRef}
      >
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

          {isSearched && isSuccess && hasNotData && (
            <div className="mt-8">
              {keyword}에 대한 포스트가 존재하지 않습니다!
            </div>
          )}
          {!isSearched && isSuccess && hasNotData && (
            <div className="mt-8">첫 번째 글을 작성해주세요!</div>
          )}
          {!hasNotData ? (
            <ul className="mt-8 w-full">
              {data?.pages.map((page: any, index: number) => {
                return page.result.map((book: any, index: number) => {
                  return (
                    <li key={book.id} className="w-full">
                      <BookPost
                        key={index}
                        book={book}
                        href={`/book/${book.id}`}
                        user={book.user}
                        className="my-5"
                        onLike={
                          () => router.push(`/book/${book.id}`)
                          // () =>
                          //   checkAuthHandler(() =>
                          //     onMutateLikeHandler(book.isLiked, book.id)
                          //   )
                        }
                        onComment={() => router.push(`book/${book.id}`)}
                        onShare={() => {
                          window?.Kakao.Link.sendDefault({
                            objectType: "feed",
                            content: {
                              title: book.title,
                              description: book.body,
                              imageUrl: book.image,
                              imageWidth: 600,
                              imageHeight: 420,
                              link: {
                                webUrl: `${process.env.NEXTAUTH_URL}/book/${book.id}`,
                                mobileWebUrl: `${process.env.NEXTAUTH_URL}/book/${book.id}`,
                              },
                            },
                            buttons: [],
                          });
                        }}
                      />
                      <Border size={1} />
                    </li>
                  );
                });
              })}
            </ul>
          ) : null}
          {isFetching && (
            <Overlay>
              <Lottie
                className="w-56"
                src="https://assets8.lottiefiles.com/private_files/lf30_gqirhcr7.json"
                loop={true}
                style={{
                  position: "absolute",
                  bottom: 0,
                }}
              />
            </Overlay>
          )}
          <div className="addButton">
            <div className="absolute right-12 bottom-5">
              <Button
                className="w-15 h-15 rounded-full text-lg hover:drop-shadow-2xl hover:animate-bounce duration-300"
                type="submit"
                onClick={() =>
                  router.push(isUnauthenticated ? "/auth/signin" : "/addBook")
                }
              >
                +
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div ref={childRef} />
    </>
  );
}

BookPage.getLayout = (page: ReactElement) => {
  return <Layout bottom={<Navigation />}>{page}</Layout>;
};

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

  // const books = await axios
  //   .get(`${process.env.NEXTAUTH_URL}/api/books`)
  //   .then(({ data }) => data);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([BOOK_QUERY_KEY], () =>
    getBooksApi({ query: "" })
  );

  return {
    props: { dehydratedProps: dehydrate(queryClient) },
  };
}

export default BookPage;
