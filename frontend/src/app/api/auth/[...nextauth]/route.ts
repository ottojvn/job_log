import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const clientId = process.env.GITHUB_ID as string;
const clientSecret = process.env.GITHUB_SECRET as string;

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId,
      clientSecret,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub;
      }
      return session;
    }
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
