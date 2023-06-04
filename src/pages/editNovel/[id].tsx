import { ReactElement } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

import { NOVEL_DETAIL_QUERY_KEY, useEditNovel } from "@/query/novel";
import Overlay from "@/components/Common/Overlay";
import Lottie from "@/components/Common/Lottie";
import Layout from "@/components/Layout";
import { Header } from "@/components/Common/Header";
import NewNovelPostForm from "@/components/Novel/NewNovelPostForm";
import { getNovelDetailApi } from "@/utils/api/novel";

export default function NovelEditPage() {
  const router = useRouter();

  const { id } = router.query;

  const { data: novel, isLoading } = useQuery(
    [NOVEL_DETAIL_QUERY_KEY, id],
    () => getNovelDetailApi(Number(id)),
    {
      onSuccess: (data) => {},
      enabled: !!id,
    }
  );

  const { mutate: patchNovelMutation, isLoading: postLoading } = useEditNovel({
    queryKey: [NOVEL_DETAIL_QUERY_KEY, id],
  });

  const onEditHandler = (e: any) => {
    e.preventDefault();
    const { text, title } = e.target.elements;
    if (!text.value) {
      alert("내용을 입력해주세요.");
      return;
    }

    if (!title.value) {
      alert("제목을 입력해주세요.");
      return;
    }

    patchNovelMutation({
      data: { body: text.value, title: title.value },
      id: Number(id),
    });
  };

  if (isLoading || postLoading) {
    return (
      <Overlay>
        <Lottie
          src="https://assets8.lottiefiles.com/private_files/lf30_gqirhcr7.json"
          loop={true}
        />
      </Overlay>
    );
  }

  return (
    <div className="w-full h-full pb-10 lg:pt-6 lg:pb-8 max-w-10xl mx-auto px-4">
      <div className="mt-6">
        <NewNovelPostForm
          className="max-w-5xl mt-4"
          onSubmit={onEditHandler}
          body={novel.body}
          title={novel.title}
        />
      </div>
    </div>
  );
}

NovelEditPage.getLayout = (page: ReactElement) => {
  return <Layout top={<Header />}>{page}</Layout>;
};
