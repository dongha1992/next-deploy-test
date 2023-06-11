import { prisma } from "../../../../../server/db/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { Session } from "..";
import { options } from "../../auth/[...nextauth]";

async function updateBookLike(res: NextApiResponse, req: NextApiRequest) {
  const { id } = req.query;
  const session: Session | null = await getServerSession(req, res, options);

  // TODO: 중복코드

  const user = await prisma.user.findUnique({
    where: { email: session?.user.email },
  });
  const book = await prisma.book.findUnique({
    where: { id: Number(id) },
  });

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

  await prisma.userBookLikes.upsert({
    where: {
      bookId_userId: {
        bookId: Number(id),
        userId: user.id,
      },
    },
    update: {
      isLiked: true,
    },
    create: { bookId: Number(id), userId: user.id, isLiked: true },
  });

  const userLikes = await prisma.userBookLikes.findUnique({
    where: {
      bookId_userId: {
        bookId: Number(id),
        userId: user.id,
      },
    },
  });

  await prisma.book.update({
    where: { id: Number(id) },
    data: {
      totalLikes: book.totalLikes + 1,
      isLiked: userLikes?.isLiked,
    },
  });

  res.status(200).json({ message: "성공", id });
}

async function deleteBookLike(res: NextApiResponse, req: NextApiRequest) {
  const { id } = req.query;
  const session: Session | null = await getServerSession(req, res, options);

  // TODO: 중복코드

  const user = await prisma.user.findUnique({
    where: { email: session?.user.email },
  });
  const book = await prisma.book.findUnique({ where: { id: Number(id) } });

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

  await prisma.userBookLikes.upsert({
    where: {
      bookId_userId: {
        bookId: Number(id),
        userId: user.id,
      },
    },
    update: {
      isLiked: false,
    },
    create: { bookId: Number(id), userId: user.id, isLiked: false },
  });

  const userBookLikes = await prisma.userBookLikes.findUnique({
    where: {
      bookId_userId: {
        bookId: Number(id),
        userId: user.id,
      },
    },
  });

  await prisma.book.update({
    where: { id: Number(id) },
    data: {
      totalLikes: book.totalLikes > 0 ? book.totalLikes - 1 : 0,
      isLiked: userBookLikes?.isLiked,
    },
  });

  res.status(200).json({ message: "성공", id });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "POST":
      updateBookLike(res, req);
      break;
    case "DELETE":
      deleteBookLike(res, req);
      break;
    default:
      res.setHeader("Allow", ["POST", "DELETE"]);
      res.status(405).end("잘못된 호출입니다.");
  }
}
