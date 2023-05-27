import React from "react";
import Image from "next/image";

import Button from "./Common/Button";

function LoginButton(onClick: any) {
  return (
    <Button
      className="flex bg-white text-black p-4 rounded-md text-md w-100 hover:bg-white focus:outline-none focus:ring-0"
      role="button"
      onClick={onClick}
    >
      <Image
        src="/img/google_logo.png"
        alt="구글 로고"
        width={25}
        height={25}
      />
      <span className="ml-4">구글로 시작하기</span>
    </Button>
  );
}

export default LoginButton;
