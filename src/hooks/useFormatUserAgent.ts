import { useEffect } from "react";

function useFormatUserAgent() {
  useEffect(() => {
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
