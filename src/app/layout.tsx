
export const metadata = {
  title: 'Next.js',
  icons: {
    icon: '/icon.jpg',
  },
};
import '@/styles/globals.scss';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Inter:300,400,500,600,700"
        />
      </head>
      <head/>
      <body>
      {children}
      {/* <SessionProvider>
        {children}
      </SessionProvider> */}
        {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.3/flowbite.min.js"></script> */}
        <script src="https://unpkg.com/@themesberg/flowbite@latest/dist/flowbite.bundle.js"></script>
      </body>
    </html>
  );
}
