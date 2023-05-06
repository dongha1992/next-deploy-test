import { SearchUnActiveIcon } from "@/utils/svg";
import React, { useCallback, useRef } from "react";

function Input({ name, className, onSubmit, button, ...inputProps }: any) {
  const value = inputProps.value;

  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = useCallback(() => inputRef.current?.focus(), []);

  return (
    <form onSubmit={onSubmit}>
      <div
        className="flex items-center border-b border-indigo-600 py-2"
        onClick={handleClick}
      >
        <SearchUnActiveIcon />
        <input
          {...inputProps}
          name={name}
          className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none focus:ring-0"
          type="text"
          placeholder="검색어를 입력해주세요."
          aria-label="검색"
          ref={inputRef}
          value={value}
          onChange={(e) => {
            inputProps.onChange?.(e);
          }}
        />
        {button && button}
      </div>
    </form>
  );
}

export default Input;
