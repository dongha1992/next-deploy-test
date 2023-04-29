import React, { useState } from "react";

export type TextAreaAttributes = {
  value?: string;
} & Pick<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  | "autoComplete"
  | "autoFocus"
  | "disabled"
  | "maxLength"
  | "minLength"
  | "name"
  | "readOnly"
  | "rows"
  | "placeholder"
  | "onChange"
  | "onFocus"
  | "onBlur"
  | "onClick"
>;

export type Props = {
  /**
   * 컴포넌트의 root element(`div`)에 추가되는 className입니다.
   */
  className?: string;

  /**
   * 에러 상태를 표시합니다.
   */
  hasError?: boolean;
} & TextAreaAttributes;

function TextArea({
  disabled,
  hasError,
  className,
  name,
  onFocus,
  onBlur,
  ...textareaAttrs
}: Props) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`${className} relative flex justify-between transition-background-color rounded-12 items-center shadow-inset-0-0-0-1px-rgba-0-0-0-0-02 font-medium text-white border-solid border-1 border-gray-500  ${
        hasError ? "bg-red-100" : ""
      }, ${isFocused ? "" : ""}`}
    >
      <textarea
        name={name}
        className="bg-transparent appearance-none overflow-hidden resize-none box-shadow-0 min-w-0 w-full text-white min-h-80 focus:border-gray-500 focus:ring-0"
        onFocus={(event) => {
          setIsFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setIsFocused(false);
          onBlur?.(event);
        }}
        {...textareaAttrs}
      />
    </div>
  );
}

export default TextArea;
