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

  const createCommentByUser = await prisma.user.findUnique({
    where: {
      id: post?.userId,
    },
  });

  const createComment = await prisma.comment.create({
    data: {
      text,
      user: { connect: { id: createCommentByUser?.id } },
      post: { connect: { id: post?.id } },
    },
  });

  // await prisma.post.update({
  //   where: { id: Number(id) },
  //   data: {
  //     comments: {
  //       create: createComment,
  //     },
  //   },
  // });

  // let existingComment = await prisma.comment.findUnique({
  //   where: {
  //     id: Number(id),
  //   },
  // });

  // console.log(existingComment);

  // if (!existingComment) {
  //   const newComment = await prisma.comment.create({
  //     data: {
  //       postId: Number(id),
  //       userId: user.id,
  //       text: text,
  //       post: {
  //         connect: { id: Number(id) },
  //       } as any,
  //     },
  //     include: {
  //       user: true,
  //     },
  //   });

  //   await prisma.post.update({
  //     where: { id: Number(id) },
  //     data: {
  //       comments: {
  //         create: [newComment],
  //       },
  //     },
  //   });
  // } else {
  //   const updatedComment = await prisma.comment.update({
  //     where: {
  //       id: existingComment.id,
  //     },
  //     data: {
  //       text: text,
  //     },
  //     include: {
  //       user: true,
  //     },
  //   });

  //   await prisma.post.update({
  //     where: { id: Number(id) },
  //     data: {
  //       comments: {
  //         create: {
  //           text: text,
  //           user: {
  //             connect: { id: updatedComment.userId },
  //           },
  //         },
  //       },
  //     },
  //   });
  // }

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
