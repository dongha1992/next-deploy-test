import React, { useEffect, useRef } from "react";
import { signIn, useSession, signOut } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]";
import Image from "next/image";
import useIsMobile from "@/hooks/useIsMobile";

function Signin() {
  const isMobile = useIsMobile();
  const originRef = useRef<any>(null);
  const callbackUrlRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== undefined) {
      originRef.current = window.location.origin;
      callbackUrlRef.current = `${window.location.origin}/auth/signin`;
    }
  }, []);

  console.log(isMobile, "isMobile");

  return (
    <div className="h-full flex justify-center items-center">
      <a
        className="bg-white text-black p-4 rounded-sm flex"
        type="button"
        // href={`http://${originRef.current}/api/auth/signin?callbackUrl=${callbackUrlRef.current}`}
        target="_blank"
        onClick={() => signIn()}
      >
        <Image
          src="/img/google_logo.png"
          alt="구글 로그"
          width={25}
          height={25}
        />
        <span className="ml-4">start with google</span>
      </a>
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
