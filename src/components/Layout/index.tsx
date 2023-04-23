import React, { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center max-w-[540px] w-full min-h-full h-screen mx-auto bg-black">
      {children}
    </div>
  );
}

export default Layout;
