import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ email }) {
      const allowedEmails = process.env.ALLOWED_EMAILS.split("+");
      if (allowedEmails.includes(email)) return true;
      return false;
    },
  },
};

export default NextAuth(authOptions);
