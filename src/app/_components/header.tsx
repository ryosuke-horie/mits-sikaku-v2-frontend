"use client";

import Image from "next/image";
import Link from "next/link";
import logoImage from "/public/logo.jpg";
import { useCookies  } from "next-client-cookies";

// ヘッダー用コンポーネント
export default function Header(): JSX.Element {
  const cookies = useCookies();
  // 認証済みかの判定フラグを、クッキーから取得
  const isAuthenticated = cookies.get("token") ? true : false;

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

      {/* 認証関連は認証済みの場合にのみ表示する */}
        {!isAuthenticated && (
            <div className="mx-4 flex items-center">
            <Link href="/signup">
                <span className="text-gray-700">新規登録</span>
            </Link>
            <span className="mx-4 text-gray-700">|</span>
            <Link href="/login">
                <span className="text-gray-700">ログイン</span>
            </Link>
            </div>
            )}
        </div>
  );
}
