import { useSession } from "next-auth/react";
import React, { ReactNode } from "react";

import { useRecoilState } from "recoil";
import { imageZoomState } from "@/store/common";
import ImageViewer from "../ImageViewer";

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
  console.log(srcs);

  return (
    <div className="flex flex-col items-center max-w-[540px] w-full min-h-full h-screen mx-auto bg-black overflow-y-scroll">
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
