import { prisma } from "../../../../server/db/client";
import type { NextApiRequest, NextApiResponse } from "next";

function parseJwt(token: string) {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}

async function get(res: NextApiResponse, req: NextApiRequest) {
  const { id } = req.query;
  // TODO: 중복코드

  const post = await prisma.post.findUnique({ where: { id: Number(id) } });

  if (!post) {
    // 검색 결과가 없는 경우 404 에러 반환
    res.status(404).json({ message: `해당 포스트를 찾지 못 했습니다.` });
    return;
  }

  const user = await prisma.user.findUnique({ where: { id: post?.userId } });

  // 검색 결과가 있는 경우 검색 결과 반환
  res.status(200).json({ ...post, user: user });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      get(res, req);

      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end("잘못된 호출입니다.");
  }
}
