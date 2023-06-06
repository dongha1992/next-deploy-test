import { prisma } from "../../../../server/db/client";
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

const RECENT_BOOK_NUMBER = 3;

async function getRecentBooks(req: NextApiRequest, res: NextApiResponse) {
  let books: any[] = [];

  books = await prisma.book.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
    take: RECENT_BOOK_NUMBER,
  });

  res.status(200).json(books);
}

export default async function handler(req: any, res: any) {
  const { method } = req;
  switch (method) {
    case "GET":
      getRecentBooks(req, res);
      break;

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end("잘못된 호출입니다.");
  }
}
