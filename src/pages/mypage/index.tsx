import Navigation from "@/components/Common/Navigation";
import Layout from "@/components/Layout";
import React, { ReactElement } from "react";

function Mypage() {
  return <div>개발중</div>;
}

Mypage.getLayout = (page: ReactElement) => {
  return <Layout bottom={<Navigation />}>{page}</Layout>;
};
export default Mypage;
