import { prisma } from "../../../server/db/client";

function titleFromCode(code: string) {
  return code.trim().split("\n")[0].replace("//", "");
}

export default async function handler(req: any, res: any) {
  const { method } = req;
  switch (method) {
    case "POST":
      const { language, code } = req.body;
      const title = titleFromCode(code);
      const post = await prisma.post.create({
        data: {
          title,
          language,
          code,
          user: {},
        },
      });
      res.status(200).json(post);
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end("잘못된 호출입니다.");
  }
}
