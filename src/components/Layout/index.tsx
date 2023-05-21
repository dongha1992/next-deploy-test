import { useSession } from "next-auth/react";
import React, { ReactNode, useEffect } from "react";

import { useRecoilState } from "recoil";
import { imageZoomState } from "@/store/common";
import ImageViewer from "../ImageViewer";

//TODO: layout 여러차례 렌더링

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
  const [srcs, setSrcs] = useRecoilState(imageZoomState);

  // set 1vh for all devices
  useEffect(() => {
    const calcBrowserScreenSize = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    calcBrowserScreenSize();

    window.addEventListener("resize", calcBrowserScreenSize);
    return () => window.removeEventListener("resize", calcBrowserScreenSize);
  }, []);

  return (
    <div
      className="flex flex-col items-center max-w-[540px] w-full min-h-full h-screen mx-auto bg-black overflow-y-scroll"
      style={{ minHeight: "calc(var(--vh, 1vh) * 100)" }}
    >
      {top && top}
      {children}
      {bottom && bottom}
      {srcs && srcs?.srcs?.length > 0 && (
        <ImageViewer images={srcs?.srcs!} startIndex={srcs?.startIndex} />
      )}
    </div>
  );
}

export default Layout;
