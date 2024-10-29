import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Open_Sans } from 'next/font/google';

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '800'],
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Open Mind Chat",
  description: "A space for mindful conversations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen antialiased bg-custom flex flex-col`}
      >
          <div className="p-2 self-start w-full text-left">
      <div className={`${openSans.className} font-bold text-[20px] px-2 text-cyan-900`}>
        + Open Mind Chat
      </div>
      <div className={`italic text-[16px] px-2 text-cyan-900`}>
        A Space for Mindful Conversations
      </div>
    </div>
        {children}
          <div className="flex justify-center text-cyan-900 text-xs pb-2">
            Lisa Marie Herzberg ©2024
          </div>
      </body>
    </html>
  );
}
