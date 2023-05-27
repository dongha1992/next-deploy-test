import { useEffect } from "react";

function useKakao() {
  const initKakao = () => {
    try {
      if (!window.Kakao.isInitialized()) {
        if (typeof window !== undefined) {
          window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_KEY);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    initKakao();
  }, []);
}

export default useKakao;
