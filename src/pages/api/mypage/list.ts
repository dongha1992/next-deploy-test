import { getServerSession } from "next-auth";
import { prisma } from "../../../../server/db/client";
import { options } from "../../api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";

export interface Session {
  user: {
    name: string;
    email: string;
    image: string;
  };
  expires: Date;
  loggedUser?: string;
}

async function getReviews(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.query;
  const session: Session | null = await getServerSession(req, res, options);

  //FIXME: session 왜 안 넘어오지??

  if (!email) {
    res.status(401).json({ error: "인증 되지 않은 회원입니다." });
    return;
  }

  const prismaUser = await prisma.user.findUnique({
    where: { email: email as string },
  });

  let books: any[] = [];

  if (prismaUser) {
    books = await prisma.book.findMany({
      where: {
        OR: [{ user: { email: { contains: email as string } } }],
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    });
  }

  res.status(200).json(books);
}

export default async function handler(req: any, res: any) {
  const { method } = req;
  switch (method) {
    case "GET":
      getReviews(req, res);
      break;

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end("잘못된 호출입니다.");
  }
}
