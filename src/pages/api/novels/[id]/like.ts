import { prisma } from "../../../../../server/db/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { Session } from "..";
import { options } from "../../auth/[...nextauth]";

async function updateNovelLike(res: NextApiResponse, req: NextApiRequest) {
  const { id } = req.query;
  const session: Session | null = await getServerSession(req, res, options);

  // TODO: 중복코드

  const user = await prisma.user.findUnique({
    where: { email: session?.user.email },
  });
  const novel = await prisma.novel.findUnique({
    where: { id: Number(id) },
  });

  if (!user) {
    // 검색 결과가 없는 경우 404 에러 반환
    res.status(404).json({ message: `잘못된 유저입니다.` });
    return;
  }

  if (!novel) {
    // 검색 결과가 없는 경우 404 에러 반환
    res.status(404).json({ message: `해당 포스트를 찾지 못 했습니다.` });
    return;
  }
  await prisma.userNovelLikes.upsert({
    where: {
      novelId_userId: {
        novelId: Number(id),
        userId: user.id,
      },
    },
    update: {
      isLiked: true,
    },
    create: { novelId: Number(id), userId: user.id, isLiked: true },
  });

  const userLikes = await prisma.userNovelLikes.findUnique({
    where: {
      novelId_userId: {
        novelId: Number(id),
        userId: user.id,
      },
    },
  });

  await prisma.novel.update({
    where: { id: Number(id) },
    data: {
      totalLikes: novel.totalLikes + 1,
      isLiked: userLikes?.isLiked,
    },
  });

  res.status(200).json({ message: "성공", id });
}

async function deleteNovelLike(res: NextApiResponse, req: NextApiRequest) {
  const { id } = req.query;
  const session: Session | null = await getServerSession(req, res, options);

  // TODO: 중복코드

  const user = await prisma.user.findUnique({
    where: { email: session?.user.email },
  });
  const novel = await prisma.novel.findUnique({ where: { id: Number(id) } });

  if (!user) {
    // 검색 결과가 없는 경우 404 에러 반환
    res.status(404).json({ message: `잘못된 유저입니다.` });
    return;
  }

  if (!novel) {
    // 검색 결과가 없는 경우 404 에러 반환
    res.status(404).json({ message: `해당 포스트를 찾지 못 했습니다.` });
    return;
  }

  await prisma.userNovelLikes.upsert({
    where: {
      novelId_userId: {
        novelId: Number(id),
        userId: user.id,
      },
    },
    update: {
      isLiked: false,
    },
    create: { novelId: Number(id), userId: user.id, isLiked: false },
  });

  const userNovelLikes = await prisma.userNovelLikes.findUnique({
    where: {
      novelId_userId: {
        novelId: Number(id),
        userId: user.id,
      },
    },
  });

  await prisma.novel.update({
    where: { id: Number(id) },
    data: {
      totalLikes: novel.totalLikes > 0 ? novel.totalLikes - 1 : 0,
      isLiked: userNovelLikes?.isLiked,
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
      updateNovelLike(res, req);
      break;
    case "DELETE":
      deleteNovelLike(res, req);
      break;
    default:
      res.setHeader("Allow", ["POST", "DELETE"]);
      res.status(405).end("잘못된 호출입니다.");
  }
}
