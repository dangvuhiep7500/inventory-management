export const metadata = {
  title: "NextJs-Home",
  icons: {
    icon: "/icon.jpg",
  },
};
import "@/styles/globals.scss";
import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";
import ProvidersWrapper from "./ProvidersWrapper";
import ProviderTheme from "./ProviderTheme";
const inter = Inter({
  weight: ["500","600", "700","800","900"],
  subsets: ["vietnamese"],
  display: "swap",
});
const roboto = Roboto({
  weight: ["300","500","700","900"],
  subsets: ["latin","vietnamese"],
  display: "swap",
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <ProviderTheme>
          <ProvidersWrapper>{children}</ProvidersWrapper>
        </ProviderTheme>
      </body>
    </html>
  );
}
