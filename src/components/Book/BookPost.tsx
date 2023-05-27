import Link from "next/link";
import { useRecoilState } from "recoil";
import Image from "next/image";

import formatTimeAgo from "@/utils/formatTimeAgo";
import { BOOK_QUERY_KEY, useDeletePost } from "@/query/book";
import { useSession } from "next-auth/react";
import router from "next/router";
import PostActions from "../PostActions";
import Setting from "../Common/Setting";
import { formatUserName } from "@/utils/maskString";
import { useState } from "react";
import Popup from "../Common/Popup";
import Spacing from "../Common/Spacing";

import { imageZoomState } from "@/store/common";
import useRating from "@/hooks/useRating";

//TODO: 서버에서 받은 이미지 포맷 함수

export default function BookPost({
  onLike,
  onComment,
  onShare,
  href,
  book,
  user,
  className = "",
}: any) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [srcs, setSrcs] = useRecoilState(imageZoomState);

  const { status, data } = useSession();
  const { rating, ratingGenerator } = useRating({ userRating: book.rating });

  const { mutate: deletePostMutation } = useDeletePost({
    queryKey: [BOOK_QUERY_KEY],
  });

  const onDeleteHandler = (e: any) => {
    e.preventDefault();
    if (data?.user?.email !== book.user.email) {
      alert("해당 포스트의 작성자가 아닙니다.");
      return;
    }
    setIsOpen(true);
  };

  const onEditHandler = (e: any) => {
    e.preventDefault();
    if (data?.user?.email !== book.user.email) {
      alert("해당 포스트의 작성자가 아닙니다.");
      return;
    }
    router.push(`/bookForm/${book.id}`);
  };

  const onClickConfirm = () => {
    deletePostMutation(book.id);
    setIsOpen(false);
  };

  const isAuth = data?.user?.email === book.user.email;

  return (
    <>
      <div className={"flex flex-col rounded-lg shadow-lg " + className}>
        <div className="flex flex-1 flex-col justify-between">
          <div className="mt-2 mb-2 flex items-center ">
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
                  {book?.createdAt.split("T")[0]}
                </p>
              </div>
              <div className="flex mt-1 items-center justify-between">
                <p className="text-sm font-semibold text-gray-100 break-all">
                  {book?.title ? `<${book?.title}> ${book?.author}` : ""}
                </p>
                {isAuth && (
                  <Setting onDelete={onDeleteHandler} onEdit={onEditHandler} />
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end w-full my-2">{ratingGenerator}</div>
          <Link href={href}>
            <span className="text-sm text-gray-100 whitespace-pre-wrap break-words">
              {book?.body.slice(0, 100)}
            </span>
          </Link>
        </div>
        <Spacing size={20} />
        <section className="overflow-x-scroll max-w-96">
          <div
            className="flex align-items-center gap-4"
            style={{ width: "600px" }}
          >
            {book?.userImages.length > 0 &&
              book?.userImages.map((src: string, index: number) => {
                return (
                  <div
                    key={index}
                    className="relative object-contain w-48 h-48"
                    onClick={() =>
                      setSrcs({
                        srcs: book?.userImages,
                        startIndex: index,
                      })
                    }
                  >
                    <Image src={src} alt="스크린샷" fill className="rounded" />
                  </div>
                );
              })}
          </div>
        </section>
        <div className="flex flex-col items-center pb-3 pt-2">
          <PostActions
            onComment={onComment}
            onLike={onLike}
            onShare={onShare}
            isLiked={book?.isLiked}
            totalComments={book?.totalComments}
            totalLikes={book?.totalLikes}
          />
        </div>
      </div>
      {isOpen && (
        <Popup
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onClickConfirm={onClickConfirm}
          text="정말 삭제하시겠어요?"
        />
      )}
    </>
  );
}
