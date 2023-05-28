import { ArrowBackIcon } from "@/utils/svg";
import router from "next/router";
import React, { PropsWithChildren, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

function Header({ children }: Props) {
  const onNavigateHandler = () => {
    router.back();
  };
  return (
    <div className="flex w-full justify-between align-center py-4 px-4">
      <div onClick={onNavigateHandler}>
        <ArrowBackIcon />
      </div>
      {children}
      <div />
    </div>
  );
}

export default Header;
