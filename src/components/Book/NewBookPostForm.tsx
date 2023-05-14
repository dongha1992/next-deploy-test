import { useState } from "react";
import Image from "next/image";

import Button from "../Common/Button";
import TextArea from "../Common/TextArea";
import ImageBox from "../Common/ImageBox";
import Lottie from "../Common/Lottie";
import Overlay from "../Common/Overlay";

interface Props {
  onSubmit: any;
  className: string;
  value?: string;
  setImageHandler: (image: any) => void;
  images: string[];
  isLoading?: boolean;
}

export default function NewBookPostForm({
  value,
  onSubmit,
  setImageHandler,
  isLoading,
  images,
  className = "",
}: Props) {
  console.log(images);
  return (
    <>
      <form onSubmit={onSubmit} className={className} action="#" method="POST">
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <TextArea className="h-96" name="text" value={value} />
          {isLoading && (
            <Overlay>
              <Lottie
                className="w-20 h-20"
                src="/lottie/loading.json"
                loop={false}
              />
            </Overlay>
          )}
          <section className="flex align-center pt-4 gap-3">
            {images.length > 0 &&
              images.map((src, index) => {
                return (
                  <div
                    key={index}
                    tabIndex={0}
                    className={
                      "relative object-contain w-20 h-20 flex justify-center align-center rounded-md"
                    }
                  >
                    <Image src={src} alt="스크린샷" fill className="rounded" />
                  </div>
                );
              })}
            {images.length < 4 && <ImageBox setImageValue={setImageHandler} />}
          </section>
          <div>
            <Button type="submit">제출</Button>
          </div>
        </div>
      </form>
    </>
  );
}
