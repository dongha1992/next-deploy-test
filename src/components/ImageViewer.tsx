import { Dialog } from "@headlessui/react";
import React, { PropsWithChildren, useState } from "react";

import { CancelIcon } from "@/utils/svg";
import Carousel from "./Carousel";
import { imageZoomState } from "@/store/common";
import { useRecoilState } from "recoil";
interface IProps {
  images: string[];
  startIndex?: number;
  isShow?: boolean;
}

const ImageViewer = ({
  images = [],
  startIndex = 0,
  isShow = false,
}: IProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(startIndex);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [srcs, setSrcs] = useRecoilState(imageZoomState);

  const onChange = (changedIndex: number) => {
    setCurrentImageIndex(changedIndex);
  };

  const closeModal = () => {
    setSrcs(null);
  };

  return (
    <ModalFullScreen>
      <section className="relative h-screen flex justify-center items-center">
        <div>
          <span className="text-white">
            {currentImageIndex + 1} / {images.length}
          </span>
          <div onClick={closeModal}>
            <CancelIcon />
          </div>
        </div>
        <Carousel
          images={images}
          initialSlide={startIndex}
          onChange={onChange}
        />
      </section>
    </ModalFullScreen>
  );
};

export default React.memo(ImageViewer);

const ModalFullScreen = ({ children }: PropsWithChildren) => {
  const handleClickDimmer = ({ target, currentTarget }: any) => {
    if (target !== currentTarget) {
      return;
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center bg-black z-50`}
      onClick={handleClickDimmer}
    >
      <div className={"relative max-w-screen-md w-full z-10 box-border"}>
        {children}
      </div>
    </div>
  );
};
