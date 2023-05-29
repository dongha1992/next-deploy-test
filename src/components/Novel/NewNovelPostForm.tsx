import React from "react";
import TextArea from "../Common/TextArea";
import Button from "../Common/Button";
import Input from "../Common/Input";

interface Props {
  onSubmit: any;
  body?: string;
  title?: string;
  className?: string;
  onChangeValue?: (e: HTMLInputElement) => void;
}

export default function NewNovelPostForm({
  body,
  title,
  className,
  onSubmit,
  onChangeValue,
}: Props) {
  return (
    <form onSubmit={onSubmit} action="#" method="POST">
      <div className="rounded-md shadow-sm -space-y-px">
        <Input
          name="title"
          placeholder="제목을 입력해주세요."
          className="border-gray-600 mb-6"
          inputprops={{
            title,
            "aria-label": "소설 제목",
            onChange: onChangeValue,
          }}
        />
        <TextArea name="text" value={body} style={{ minHeight: "75vh" }} />
        <div>
          <Button type="submit">{body ? "수정" : "작성"}</Button>
        </div>
      </div>
    </form>
  );
}
