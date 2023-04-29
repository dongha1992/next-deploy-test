import React from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

interface Props {
  user: any;
  post: any;
  className?: string;
}

function Comment({ user = {}, post = {}, className }: Props) {
  return (
    <div className={twMerge("flex items-center m-auto", className)}>
      <div className="flex-shrink-0 min-w-2xl">
        {user?.image && (
          <Image
            className="h-12 w-12 rounded-full"
            src={user.image}
            width={50}
            height={50}
            alt=""
          />
        )}
      </div>
      <div className="ml-4 flex-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-100">{user?.name}</p>
          <p className="pl-5 text-sm text-gray-300">
            {/* {formatTimeAgo(post.createdAt)} */}
            {post?.createdAt?.split("T")[0] ?? ""}
          </p>
        </div>
        <div className="flex-1 mt-1">
          <p className="text-xl font-semibold text-gray-100">{post?.title}</p>
        </div>
      </div>
    </div>
  );
}

export default Comment;
