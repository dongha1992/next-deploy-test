import React from "react";
import TextArea from "../Common/TextArea";
import Button from "../Common/Button";
import Input from "../Common/Input";

interface Props {
  onSubmit: any;
  className: string;
  value?: string;

  isLoading?: boolean;
}

export default function NewNovelPostForm({ value, onSubmit }: Props) {
  return (
    <form onSubmit={onSubmit} action="#" method="POST">
      <div className="rounded-md shadow-sm -space-y-px">
        <Input
          placeholder="제목을 입력해주세요."
          className="border-gray-600 mb-6"
        />
        <TextArea name="text" value={value} style={{ height: "70vh" }} />
        <div>
          <Button type="submit">제출</Button>
        </div>
      </div>
    </form>
  );
}
