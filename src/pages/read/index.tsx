import React, { ReactElement } from "react";
import { useRouter } from "next/router";

import Button from "@/components/Common/Button";
import Navigation from "@/components/Common/Navigation";
import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import useCheckAuth from "@/hooks/useCheckAuth";
import {
  NOVELS_QUERY_KEY,
  useDeleteLike,
  useGetNovels,
  useUpdateLike,
} from "@/query/novel";
import Overlay from "@/components/Common/Overlay";
import Lottie from "@/components/Common/Lottie";
import Border from "@/components/Common/Border";
import NovelPost from "@/components/Novel/NovelPost";

function ReadPage() {
  const { status } = useSession();
  const router = useRouter();
  const isUnauthenticated = status === "unauthenticated";
  const { checkAuthHandler } = useCheckAuth();

  const { data, isLoading: isNovelsLoading, isSuccess } = useGetNovels();

  const { mutate: postLikeMutation, isLoading: isLikeLoading } = useUpdateLike({
    queryKey: [NOVELS_QUERY_KEY],
  });

  const { mutate: deleteLikeMutation, isLoading: isDeleteLikeLoading } =
    useDeleteLike({
      queryKey: [NOVELS_QUERY_KEY],
    });

  function onMutateLikeHandler(isLiked: boolean, id: number) {
    isLiked ? deleteLikeMutation(id) : postLikeMutation(id);
  }
  return (
    <section className="w-full pt-8 pb-14 mx-auto max-w-7xl px-4 bg-black relative">
      {(isLikeLoading || isDeleteLikeLoading || isNovelsLoading) && (
        <Overlay>
          <Lottie
            src="https://assets8.lottiefiles.com/private_files/lf30_gqirhcr7.json"
            loop={true}
          />
        </Overlay>
      )}
      <div
        className="h-full border border-gray-700 overflow-scroll"
        style={{ height: "75vh" }}
      >
        {data?.length ? (
          <ul className="w-full">
            {data?.map((novel: any) => (
              <li key={novel.id} className="w-full">
                <NovelPost
                  novel={novel}
                  href={`/read/${novel.id}`}
                  user={novel.user}
                  className="my-5"
                  onLike={() =>
                    checkAuthHandler(() =>
                      onMutateLikeHandler(novel.isLiked, novel.id)
                    )
                  }
                  onComment={() => router.push(`read/${novel.id}`)}
                  onShare={() => {
                    window?.Kakao.Link.sendDefault({
                      objectType: "feed",
                      content: {
                        title: novel.title,
                        description: novel.body,
                        imageUrl: "",
                        imageWidth: 600,
                        imageHeight: 420,
                        link: {
                          webUrl: `${process.env.NEXTAUTH_URL}/read/${novel.id}`,
                          mobileWebUrl: `${process.env.NEXTAUTH_URL}/read/${novel.id}`,
                        },
                      },
                      buttons: [],
                    });
                  }}
                />
                <Border size={1} />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <div className="addButton">
        <div className="absolute right-12 bottom-5">
          <Button
            className="w-15 h-15 rounded-full text-lg hover:drop-shadow-2xl hover:animate-bounce duration-300"
            type="submit"
            onClick={() =>
              router.push(isUnauthenticated ? "/auth/signin" : "/addNovel")
            }
          >
            +
          </Button>
        </div>
      </div>
    </section>
  );
}

ReadPage.getLayout = (page: ReactElement) => {
  return <Layout bottom={<Navigation />}>{page}</Layout>;
};

export default ReadPage;
