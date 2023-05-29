import Image from "next/image";
import { useSession } from "next-auth/react";
import router from "next/router";

import { BOOK_QUERY_KEY, useDeletePost } from "@/query/book";
import PostActions from "../PostActions";
import Setting from "../Common/Setting";
import Spacing from "../Common/Spacing";
import { popupState } from "@/store/common";
import { useRecoilState } from "recoil";
import { NOVELS_QUERY_KEY } from "@/query/novel";

export default function NovelDetailPage({
  onLike,
  onComment,
  onShare,
  novel,
  user,
  className = "",
}: any) {
  const { status, data } = useSession();
  const [popup, setPopup] = useRecoilState(popupState);

  const { mutateAsync: deletePostMutation } = useDeletePost({
    queryKey: [NOVELS_QUERY_KEY],
  });

  const onDeleteHandler = (e: any) => {
    e.preventDefault();
    setPopup({
      message: "정말 삭제하시겠어요?",
      callback: () => onClickConfirm(),
      isOpen: true,
    });
  };

  const onEditHandler = (e: any) => {
    e.preventDefault();
    router.push(`/editNovel/${novel.id}`);
  };

  const onClickConfirm = () => {
    deletePostMutation(novel.id).then((res) => {
      if (res.status === 200) {
        router.push("/read");
      }
    });
  };

  const isAuth = data?.user?.email === novel?.user?.email;

  return (
    <div className={"flex flex-col overflow-hidden rounded-lg " + className}>
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
              <p className="text-xs font-medium text-gray-100">
                {/* {formatUserName(user?.name)} */}
                {user?.name}
              </p>
              <p className="text-xs text-gray-300">
                {novel?.createdAt.split("T")[0]}
              </p>
            </div>
            <div className="flex mt-1 items-center justify-between">
              <p className="text-md font-semibold text-gray-100 break-all">
                {novel?.title ? `<${novel?.title}>` : ""}
              </p>
              {isAuth && (
                <Setting
                  onDelete={onDeleteHandler}
                  onEdit={onEditHandler}
                  className="top-5 right-0"
                />
              )}
            </div>
          </div>
        </div>
        <span className="mt-4 text-sm md:text-lg lg:text-lg text-gray-100 whitespace-pre-wrap break-words">
          {novel?.body ?? ""}
        </span>
      </div>

      <Spacing size={10} />
      <div className="flex flex-col items-center">
        <PostActions
          onComment={onComment}
          onLike={onLike}
          onShare={onShare}
          isLiked={novel?.isLiked}
          totalComments={novel?.totalComments}
          totalLikes={novel?.totalLikes}
        />
      </div>
      <Spacing size={10} />
    </div>
  );
}
