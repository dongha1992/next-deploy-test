import React, { ReactElement, useState } from "react";
import Navigation from "@/components/Common/Navigation";
import router from "next/router";
import { useRecoilState } from "recoil";

import Layout from "@/components/Layout";
import LoginButton from "@/components/LoginButton";
import { signIn, useSession, signOut } from "next-auth/react";
import Overlay from "@/components/Common/Overlay";
import Lottie from "@/components/Common/Lottie";
import useIsInApp from "@/hooks/useIsInApp";
import InAppInfo from "@/components/InAppInfo";
import Border from "@/components/Common/Border";
import Button from "@/components/Common/Button";
import Spacing from "@/components/Common/Spacing";
import { popupState } from "@/store/common";
import Input from "@/components/Common/Input";
import axios from "axios";

const MYPAGE_MENU = [{ text: "내가 쓴 글 보기", value: "/mypage/list" }];

const ChangeNameModal = () => {
  const { status, data, update } = useSession();
  const [popup, setPopup] = useRecoilState(popupState);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const { changeName } = e.target.elements;
    const name = changeName.value;
    update({ name });
    setPopup({
      isOpen: false,
    });
    await axios.patch("/api/auth");
  };
  return (
    <section>
      <form onSubmit={onSubmit} className="flex justify-between">
        <Input
          name="changeName"
          className="w-75"
          placeholder="변경할 별명을 입력해주세요."
        />
        <Button className="w-50" type="submit">
          수정하기
        </Button>
      </form>
    </section>
  );
};
function Mypage() {
  const { status, data, update } = useSession();
  const { isInApp } = useIsInApp();
  const [popup, setPopup] = useRecoilState(popupState);

  const [isShowUpdateInput, setIsShowUpdateInput] = useState(false);

  const isUnauthenticated = status === "unauthenticated";
  const isLoading = status === "loading";

  const onUpateUserHandler = () => {
    setPopup({
      message: <ChangeNameModal />,
      isOpen: true,
      hasCustomButton: true,
    });
  };

  if (isLoading) {
    return (
      <Overlay>
        <Lottie
          src="https://assets8.lottiefiles.com/private_files/lf30_gqirhcr7.json"
          loop={false}
        />
      </Overlay>
    );
  }

  if (isInApp) {
    return (
      <div className="mt-4">
        <InAppInfo />
      </div>
    );
  }

  return (
    <article className="w-full pt-8 pb-14 mx-auto max-w-7xl px-4 bg-black relative">
      {isUnauthenticated ? (
        <div className="flex justify-center">
          <LoginButton onClick={() => signIn("google")} />
        </div>
      ) : (
        <section className="flex flex-col justify-between h-[85vh] md:h-[90vh]">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex">
                <p className="text-md font-medium text-gray-100 mr-2">
                  {data?.user?.name}님
                </p>
                <p>안녕하세요!</p>
              </div>
              <Button
                className="w-15 mt-0"
                onClick={() => onUpateUserHandler()}
              >
                정보 수정하기
              </Button>
            </div>

            <Spacing size={20} />
            <Border size={1} />
            <div className="mt-6">
              <ul>
                {MYPAGE_MENU.map((item, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() =>
                        router.push(`${item.value}?email=${data?.user?.email}`)
                      }
                      className="cursor-pointer"
                    >
                      {item.text}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <Button onClick={() => signOut()}>로그아웃</Button>
        </section>
      )}
    </article>
  );
}

Mypage.getLayout = (page: ReactElement) => {
  return <Layout bottom={<Navigation />}>{page}</Layout>;
};

export default Mypage;
