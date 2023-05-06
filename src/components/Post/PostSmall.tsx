import Link from "next/link";
import Image from "next/image";
import PostActions from "../PostActions";
import highlight from "@/utils/highlight";

import formatTimeAgo from "@/utils/formatTimeAgo";
import Setting from "../Common/Setting";
import { POST_QUERY_KEY, useDeletePost } from "@/query/post";
import { useSession } from "next-auth/react";
import router from "next/router";

export default function PostSmall({
  onLike,
  onComment,
  onShare,
  href,
  post,
  user,
  className = "",
}: any) {
  const { status, data } = useSession();
  const { mutate: deletePostMutation } = useDeletePost({
    queryKey: [POST_QUERY_KEY],
  });

  const onDeleteHandler = (e: any) => {
    e.preventDefault();
    deletePostMutation(post.id);
  };

  const onEditHandler = (e: any) => {
    e.preventDefault();
    if (data?.user?.email !== post.user.email) {
      alert("해당 포스트의 작성자가 아닙니다.");
      return;
    }
    router.push(`/postForm/${post.id}`);
  };

  return (
    <div
      className={
        "flex flex-col overflow-hidden rounded-lg shadow-lg " + className
      }
    >
      <div className="flex flex-1 flex-col justify-between">
        <div className="mt-2 flex items-center">
          <div className="flex-shrink-0 text-gray-100">
            {user?.image && (
              <Image
                className="h-8 w-8 rounded-full"
                src={user.image}
                width={10}
                height={10}
                alt="아바타 사진"
              />
            )}
          </div>
          <div className="ml-4 flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-100">
                {/* {formatUserName(user?.name)} */}
                {user?.name}
              </p>
              <p className="text-sm text-gray-300">
                {post.createdAt.split("T")[0]}
              </p>
            </div>
            <div className="flex mt-1 items-center justify-between">
              <p className="text-xl font-semibold text-gray-100 break-all">
                {post.title.substring(0, 50)}
              </p>
              <Setting onDelete={onDeleteHandler} onEdit={onEditHandler} />
            </div>
          </div>
        </div>
        <Link href={href}>
          <pre className="mt-4 pb-4 mx-5 max-h-52 overflow-hidden border-b border-gray-700 whitespace-pre-wrap break-words">
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
        </Link>
      </div>
      <div className="flex flex-col items-center pb-3">
        <PostActions
          onComment={onComment}
          onLike={onLike}
          onShare={onShare}
          isLiked={post.isLiked}
          totalComments={post.totalComments}
          totalLikes={post.totalLikes}
        />
      </div>
    </div>
  );
}