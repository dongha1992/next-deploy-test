import { useState } from "react";
import Button from "../Common/Button";
import TextArea from "../Common/TextArea";

import ImageBox from "../Common/ImageBox";

export default function NewBookPostForm({ onSubmit, className = "" }: any) {
  const [images, setImages] = useState<Array<string>>([]);

  const setImageHandler = (image: any) => {
    console.log(typeof image);
  };

  return (
    <>
      <form onSubmit={onSubmit} className={className} action="#" method="POST">
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <TextArea className="h-96" name="text" />
          <ImageBox setImageValue={setImageHandler} />
          <div>
            <Button type="submit">제출</Button>
          </div>
        </div>
      </form>
    </>
  );
}
