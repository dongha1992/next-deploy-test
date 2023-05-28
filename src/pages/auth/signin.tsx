import React from "react";
import { signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]";
import Image from "next/image";
import useIsInApp from "@/hooks/useIsInApp";
import LoginButton from "@/components/LoginButton";
import InAppInfo from "@/components/InAppInfo";

function Signin() {
  const { isInApp } = useIsInApp();

  return (
    <div
      className="h-screen w-full flex flex-col items-center justify-around"
      style={{ backgroundColor: "#262626" }}
    >
      <div className="flex justify-center">
        <Image src="/img/scope-logo.jpeg" width={200} height={200} alt="로고" />
      </div>
      <div className="w-full flex justify-center items-center px-2">
        {isInApp ? (
          <InAppInfo />
        ) : (
          <LoginButton onClick={() => signIn("google")} />
        )}
      </div>
    </div>
  );
}

export default Signin;

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, options);

  if (session) {
    //redirect to login page

    return {
      redirect: {
        destination: "/book",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
