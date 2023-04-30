import React from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

interface Props {
  user: any;
  comment: any;
  className?: string;
}

function Comment({ user = {}, comment = {}, className }: Props) {
  return (
    <div className={twMerge("flex items-center m-auto mt-7", className)}>
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
          <p className="text-sm font-medium text-gray-100">{user?.name}</p>
          <p className="pl-5 text-sm text-gray-300">
            {/* {formatTimeAgo(post.createdAt)} */}
            {comment?.createdAt?.split("T")[0] ?? ""}
          </p>
        </div>
        <div className="flex-1 mt-1">
          <p className="text-md font-semibold text-gray-100 break-all">
            {comment?.text}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Comment;
