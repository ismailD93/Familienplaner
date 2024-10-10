import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { FC, ReactNode } from "react";

const geistSans = localFont({
  src: "../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: `Umi Familienplaner`,
  description: `Developed by Professionals`,
  manifest: "/favicon/site.webmanifest",
  icons: {
    icon: "/favicon/favicon-32x32.png",
    shortcut: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
    other: {
      rel: "mask-icon",
      url: "/favicon/safari-pinned-tab.svg",
    },
  },
  other: {
    "msapplication-TileColor": "#000000",
    "msapplication-TileImage": "/favicon/mstile-150x150.png",
    "msapplication-config": "/favicon/browserconfig.xml",
  },
};
type Props = {
  params: {
    locale: string;
  };
  children: ReactNode;
};
const RootLayout: FC<Props> = ({ children }) => {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
