"use client";

import React, {  useState } from "react";
import { NavBar } from "./header/NavBar";
import { SideBar } from "./sidebar/SideBar";
import { useAuthStore } from "@/store/auth/auth";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showModal, setShowModal] = useState(true);
  const [collapsed, setCollapsed] = useState(true);
  const successLogin = useAuthStore((state) => state.successLogin);
  return (
    <>
      {successLogin ? (
        <div className="flex h-screen w-full flex-col">
          <div className="flex h-screen overflow-hidden bg-[#1E1E2D]">
            <SideBar collapsed={collapsed} />
            <div className="flex-1 overflow-auto bg-[#F5F8FA] dark:bg-[#151521]">
              <NavBar collapsed={collapsed} setCollapsed={setCollapsed} />
              {children}
            </div>
          </div>
        </div>
      ) : (
        <>
            <section className="bg-blue-500 relative z-10 py-[120px]">
              <div className="container mx-auto">
                <div className="-mx-4 flex">
                  <div className="w-full px-4">
                    <div className="mx-auto max-w-[400px] text-center">
                      <h2 className="mb-2 text-[50px] font-bold leading-none text-white sm:text-[80px] md:text-[100px]">
                        401
                      </h2>
                      <h4 className="mb-3 text-[22px] font-semibold leading-tight text-white">
                        Oops! That page can't be found
                      </h4>
                      <p className="mb-8 text-lg text-white">
                        You can't not authentication
                      </p>
                      <a
                        href="/auth/signin"
                        className="hover:text-blue-500 inline-block rounded-lg border border-white px-8 py-3 text-center text-base font-semibold text-white transition hover:bg-white"
                      >
                        Go To Login
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 left-0 -z-10 flex h-full w-full items-center justify-between space-x-5 md:space-x-8 lg:space-x-14">
                <div className="h-full w-1/3 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]"></div>
                <div className="flex h-full w-1/3">
                  <div className="h-full w-1/2 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]"></div>
                  <div className="h-full w-1/2 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]"></div>
                </div>
                <div className="h-full w-1/3 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]"></div>
              </div>
            </section>
        </>
      )}
    </>
  );
}
