import BookPost from "@/components/Book/BookPost";
import Lottie from "@/components/Common/Lottie";
import Overlay from "@/components/Common/Overlay";
import { useDeleteLike, useUpdateLike } from "@/query/book";
import { MYPAGE_REVIEWS_QUERY_KEY, useGetMyReviewList } from "@/query/mypage";
import { getMyReviewsApi } from "@/utils/api/mypage";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import router from "next/router";
import React from "react";

function MypageReviewList({ email }: { email: string }) {
  const { data, isSuccess } = useGetMyReviewList({ email });

  const { mutate: postLikeMutation, isLoading: isLikeLoading } = useUpdateLike({
    queryKey: [MYPAGE_REVIEWS_QUERY_KEY],
  });

  const { mutate: deleteLikeMutation, isLoading: isDeleteLikeLoading } =
    useDeleteLike({
      queryKey: [MYPAGE_REVIEWS_QUERY_KEY],
    });

  function onMutateLikeHandler(isLiked: boolean, id: number) {
    isLiked ? deleteLikeMutation(id) : postLikeMutation(id);
  }

  return (
    <div className="w-full pt-8 pb-14 mx-auto max-w-7xl px-4 bg-black relative">
      <span className="w-full flex justify-center text-lg">
        내가 쓴 글 보기
      </span>
      {isSuccess && data?.length === 0 && (
        <div className="mt-8">첫 번째 글을 작성해주세요!</div>
      )}
      {(isLikeLoading || isDeleteLikeLoading) && (
        <Overlay>
          <Lottie
            src="https://assets8.lottiefiles.com/private_files/lf30_gqirhcr7.json"
            loop={false}
          />
        </Overlay>
      )}

      <div className="max-w-2xl mx-auto">
        {data?.length ? (
          <ul className="mt-8 w-full">
            {data?.map((book: any) => (
              <li key={book.id} className="w-full">
                <BookPost
                  book={book}
                  href={`/book/${book.id}`}
                  user={book.user}
                  className="my-10"
                  onLike={() => onMutateLikeHandler(book.isLiked, book.id)}
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
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

export default MypageReviewList;

export async function getServerSideProps(context: any) {
  const queryClient = new QueryClient();
  const { email } = context.query;

  if (!email) {
    return {
      redirect: {
        destination: "/book",
        permanent: false,
      },
    };
  }

  await queryClient.prefetchQuery([MYPAGE_REVIEWS_QUERY_KEY, email], () =>
    getMyReviewsApi({ email })
  );

  return {
    props: { dehydratedProps: dehydrate(queryClient), email: email },
  };
}
