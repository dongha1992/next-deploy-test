import { useSession } from "next-auth/react";
import router from "next/router";
import { useRecoilState } from "recoil";

import { popupState } from "@/store/common";

function useCheckAuth() {
  const { status } = useSession();
  const [popup, setPopup] = useRecoilState(popupState);
  const isUnauthenticated = status === "unauthenticated";

  const checkAuthHandler = (callback: any) => {
    if (isUnauthenticated) {
      return setPopup({
        message: "로그인 후 이용해주세요!",
        callback: () => router.push("/auth/signin"),
        isOpen: true,
      });
    } else {
      return callback && callback();
    }
  };

  return {
    checkAuthHandler,
  };
}

export default useCheckAuth;
