"use client";

import Link from "next/link";
import Image from "next/image";
import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import logo from "@/app/assets/images/logo/logo.svg";
import icProfile from "@/app/assets/images/icons/ic_profile.svg";
import { hasAccessToken, subscribeAuthChange } from "@/app/lib/auth";

export default function Header() {
  const pathname = usePathname();
  const isAuthPage = pathname === "/signin" || pathname === "/signup";
  const isLoggedIn = useSyncExternalStore(
    subscribeAuthChange,
    hasAccessToken,
    () => false,
  );

  if (isAuthPage) {
    return null;
  }

  const isArticlesPath = pathname.startsWith("/articles");
  const isItemsPath = pathname.startsWith("/items");
  const activeLinkClass =
    "text-[#3692FF] transition-colors hover:text-[#1967D6]";
  const inactiveLinkClass =
    "text-[#4B5563] transition-colors hover:text-[#111827]";

  return (
    <header className="w-full border-b border-[#E5E7EB] bg-white">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-4 md:px-6 xl:px-0">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/">
            <Image
              src={logo}
              alt="판다마켓 로고"
              width={110}
              height={32}
              className="w-auto h-auto"
              priority
            />
          </Link>

          <nav className="flex items-center gap-4 text-sm font-semibold md:gap-8 md:text-base">
            <Link
              href="/articles"
              className={isArticlesPath ? activeLinkClass : inactiveLinkClass}
            >
              자유게시판
            </Link>
            <Link
              href="/items"
              className={isItemsPath ? activeLinkClass : inactiveLinkClass}
            >
              중고마켓
            </Link>
          </nav>
        </div>

        <div>
          {isLoggedIn ? (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3F4F6]">
              <Image src={icProfile} alt="프로필" width={24} height={24} />
            </div>
          ) : (
            <Link
              href="/signin"
              className="rounded-lg bg-[#3692FF] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1967D6] md:px-6 md:text-base"
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
