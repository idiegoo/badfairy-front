import { Metadata } from "next";
import { Open_Sans } from 'next/font/google'
import "./globals.css";
import Providers from "./providers";
import Header from "./header";

const open_sans = Open_Sans({
  subsets: ['latin'],
  preload: true,
  display: "swap",
  weight: ["400", "600", "700"], // regular, semibold, bold (para pasarlo como className)
})

export const metadata: Metadata = {
  title: "Catálogo web Badfairy",
  description: "Catálogo web de la tienda @badfairy.cl",
  authors: [
    {
      name: "Diego Ramirez"
    },
    {
      name: "Tamara Osorio"
    },
    {
      name: "Odin"
    }
  ],
  applicationName: "Badfairy",
  creator: "Diego Ramirez",
  keywords: "badfairy, catalogo, bisuteria, joyeria, accesorios, moda, chile",
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
        <meta name="google-site-verification" content="7mFFOhGlDc9LNtEQfNzvBezn1Gi1BIEmFhzL3Rdop6E" />
        <link rel="icon" href="/favicon.ico" />
        <title>Catálogo web Badfairy</title>
      </head>
      <body
      //poniendola en italic
        className={`${open_sans.className}`}
      >
        <Header />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
