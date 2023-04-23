import Post from "@/components/Post";
import axios from "axios";
import Head from "next/head";
import { useEffect } from "react";

export default function Code({ post = {} }: any) {
  // { id, title, code, language, totalLikes, totalComments, createdAt}

  return (
    <>
      <Head>
        <title>{post?.title}</title>
      </Head>
      <Post
        post={post}
        className="px-6 my-3 mt-10"
        smallMaxWith={"max-w-2xl"}
        largeMaxWith={"max-w-7xl"}
        onComment={() => console.log("comment")}
        onLike={() => console.log("like")}
        onShare={() => console.log("share")}
      />
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  const { data } = await axios.get(
    `${process.env.NEXTAUTH_URL}/api/posts/${id}`
  );

  return {
    props: { post: JSON.parse(JSON.stringify(data)) },
  };
}
