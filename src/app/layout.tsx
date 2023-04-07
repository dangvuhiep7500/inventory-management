export const metadata = {
  title: "NextJs-Home",
  icons: {
    icon: "/icon.jpg",
  },
};
import "@/styles/globals.scss";
import FlowbiteContext from "@/context/FlowbiteContext";
import { Inter } from "next/font/google";
const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
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
        <FlowbiteContext>{children}</FlowbiteContext>
      </body>
    </html>
  );
}
