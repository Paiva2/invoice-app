import { NextApiRequest, NextApiResponse } from "next"
import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { NextResponse } from "next/server"

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (!account?.scope?.includes("read:user,user:email")) {
        return "/register/?error=permission-denied"
      }

      return true
    },
  },
}
async function authHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req?.url?.includes("error?error=Callback")) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return await NextAuth(req, res, authOptions)
}

export { authHandler as GET, authHandler as POST }
