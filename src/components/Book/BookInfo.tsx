import React, { useState } from "react";
import Image from "next/image";

import { NaverBook } from "@/utils/api/type";
import { classnames } from "@/utils/classnames";
import formatDate from "@/utils/formatDate";

//TODO: 이거 컴포넌트 컴파운드로 리팩토링 진짜 안 하면 코딩 접어야함

const MAX_DESCRIPTION_LENGTH = 120;
interface Props {
  item: NaverBook;
  onSelectedBook?: (book: NaverBook) => void;
  className?: string;
  withTitle?: boolean;
  isDetail?: boolean;
}

function BookInfo({
  item,
  onSelectedBook,
  className = "m-auto p-2",
  withTitle = true,
  isDetail,
}: Props) {
  const [isMore, setIsMore] = useState(false);

  const onClickMore = () => {
    setIsMore((prev) => !prev);
  };

  const hasMoreButton = item?.description.length > MAX_DESCRIPTION_LENGTH;

  return (
    <div
      className={classnames(
        // selectedBook && selectedBook?.isbn === item?.isbn && "border",
        "flex rounded-md cursor-pointer overflow-scroll",
        className
      )}
      style={{ height: "100%", minHeight: "170px", maxHeight: "1200px" }}
      onClick={() => onSelectedBook && onSelectedBook(item)}
    >
      <div
        className="relative flex-shrink-0 w-28 h-42"
        style={{ height: "170px" }}
      >
        {item?.image && <Image src={item.image} fill alt="책 이미지" />}
      </div>
      <div className="ml-2 h-auto">
        <div className="flex flex-col justify-between">
          {withTitle && (
            <p className="text-sm font-semibold text-gray-100 mb-2 mr-2">
              {item?.title}
            </p>
          )}

          <p className="text-xs  md:text-sm lg:text-sm text-gray-100">
            {item?.author?.replaceAll("^", ", ")}
          </p>
          <div className="flex mt-1">
            <p className="text-xs  md:text-sm lg:text-sm mr-2 text-gray-100">
              {item?.publisher}
            </p>
            {item?.pubdate && (
              <p className="text-xs text-gray-100">
                {formatDate(item?.pubdate)}
              </p>
            )}
          </div>
          <div className="text-xs mt-2">
            {hasMoreButton && isDetail ? (
              <div>
                {!isMore
                  ? `${item.description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
                  : item.description}
                <div className="mt-1" onClick={onClickMore}>
                  {isMore ? "접기" : "더보기"}
                </div>
              </div>
            ) : (
              `${item?.description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookInfo;
