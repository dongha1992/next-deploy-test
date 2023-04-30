import Image from "next/image";

import PostActions from "./PostActions";
// import formatTimeAgo from "../../utils/formatTimeAgo";
import { twMerge } from "tailwind-merge";
import highlight from "@/utils/highlight";

export default function Post({
  onComment,
  onLike,
  onShare,
  post,
  user,
  smallMaxWith,
  className = "",
}: any) {
  return (
    <>
      <div
        className={twMerge("flex items-center m-auto", smallMaxWith, className)}
      >
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
              {post.createdAt.split("T")[0]}
            </p>
          </div>
          <div className="flex-1 mt-1 break-all">
            <p className="text-xl font-semibold text-gray-100">{post.title}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center margin-auto">
        <div className="flex flex-col justify-between w-full">
          <pre className="mt-5 pb-4 mx-5 whitespace-pre-wrap break-words">
            {post.language ? (
              <code
                className={`language-${post.language}`}
                dangerouslySetInnerHTML={{
                  __html: highlight(post.code, post.language),
                }}
              ></code>
            ) : (
              <code>{post.code}</code>
            )}
          </pre>
        </div>
        <PostActions
          className="mt-6 mb-3"
          onComment={onComment}
          onLike={onLike}
          onShare={onShare}
          isLiked={post.isLiked}
          totalComments={post.totalComments}
          totalLikes={post.totalLikes}
        />
      </div>
    </>
  );
}
