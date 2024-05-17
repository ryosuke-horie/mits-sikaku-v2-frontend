"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const runtime = "edge";

export default function SignupPage(): JSX.Element {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signupApi = `${process.env.NEXT_PUBLIC_API_URL}/api/signup`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await fetch(signupApi, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("新規登録が完了しました。");
        setEmail("");
        setPassword("");

        router.push("/login");
      } else {
        alert(
          "新規登録に失敗しました。ITSのメールアドレスであることをご確認ください。"
        );
      }
    } catch (error) {
      console.error("エラーが発生しました:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">新規登録</h1>
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
            <a href="/login" className="text-blue-500 hover:text-blue-700">
              アカウントをお持ちですか？
            </a>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              新規登録
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
