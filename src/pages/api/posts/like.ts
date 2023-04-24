import { prisma } from "../../../../server/db/client";
import type { NextApiRequest, NextApiResponse } from "next";

async function updatePostLike(res: NextApiResponse, req: NextApiRequest) {
  const { id } = req.query;
  // TODO: 중복코드

  const post = await prisma.post.findUnique({ where: { id: Number(id) } });

  if (!post) {
    // 검색 결과가 없는 경우 404 에러 반환
    res.status(404).json({ message: `해당 포스트를 찾지 못 했습니다.` });
    return;
  }

  const updatedPost = await prisma.post.update({
    where: { id: Number(id) },
    data: {
      totalLikes: post.totalLikes + 1, // 기존 likes 값에 1을 더해 업데이트
    },
  });

  res.status(200);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "PUT":
      updatePostLike(res, req);

      break;
    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end("잘못된 호출입니다.");
  }
}
