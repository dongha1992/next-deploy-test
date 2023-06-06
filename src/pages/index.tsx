import { ReactElement, useEffect } from "react";

import Layout from "@/components/Layout";
import Navigation from "@/components/Common/Navigation";
import { popupState } from "@/store/common";
import { useRecoilState } from "recoil";
import BookAnimation from "@/components/Animation/book";

export default function Home() {
  const [popup, setPopup] = useRecoilState(popupState);

  useEffect(() => {
    setPopup({
      message: (
        <>
          <p>테스트 페이지입니다</p>
          <p className="text-sm">
            이 페이지에 뭘 해야 할까요,,, 아이디어 주세요,,,
          </p>
        </>
      ),
      isOpen: true,
    });
  }, [setPopup]);

  return (
    <>
      <BookAnimation />
    </>
  );
}

Home.getLayout = (page: ReactElement) => {
  return <Layout bottom={<Navigation />}>{page}</Layout>;
};
