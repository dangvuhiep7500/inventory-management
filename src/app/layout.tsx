export const metadata = {
  title: "NextJs-Home",
  icons: {
    icon: "/icon.jpg",
  },
};
import Script from "next/script";
import "@/styles/globals.scss";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Inter:300,400,500,600,700"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
