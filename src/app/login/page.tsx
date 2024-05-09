"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import logoImage from "/public/logo.jpg";
import { useCookies } from "next-client-cookies";

export const runtime = 'edge';

export default function LoginPage(): JSX.Element {
  const router = useRouter();
  const cookies = useCookies();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const LoginApi = `${process.env.NEXT_PUBLIC_API_URL}/api/login`;

    try {
      const response = await fetch(LoginApi, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // ログイン成功時の処理
        alert("ログインに成功しました。");

        const data = await response.json();

        // ユーザー ID とトークンを Cookie にセット
        cookies.set("user_id", data.userId, {
          path: "/",
        });
        cookies.set("token", data.token, {
          path: "/",
        });

        // ダッシュボードページに遷移
        router.push("/");
      } else {
        // ログイン失敗時の処理
        alert("ログインに失敗しました。");
      }
    } catch (error) {
      console.error("エラーが発生しました:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl">ログイン</h1>
      <div className="w-96">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              メールアドレス
            </label>
            <input
              type="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="メールアドレス"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              パスワード
            </label>
            <input
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="パスワード"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              ログイン
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
