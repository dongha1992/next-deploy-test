import { useEffect, useState } from "react";

function useIsInApp() {
  const [isInApp, setIsInApp] = useState(false);

  useEffect(() => {
    if (typeof window !== undefined) {
      const userAgent = window?.navigator.userAgent!;
      if (
        userAgent.match(/kakaotalk/i) ||
        userAgent.match(/instagram/i) ||
        userAgent.match(/FB_IAB/i)
      ) {
        setIsInApp(true);
      }
    }
  }, []);

  return { isInApp };
}

export default useIsInApp;
