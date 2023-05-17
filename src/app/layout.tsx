export const metadata = {
  title: "NextJs-Home",
  icons: {
    icon: "/icon.jpg",
  },
};
import "@/styles/globals.scss";
import FlowbiteContext from "@/context/FlowbiteContext";
import { Inter } from "next/font/google";
import ProvidersWrapper from "./ProvidersWrapper";
import { ThemeProvider } from "@material-tailwind/react";
import ProviderTheme from "./ProviderTheme";
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
        {/* <FlowbiteContext> */}
        <ProviderTheme>
          <ProvidersWrapper>{children}</ProvidersWrapper>
        </ProviderTheme>
        {/* </FlowbiteContext> */}
      </body>
    </html>
  );
}
