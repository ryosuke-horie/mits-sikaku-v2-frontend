"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import PageTitle from "./_components/page_title";
import PostButton from "./_components/post_button";
import PostsCard from "./_components/post_card";
import type { Article } from "./_lib/define/types";

export const runtime = "edge";

export default function Home() {
  const cookie = useCookies();
  const token = cookie.get("token");
  const [articles, setArticles] = useState<Article[]>([]);
  const postApi = `${process.env.NEXT_PUBLIC_API_URL}/api/post`;

  useEffect(() => {
    axios
      .get(postApi, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => console.error(error));
  }, [token]);

	// HTMLを返す
	return (
		<div className="flex flex-col items-start">
			<div className="mb-2 mt-2 flex items-center">
				{/* ページタイトル */}
				<PageTitle title="資格受験体験記" />
				{/* 投稿ボタン */}
				<PostButton />
			</div>

			<hr className="border-1 h-1 w-full border-point-green-light" />
			{/* 検索結果表示欄 */}
			<div className="mt-2 flex w-full flex-col bg-white">
				{articles?.map((article: Article) => (
					<PostsCard key={article.id} article={article} />
				))}
			</div>
		</div>
	);
}
