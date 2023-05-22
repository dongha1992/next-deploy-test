import { useEffect } from "react";

let cnt = 0;

function useFormatUserAgent() {
  const replaceUrl = () => {
    if (cnt > 2) return;
    console.log(navigator.userAgent);
    // if (navigator.userAgent.indexOf("KAKAO")) {
    //   window.location.href = `${process.env.NEXTAUTH_URL}/book`;
    // } else if (navigator.userAgent.indexOf("Instagram")) {
    //   window.location.href = `${process.env.NEXTAUTH_URL}/book`;
    // }
    cnt++;
  };

  useEffect(() => {
    replaceUrl();
    // const USER_AGENT =
    //   "Mozilla/5.0 AppleWebKit/535.19 Chrome/56.0.0 Mobile Safari/535.19";
    // if (typeof window !== undefined) {
    //   const navigatorClone = Object.assign({}, window.navigator);
    //   Object.defineProperties(navigatorClone, {
    //     userAgent: {
    //       get: () => USER_AGENT,
    //     },
    //   });
    //   Object.defineProperty(window, "navigator", {
    //     value: navigatorClone,
    //     configurable: true,
    //   });
    // }
  }, []);
}

export default useFormatUserAgent;
