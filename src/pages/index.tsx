import router from "next/router";
import { useEffect } from "react";
import { signIn, useSession, signOut } from "next-auth/react";
import { getServerSession } from "next-auth";

import { prisma } from "../../server/db/client";
import { options } from "./api/auth/[...nextauth]";
import Button from "@/components/Button";
import PostSmall from "@/components/PostSmall";

export default function Home({ posts }: any) {
  const { data, status } = useSession();

  return (
    <div className="w-full pt-8 pb-10 mx-auto max-w-7xl px-10">
      <div className="max-w-2xl mx-auto">
        <Button onClick={() => router.push("/addPost")}>글쓰기</Button>

        <ul className="mt-8">
          {posts?.map((post: any) => (
            <li key={post.id}>
              <PostSmall
                post={post}
                href={`/post/${post.id}`}
                user={post.user}
                className="my-10"
                onLike={() => console.log("like post", post.id)}
                onComment={() => console.log("comment post", post.id)}
                onShare={() => console.log("share post", post.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, options);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/signin",
      },
      props: {},
    };
  }

  const posts = await prisma?.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });

  return {
    props: { posts: JSON.parse(JSON.stringify(posts)) },
  };
}
