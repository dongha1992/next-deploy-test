import Post from "@/components/Post";
import axios from "axios";
import Head from "next/head";

import {
  POST_DETAIL_QUERY_KEY,
  useDeleteLike,
  useUpdateLike,
  usePostComment,
} from "@/query/post";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { apiClient } from "@/utils/api/apiClient";

import Comment from "@/components/Comment";
import TextArea from "@/components/Common/TextArea";
import Button from "@/components/Button";

export default function Code({ id }: { id: number }) {
  const {
    data: post,
    isLoading,
    isError,
  } = useQuery([POST_DETAIL_QUERY_KEY, id], () =>
    apiClient.get(`api/posts/${id}`).then(({ data }) => data)
  );

  const { mutate: postLikeMutation } = useUpdateLike({
    queryKey: [POST_DETAIL_QUERY_KEY, id],
  });
  const { mutate: deleteLikeMutation } = useDeleteLike({
    queryKey: [POST_DETAIL_QUERY_KEY, id],
  });

  const { mutate: postCommentMutation } = usePostComment({
    queryKey: [POST_DETAIL_QUERY_KEY, id],
  });

  function onMutateLikeHandler(isLiked: boolean, id: number) {
    console.log(isLiked, "isLiked");
    isLiked ? deleteLikeMutation(id) : postLikeMutation(id);
  }

  function onSubmitComment(e: any) {
    e.preventDefault();
    const { comment } = e.target.elements;

    if (!comment.value.length) {
      return alert("코멘트를 작성해주세요.");
    }

    postCommentMutation({ data: comment.value, id: post.id });
  }

  if (isLoading) return <div>로딩</div>;
  if (isError) return <div>에러</div>;

  return (
    <div className="w-full">
      <Head>
        <title>{post?.title}</title>
      </Head>
      <Post
        post={post}
        user={post.user}
        className="px-6 my-3 mt-10"
        smallMaxWith={"max-w-2xl"}
        onComment={() => {
          return;
        }}
        onLike={() => onMutateLikeHandler(post.isLiked, post.id)}
        onShare={() => console.log("share")}
      />
      <form className="flex flex-col mx-6" onSubmit={onSubmitComment}>
        <TextArea name="comment" />
        <Button type="submit" className="w-15 self-end">
          확인
        </Button>
      </form>
      <div className="mx-6 mt-10">
        {post.comments.map((item: any, index: number) => {
          return <Comment key={index} user={item.user} comment={item} />;
        })}
      </div>
    </div>
  );
}

async function getPostDetail(id: number) {
  const post = await axios.get(`api/posts/${id}`).then(({ data }) => data);
  return post;
}

export async function getServerSideProps(context: any) {
  const { id } = context.query;

  // const { data } = await axios.get(
  //   `${process.env.NEXTAUTH_URL}/api/posts/${id}`
  // );

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([POST_DETAIL_QUERY_KEY, id], () =>
    getPostDetail(id)
  );

  return {
    props: { dehydratedProps: dehydrate(queryClient), id: id },
  };
}
