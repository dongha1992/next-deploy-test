import { NaverBook } from "@/utils/api/type";
import React from "react";
import Image from "next/image";
import { classnames } from "@/utils/classnames";

interface Props {
  bookList: NaverBook[];
  selected: string | null;
  setSelected: (isbn: string) => void;
  onPagination: (step: string) => void;
}
function SearchBookList(
  { bookList, selected, setSelected, onPagination }: Props,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const hasList = bookList?.length > 0;
  return (
    <div className="max-h-64 h-auto overflow-scroll" ref={ref}>
      {bookList?.map((item: NaverBook, index: number) => {
        return (
          <div
            key={index}
            className={classnames(
              selected === item.isbn && "border",
              "flex m-auto p-2 rounded-md min-h-120 "
            )}
            onClick={() => setSelected(item.isbn)}
          >
            <div className="flex-shrink-0 min-w-2xl ">
              {item?.image && (
                <Image
                  src={item.image}
                  width={70}
                  height={120}
                  alt="책 이미지"
                />
              )}
            </div>
            <div className="ml-2">
              <div className="flex flex-col justify-between ">
                <p className="text-sm font-semibold text-gray-100 ">
                  {item?.title}
                </p>
                <p className="text-xs mt-2 text-gray-100">{item?.author}</p>
                <div className="flex mt-1">
                  <p className="text-xs mr-2 text-gray-100">
                    {item?.publisher}
                  </p>
                  <p className="text-xs text-gray-100">{item?.pubdate}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {hasList && (
        <div className="flex w-100 align-center justify-center pt-2">
          <button
            className="inline-flex items-center px-2 py-2 text-xs font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={() => onPagination("이전")}
          >
            이전
          </button>
          <button
            className="inline-flex items-center px-2 py-2 ml-3 text-xs font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={() => onPagination("다음")}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
}

export default React.forwardRef(SearchBookList);
