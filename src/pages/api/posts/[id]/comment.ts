import { prisma } from "../../../../../server/db/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { Session } from "..";
import { options } from "../../auth/[...nextauth]";
import { Prisma } from "@prisma/client";

async function updatePostComment(res: NextApiResponse, req: NextApiRequest) {
  const { id } = req.query;
  const session: Session | null = await getServerSession(req, res, options);
  const { data: text } = req.body;

  // TODO: 중복코드

  const user = await prisma.user.findUnique({
    where: { email: session?.user.email },
  });
  const post: any = await prisma.post.findUnique({ where: { id: Number(id) } });

  if (!user) {
    // 검색 결과가 없는 경우 404 에러 반환
    res.status(404).json({ message: `잘못된 유저입니다.` });
    return;
  }

  if (!post) {
    // 검색 결과가 없는 경우 404 에러 반환
    res.status(404).json({ message: `해당 포스트를 찾지 못 했습니다.` });
    return;
  }

  await prisma.comment.create({
    data: {
      text,
      user: { connect: { id: user?.id } },
      post: { connect: { id: post?.id } },
    },
  });

  await prisma.post.update({
    where: { id: Number(id) },
    data: {
      totalComments: post.totalComments + 1,
    },
  });

  setTimeout(() => {
    res.status(200).json({ message: "성공" });
  }, 500);
}

async function deletePostComment(res: NextApiResponse, req: NextApiRequest) {
  const { id } = req.query;
  const session: Session | null = await getServerSession(req, res, options);

  // TODO: 중복코드

  const user = await prisma.user.findUnique({
    where: { email: session?.user.email },
  });

  if (!user) {
    // 검색 결과가 없는 경우 404 에러 반환
    res.status(404).json({ message: `잘못된 유저입니다.` });
    return;
  }

  const comments = await prisma.comment.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!comments) {
    res.status(404).json({ message: `해당 댓글을 찾지 못 했습니다.` });
    return;
  }

  if (comments.userId === user.id) {
    await prisma.comment.delete({
      where: {
        id: Number(id),
      },
    });
    setTimeout(() => {
      res.status(200).json({ message: "성공" });
    }, 500);
  } else {
    res.status(404).json({ message: `삭제할 수 없습니다.` });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "POST":
      updatePostComment(res, req);
      break;
    case "DELETE":
      deletePostComment(res, req);
      break;
    default:
      res.setHeader("Allow", ["POST", "DELETE"]);
      res.status(405).end("잘못된 호출입니다.");
  }
}
