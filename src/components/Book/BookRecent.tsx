import React from "react";
import BookAnimation from "../Animation/book";

interface Props {
  image: string;
  title: string;
  author: string;
  onClick: () => void;
  description: string;
}
const MAX_RECENT_DESCRIPTION_LENGTH = 60;

function BookRecent({ image, title, author, description, onClick }: Props) {
  const formatTitle = (str: string) => str.replace(/\(.*\)/, "");
  const hasMoreButton = description.length > MAX_RECENT_DESCRIPTION_LENGTH;

  return (
    <div>
      <BookAnimation src={image} />
      <div className="ml-2" onClick={onClick}>
        <div className="flex flex-col justify-between">
          <div className="h-18">
            <p className="text-sm font-semibold text-gray-100 mb-2 mr-2 h-10">
              {formatTitle(title)}
            </p>
            <p className="text-xs md:text-sm lg:text-sm text-gray-100">
              {author?.replaceAll("^", ", ")}
            </p>
          </div>
          <div className="text-xs mt-2">
            {hasMoreButton ? (
              <span>
                {`${description.slice(0, MAX_RECENT_DESCRIPTION_LENGTH)}...`}
              </span>
            ) : (
              <span>{description}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookRecent;
