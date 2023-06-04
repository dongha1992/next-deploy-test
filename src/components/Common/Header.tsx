import useIsInApp from "@/hooks/useIsInApp";
import { modeState } from "@/store/common";
import { getZIndex } from "@/utils/getZIndex";
import { ArrowBackIcon } from "@/utils/svg";
import router from "next/router";
import React, { ReactNode } from "react";
import { useRecoilState } from "recoil";

interface Props {
  children?: ReactNode;
}

function Header({ children }: Props) {
  const { isInApp } = useIsInApp();
  const [mode, setIsModeOn] = useRecoilState(modeState);

  const onNavigateHandler = () => {
    isInApp ? router.push("/book") : router.back();
  };
  return (
    <div
      className="sticky top-0 bg-black flex w-full justify-between align-center py-4 px-4"
      style={{ zIndex: getZIndex("stickyHeader") }}
    >
      <div onClick={onNavigateHandler} role="button">
        <ArrowBackIcon color={mode?.isWhite ? "#242424" : "#FFFFFF"} />
      </div>
      {children}
      <div />
    </div>
  );
}

function StickyHeader({ children }: Props) {
  const { isInApp } = useIsInApp();
  const [mode, setIsModeOn] = useRecoilState(modeState);

  const onNavigateHandler = () => {
    isInApp ? router.push("/book") : router.back();
  };
  return (
    <div
      className="sticky top-0 w-full bg-white justify-between align-center py-4 px-4 border-b-[1px] border-gray-500"
      style={{ zIndex: getZIndex("stickyHeader") }}
    >
      <div onClick={onNavigateHandler} role="button">
        <ArrowBackIcon color={mode?.isWhite ? "#242424" : "#FFFFFF"} />
      </div>
      {children}
      <div />
    </div>
  );
}

export { StickyHeader, Header };
