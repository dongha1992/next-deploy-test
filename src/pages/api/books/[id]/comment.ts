import { prisma } from "../../../../../server/db/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { Session } from "..";
import { options } from "../../auth/[...nextauth]";

async function updateBookComment(res: NextApiResponse, req: NextApiRequest) {
  const { id } = req.query;
  const session: Session | null = await getServerSession(req, res, options);
  const { data: text } = req.body;

  // TODO: 중복코드

  const user = await prisma.user.findUnique({
    where: { email: session?.user.email },
  });
  const book: any = await prisma.book.findUnique({ where: { id: Number(id) } });

  if (!user) {
    // 검색 결과가 없는 경우 404 에러 반환
    res.status(404).json({ message: `잘못된 유저입니다.` });
    return;
  }

  if (!book) {
    // 검색 결과가 없는 경우 404 에러 반환
    res.status(404).json({ message: `해당 포스트를 찾지 못 했습니다.` });
    return;
  }

  await prisma.bookComment.create({
    data: {
      text,
      user: { connect: { id: user?.id } },
      book: { connect: { id: book?.id } },
    },
  });

  await prisma.book.update({
    where: { id: Number(id) },
    data: {
      totalComments: book.totalComments + 1,
    },
  });

  res.status(200).json({ message: "성공" });
}

async function deleteBookComment(res: NextApiResponse, req: NextApiRequest) {
  const { id } = req.query;
  const session: Session | null = await getServerSession(req, res, options);

  // TODO: 중복코드

  const user = await prisma.user.findUnique({
    where: { email: session?.user.email },
  });
  const book: any = await prisma.book.findUnique({ where: { id: Number(id) } });

  if (!user) {
    // 검색 결과가 없는 경우 404 에러 반환
    res.status(404).json({ message: `잘못된 유저입니다.` });
    return;
  }

  const bookComment = await prisma.bookComment.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!bookComment) {
    res.status(404).json({ message: `해당 댓글을 찾지 못 했습니다.` });
    return;
  }

  if (bookComment.userId === user.id) {
    await prisma.bookComment.delete({
      where: {
        id: Number(id),
      },
    });

    await prisma.book.update({
      where: { id: Number(id) },
      data: {
        totalComments: book.totalComments - 1,
      },
    });
    res.status(200).json({ message: "성공" });
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
      updateBookComment(res, req);
      break;
    case "DELETE":
      deleteBookComment(res, req);
      break;
    default:
      res.setHeader("Allow", ["POST", "DELETE"]);
      res.status(405).end("잘못된 호출입니다.");
  }
}
