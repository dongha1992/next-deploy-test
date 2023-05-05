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
        <SearchIcon />
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

function SearchIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 21L16.9862 16.9791M19.2105 11.6053C19.2105 13.6223 18.4093 15.5567 16.983 16.983C15.5567 18.4093 13.6223 19.2105 11.6053 19.2105C9.58822 19.2105 7.65379 18.4093 6.22753 16.983C4.80127 15.5567 4 13.6223 4 11.6053C4 9.58822 4.80127 7.65379 6.22753 6.22753C7.65379 4.80127 9.58822 4 11.6053 4C13.6223 4 15.5567 4.80127 16.983 6.22753C18.4093 7.65379 19.2105 9.58822 19.2105 11.6053Z"
        stroke="#ffff"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
