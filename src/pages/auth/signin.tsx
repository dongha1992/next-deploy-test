import React from "react";
import { signIn, useSession, signOut } from "next-auth/react";

function Signin() {
  return (
    <div>
      <button type="button" onClick={() => signIn()}>
        Google signIn
      </button>
    </div>
  );
}

export default Signin;
