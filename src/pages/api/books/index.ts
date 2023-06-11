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

async function createBook(req: any, res: any) {
  const session: Session | null = await getServerSession(req, res, options);

  if (!session) {
    res.status(401).json({ error: "인증 되지 않은 회원입니다." });
    return;
  }

  const prismaUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!prismaUser) {
    res.status(401).json({ error: "인증 되지 않은 회원입니다." });
    return;
  }

  const { title, body, book, userImages, rating } = req.body.data;

  await prisma.book.create({
    data: {
      body,
      title,
      rating: rating,
      userId: prismaUser.id,
      isLiked: false,
      author: book?.author,
      description: book?.description,
      discount: book?.discount,
      image: book?.image,
      isbn: book?.isbn,
      link: book?.link,
      pubdate: book?.pubdate,
      publisher: book?.publisher,
      userImages: userImages ? userImages : [],
    },
  });

  res.status(200).json({ message: "성공" });
}

async function getBooks(req: NextApiRequest, res: NextApiResponse) {
  const { search, page, size } = req.query;
  const skip = (Number(page) - 1) * Number(size);
  const take = Number(size);

  let books: any[] = [];

  // TODO: 중복...

  if (search) {
    books = await prisma.book.findMany({
      where: {
        OR: [
          { body: { contains: search as string } },
          { title: { contains: search as string } },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
      skip,
      take,
    });
  } else {
    books = await prisma.book.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
      skip,
      take,
    });
  }

  res.status(200).json(books);
}

export default async function handler(req: any, res: any) {
  const { method } = req;
  switch (method) {
    case "POST":
      createBook(req, res);
      break;

    case "GET":
      getBooks(req, res);
      break;

    default:
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).end("잘못된 호출입니다.");
  }
}
