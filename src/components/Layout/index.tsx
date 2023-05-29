import React, { ReactNode, useEffect, useState } from "react";

import { useRecoilState } from "recoil";
import { imageZoomState, modeState, popupState } from "@/store/common";
import ImageViewer from "../ImageViewer";
import Popup from "../Common/Popup";
import { Background } from "./Background";
import { useRouter } from "next/router";

//TODO: layout 여러차례 렌더링
//TODO: 다크모드 임시임 수정해야함

function Layout({
  children,
  bottom,
  top,
}: {
  children: ReactNode;
  bottom?: ReactNode;
  top?: ReactNode;
}) {
  const [srcs] = useRecoilState(imageZoomState);
  const [popup] = useRecoilState(popupState);
  const [colorMode, setIsModeOn] = useRecoilState(modeState);

  const [mode, setMode] = useState(false);
  const router = useRouter();
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

  useEffect(() => {
    const isReadPage = router.asPath.indexOf("read") > -1;
    if (router.isReady && isReadPage) {
      const isDetailPage =
        router.asPath.split("/read").filter((v) => v).length > 0;
      if (isDetailPage) {
        setMode(true);
        setIsModeOn({ isWhite: true });
      }
    } else {
      setMode(false);
      setIsModeOn({ isWhite: false });
    }

    return () => {
      setMode(false);
      setIsModeOn({ isWhite: false });
    };
  }, [router.asPath, router.isReady, setIsModeOn]);

  return (
    <>
      <Background color={mode ? "bg-neutral-200" : "bg-neutral-900"} />
      <div
        className={`flex flex-col items-center max-w-[540px] w-full min-h-full mx-auto ${
          mode ? "bg-white" : "bg-black"
        }`}
        style={{ minHeight: "calc(var(--vh, 1vh) * 100)" }}
      >
        {top && top}
        {children}
        {bottom && bottom}
        {srcs && srcs?.srcs?.length > 0 && (
          <ImageViewer images={srcs?.srcs!} startIndex={srcs?.startIndex} />
        )}
        {popup?.isOpen && (
          <Popup
            onClickConfirm={popup.callback}
            text={popup.message}
            isOpen={popup.isOpen}
          />
        )}
      </div>
    </>
  );
}

export default Layout;
