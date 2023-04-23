import React, { useEffect } from "react";
import { signIn, useSession, signOut } from "next-auth/react";
import router from "next/router";
import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]";

function Signin() {
  return (
    <div className="h-full flex justify-center items-center">
      <button
        className="bg-white text-black p-4 rounded-sm"
        type="button"
        onClick={() => signIn()}
      >
        구글 로그인
      </button>
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
