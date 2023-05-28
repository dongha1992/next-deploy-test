import Navigation from "@/components/Common/Navigation";
import React, { ReactElement } from "react";
import Layout from "@/components/Layout";
import LoginButton from "@/components/LoginButton";
import { signIn, useSession } from "next-auth/react";

function Mypage() {
  const { status } = useSession();

  const isUnauthenticated = status === "unauthenticated";
  return (
    <div className="w-full pt-8 pb-14 mx-auto max-w-7xl px-4 bg-black relative">
      {isUnauthenticated ? (
        <LoginButton onClick={() => signIn("google")} />
      ) : (
        <span>개발중!</span>
      )}
    </div>
  );
}

Mypage.getLayout = (page: ReactElement) => {
  return <Layout bottom={<Navigation />}>{page}</Layout>;
};
export default Mypage;
