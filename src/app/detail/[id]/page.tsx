"use client";
import useSWR from "swr";
import PageTitle from "@/app/_components/page_title";
import React from "react";

// SWRで使用するfetcher関数。urlを受け取り、jsonを返す。
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// 改行を<br/>に変換する関数
const convertNewlinesToBreaks = (text: string) =>
  text.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));

export default function Detail({ params }: { params: { id: string } }) {
  // APIからデータを取得する
  const url = `/api/detail?id=${params.id}`;
  const { data, error } = useSWR(url, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      {/* ページ名 */}
      <PageTitle title="資格受験体験記" />

      {/* タイトル */}
      <h1 className="text-center text-2xl font-bold text-point-green-dark lg:text-3xl">
        {data.article.title}
      </h1>

      {/* 体験記内容 */}
      <div className="m-4 flex flex-col bg-white">
        <div className="flex justify-between">
          <span className="m-4 text-xl text-point-green-dark">
            {data.article.big_classify}
            <span> &nbsp;&gt;&nbsp;</span>
            {data.article.small_classify}
          </span>
          <span className="mx-4 mt-2 text-xl text-point-green-dark">
            @{data.article.name}
          </span>
        </div>
        <p className="mx-4 mt-4 text-2xl font-semibold text-point-green-dark">
          使用した教材
        </p>
        <hr className="border-1 h-1 w-full border-point-green-light" />
        <div className="mx-6 my-2 text-xl">
          {convertNewlinesToBreaks(data.article.body)}
        </div>
        <p className="mx-4 mt-4 text-2xl font-semibold text-point-green-dark">
          学習方法・アドバイスなど
        </p>
        <hr className="border-1 h-1 w-full border-point-green-light" />
        <div className="mx-6 my-2 text-xl">
          {convertNewlinesToBreaks(data.article.method)}
        </div>
      </div>
    </div>
  );
}
