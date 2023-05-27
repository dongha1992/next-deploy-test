import React from "react";
import { signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]";
import Image from "next/image";
import Button from "@/components/Common/Button";
import { copyToClipboard } from "@/utils/copyToClipboard";
import useIsInApp from "@/hooks/useIsInApp";
import LoginButton from "@/components/LoginButton";

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
      <div className="flex justify-center items-center px-2">
        {isInApp ? (
          <section className="flex flex-col">
            <span className="mb-4 text-md">
              해당 접근으로 로그인 시 오류가 발생합니다!
            </span>
            <span className="text-sm">
              불편하시겠지만 주소를 복사하여 <br />
              새로운 사파리/크롬에서 붙여넣기 해주세요!
            </span>
            <Button onClick={() => copyToClipboard(window.location.href)}>
              주소 복사하기
            </Button>
          </section>
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
        destination: "/",
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
