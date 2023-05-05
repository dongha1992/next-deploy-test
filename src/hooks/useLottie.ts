import React, { useLayoutEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next";

function useLottie() {
  const [isShow, setIsShow] = useState<boolean>(false);

  useLayoutEffect(() => {
    // TODO: 리팩토링
    const isShowLottie = getCookie("start-lottie");
    if (isShowLottie) return;
    setIsShow(true);
    const timer = setTimeout(() => {
      setIsShow(false);
      setCookie("start-lottie", true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return { isShow };
}

export default useLottie;
