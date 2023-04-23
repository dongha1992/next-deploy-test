import { useState } from "react";
import Head from "next/head";

import axios from "axios";

import { useRouter } from "next/router";
import NewPostForm from "@/components/NewPostForm";

export default function Profile({ user }: any) {
  const router = useRouter();

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
        <title>Create a Snippet</title>
      </Head>
      <div className="pt-8 pb-10 lg:pt-12 lg:pb-14 max-w-5xl mx-auto px-6 my-6">
        <h1 className="text-4xl font-bold tracking-tight text-gray-100 sm:text-5xl md:text-6xl mb-6">
          Create a Snippet
        </h1>

        <div className="mt-6">
          <NewPostForm className="max-w-5xl" onSubmit={handleSubmit} />
        </div>
      </div>
    </>
  );
}
