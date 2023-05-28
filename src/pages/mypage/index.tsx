import React, { ReactElement } from "react";
import Navigation from "@/components/Common/Navigation";
import router from "next/router";

import Layout from "@/components/Layout";
import LoginButton from "@/components/LoginButton";
import { signIn, useSession } from "next-auth/react";
import Overlay from "@/components/Common/Overlay";
import Lottie from "@/components/Common/Lottie";
import useIsInApp from "@/hooks/useIsInApp";
import InAppInfo from "@/components/InAppInfo";

const MYPAGE_MENU = [{ text: "내가 쓴 글 보기", value: "/mypage/list" }];

function Mypage() {
  const { status, data } = useSession();
  const { isInApp } = useIsInApp();

  const isUnauthenticated = status === "unauthenticated";
  const isLoading = status === "loading";

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
    return <InAppInfo />;
  }

  return (
    <article className="w-full pt-8 pb-14 mx-auto max-w-7xl px-4 bg-black relative">
      {isUnauthenticated ? (
        <LoginButton onClick={() => signIn("google")} />
      ) : (
        <section>
          <div className="flex flex-col">
            <div className="flex items-center">
              <p className="text-md font-medium text-gray-100 mr-2">
                {data?.user?.name}님
              </p>
              <p>안녕하세요!</p>
            </div>
            <div className="mt-6">
              <ul>
                {MYPAGE_MENU.map((item, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() =>
                        router.push(
                          `${item.value}?email=${data?.user?.email}`
                          // item.value
                        )
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
        </section>
      )}
    </article>
  );
}

Mypage.getLayout = (page: ReactElement) => {
  return <Layout bottom={<Navigation />}>{page}</Layout>;
};

export default Mypage;
