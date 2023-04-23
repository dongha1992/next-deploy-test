import Post from "@/components/Post";
import axios from "axios";
import Head from "next/head";

import { Session } from "../api/posts";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]";

export default function Code({ post = {} }: any) {
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
        onLike={() => console.log("like")}
        onShare={() => console.log("share")}
      />
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  const session: Session | null = await getServerSession(
    context.req,
    context.res,
    options
  );

  const { data } = await axios.get(
    `${process.env.NEXTAUTH_URL}/api/posts/${id}`,
    {
      headers: {
        Authorization: `bearer ${session?.loggedUser}`,
      },
    }
  );

  return {
    props: { post: JSON.parse(JSON.stringify(data)) },
  };
}
