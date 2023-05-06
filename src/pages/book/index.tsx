import Layout from "@/components/Layout";
import Navigation from "@/components/Navigation";
import React, { ReactElement } from "react";

function BookPage() {
  return <div>BookPage</div>;
}

BookPage.getLayout = (page: ReactElement) => {
  return <Layout bottom={<Navigation />}>{page}</Layout>;
};

export default BookPage;
