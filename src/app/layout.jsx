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
  title: "판다마켓",
  description: "판다마켓 중고거래 서비스",
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

          <main className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-8 md:px-6 md:py-10 xl:px-0">
            {children}
          </main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
