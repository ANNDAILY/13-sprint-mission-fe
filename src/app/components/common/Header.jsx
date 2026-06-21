import Link from "next/link";
import Image from "next/image";
import logo from "@/app/assets/images/logo/logo.svg";

export default function Header() {
  return (
    <header className="w-full border-b border-[#E5E7EB] bg-white">
      <div className="mx-auto flex h-16 w-[1200px] items-center justify-between">
        <div className="flex items-center gap-10">
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

          <nav className="flex items-center gap-8 text-base font-semibold">
            <Link href="/articles" className="text-[#3692FF]">
              자유게시판
            </Link>
            <Link
              href="/market"
              className="text-[#4B5563] hover:text-[#111827] transition-colors"
            >
              중고마켓
            </Link>
          </nav>
        </div>

        <div>
          <button className="rounded-lg bg-[#3692FF] px-6 py-2.5 text-base font-semibold text-white hover:bg-[#1967D6] transition-colors">
            로그인
          </button>
        </div>
      </div>
    </header>
  );
}
