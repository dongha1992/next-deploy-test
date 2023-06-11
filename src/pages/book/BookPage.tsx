import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Button from "@/components/Common/Button";
import useFormatUserAgent from "@/hooks/useFormatUserAgent";
import {
  useGetInfiniteBooks,
  useRefetchPostSearchQuery,
  useSearchPost,
} from "@/query/book";
import Lottie from "@/components/Common/Lottie";
import Overlay from "@/components/Common/Overlay";
import Input from "@/components/Common/Input";
import BookPost from "@/components/Book/BookPost";
import { useSession } from "next-auth/react";
import useCheckAuth from "@/hooks/useCheckAuth";
import { SearchActiveIcon } from "@/utils/svg";
import Border from "@/components/Common/Border";

export function BookPage() {
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

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    isLoading,
  } = useGetInfiniteBooks();

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
              left={<SearchActiveIcon />}
              name="search"
              button={
                <Button type="submit" className="w-16 p-2 m-0">
                  검색
                </Button>
              }
            />
          </form>
          {isBooksLoading && (
            <Overlay>
              <Lottie
                className="w-56"
                src="https://assets8.lottiefiles.com/private_files/lf30_gqirhcr7.json"
                loop={true}
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
              ))}
            </ul>
          ) : null}
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
    </>
  );
}
