"use client";
import { useState } from "react";

import axios from "axios"; // axiosをインポート
import { useCookies } from "next-client-cookies";
import PageTitle from "./_components/page_title";
import PostButton from "./_components/post_button"; // 投稿ボタン
import PostsCard from "./_components/post_card"; // 検索結果表示欄
import type { Article } from "./_lib/define/types"; // 体験記の型定義

// ホームページコンポーネントの定義
export default function Home() {
	const cookie = useCookies();
	const token = cookie.get("token");

	// 記事データを格納するarticlesステートを定義
	const [articles, setArticles] = useState<Article[]>([]);

	const postApi = `${process.env.NEXT_PUBLIC_API_URL}/api/post`;

	// すべての記事を取得する
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
