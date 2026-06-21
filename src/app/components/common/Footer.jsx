import Link from "next/link";
import Image from "next/image";

import icFacebook from "@/app/assets/images/social/facebook-logo.svg";
import icTwitter from "@/app/assets/images/social/twitter-logo.svg";
import icYoutube from "@/app/assets/images/social/youtube-logo.svg";
import icInstagram from "@/app/assets/images/social/instagram-logo.svg";

export default function Footer() {
  return (
    <footer className="w-full bg-[#111827] py-8 text-[#9CA3AF]">
      <div className="mx-auto flex w-[1200px] items-center justify-between">
        <div className="text-sm">©codeit - 2024</div>

        <div className="flex gap-8 text-sm">
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="/faq" className="hover:text-white transition-colors">
            FAQ
          </Link>
        </div>

        <div className="flex gap-5 items-center">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <Image
              src={icFacebook}
              alt="페이스북 바로가기"
              width={20}
              height={20}
            />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <Image
              src={icTwitter}
              alt="트위터 바로가기"
              width={20}
              height={20}
            />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <Image
              src={icYoutube}
              alt="유튜브 바로가기"
              width={20}
              height={20}
            />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <Image
              src={icInstagram}
              alt="인스타그램 바로가기"
              width={20}
              height={20}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
