import React from "react";
import Image from "next/image";
import { CancelIcon } from "@/utils/svg";

interface Props {
  src: any;
  onRemove: any;
}
export function ReviewImagePreview({ src, onRemove }: Props) {
  return (
    <div className="relative w-72 h-72 bg-gray-200 rounded-lg m-16px 0 48px 8px border-none">
      <Image
        className="h-20 w-20 rounded-md"
        src={src}
        width="72"
        height="72"
        alt="책 사진 프리뷰"
      />
      <div
        className="absolute right-2 top-2 cursor-pointer"
        onClick={() => onRemove()}
      >
        <CancelIcon />
      </div>
    </div>
  );
}
