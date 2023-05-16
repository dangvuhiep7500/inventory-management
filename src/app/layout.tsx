export const metadata = {
  title: "NextJs-Home",
  icons: {
    icon: "/icon.jpg",
  },
};
import { SessionProvider } from "next-auth/react"
import "@/styles/globals.scss";
import FlowbiteContext from "@/context/FlowbiteContext";
import { Inter } from "next/font/google";
import ProvidersWrapper from "./ProvidersWrapper";
const inter = Inter({
  weight: ["600", "700"],
  subsets: ["latin"],
  display: "swap",
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <FlowbiteContext>
      <ProvidersWrapper>
          {children}
        </ProvidersWrapper>
          </FlowbiteContext>
      </body>
    </html>
  );
}
