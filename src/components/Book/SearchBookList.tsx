import { NaverBook } from "@/utils/api/type";
import React from "react";
import BookInfo from "./BookInfo";

interface Props {
  bookList: NaverBook[];
  selectedBook: NaverBook | null;
  onSelectedBook: (book: NaverBook) => void;
  onPagination: (step: string) => void;
}
function SearchBookList(
  { bookList, selectedBook, onSelectedBook, onPagination }: Props,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const hasList = bookList?.length > 0;
  return (
    <div
      className="max-h-64 h-auto overflow-scroll rounded pt-2 pb-3"
      ref={ref}
    >
      {bookList?.map((item: NaverBook, index: number) => {
        return (
          <BookInfo key={index} item={item} onSelectedBook={onSelectedBook} />
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
