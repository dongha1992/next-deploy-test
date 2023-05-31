import {
  ChatBubbleBottomCenterTextIcon as CommentIcon,
  HeartIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

export default function PostActions({
  onComment,
  onLike,
  onShare,
  totalLikes,
  totalComments,
  isLiked,
  className = "",
}: any) {
  return (
    <div className={"flex items-center justify-between " + className}>
      <button
        onClick={onComment}
        className="flex flex-col items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md hover:outline-none text-gray-400 hover:text-gray-500"
      >
        <span>{totalComments}</span>
        <CommentIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        onClick={onLike}
        className="flex flex-col items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md hover:outline-none text-gray-400 hover:text-gray-500"
      >
        <span>{totalLikes}</span>
        {!isLiked ? (
          <HeartIcon className="h-5 w-5" aria-hidden="true" />
        ) : (
          <HeartIconSolid className="h-5 w-5" aria-hidden="true" />
        )}
      </button>
      {onShare && (
        <button
          onClick={onShare}
          className="flex flex-col items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md hover:outline-none text-gray-400 hover:text-gray-500"
        >
          <span>&nbsp;</span>
          <ArrowUpTrayIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
