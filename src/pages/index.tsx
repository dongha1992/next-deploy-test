import { ReactElement, useEffect } from "react";

import Layout from "@/components/Layout";
import Navigation from "@/components/Common/Navigation";
import { popupState } from "@/store/common";
import { useRecoilState } from "recoil";
import BookAnimation from "@/components/Animation/book";

export default function Home() {
  const [popup, setPopup] = useRecoilState(popupState);

  // useEffect(() => {
  //   setPopup({
  //     message: (
  //       <>
  //         <p>테스트 페이지입니다</p>
  //         <p className="text-sm">
  //           이 페이지에 뭘 해야 할까요,,, 아이디어 주세요,,,
  //         </p>
  //       </>
  //     ),
  //     isOpen: true,
  //   });
  // }, [setPopup]);

  return (
    <section className="relative w-full pt-8 pb-14 mx-auto max-w-7xl px-4 bg-black">
      <article>
        <h2 className="ml-4 mb-2">최근 올라온 책들</h2>
        <div className="flex">
          <BookAnimation />
          <BookAnimation />
          <BookAnimation />
        </div>
      </article>
    </section>
  );
}

Home.getLayout = (page: ReactElement) => {
  return <Layout bottom={<Navigation />}>{page}</Layout>;
};
