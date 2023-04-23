import React, { useEffect } from "react";
import { signIn, useSession, signOut } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]";
import Image from "next/image";

function Signin() {
  return (
    <div className="h-full flex justify-center items-center">
      <button
        className="bg-white text-black p-4 rounded-sm flex"
        type="button"
        onClick={() => signIn()}
      >
        <Image
          src="/img/google_logo.png"
          alt="구글 로그"
          width={25}
          height={25}
        />
        <span className="ml-4">start with google</span>
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
