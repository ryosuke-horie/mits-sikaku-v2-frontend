"use client";
import PageTitle from "@/app/_components/page_title";
import { useCookies } from "next-client-cookies";
import { useEffect, useState } from "react";

export const runtime = 'edge';

export default function Detail({ params }: { params: { id: string } }) {
  const cookie = useCookies(); 
  const token = cookie.get("token");
  const name = cookie.get("name");

  const [post, setPost] = useState({
    title: "",
    body: "",
    method: "",
    big_category: "",
    small_category: "",
  });

  // APIからデータを取得する
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/post/${params.id}`;

  const getPost = async () => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data[0]);
      setPost(data[0]);
    } else {
      console.error("データの取得に失敗しました");
    }
  }

  // ページ遷移時にデータを取得
  useEffect(() => {
    getPost();
  }, []);

  return (
    <div>
      {/* ページ名 */}
      <PageTitle title="資格受験体験記" />

      {/* タイトル */}
      <h1 className="text-center text-2xl font-bold text-point-green-dark lg:text-3xl">
        {post.title}
      </h1>

      {/* 体験記内容 */}
      <div className="m-4 flex flex-col bg-white">
        <div className="flex justify-between">
            {/* 書いてくれた人の名前 */}
          <span className="m-4 text-xl text-point-green-dark">
            {post.big_category}
            <span> &nbsp;&gt;&nbsp;</span>
            {post.small_category}
          </span>
          <p className="text-center text-lg text-point-green-dark float-right pr-20">
            {name}
        </p>
        </div>
        <p className="mx-4 mt-4 text-2xl font-semibold text-point-green-dark">
          使用した教材
        </p>
        <hr className="border-1 h-1 w-full border-point-green-light" />
        <div className="mx-6 my-2 text-xl whitespace-pre-wrap">
          {post.body}
        </div>
        <p className="mx-4 mt-4 text-2xl font-semibold text-point-green-dark">
          学習方法・アドバイスなど
        </p>
        <hr className="border-1 h-1 w-full border-point-green-light" />
        <div className="mx-6 my-2 text-xl whitespace-pre-wrap">
          {post.method}
        </div>
      </div>
    </div>
  );
}
