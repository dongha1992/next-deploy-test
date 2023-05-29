import Link from "next/link";
import { useRecoilState } from "recoil";
import Image from "next/image";

import { BOOK_QUERY_KEY, useDeletePost } from "@/query/book";
import { useSession } from "next-auth/react";
import router from "next/router";
import PostActions from "../PostActions";
import Setting from "../Common/Setting";
import Spacing from "../Common/Spacing";

import { imageZoomState, popupState } from "@/store/common";
import useRating from "@/hooks/useRating";

//TODO: 서버에서 받은 이미지 포맷 함수

const MAX_BODY_LENGTH = 100;

export default function NovelPost({
  onLike,
  onComment,
  onShare,
  href,
  novel,
  user,
  className = "",
}: any) {
  const [popup, setPopup] = useRecoilState(popupState);
  const [srcs, setSrcs] = useRecoilState(imageZoomState);

  const { status, data } = useSession();
  const { ratingGenerator } = useRating({ userRating: novel.rating });

  const NOVEL_QUERY_KEY = "";

  const { mutate: deletePostMutation } = useDeletePost({
    queryKey: [NOVEL_QUERY_KEY],
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
    router.push(`/novelForm/${novel.id}`);
  };

  const onClickConfirm = () => {
    deletePostMutation(novel.id);
  };

  const isAuth = data?.user?.email === novel.user.email;

  return (
    <>
      <div className={"flex flex-col rounded-lg shadow-lg px-4 " + className}>
        <Link href={href}>
          <div className="flex flex-1 flex-col justify-between">
            <div className="flex items-center ">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-gray-100">
                    {/* {formatUserName(user?.name)} */}
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-300">
                    {novel?.createdAt.split("T")[0]}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-gray-100 break-all">
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
          </div>
        </Link>
      </div>
    </>
  );
}
