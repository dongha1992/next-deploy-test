import { getServerSession } from "next-auth";
import { prisma } from "../../../../../server/db/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { Session } from "..";
import { options } from "../../auth/[...nextauth]";

async function getNovel(res: NextApiResponse, req: NextApiRequest) {
  const { id } = req.query;
  const session: Session | null = await getServerSession(req, res, options);
  // TODO: 중복코드

  const novel = await prisma.novel.findUnique({ where: { id: Number(id) } });

  if (session) {
    const prismaUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!novel) {
      // 검색 결과가 없는 경우 404 에러 반환
      res.status(404).json({ message: `해당 포스트를 찾지 못 했습니다.` });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: novel?.userId },
    });

    const useLikes = await prisma.userNovelLikes.findUnique({
      where: {
        novelId_userId: {
          novelId: Number(id),
          userId: prismaUser?.id!,
        },
      },
    });

    const comments = await prisma.novelComment.findMany({
      where: {
        novelId: Number(id),
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
      ...novel,
      user: user,
      comments: comments,
      isLiked: useLikes?.isLiked ? useLikes?.isLiked : false,
    });
  } else {
    // 비회원 경우
    if (!novel) {
      // 검색 결과가 없는 경우 404 에러 반환
      res.status(404).json({ message: `해당 포스트를 찾지 못 했습니다.` });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: novel.userId },
    });

    const comments = await prisma.novelComment.findMany({
      where: {
        novelId: Number(id),
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
      ...novel,
      user: user,
      comments: comments,
      isLiked: false,
    });
  }
}

async function deleteNovel(res: NextApiResponse, req: NextApiRequest) {
  const { id } = req.query;
  const session: Session | null = await getServerSession(req, res, options);
  // TODO: 중복코드

  const novel = await prisma.novel.findUnique({ where: { id: Number(id) } });
  const user = await prisma.user.findUnique({
    where: { email: session?.user.email },
  });

  if (!user) {
    res.status(401).json({ error: "인증 되지 않은 회원입니다." });
    return;
  }

  if (!novel) {
    // 검색 결과가 없는 경우 404 에러 반환
    res.status(404).json({ message: `해당 포스트를 찾지 못 했습니다.` });
    return;
  }

  if (novel.userId === user.id) {
    await prisma.novel.delete({
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

async function patchNovel(res: NextApiResponse, req: NextApiRequest) {
  const { id } = req.query;
  const { data } = req.body;
  const session: Session | null = await getServerSession(req, res, options);
  // TODO: 중복코드

  const novel = await prisma.novel.findUnique({ where: { id: Number(id) } });
  const user = await prisma.user.findUnique({
    where: { email: session?.user.email },
  });

  if (!user) {
    res.status(401).json({ error: "인증 되지 않은 회원입니다." });
    return;
  }

  if (!novel) {
    // 검색 결과가 없는 경우 404 에러 반환
    res.status(404).json({ message: `해당 포스트를 찾지 못 했습니다.` });
    return;
  }

  if (novel.userId === user.id) {
    await prisma.novel.update({
      where: {
        id: Number(id),
      },
      data: {
        title: data.title,
        body: data.body,
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
      getNovel(res, req);
      break;

    case "DELETE":
      deleteNovel(res, req);
      break;

    case "PATCH":
      patchNovel(res, req);
      break;
    default:
      res.setHeader("Allow", ["GET", "DELETE", "PATCH"]);
      res.status(405).end("잘못된 호출입니다.");
  }
}
