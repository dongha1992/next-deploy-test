import { useState } from "react";
import Head from "next/head";

import axios from "axios";

import { useRouter } from "next/router";
import NewPostForm from "@/components/NewPostForm";
import { useQuery } from "@tanstack/react-query";

export default function Profile({ user }: any) {
  const router = useRouter();

  // const {} = useQuery();

  const handleSubmit = async ({ language, code }: any) => {
    try {
      const { data } = await axios.post("/api/posts", {
        language,
        code,
      });
      router.replace("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>코드 작성 테스트</title>
      </Head>
      <div className="w-full pt-8 pb-10 lg:pt-12 lg:pb-14 max-w-10xl mx-auto px-6 my-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-100 sm:text-3xl md:text-4xl mb-6">
          코드 만들기
        </h1>

        <div className="mt-6">
          <NewPostForm className="max-w-5xl" onSubmit={handleSubmit} />
        </div>
      </div>
    </>
  );
}
