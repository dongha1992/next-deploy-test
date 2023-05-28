import Navigation from "@/components/Common/Navigation";
import Layout from "@/components/Layout";
import React, { ReactElement } from "react";

function ReadPage() {
  return (
    <div className="w-full pt-8 pb-14 mx-auto max-w-7xl px-4 bg-black relative">
      개발 중!
    </div>
  );
}

ReadPage.getLayout = (page: ReactElement) => {
  return <Layout bottom={<Navigation />}>{page}</Layout>;
};

export default ReadPage;
