import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import NavBar from "../components/navbar";
import { Header } from "../components/header";
import { BackgroundMusic } from "../components/BackgroundMusic";
import { MemoriesProvider } from "../context/MemoriesContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Secret Love",
  description: "Nem todo segredo deve permanecer escondido...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col  ">
        <MemoriesProvider>
          <Header />
          <BackgroundMusic />
          <main className="flex-1 pb-24 px-2">{children}</main>

          <NavBar />
        </MemoriesProvider>
      </body>
    </html>
  );
}
