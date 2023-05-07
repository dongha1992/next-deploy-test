import React from "react";
import Image from "next/image";

import { NaverBook } from "@/utils/api/type";
import { classnames } from "@/utils/classnames";

//TODO: 이거 컴포넌트 컴파운도로 리팩토링 진짜 안 하면 코딩 접어야함

interface Props {
  item: NaverBook;
  selectedBook?: NaverBook | null;
  onSelectedBook?: (book: NaverBook) => void;
  className?: string;
  withTitle?: boolean;
}

function BookInfo({
  item,
  selectedBook,
  onSelectedBook,
  className = "m-auto p-2",
  withTitle = true,
}: Props) {
  return (
    <div
      className={classnames(
        selectedBook && selectedBook?.isbn === item.isbn && "border",
        "flex rounded-md min-h-120",
        className
      )}
      onClick={() => onSelectedBook && onSelectedBook(item)}
    >
      <div className="flex-shrink-0 min-w-2xl ">
        {item?.image && (
          <Image src={item.image} width={70} height={120} alt="책 이미지" />
        )}
      </div>
      <div className="ml-2">
        <div className="flex flex-col justify-between ">
          {withTitle && (
            <p className="text-sm font-semibold text-gray-100 mb-2">
              {item?.title}
            </p>
          )}

          <p className="text-xs text-gray-100">{item?.author}</p>
          <div className="flex mt-1">
            <p className="text-xs mr-2 text-gray-100">{item?.publisher}</p>
            <p className="text-xs text-gray-100">{item?.pubdate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookInfo;
