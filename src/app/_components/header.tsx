"use client";

import Image from "next/image";
import Link from "next/link";
import logoImage from "/public/logo.jpg";

// ヘッダー用コンポーネント
export default function Header(): JSX.Element {
  return (
    <div className="h-30 mb-0 flex w-full items-center justify-between bg-white shadow lg:mb-8">
      {/* ロゴ */}
      <div className="mx-4 flex items-center lg:mx-20">
        <Link href="/">
          <>
            <Image src={logoImage} alt="logo" width={80} height={80} />
          </>
        </Link>
      </div>
    </div>
  );
}
