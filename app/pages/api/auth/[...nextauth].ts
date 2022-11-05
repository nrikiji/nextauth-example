import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { Adapter, AdapterUser } from "next-auth/adapters";

const prisma = new PrismaClient();

export const prismaAdapter: Adapter = {
  ...PrismaAdapter(prisma),
  createUser: async (data) => {
    const user = await prisma.user.create({ data: { ...data, email: null } });
    return user as AdapterUser;
  },
  getUserByEmail: () => null,
};

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        params: { scope: "repo" },
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account?.access_token;
      }
      if (user) {
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.id = token.userId;
      return session;
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/signup`;
    },
  },
  session: { strategy: "jwt" },
  // adapter: PrismaAdapter(prisma),
  adapter: prismaAdapter,
};

export default NextAuth(authOptions);
