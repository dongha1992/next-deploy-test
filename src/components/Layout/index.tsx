import { useSession } from "next-auth/react";
import router from "next/router";
import React, { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  const { status, data } = useSession();

  return (
    <div className="flex flex-col items-center max-w-[540px] w-full min-h-full h-screen mx-auto bg-black overflow-y-scroll">
      {children}
    </div>
  );
}

export default Layout;
