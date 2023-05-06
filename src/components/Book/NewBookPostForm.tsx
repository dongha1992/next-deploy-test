import { useState } from "react";
import Button from "../Button";
import TextArea from "../Common/TextArea";
import Input from "../Input";
import { SearchActiveIcon } from "@/utils/svg";

export default function NewBookPostForm({
  onSubmit,
  onChange,
  className = "",
}: any) {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // onSubmit({ code, language });
  };

  const handleChange = (value: any) => {
    onChange?.(value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={className}
      action="#"
      method="POST"
    >
      <input type="hidden" name="remember" value="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        <Input
          className="mb-6"
          left={<SearchActiveIcon />}
          name="search"
          button={<Button className="w-16 p-2 m-0">검색</Button>}
        />
        <TextArea className="h-96" />
        <div>
          <Button type="submit">제출</Button>
        </div>
      </div>
    </form>
  );
}
