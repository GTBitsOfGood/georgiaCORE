import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { getAuthUsers } from "server/mongodb/actions/AuthUser";

let allowedEmails = process.env.ALLOWED_EMAILS;

if (allowedEmails) {
  allowedEmails = allowedEmails.split("+");
}


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
    async signIn({ user }) {
      let authUsers = await getAuthUsers();
      let inAllowedEmails = allowedEmails && allowedEmails.includes(user.email);
      let inAuthUsers = authUsers.authUsers.some(e => e.email === user.email);

      if (inAllowedEmails || inAuthUsers) return true;
      return false;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
