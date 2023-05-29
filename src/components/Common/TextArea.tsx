import React, { useRef, useState } from "react";

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
  style?: any;
} & TextAreaAttributes;

function TextArea({
  disabled,
  hasError,
  className,
  name,
  onFocus,
  onBlur,
  // onChange,
  value = "",
  style,
  ...textareaAttrs
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const onResizeHeight = () => {
    if (textAreaRef.current) {
      // textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + 2 + "px";
    }
  };

  return (
    <div
      className={`relative flex justify-between transition-background-color rounded-12 items-center shadow-inset-0-0-0-1px-rgba-0-0-0-0-02 font-normal text-white border-solid border-1 border-gray-500 ${
        hasError ? "bg-red-100" : ""
      } ${isFocused ? "" : ""}`}
    >
      <textarea
        name={name}
        ref={textAreaRef}
        className={`bg-transparent min-w-0 w-full max-h-56 appearance-none overflow-scroll resize-none box-shadow-0 text-white focus:border-gray-500 focus:ring-0 ${className}`}
        style={style}
        onFocus={(event) => {
          setIsFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setIsFocused(false);
          onBlur?.(event);
        }}
        onChange={onResizeHeight}
        defaultValue={value}
        {...textareaAttrs}
      />
    </div>
  );
}

export default TextArea;
