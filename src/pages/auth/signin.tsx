import React, { useEffect } from "react";
import { signIn, useSession, signOut } from "next-auth/react";
import router from "next/router";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";

function Signin() {
  const { data, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status]);
  return (
    <div>
      <button type="button" onClick={() => signIn()}>
        Google signIn
      </button>
    </div>
  );
}

export default Signin;

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    //redirect to login page
    return {
      redirect: {
        destination: "/api/auth/signin",
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
