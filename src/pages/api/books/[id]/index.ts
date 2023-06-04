import { getServerSession } from "next-auth";
import { prisma } from "../../../../../server/db/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { Session } from "..";
import { options } from "../../auth/[...nextauth]";

async function getBook(res: NextApiResponse, req: NextApiRequest) {
  const { id } = req.query;
  const session: Session | null = await getServerSession(req, res, options);
  // TODO: 중복코드

  const book = await prisma.book.findUnique({ where: { id: Number(id) } });

  if (session) {
    const prismaUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!book) {
      // 검색 결과가 없는 경우 404 에러 반환
      res.status(404).json({ message: `해당 포스트를 찾지 못 했습니다.` });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: book?.userId },
    });

    const useLikes = await prisma.userBookLikes.findUnique({
      where: {
        bookId_userId: {
          bookId: Number(id),
          userId: prismaUser?.id!,
        },
      },
    });

    const comments = await prisma.bookComment.findMany({
      where: {
        bookId: Number(id),
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    });

    // 검색 결과가 있는 경우 검색 결과 반환

    res.status(200).json({
      ...book,
      user: user,
      comments: comments,
      isLiked: useLikes?.isLiked ? useLikes?.isLiked : false,
    });
  } else {
    // 비회원 경우
    if (!book) {
      // 검색 결과가 없는 경우 404 에러 반환
      res.status(404).json({ message: `해당 포스트를 찾지 못 했습니다.` });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: book.userId },
    });

    const comments = await prisma.bookComment.findMany({
      where: {
        bookId: Number(id),
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    });

    // 검색 결과가 있는 경우 검색 결과 반환

    res.status(200).json({
      ...book,
      user: user,
      comments: comments,
      isLiked: false,
    });
  }
}

async function deleteBook(res: NextApiResponse, req: NextApiRequest) {
  const { id } = req.query;
  const session: Session | null = await getServerSession(req, res, options);
  // TODO: 중복코드

  const book = await prisma.book.findUnique({ where: { id: Number(id) } });
  const user = await prisma.user.findUnique({
    where: { email: session?.user.email },
  });

  if (!user) {
    res.status(401).json({ error: "인증 되지 않은 회원입니다." });
    return;
  }

  if (!book) {
    // 검색 결과가 없는 경우 404 에러 반환
    res.status(404).json({ message: `해당 포스트를 찾지 못 했습니다.` });
    return;
  }

  if (book.userId === user.id) {
    await prisma.book.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({ message: "성공" });
  } else {
    res.status(404).json({ message: `삭제할 수 없습니다.` });
  }

  // 검색 결과가 있는 경우 검색 결과 반환
}

async function patchBook(res: NextApiResponse, req: NextApiRequest) {
  const { id } = req.query;
  const { data } = req.body;
  const session: Session | null = await getServerSession(req, res, options);
  // TODO: 중복코드

  const book = await prisma.book.findUnique({ where: { id: Number(id) } });
  const user = await prisma.user.findUnique({
    where: { email: session?.user.email },
  });

  if (!user) {
    res.status(401).json({ error: "인증 되지 않은 회원입니다." });
    return;
  }

  if (!book) {
    // 검색 결과가 없는 경우 404 에러 반환
    res.status(404).json({ message: `해당 포스트를 찾지 못 했습니다.` });
    return;
  }

  if (book.userId === user.id) {
    await prisma.book.update({
      where: {
        id: Number(id),
      },
      data: {
        body: data.body,
        userImages: data.userImages,
        rating: data.rating,
      },
    });

    res.status(200).json({ message: "성공" });
  } else {
    res.status(404).json({ message: `삭제할 수 없습니다.` });
  }

  // 검색 결과가 있는 경우 검색 결과 반환
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      getBook(res, req);
      break;

    case "DELETE":
      deleteBook(res, req);
      break;

    case "PATCH":
      patchBook(res, req);
      break;
    default:
      res.setHeader("Allow", ["GET", "DELETE", "PATCH"]);
      res.status(405).end("잘못된 호출입니다.");
  }
}
