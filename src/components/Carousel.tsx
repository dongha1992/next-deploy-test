import React, { useState } from "react";
import Slider from "react-slick";
import Image from "next/image";

interface IProps {
  onChange?: (currentIndex: number) => void;
  initialSlide: number;
  images: string[];
}

const NextArrow = ({ onClick }: any) => {
  return (
    <div
      onClick={onClick}
      className="absolute top-1/2 transform -translate-y-1/2 right-0 z-50"
    >
      {"->"}
    </div>
  );
};

const PreviousArrow = ({ onClick }: any) => {
  return (
    <div
      onClick={onClick}
      className="absolute top-1/2 transform -translate-y-1/2 left-0 z-50"
    >
      {"<-"}
    </div>
  );
};

const Carousel = ({ images, initialSlide, onChange }: IProps) => {
  const [isArrowShow, setIsArrowShow] = useState<boolean>(false);
  const settings = {
    arrows: isArrowShow,
    dots: false,
    initialSlide,
    spped: 500,
    sliderToShow: 1,
    slidersToScroll: 1,
    centerMode: true,
    infinite: false,
    afterChange: onChange,
    centerPadding: "0px",
    nextArrow: <NextArrow />,
    prevArrow: <PreviousArrow />,
  };

  return (
    <section
      onMouseEnter={() => {
        setIsArrowShow(true);
      }}
      onMouseLeave={() => {
        setIsArrowShow(false);
      }}
      className="relative max-w-[640px] min-w-[640px] w-full"
    >
      <Slider {...settings}>
        {images.map((src: string, index: number) => {
          return (
            <Image
              src={src}
              key={index}
              className={"review-image"}
              width={100}
              height={100}
              alt="리뷰 이미지"
            />
          );
        })}
      </Slider>
    </section>
  );
};

export default React.memo(Carousel);
