import React, { ReactElement, useState } from "react";
import Navigation from "@/components/Common/Navigation";
import router from "next/router";
import { useRecoilState } from "recoil";
import { signIn, useSession, signOut } from "next-auth/react";
import Image from "next/image";

import Layout from "@/components/Layout";
import LoginButton from "@/components/LoginButton";
import Overlay from "@/components/Common/Overlay";
import Lottie from "@/components/Common/Lottie";
import useIsInApp from "@/hooks/useIsInApp";
import InAppInfo from "@/components/InAppInfo";
import Border from "@/components/Common/Border";
import Button from "@/components/Common/Button";
import Spacing from "@/components/Common/Spacing";
import { popupState } from "@/store/common";
import Input from "@/components/Common/Input";

import { usePathcUserProfile } from "@/query/mypage";
import { EditActiveIcon } from "@/utils/svg";
import ImageBox from "@/components/Common/ImageBox";
import useS3Upload from "@/hooks/useS3Upload";

const MYPAGE_MENU = [{ text: "내가 쓴 글 보기", value: "/mypage/list" }];

function Mypage() {
  const { status, data, update } = useSession();
  const { isInApp } = useIsInApp();
  const [popup, setPopup] = useRecoilState(popupState);

  const isUnauthenticated = status === "unauthenticated";
  const isLoading = status === "loading";

  const onUpateUserHandler = () => {
    setPopup({
      message: (
        <ChangeNameModal
          name={data?.user?.name!}
          profileSrc={data?.user?.image!}
        />
      ),
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
                  {data?.user?.name || "익명의 유저"}님
                </p>
                <p>안녕하세요!</p>
              </div>
              <Button
                className="w-15 mt-0"
                onClick={() => onUpateUserHandler()}
              >
                이름 변경하기
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

const ChangeNameModal = ({
  name,
  profileSrc,
}: {
  name: string;
  profileSrc: string;
}) => {
  const [profileImage, setImages] = useState([profileSrc]);

  const { mutate: mutateProfile } = usePathcUserProfile();
  const { isImageLoading, setImageHandler } = useS3Upload(setImages);

  //TODO: useS3Upload에서 set해주는 로직 수정하기 전 임시
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const { changeName } = e.target.elements;
    const name = changeName.value;
    mutateProfile({
      name,
      profileImage: profileImage[profileImage.length - 1],
    });
  };

  return (
    <>
      <section className="flex flex-col justify-center items-center">
        {isImageLoading && (
          <div className="absolute left-50">
            <Lottie
              className="w-56"
              src="https://assets8.lottiefiles.com/private_files/lf30_gqirhcr7.json"
              loop={false}
            />
          </div>
        )}
        <div className="relative h-20 w-20" role="button">
          <ImageBox setImageValue={setImageHandler} isEdit={true} />
          {profileImage.length &&
            profileImage.map((src) => {
              return (
                <Image
                  key={src}
                  src={src}
                  className="rounded-full"
                  style={{ objectFit: "cover" }}
                  fill
                  alt="아바타 사진"
                />
              );
            })}

          <EditActiveIcon
            className="absolute h-12 w-12"
            aria-hidden="true"
            style={{ right: "-15%", bottom: "-10%" }}
          />
        </div>
        <form onSubmit={onSubmit} className="flex flex-col justify-between">
          <Input
            name="changeName"
            className="w-75"
            placeholder="변경할 이름을 입력해주세요."
            inputprops={{ title: name }}
          />
          <Button className="w-100 mt-5" type="submit">
            수정
          </Button>
        </form>
      </section>
    </>
  );
};

export default Mypage;
