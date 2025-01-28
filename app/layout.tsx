import type { Metadata } from "next";
import { Open_Sans } from 'next/font/google'
import "./globals.css";

const open_sans = Open_Sans({
  subsets: ['latin'],
  preload: true,
  display: "swap",
  weight: ["400", "600", "700"], // regular, semibold, bold (para pasarlo como className)
})

export const metadata: Metadata = {
  title: "Catálogo web Badfairy",
  description: "Catálogo de la tienda, galería de fotos y más!",
  authors: [
    {
      name: "Diego Ramirez"
    },
    {
      name: "Tamara Osorio"
    }
  ],
  creator: "Diego Ramirez",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>Catálogo web Badfairy</title>
      </head>
      <body
      //poniendola en italic
        className={`${open_sans.className}`}
      >
        {children}
      </body>
    </html>
  );
}
