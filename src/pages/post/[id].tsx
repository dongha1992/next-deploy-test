import Post from "@/components/Post";
import axios from "axios";
import Head from "next/head";

import {
  POST_DETAIL_QUERY_KEY,
  useDeleteLike,
  useUpdateLike,
} from "@/query/post";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { apiClient } from "@/utils/api/apiClient";

export default function Code({ id }: { id: number }) {
  const {
    data: post,
    isLoading,
    isError,
  } = useQuery([POST_DETAIL_QUERY_KEY, id], () =>
    apiClient.get(`api/posts/${id}`).then(({ data }) => data)
  );

  const { mutate: postListMutation } = useUpdateLike({
    queryKey: [POST_DETAIL_QUERY_KEY, id],
  });
  const { mutate: deleteLikeMutation } = useDeleteLike({
    queryKey: [POST_DETAIL_QUERY_KEY, id],
  });

  function onMutateLikeHandler(isLiked: boolean, id: number) {
    !isLiked ? postListMutation(id) : deleteLikeMutation(id);
  }

  console.log(post);

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
        onComment={() => console.log("comment")}
        onLike={() => onMutateLikeHandler(post.isLiked, post.id)}
        onShare={() => console.log("share")}
      />
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
