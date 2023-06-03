import React from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

import Setting from "./Setting";
interface Props {
  user: any;
  comment: any;
  className?: string;
  onDelete?: () => void;
  onEdit?: () => void;
  isAuth?: boolean;
  textColor?: string;
}

function Comment({
  user = {},
  comment = {},
  className,
  onDelete,
  onEdit,
  isAuth,
  textColor,
}: Props) {
  const customTextColor = textColor ? textColor : "text-gray-100";
  return (
    <div className={twMerge("flex items-center m-auto mt-7 ", className)}>
      <div className="flex-shrink-0 min-w-2xl">
        {user?.image && (
          <Image
            className="h-8 w-8 rounded-full"
            src={user.image}
            width={10}
            height={10}
            alt=""
          />
        )}
      </div>
      <div className="ml-4 flex-1">
        <div className="flex items-center justify-between">
          <p className={`text-xs font-medium ${customTextColor}`}>
            {user?.name}
          </p>
          <p className={`pl-5 text-xs ${customTextColor}`}>
            {/* {formatTimeAgo(post.createdAt)} */}
            {comment?.createdAt?.split("T")[0] ?? ""}
          </p>
        </div>
        <div className="flex mt-1 items-center justify-between">
          <p className={`text-xs md:text-sm break-all ${customTextColor}`}>
            {comment?.text}
          </p>
          {isAuth && (
            <Setting
              onDelete={onDelete}
              onEdit={onEdit}
              customTextColor={customTextColor}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Comment;
