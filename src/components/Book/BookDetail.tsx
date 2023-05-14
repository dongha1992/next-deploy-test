import Image from "next/image";
import { useSession } from "next-auth/react";
import router from "next/router";

import formatTimeAgo from "@/utils/formatTimeAgo";
import { BOOK_QUERY_KEY, useDeletePost } from "@/query/book";
import PostActions from "../PostActions";
import Setting from "../Common/Setting";
import { formatUserName } from "@/utils/maskString";
import BookInfo from "./BookInfo";
import Popup from "../Common/Popup";
import { useState } from "react";
import Spacing from "../Common/Spacing";

export default function BookDetail({
  onLike,
  onComment,
  onShare,
  book,
  user,
  className = "",
}: any) {
  const { status, data } = useSession();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { mutateAsync: deletePostMutation } = useDeletePost({
    queryKey: [BOOK_QUERY_KEY],
  });

  const onDeleteHandler = (e: any) => {
    e.preventDefault();
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
    deletePostMutation(book.id).then((res) => {
      if (res.status === 200) {
        router.push("/book");
      }
    });
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
              <p className="text-xs font-medium text-gray-100">
                {/* {formatUserName(user?.name)} */}
                {user?.name}
              </p>
              <p className="text-xs text-gray-300">
                {book?.createdAt.split("T")[0]}
              </p>
            </div>
            <div className="flex mt-1 items-center justify-between">
              <p className="text-md font-semibold text-gray-100 break-all">
                {book?.title ? `<${book?.title}> ${book?.author}` : ""}
              </p>
              <Setting onDelete={onDeleteHandler} onEdit={onEditHandler} />
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <BookInfo item={book} className="" withTitle={false} />
          <span className="mt-4 text-sm text-gray-100 whitespace-pre-wrap break-words">
            {book?.body ?? ""}
          </span>
        </div>
      </div>
      <Spacing size={30} />
      <section className="overflow-x-scroll max-w-96 w-auto">
        <div
          className="flex align-items-center gap-4"
          style={{ width: "800px" }}
        >
          {book?.userImages.length > 0 &&
            book?.userImages.map((src: string, index: number) => {
              return (
                <div key={index} className="relative w-48 h-48 object-contain">
                  <Image src={src} alt="스크린샷" fill className="rounded" />
                </div>
              );
            })}
        </div>
      </section>
      <Spacing size={10} />
      <div className="flex flex-col items-center">
        <PostActions
          onComment={onComment}
          onLike={onLike}
          onShare={onShare}
          isLiked={book?.isLiked}
          totalComments={book?.totalComments}
          totalLikes={book?.totalLikes}
        />
      </div>
      <Spacing size={10} />
      {isOpen && (
        <Popup
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onClickConfirm={onClickConfirm}
          text="정말 삭제하시겠어요?"
        />
      )}
    </div>
  );
}
