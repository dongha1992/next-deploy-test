import React from "react";
import { signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]";
import Image from "next/image";
import Button from "@/components/Common/Button";

function Signin() {
  const handleSignInWithGoogle = () => {
    const useragt = window.navigator?.userAgent.toLowerCase();

    if (useragt.match(/kakaotalk/i)) {
      window.location.href =
        "kakaotalk://web/openExternal?url=" +
        encodeURIComponent("/api/auth/signin/google");
    } else {
      // signIn("google");
      window.location.href =
        "kakaotalk://web/openExternal?url=" +
        encodeURIComponent("/api/auth/signin/google");
    }
    // window.open("/api/auth/signin/google", "_blank");
  };
  return (
    <div
      className="h-full w-full flex flex-col justify-center items-center"
      style={{ backgroundColor: "#262626" }}
    >
      <div className="flex justify-center items-center">
        <Image src="/img/scope-logo.jpeg" width={200} height={200} alt="로고" />
      </div>
      <div className="flex justify-center items-center">
        <Button
          className="flex bg-white text-black p-4 rounded-md text-md w-100 hover:bg-white focus:outline-none focus:ring-0"
          type="button"
          onClick={handleSignInWithGoogle}
        >
          <Image
            src="/img/google_logo.png"
            alt="구글 로고"
            width={25}
            height={25}
          />
          <span className="ml-4">구글로 시작하기</span>
        </Button>
      </div>
    </div>
  );
}

export default Signin;

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, options);
  const userAgent = context.req
    ? context.req.headers["user-agent"]
    : navigator.userAgent;

  if (userAgent.match(/kakaotalk/i)) {
    // Redirect using server-side code
    context.res.writeHead(302, {
      Location: "/api/auth/signin/google",
    });
    context.res.end();

    return { props: {} };
  }

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
