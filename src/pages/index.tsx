import Button from "@/components/Button";
import PostSmall from "@/components/PostSmall";
import router from "next/router";
import { prisma } from "../../server/db/client";

export default function Home({ posts }: any) {
  return (
    <>
      <div className="pt-8 pb-10 lg:pt-12 lg:pb-14 mx-auto max-w-7xl px-2">
        <div className="max-w-2xl mx-auto">
          <Button onClick={() => router.push("/addPost")}>
            Create A Snippet
          </Button>

          <ul className="mt-8">
            {posts?.map((post: any) => (
              <li key={post.id}>
                <PostSmall
                  post={post}
                  href={`/code/${post.id}`}
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
    </>
  );
}

export async function getServerSideProps() {
  const posts = await prisma?.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    props: { posts: JSON.parse(JSON.stringify(posts)) },
  };
}
