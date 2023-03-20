import '@/styles/globals.css';
import { Head } from 'next/document';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>NextJs typescript</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
