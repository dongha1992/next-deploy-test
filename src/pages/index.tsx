import router, { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { signIn, useSession, signOut } from "next-auth/react";
import { getServerSession } from "next-auth";

import { prisma } from "../../server/db/client";
import { options } from "./api/auth/[...nextauth]";
import Button from "@/components/Button";
import PostSmall from "@/components/PostSmall";
import NewPostForm from "@/components/NewPostForm";
import axios from "axios";

export default function Home({ posts }: any) {
  const { data, status } = useSession();
  const [isShowInput, setShowInput] = useState(false);
  const router = useRouter();

  const handleSubmit = async ({ language, code }: any) => {
    try {
      await axios.post("/api/posts", {
        language,
        code,
      });
      // TODO: 수정해야함
      router.replace("/");
      setShowInput(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full pt-8 pb-10 mx-auto max-w-7xl px-10">
      <div className="max-w-2xl mx-auto">
        {!isShowInput && (
          <input
            className="relative w-full cursor-default rounded-xl border border-gray-300 bg-dark py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            placeholder="코드 작성하기"
            onFocus={() => setShowInput(true)}
          />
        )}

        {isShowInput && (
          <NewPostForm className="max-w-5xl" onSubmit={handleSubmit} />
        )}

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
