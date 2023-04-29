import { prisma } from "../../../../../server/db/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { Session } from "..";
import { options } from "../../auth/[...nextauth]";
import { Prisma } from "@prisma/client";

async function updatePostComment(res: NextApiResponse, req: NextApiRequest) {
  const { id } = req.query;
  const session: Session | null = await getServerSession(req, res, options);
  const { data } = req.body;
  console.log(data, id);
  // TODO: 중복코드

  const user = await prisma.user.findUnique({
    where: { email: session?.user.email },
  });
  const post = await prisma.post.findUnique({ where: { id: Number(id) } });

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

  console.log(data, id);

  // let userLikes = await prisma.userLikes.findUnique({
  //   where: {
  //     postId_userId: {
  //       postId: Number(id),
  //       userId: user.id,
  //     },
  //   },
  // });

  // if (userLikes?.isLiked) {
  //   res.status(404).json({ message: `이미 좋아요를 눌렀습니다.` });
  //   return;
  // }

  // if (!userLikes) {
  //   userLikes = await prisma.userLikes.create({
  //     data: {
  //       postId: Number(id),
  //       userId: user?.id,
  //       isLiked: true,
  //     },
  //   });
  // }

  // await prisma.post.update({
  //   where: { id: Number(id) },
  //   data: {
  //     totalLikes: post.totalLikes + 1,
  //     isLiked: true,
  //   },
  // });

  res.status(200).json({ message: "성공" });
}

async function deletePostComment(res: NextApiResponse, req: NextApiRequest) {
  const { id } = req.query;
  const session: Session | null = await getServerSession(req, res, options);

  // TODO: 중복코드

  const user = await prisma.user.findUnique({
    where: { email: session?.user.email },
  });
  const post = await prisma.post.findUnique({ where: { id: Number(id) } });

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

  // const userLikes = await prisma.userLikes.update({
  //   where: {
  //     postId_userId: {
  //       postId: Number(id),
  //       userId: user.id,
  //     },
  //   },
  //   data: {
  //     isLiked: false,
  //   },
  // });

  // await prisma.post.update({
  //   where: { id: Number(id) },
  //   data: {
  //     totalLikes: post.totalLikes - 1,
  //     isLiked: false,
  //   },
  // });

  res.status(200).json({ message: "성공" });
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
