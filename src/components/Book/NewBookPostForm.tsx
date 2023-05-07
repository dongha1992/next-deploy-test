import { useState } from "react";
import Button from "../Common/Button";
import TextArea from "../Common/TextArea";

import ImageBox from "../Common/ImageBox";

interface Props {
  onSubmit: any;
  className: string;
  value?: string;
}

export default function NewBookPostForm({
  value,
  onSubmit,
  className = "",
}: Props) {
  const [images, setImages] = useState<Array<string>>([]);

  const setImageHandler = (image: any) => {
    console.log(typeof image);
    alert("아직 개발 중!");
  };

  return (
    <>
      <form onSubmit={onSubmit} className={className} action="#" method="POST">
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <TextArea className="h-96" name="text" value={value} />
          <ImageBox setImageValue={setImageHandler} />
          <div>
            <Button type="submit">제출</Button>
          </div>
        </div>
      </form>
    </>
  );
}
