import React from "react";
export const metadata = {
  title: 'Account',
};
import Image from "next/image";
import Link from "next/link";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="bg-[url('/img/14.png')] bg-no-repeat bg-bottom bg-contain bg-fixed bg-gray-200 min-h-screen flex justify-center">
        <div>
          <Link href={"/"}>
          <Image
            alt="Logo"
            src="/logo-1.svg"
            width={300}
            height={300}
            className="h-auto max-w-lg mx-auto mt-4"
          />
          </Link>
          <div className="bg-white flex shadow-2xl max-w-4xl p-10 mt-12">
            <div className="md:px-5 mt-3">{children}</div>
          </div>
        </div>
      </section>
    </>
  );
}
