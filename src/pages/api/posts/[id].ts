import { prisma } from "../../../../server/db/client";
import type { NextApiRequest, NextApiResponse } from "next";

async function get(res: NextApiResponse, req: NextApiRequest) {
  const { id } = req.query; // URL에서 id 추출
  const post = await prisma.post.findUnique({ where: { id: Number(id) } });
  console.log(post, "--");
  if (!post) {
    // 검색 결과가 없는 경우 404 에러 반환
    res.status(404).json({ message: `해당 포스트를 찾지 못 했습니다.` });
    return;
  }

  // 검색 결과가 있는 경우 검색 결과 반환
  res.status(200).json(post);
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
