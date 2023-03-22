"use client";

import React, { useState } from "react";
import { NavBar } from "./header/NavBar";
import { SideBar } from "./sidebar/SideBar";
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <>
      <div className="flex h-screen w-full flex-col">
        <div className="flex h-screen overflow-hidden bg-[#1E1E2D]">
          <SideBar collapsed={collapsed} />
          <div className="flex-1 overflow-auto bg-[#F5F8FA] dark:bg-[#151521]">
            <NavBar collapsed={collapsed} setCollapsed={setCollapsed} />
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
