import React, { ReactElement } from "react";
import { useRouter } from "next/router";

import Button from "@/components/Common/Button";
import Navigation from "@/components/Common/Navigation";
import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

function ReadPage() {
  const { status } = useSession();
  const router = useRouter();
  const isUnauthenticated = status === "unauthenticated";

  return (
    <section className="w-full pt-8 pb-14 mx-auto max-w-7xl px-4 bg-black relative">
      <div
        className="h-full border border-gray-700"
        style={{ height: "75vh" }}
      ></div>
      <div className="fixed bottom-20 left-50 z-50">
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
    </section>
  );
}

ReadPage.getLayout = (page: ReactElement) => {
  return <Layout bottom={<Navigation />}>{page}</Layout>;
};

export default ReadPage;
