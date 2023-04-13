"use client"

import React, { useEffect, useState } from "react";
import { NavBar } from "./header/NavBar";
import { SideBar } from "./sidebar/SideBar";
import { useAuthStore } from "@/store/auth/auth";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import AuthContext from "./AuthContext";

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
  useEffect(() => {
    if (!successLogin && !accessToken) {
      router.replace("/auth/signin");
    } else {
      setLoggedIn(true);
    }
  }, [successLogin, router]);
  return (
    <>
      {loggedIn && (
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
