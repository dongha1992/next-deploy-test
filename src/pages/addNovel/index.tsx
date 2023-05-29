import React, { ReactElement } from "react";

import NewNovelPostForm from "@/components/Novel/NewNovelPostForm";
import { NOVELS_QUERY_KEY, useNovelCreate } from "@/query/novel";
import Layout from "@/components/Layout";
import Header from "@/components/Common/Header";
import Overlay from "@/components/Common/Overlay";
import Lottie from "@/components/Common/Lottie";

function AddNovelPage() {
  const {
    mutate: mutateAddNovelPost,
    isLoading: isNovelLoading,
    isSuccess: isNovelSuccess,
  } = useNovelCreate({
    queryKey: [NOVELS_QUERY_KEY],
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { text, title } = e.target.elements;
    if (!text.value) {
      alert("내용을 입력해주세요.");
      return;
    }

    // TODO: 이미지 최적화 하려면 여기서 key를 통일해줘야 함

    const data = {
      body: text.value,
      title: title.value,
    };

    mutateAddNovelPost(data);
    text.value = "";
    title.value = "";
  };
  return (
    <div className="w-full h-full pb-10 lg:pt-6 lg:pb-8 max-w-10xl mx-auto px-4">
      {isNovelLoading && (
        <Overlay>
          <Lottie
            src="https://assets8.lottiefiles.com/private_files/lf30_gqirhcr7.json"
            loop={false}
          />
        </Overlay>
      )}
      <div className="mt-2">
        <NewNovelPostForm className="max-w-5xl mt-4" onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

AddNovelPage.getLayout = (page: ReactElement) => {
  return <Layout top={<Header />}>{page}</Layout>;
};

export default AddNovelPage;
