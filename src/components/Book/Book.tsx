import React from "react";
import Image from "next/image";

import { NaverBook } from "@/utils/api/type";
import { classnames } from "@/utils/classnames";

interface Props {
  item: NaverBook;
  selectedBook?: NaverBook | null;
  onSelectedBook?: (book: NaverBook) => void;
}

function Book({ item, selectedBook, onSelectedBook }: Props) {
  return (
    <div
      className={classnames(
        selectedBook?.isbn === item.isbn && "border",
        "flex m-auto p-2 rounded-md min-h-120 "
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
          <p className="text-sm font-semibold text-gray-100 ">{item?.title}</p>
          <p className="text-xs mt-2 text-gray-100">{item?.author}</p>
          <div className="flex mt-1">
            <p className="text-xs mr-2 text-gray-100">{item?.publisher}</p>
            <p className="text-xs text-gray-100">{item?.pubdate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Book;
