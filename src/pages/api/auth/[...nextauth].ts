import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { prisma } from "../../../../server/db/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import axios from "axios";
import SignToken from "@/utils/token";

export const options: any = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  debug: true,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // ** 30 days
  },
  secret: process.env.NEXT_PUBLIC_JWT_SECRET_KEY,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      // 중복 메일 검사 등
      return true;
    },
    async jwt({ token, user }: any) {
      if (user) {
        const userToken: any = await SignToken(user.email);
        token.userToken = userToken;
      }

      return token;
    },
    async session({ session, token }: any) {
      if (token && token.userToken) {
        session.loggedUser = token.userToken;
      }
      return session;
    },
  },
};

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;
