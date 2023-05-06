import { useSession } from "next-auth/react";
import router from "next/router";
import React, { ReactNode } from "react";
import Navigation from "../Navigation";

function Layout({
  children,
  bottom,
  top,
}: {
  children: ReactNode;
  bottom?: ReactNode;
  top?: ReactNode;
}) {
  const { status, data } = useSession();

  return (
    <div className="flex flex-col items-center max-w-[540px] w-full min-h-full h-screen mx-auto bg-black overflow-y-scroll">
      {top && top}
      {children}
      {bottom && bottom}
    </div>
  );
}

export default Layout;
