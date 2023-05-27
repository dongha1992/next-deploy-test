import Navigation from "@/components/Common/Navigation";
import Layout from "@/components/Layout";
import React, { ReactElement } from "react";

function Mypage() {
  return (
    <div className="w-full pt-8 pb-14 mx-auto max-w-7xl px-4 bg-black relative">
      dd
    </div>
  );
}

Mypage.getLayout = (page: ReactElement) => {
  return <Layout bottom={<Navigation />}>{page}</Layout>;
};
export default Mypage;
