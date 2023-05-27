import Layout from "@/components/Layout";
import Navigation from "@/components/Common/Navigation";
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth";
import { QueryClient, dehydrate } from "@tanstack/react-query";

import Button from "@/components/Common/Button";
import useFormatUserAgent from "@/hooks/useFormatUserAgent";
import {
  BOOK_QUERY_KEY,
  useDeleteLike,
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

//TODO: auth 바르는 거 노가다로 한 거 실화?

function BookPage() {
  const [keyword, setKeyword] = useState<string>("");
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const { status } = useSession();

  const isUnauthenticated = status === "unauthenticated";
  const router = useRouter();

  const { checkAuthHandler } = useCheckAuth();

  useFormatUserAgent();

  const {
    data,
    isLoading: isBooksLoading,
    isSuccess,
  } = useSearchPost({
    query: keyword,
  });
  const refetchPostSearchQuery = useRefetchPostSearchQuery();

  const { mutate: postLikeMutation, isLoading: isLikeLoading } = useUpdateLike({
    queryKey: [BOOK_QUERY_KEY],
  });

  const { mutate: deleteLikeMutation, isLoading: isDeleteLikeLoading } =
    useDeleteLike({
      queryKey: [BOOK_QUERY_KEY],
    });

  function onMutateLikeHandler(isLiked: boolean, id: number) {
    isLiked ? deleteLikeMutation(id) : postLikeMutation(id);
  }

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

  return (
    <>
      <div className="w-full pt-8 pb-14 mx-auto max-w-7xl px-4 bg-black relative">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={onSubmitSearch}>
            <Input
              name="search"
              button={
                <Button type="submit" className="w-16 p-2 m-0">
                  검색
                </Button>
              }
            />
          </form>
          {(isLikeLoading || isDeleteLikeLoading || isBooksLoading) && (
            <Overlay>
              <Lottie
                className="w-20 h-20"
                src="/lottie/loading.json"
                loop={false}
              />
            </Overlay>
          )}

          {isSearched && isSuccess && data?.length === 0 && (
            <div className="mt-8">
              {keyword}에 대한 포스트가 존재하지 않습니다!
            </div>
          )}
          {!isSearched && isSuccess && data?.length === 0 && (
            <div className="mt-8">첫 번째 글을 작성해주세요!</div>
          )}

          {data?.length ? (
            <ul className="mt-8 w-full">
              {data?.map((book: any) => (
                <li key={book.id} className="w-full">
                  <BookPost
                    book={book}
                    href={`/book/${book.id}`}
                    user={book.user}
                    className="my-10"
                    onLike={() =>
                      checkAuthHandler(
                        onMutateLikeHandler(book.isLiked, book.id)
                      )
                    }
                    onComment={() =>
                      router.push(
                        isUnauthenticated ? "/auth/signin" : `book/${book.id}`
                      )
                    }
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
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="fixed bottom-20 left-50 z-50">
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
  await queryClient.prefetchQuery([BOOK_QUERY_KEY], () => getBooksApi());

  return {
    props: { dehydratedProps: dehydrate(queryClient) },
  };
}

export default BookPage;
