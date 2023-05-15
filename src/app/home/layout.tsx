"use client"

import React, { useEffect, useState } from "react";
import { NavBar } from "./header/NavBar";
import { SideBar } from "./sidebar/SideBar";
import { useAuthStore } from "@/store/auth/auth";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import AuthContext from "./AuthContext";
import { useSession, signIn, signOut } from "next-auth/react"
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const successLogin = useAuthStore((state) => state.successLogin);
  const accessToken = Cookies.get("accessToken");
  const { data: session,status } = useSession();
  // useEffect(() => {
  //   if (!successLogin && !accessToken) {
  //     router.replace("/auth/signin");
  //   } else {
  //     setLoggedIn(true);
  //   }
  // }, [successLogin, router]);
  useEffect(() => {
    if (status ==="unauthenticated") {
      router.replace("/auth/signin");
    }
     else {
      setLoggedIn(true);
     }
  }, [status]);
  // if (status === "loading") {
  //   return <div>Loading...</div>
  // }
  return (
    <>
      {session && (
        <>
         {/* <AuthContext> */}
          <div className="flex h-screen w-full flex-col">
            <div className="flex h-screen overflow-hidden bg-[#1E1E2D]">
              <SideBar collapsed={collapsed} />
              <div className="flex-1 overflow-auto bg-[#F5F8FA] dark:bg-[#151521]">
                <NavBar collapsed={collapsed} setCollapsed={setCollapsed} />
                {children}
              </div>
            </div>
          </div>
          {/* </AuthContext> */}
        </>
     )} 
    </>
  );
}
