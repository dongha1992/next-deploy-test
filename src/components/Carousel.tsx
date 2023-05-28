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
      role="button"
      onClick={onClick}
      className="absolute top-1/2 transform -translate-y-1/2 right-1 z-50 bg-gray-600 w-8 h-8 rounded-full"
    >
      <span className="text-xl text-bold text-white absolute right-2">
        {">"}
      </span>
    </div>
  );
};

const PreviousArrow = ({ onClick }: any) => {
  return (
    <div
      role="button"
      onClick={onClick}
      className="absolute top-1/2 transform -translate-y-1/2 left-1 z-50 text-xl text-bold bg-gray-600 w-8 h-8 rounded-full text-white"
    >
      <span className="text-xl text-bold text-white absolute left-2">
        {"<"}
      </span>
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
      className="relative max-w-[640px] min-w-[400px] w-full"
    >
      <Slider {...settings}>
        {images.map((src: string, index: number) => {
          return (
            <Image
              src={src}
              key={index}
              className={"review-image"}
              alt="리뷰 이미지"
              width={600}
              height={600}
            />
          );
        })}
      </Slider>
    </section>
  );
};

export default React.memo(Carousel);
