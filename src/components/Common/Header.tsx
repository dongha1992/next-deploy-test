import { modeState } from "@/store/common";
import { ArrowBackIcon } from "@/utils/svg";
import router from "next/router";
import React, { ReactNode } from "react";
import { useRecoilState } from "recoil";

interface Props {
  children?: ReactNode;
}

function Header({ children }: Props) {
  const [mode, setIsModeOn] = useRecoilState(modeState);

  const onNavigateHandler = () => {
    router.back();
  };
  return (
    <div className="flex w-full justify-between align-center py-4 px-4">
      <div onClick={onNavigateHandler} role="button">
        <ArrowBackIcon color={mode?.isWhite ? "#242424" : "#FFFFFF"} />
      </div>
      {children}
      <div />
    </div>
  );
}

export default Header;
