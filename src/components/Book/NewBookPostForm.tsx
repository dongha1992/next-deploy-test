import { useState } from "react";
import Button from "../Button";

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
        <div>
          <Button type="submit">제출</Button>
        </div>
      </div>
    </form>
  );
}
