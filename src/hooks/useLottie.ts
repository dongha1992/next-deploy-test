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

// /** unmount가 된 컴포넌트에서 상태 업데이트를 하려고 할 때 메모리 릭 에러 나오는데 그거 방지용
//  *  주로 fetch 후 state 업데이트 하는 컴포넌트에서 state 업데이트 전 router로 컴포넌트 변경할 때 발생
//  *  사용법 :
//  *  const safeSetState = useSafeDispatch(unSafeSetState)
//  *  safeSetState(...)
//  */

// function useSafeDispatch(dispatch: Dispatch<any>): Dispatch<any> {
//   const mountedRef = useRef<boolean>(false);

//   useLayoutEffect((): void | any => {
//     mountedRef.current = true;
//     return () => (mountedRef.current = false);
//   }, []);

//   return useCallback(
//     (action) => {
//       return mountedRef.current ? dispatch({ ...action }) : 0;
//     },
//     [dispatch]
//   );
// }
