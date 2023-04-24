import router, { useRouter } from "next/router";
import { signIn, useSession, signOut } from "next-auth/react";
import { getServerSession } from "next-auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { prisma } from "../../server/db/client";
import { options } from "./api/auth/[...nextauth]";
import Button from "@/components/Button";
import PostSmall from "@/components/PostSmall";
import NewPostForm from "@/components/NewPostForm";
import axios from "axios";
import useFormatUserAgent from "@/hooks/useFormatUserAgent";
import { useDeleteLike, useUpdateLike } from "@/query/post";

export const POST_QUERY_KEY = "getPost";

export default function Home({ posts, userAgent }: any) {
  // TODO: SSR로 어카징
  const { data } = useQuery({
    queryKey: [POST_QUERY_KEY],
    queryFn: () => axios.get("api/posts").then(({ data }) => data),
    initialData: posts,
    onSuccess: () => {
      return;
    },
  });

  const router = useRouter();

  useFormatUserAgent();

  const { mutateAsync: mutateLike } = useUpdateLike({ throwOnError: true });
  const { mutateAsync: mutateUnLike } = useDeleteLike({ throwOnError: true });

  return (
    <>
      <div className="w-full pt-8 pb-10 mx-auto max-w-7xl px-4">
        <div className="max-w-2xl mx-auto">
          <Button type="submit" onClick={() => router.push("/addPost")}>
            글쓰기
          </Button>

          <ul className="mt-8">
            {data?.map((post: any) => (
              <li key={post.id}>
                <PostSmall
                  post={post}
                  href={`/post/${post.id}`}
                  user={post.user}
                  className="my-10"
                  onLike={() => {
                    post.isLiked ? mutateUnLike(post.id) : mutateLike(post.id);
                  }}
                  onComment={() => console.log("comment post", post.id)}
                  onShare={() => console.log("share post", post.id)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, options);
  const userAgent = context.req
    ? context.req.headers["user-agent"] || ""
    : navigator.userAgent;

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/signin",
      },
      props: {},
    };
  }

  const posts = await axios
    .get(`${process.env.NEXTAUTH_URL}/api/posts`)
    .then(({ data }) => data);

  return {
    props: { posts: JSON.parse(JSON.stringify(posts)), userAgent },
  };
}
