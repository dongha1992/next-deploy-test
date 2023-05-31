import Link from "next/link";
import { useRecoilState } from "recoil";
import router from "next/router";

import { NOVELS_QUERY_KEY, useDeleteNovel } from "@/query/novel";
import { useSession } from "next-auth/react";
import Setting from "../Common/Setting";
import { popupState } from "@/store/common";

export default function NovelPost({ href, novel, user, className = "" }: any) {
  const [popup, setPopup] = useRecoilState(popupState);

  const { status, data } = useSession();

  const { mutate: deletePostMutation } = useDeleteNovel({
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
