import { useState } from "react";
import Button from "../Common/Button";
import TextArea from "../Common/TextArea";

import ImageBox from "../Common/ImageBox";

export default function NewBookPostForm({ onSubmit, className = "" }: any) {
  const [images, setImages] = useState<Array<string>>([]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { text } = e.target.elements;
    if (!text) {
      alert("내용을 입력해주세요.");
      return;
    }
    onSubmit({ body: text.value, text: "" });
    text.value = "";
  };

  const setImageHandler = (image: any) => {
    console.log(typeof image);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={className}
        action="#"
        method="POST"
      >
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
