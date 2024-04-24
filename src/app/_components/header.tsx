"use client";

import Image from "next/image";
import Link from "next/link";
import logoImage from "/public/logo.jpg";
import { useEffect, useState } from "react";
import { RankingIcon } from "./ranking_icon";
import { InquiryIcon } from "./inquiry_icon";

// 認証｜Clerk
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
} from "@clerk/nextjs";
import { faListSquares } from "@fortawesome/free-solid-svg-icons";

// ヘッダー用コンポーネント
export default function Header(): JSX.Element {
  // SP用のハンバーガーメニューの表示・非表示を管理する
  const [isOpen, setIsOpen] = useState(false);

  // 仕様
  // PC用のヘッダーとSP用のヘッダーをStateで表示・非表示を切り替える
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
      {/* SP用のハンバーガーメニューボタン */}
      <button
        className={`mr-4 text-4xl lg:hidden ${isOpen ? "hidden" : ""}`}
        onClick={() => setIsOpen(true)}
      >
        <span>☰</span>
      </button>
      <div
        className={`fixed right-0 top-0 z-10 w-full transform bg-transparent ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-200 ease-in-out lg:static lg:transform-none lg:transition-none`}
      >
        {/* SP用リンク */}
        <div
          className={`fixed right-0 top-0 flex h-auto w-full flex-col items-end space-y-4 bg-white p-4 ${
            isOpen ? "block" : "hidden"
          } lg:hidden`}
        >
          {/* ✕のボタン */}
          <button
            className={`self-end text-4xl`}
            onClick={() => setIsOpen(false)}
          >
            <span>✕</span>
          </button>
          <Link href="/ranking">
            <div
              className="cursor-pointer text-left text-lg font-bold text-point-green-dark"
              onClick={() => setIsOpen(false)}
            >
              資格難易度
              <br />
              ランキング
            </div>
          </Link>

          <Link href="/inquiry">
            <div
              className="cursor-pointer text-left text-lg font-bold text-point-green-dark"
              onClick={() => setIsOpen(false)}
            >
              要望
              <br />
              お問い合わせ
            </div>
          </Link>

          <SignedIn>
            <SignOutButton>
              <span
                className="mx-4 cursor-pointer text-lg font-bold text-point-green-dark"
                onClick={() => setIsOpen(false)}
              >
                ログアウト
              </span>
            </SignOutButton>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <span
                className="mx-4 cursor-pointer text-lg font-bold text-point-green-dark"
                onClick={() => setIsOpen(false)}
              >
                ログイン
              </span>
            </SignInButton>
            <SignUpButton>
              <span
                className="mx-4 cursor-pointer text-lg font-bold text-point-green-dark"
                onClick={() => setIsOpen(false)}
              >
                新規登録
              </span>
            </SignUpButton>
          </SignedOut>
        </div>

        {/* PC用リンク */}
        <div className="hidden items-center justify-end pr-4 lg:flex lg:pr-20">
          <Link
            href="/ranking"
            className="m-4 cursor-pointer text-lg font-bold text-point-green-dark"
          >
            ランキング
            {/* <span
              className="mx-4 cursor-pointer text-3xl font-bold text-point-green-dark"
              title="資格ランキング"
            >
              <RankingIcon />
            </span> */}
          </Link>

          <Link
            href="/inquiry"
            className="m-4 cursor-pointer text-lg font-bold text-point-green-dark"
          >
            お問い合わせ
            {/* <span
              className="mx-4 cursor-pointer text-3xl font-bold text-point-green-dark"
              title="お問い合わせ"
            >
              <InquiryIcon />
            </span> */}
          </Link>

          <SignedIn>
            <SignOutButton>
              <span className="mx-4 cursor-pointer text-lg font-bold text-point-green-dark">
                ログアウト
              </span>
            </SignOutButton>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <span className="mx-4 cursor-pointer text-lg font-bold text-point-green-dark">
                ログイン
              </span>
            </SignInButton>
            <SignUpButton>
              <span className="mx-4 cursor-pointer text-lg font-bold text-point-green-dark">
                新規登録
              </span>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}
