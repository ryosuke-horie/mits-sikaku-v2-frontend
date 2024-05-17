"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useCookies } from "next-client-cookies";

export const runtime = "edge";

export default function LoginPage(): JSX.Element {
  const router = useRouter();
  const cookies = useCookies();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const LoginApi = `${process.env.NEXT_PUBLIC_API_URL}/api/login`;

    try {
      setIsLoading(true);
      const response = await fetch(LoginApi, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();

        // クッキーの設定
        cookies.set("user_id", data.userId, {
          path: "/",
        });
        cookies.set("token", data.token, {
          path: "/",
        });
        cookies.set("redirectFlag", "true", {
          path: "/",
          expires: new Date(Date.now() + 60 * 1000), // 1分間有効なフラグ
        });

        // デバッグ用: クッキーの設定を確認
        console.log("user_id:", cookies.get("user_id"));
        console.log("token:", cookies.get("token"));
        console.log("redirectFlag:", cookies.get("redirectFlag"));

        // クッキーの設定が完了したことを確認
        setTimeout(() => {
          router.push("/");
        }, 500); // 少し長めの遅延を追加
      } else {
        alert("ログインに失敗しました。");
      }
    } catch (error) {
      console.error("エラーが発生しました:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // クッキーにtokenが存在するかをチェックして、存在すればリダイレクト
    if (cookies.get("token")) {
      router.push("/");
    }
  }, [cookies, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">ログイン</h1>
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
            <a href="/signup" className="text-blue-500 hover:text-blue-700">
              アカウントをお持ちでないですか？
            </a>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "処理中..." : "ログイン"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
