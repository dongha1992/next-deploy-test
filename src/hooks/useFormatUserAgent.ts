import React, { useEffect } from "react";

function useFormatUserAgent() {
  useEffect(() => {
    const USER_AGENT =
      "Mozilla/5.0 (Linux; Android 4.1.1; Galaxy Nexus Build/JRO03C) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19";
    if (typeof window !== undefined) {
      const navigatorClone = Object.assign({}, window.navigator);
      Object.defineProperties(navigatorClone, {
        userAgent: {
          get: () => USER_AGENT,
        },
      });
      Object.defineProperty(window, "navigator", {
        value: navigatorClone,
        configurable: true,
      });
    }
  }, []);
}

export default useFormatUserAgent;
