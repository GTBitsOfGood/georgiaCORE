import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const allowedEmails = process.env.ALLOWED_EMAILS.split("+");

/** Configuration for NextAuth
 * SignIn callback only allows emails specfied in environment
 * variables to log in
 */
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
      if (allowedEmails.includes(email)) return true;
      return false;
    },
  },
};

export default NextAuth(authOptions);
