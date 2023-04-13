import Cookies from "js-cookie";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import { User } from "next-auth";
import Providers from 'next-auth/providers';
import { randomBytes, randomUUID } from "crypto";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
    type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const token = Cookies.get("accessToken");
        const { username, password } = credentials as {
          username: string;
          password: string;
        };
        try {
          const res = await fetch(`https://localhost:5000/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              username,
              password,
            }),
          });
          const user = await res.json();
          if (!res.ok) {
            throw new Error(user.message);
          }
          if (res.ok && user) {
            Cookies.set("accessToken", user.token);
            console.log(user);
            return user;
          }
        }catch(error: any){
          console.log(error);
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET,
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOptions);