import React, { useEffect } from "react";
import { signIn, useSession, signOut } from "next-auth/react";
import router from "next/router";

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
