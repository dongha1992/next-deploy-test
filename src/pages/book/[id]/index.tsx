import Head from "next/head";

import {
  BOOK_DETAIL_QUERY_KEY,
  useDeleteLike,
  useUpdateLike,
  usePostComment,
  useDeleteComment,
} from "@/query/book";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";

import Comment from "@/components/Common/Comment";
import TextArea from "@/components/Common/TextArea";
import Button from "@/components/Common/Button";
import Lottie from "@/components/Common/Lottie";
import Overlay from "@/components/Common/Overlay";
import { getBookDetailApi } from "@/utils/api/book";
import BookDetail from "@/components/Book/BookDetail";
import router from "next/router";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { options } from "@/pages/api/auth/[...nextauth]";
import useCheckAuth from "@/hooks/useCheckAuth";
import { useRecoilState } from "recoil";
import { popupState } from "@/store/common";
import Layout from "@/components/Layout";
import { ReactElement } from "react";
import { Header } from "@/components/Common/Header";

export default function BookDetailPage({ id }: { id: number }) {
  const { status, data } = useSession();
  const { checkAuthHandler } = useCheckAuth();
  const [popup, setPopup] = useRecoilState(popupState);
  const isUnauthenticated = status === "unauthenticated";

  const {
    data: book,
    isLoading,
    isError,
  } = useQuery([BOOK_DETAIL_QUERY_KEY, id], () => getBookDetailApi(id), {
    onError: () => {
      router.push("/");
    },
  });

  const { mutate: postLikeMutation, isLoading: isLikeLoading } = useUpdateLike({
    queryKey: [BOOK_DETAIL_QUERY_KEY, id],
  });
  const { mutate: deleteLikeMutation, isLoading: isLikeDeleteLoading } =
    useDeleteLike({
      queryKey: [BOOK_DETAIL_QUERY_KEY, id],
    });

  const { mutate: postCommentMutation, isLoading: isCommentLoading } =
    usePostComment({
      queryKey: [BOOK_DETAIL_QUERY_KEY, id],
    });

  const { mutate: deleteCommentMutation } = useDeleteComment({
    queryKey: [BOOK_DETAIL_QUERY_KEY, id],
  });

  function onMutateLikeHandler(isLiked: boolean, id: number) {
    isLiked ? deleteLikeMutation(id) : postLikeMutation(id);
  }

  function onSubmitComment(e: any) {
    e.preventDefault();
    const { comment } = e.target.elements;

    if (isUnauthenticated) {
      return setPopup({
        message: "로그인 후 이용해주세요!",
        callback: () => router.push("/auth/signin"),
        isOpen: true,
      });
    }

    if (!comment.value.length) {
      return alert("코멘트를 작성해주세요.");
    }

    postCommentMutation({ data: comment.value, id: book.id });
    comment.value = "";
  }

  function onDeleteComment(commentId: number) {
    deleteCommentMutation({ commentId });
  }

  function onEditComment(id: number) {
    alert("개발중!!");
    return;
  }

  if (isError) return <div>에러</div>;

  return (
    <div className="w-full bg-black">
      {(isLoading ||
        isCommentLoading ||
        isLikeLoading ||
        isLikeDeleteLoading) && (
        <Overlay>
          <Lottie
            src="https://assets8.lottiefiles.com/private_files/lf30_gqirhcr7.json"
            loop={false}
          />
        </Overlay>
      )}
      <Head>
        <title>{book?.title}</title>
      </Head>
      <BookDetail
        book={book}
        user={book?.user}
        className="px-4 my-3 mt-3"
        onComment={() => {
          return;
        }}
        onLike={() =>
          checkAuthHandler(() => onMutateLikeHandler(book.isLiked, book.id))
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
      <form className="flex flex-col mx-4" onSubmit={onSubmitComment}>
        <TextArea name="comment" style={{ minHeight: "120px" }} />
        <Button type="submit" className="w-15 self-end">
          확인
        </Button>
      </form>
      <div className="mx-4 mt-10 mb-6">
        {book?.comments?.map((comment: any, index: number) => {
          return (
            <Comment
              key={index}
              user={comment?.user}
              isAuth={data?.user?.email === comment?.user.email}
              comment={comment}
              onDelete={() => onDeleteComment(comment.id)}
              onEdit={() => onEditComment(comment.id)}
            />
          );
        })}
      </div>
    </div>
  );
}

BookDetailPage.getLayout = (page: ReactElement) => {
  return <Layout top={<Header />}>{page}</Layout>;
};

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  const session = await getServerSession(context.req, context.res, options);

  // const { data } = await axios.get(
  //   `${process.env.NEXTAUTH_URL}/api/books/${id}`
  // );

  // if (!session) {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: "/auth/signin",
  //     },
  //     props: {},
  //   };
  // }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([BOOK_DETAIL_QUERY_KEY, id], () =>
    getBookDetailApi(id)
  );

  return {
    props: { dehydratedProps: dehydrate(queryClient), id: id },
  };
}
