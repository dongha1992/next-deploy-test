import Navigation from "@/components/Common/Navigation";
import Layout from "@/components/Layout";
import React, { ReactElement } from "react";

function ReadPage() {
  return <div>ReadPage</div>;
}

ReadPage.getLayout = (page: ReactElement) => {
  return <Layout bottom={<Navigation />}>{page}</Layout>;
};

export default ReadPage;
