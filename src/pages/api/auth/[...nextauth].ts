import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import { User } from "next-auth";
import Cookies from "js-cookie";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: 'credentials',
      credentials: {
        username: {
            label: "Username",
            type: "text",
            placeholder: "jsmith",
          },
          password: {
            label: "Password",
            type: "password",
          },
      },
      async authorize(credentials,req) {
        const payload = {
          email: credentials?.username,
          password: credentials?.password,
        }
        const token = Cookies.get("accessToken");
        const { username, password } = credentials as { username: string, password:string} ;
        const res = await fetch("https://localhost:5000/api/Account/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
        
        const user = await res.json();
        if (!res.ok) {
          throw new Error(user.message)
        }
        if (res.ok && user) {
        Cookies.set("accessToken", user.token);
        console.log(user);
            return user;
        } else 
            return null;
      },
    }),
  ],

  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOptions);