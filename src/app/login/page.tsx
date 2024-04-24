"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import logoImage from "/public/logo.jpg";

export default function LoginPage(): JSX.Element {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await fetch(
        "https://mits-sikaku-api.ryosuke-horie37.workers.dev/api/login",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        // ログイン成功時の処理
        alert("ログインに成功しました。");

        const data = await response.json();
        // 取得したtokenをlocalStorageに保存
        localStorage.setItem("token", data.token);

        // 取得したuserをlocalStorageに保存
        localStorage.setItem("user", JSON.stringify(data.user));

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
      <div className="w-96">
        <div className="mb-8">
          <Image src={logoImage} alt="logo" width={80} height={80} />
        </div>
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
