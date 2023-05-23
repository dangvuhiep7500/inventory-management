import Cookies from "js-cookie";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { User } from "next-auth";
import Providers from 'next-auth/providers';
import { randomBytes, randomUUID } from "crypto";
import { rejects } from "assert";
import https from 'https';
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
    type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const token = Cookies.get("accessToken");
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email,
            password,
          }),// Replace with the request body, if needed
        };
        try {
          const res = await fetch(`https://localhost:5000/auth/login`,requestOptions);
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
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      // clientId: "54895963759-q9kgmif028h34ppsjvcm2oo50679sto7.apps.googleusercontent.com",
      // clientSecret: "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"
     }),
  ],
  // session: {
  //   strategy: "jwt",
  // },
  // secret: process.env.SECRET,
  // callbacks: {
  //   async jwt({ token, user }) {
  //     return { ...token, ...user };
  //   },
  //   async session({ session, token, user }) {
  //     session.user = token;
  //     return session;
  //   },
  // },
  // pages: {
  //   signIn: "/auth/signin",
  // },
};

export default NextAuth(authOptions);