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
function titleFromCode(code: string) {
  return code.trim().split("\n")[0].replace("//", "");
}

async function createPost(req: any, res: any) {
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

  const { language, code } = req.body;
  const title = titleFromCode(code);
  const post = await prisma.post.create({
    data: {
      title,
      language,
      code,
      userId: prismaUser.id,
      isLiked: false,
    },
  });

  res.status(200).json({ message: "성공" });
}

async function getPosts(req: NextApiRequest, res: NextApiResponse) {
  const { search } = req.query;

  let posts: any[] = [];
  // TODO: 중복...

  if (search) {
    posts = await prisma.post.findMany({
      where: {
        OR: [
          { code: { contains: search as string } },
          { title: { contains: search as string } },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    });
  } else {
    posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    });
  }

  res.status(200).json(posts);
}

export default async function handler(req: any, res: any) {
  const { method } = req;
  switch (method) {
    case "POST":
      createPost(req, res);
      break;

    case "GET":
      getPosts(req, res);
      break;

    default:
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).end("잘못된 호출입니다.");
  }
}
