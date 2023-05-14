import { useState } from "react";
import Button from "../Common/Button";
import TextArea from "../Common/TextArea";

import ImageBox from "../Common/ImageBox";
import Lottie from "../Common/Lottie";
import Overlay from "../Common/Overlay";

interface Props {
  onSubmit: any;
  className: string;
  value?: string;
  setImageHandler: (e: any) => void;
  isLoading?: boolean;
}

export default function NewBookPostForm({
  value,
  onSubmit,
  setImageHandler,
  isLoading,
  className = "",
}: Props) {
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
          <ImageBox setImageValue={setImageHandler} />
          <div>
            <Button type="submit">제출</Button>
          </div>
        </div>
      </form>
    </>
  );
}
