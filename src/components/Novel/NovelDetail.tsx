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

  // const isAuth = data?.user?.email === novel?.user?.email;

  return (
    <div className={"flex flex-col overflow-hidden rounded-lg " + className}>
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-center flex-col my-4 mb-6">
          <p className="text-xs md:text-md font-semibold text-gray-100 flex justify-start w-full mb-4">
            {"<단편소설>"}
          </p>
          <p className="text-lg md:text-xl font-semibold text-gray-100 break-all">
            {novel?.title ?? ""}
          </p>
          <p className="text-sm md:text-md font-medium text-gray-100 flex justify-end w-full">
            {user?.name}
          </p>
        </div>

        <span className="w-full mt-4 text-md lg:text-lg text-gray-100 leading-loose whitespace-pre-wrap break-words">
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
