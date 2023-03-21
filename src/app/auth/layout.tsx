import Head from "next/head";
import React, { FC } from "react";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="bg-[url('/img/14.png')] bg-no-repeat bg-bottom bg-contain bg-fixed bg-gray-200 min-h-screen flex justify-center">
        <div>
          <img
            alt="Logo"
            src={"/logo-1.svg"}
            className="h-auto max-w-lg mx-auto mt-4"
          />
          <div className="bg-white flex shadow-2xl max-w-4xl p-10 mt-12">
            <div className="md:px-5 mt-3">{children}</div>
          </div>
        </div>
      </section>
    </>
  );
}
