import Link from "next/link";
import Image from "next/image";

import formatTimeAgo from "@/utils/formatTimeAgo";
import { POST_QUERY_KEY, useDeletePost } from "@/query/post";
import { useSession } from "next-auth/react";
import router from "next/router";
import PostActions from "../PostActions";
import Setting from "../Common/Setting";
import { formatUserName } from "@/utils/maskString";

export default function BookPost({
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
                {formatUserName(user?.name)}
              </p>
              <p className="text-sm text-gray-300">
                {post?.createdAt.split("T")[0]}
              </p>
            </div>
            <div className="flex mt-1 items-center justify-between">
              <p className="text-xl font-semibold text-gray-100 break-all">
                {post?.title.substring(0, 50)}
              </p>
              <Setting onDelete={onDeleteHandler} onEdit={onEditHandler} />
            </div>
          </div>
        </div>
        <Link href={href}>
          <span>d</span>
        </Link>
      </div>
      <div className="flex flex-col items-center pb-3">
        <PostActions
          onComment={onComment}
          onLike={onLike}
          onShare={onShare}
          isLiked={post?.isLiked}
          totalComments={post?.totalComments}
          totalLikes={post?.totalLikes}
        />
      </div>
    </div>
  );
}
