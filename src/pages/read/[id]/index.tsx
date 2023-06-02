import Head from "next/head";

import {
  NOVEL_DETAIL_QUERY_KEY,
  useDeleteLike,
  useUpdateLike,
  useNovelComment,
  useDeleteComment,
} from "@/query/novel";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import router from "next/router";
import { ReactElement } from "react";

import Comment from "@/components/Common/Comment";
import TextArea from "@/components/Common/TextArea";
import Button from "@/components/Common/Button";
import Lottie from "@/components/Common/Lottie";
import Overlay from "@/components/Common/Overlay";
import useCheckAuth from "@/hooks/useCheckAuth";
import { useRecoilState } from "recoil";
import { popupState } from "@/store/common";
import Layout from "@/components/Layout";
import { getNovelDetailApi } from "@/utils/api/novel";
import NovelDetail from "@/components/Novel/NovelDetail";
import { StickyHeader } from "@/components/Common/Header";

export default function NovelDetailPage({ id }: { id: number }) {
  const { status, data } = useSession();
  const { checkAuthHandler } = useCheckAuth();
  const [popup, setPopup] = useRecoilState(popupState);

  const isUnauthenticated = status === "unauthenticated";

  const {
    data: novel,
    isLoading,
    isError,
  } = useQuery([NOVEL_DETAIL_QUERY_KEY, id], () => getNovelDetailApi(id), {
    onError: () => {
      router.push("/");
    },
  });

  const { mutate: postLikeMutation, isLoading: isLikeLoading } = useUpdateLike({
    queryKey: [NOVEL_DETAIL_QUERY_KEY, id],
  });
  const { mutate: deleteLikeMutation, isLoading: isLikeDeleteLoading } =
    useDeleteLike({
      queryKey: [NOVEL_DETAIL_QUERY_KEY, id],
    });

  const { mutate: postCommentMutation, isLoading: isCommentLoading } =
    useNovelComment({
      queryKey: [NOVEL_DETAIL_QUERY_KEY, id],
    });

  const { mutate: deleteCommentMutation } = useDeleteComment({
    queryKey: [NOVEL_DETAIL_QUERY_KEY, id],
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

    postCommentMutation({ data: comment.value, id: novel.id });
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
    <div className="w-full">
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
        <title>{novel?.title}</title>
      </Head>
      <NovelDetail
        novel={novel}
        user={novel?.user}
        className="px-4 my-3 mt-3"
        onComment={() => {
          return;
        }}
        onLike={() =>
          checkAuthHandler(() => onMutateLikeHandler(novel.isLiked, novel.id))
        }
      />
      <form className="flex flex-col mx-4" onSubmit={onSubmitComment}>
        <TextArea
          name="comment"
          style={{ minHeight: "120px", color: "black" }}
        />
        <Button
          type="submit"
          className="w-15 self-end bg-gray-700 hover:bg-gray-600"
        >
          확인
        </Button>
      </form>
      <div className="mx-4 mt-10 mb-6">
        {novel?.comments?.map((comment: any, index: number) => {
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

NovelDetailPage.getLayout = (page: ReactElement) => {
  return <Layout top={<StickyHeader />}>{page}</Layout>;
};

export async function getServerSideProps(context: any) {
  const { id } = context.query;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([NOVEL_DETAIL_QUERY_KEY, id], () =>
    getNovelDetailApi(id)
  );

  return {
    props: { dehydratedProps: dehydrate(queryClient), id: id },
  };
}
