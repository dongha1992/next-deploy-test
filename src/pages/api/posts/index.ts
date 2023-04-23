import { getServerSession } from "next-auth";
import { prisma } from "../../../../server/db/client";
import { options } from "../../api/auth/[...nextauth]";

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

async function post(req: any, res: any) {
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
    },
  });
  res.status(200).json(post);
}

export default async function handler(req: any, res: any) {
  const { method } = req;
  switch (method) {
    case "POST":
      post(req, res);

      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end("잘못된 호출입니다.");
  }
}
