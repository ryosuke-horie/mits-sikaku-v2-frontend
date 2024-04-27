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
            <Image src={logoImage} alt="logo" width={50} height={50} />
          </>
        </Link>
      </div>

    <div className="mx-4 flex items-center">
            <Link href="/signup">
                <span className="text-gray-700">新規登録</span>
            </Link>
            <span className="mx-4 text-gray-700">|</span>
            <Link href="/login">
                <span className="text-gray-700">ログイン</span>
            </Link>
            </div>
        </div>
  );
}
