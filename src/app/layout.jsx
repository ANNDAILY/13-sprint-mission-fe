import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/app/components/common/Header";
import Footer from "@/app/components/common/Footer";
import Providers from "@/app/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  preload: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

export const metadata = {
  title: "판다마켓 자유게시판",
  description: "미션7 프로젝트",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F9FAFB] text-[#111827]">
        <Providers>
          <Header />

          <main className="mx-auto w-[1200px] flex-1 py-10">{children}</main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
