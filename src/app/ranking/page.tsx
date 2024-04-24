"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import PageTitle from "../_components/page_title";
import RankingList from "../_components/ranking_list";

export default function Page() {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    fetch("/api/ranking")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => setRanking(data.ranking))
      .catch((error) => console.error("Fetch failed:", error));
  }, []);

  return (
    <>
      <PageTitle title="資格難易度ランキング" />
      <p className="mx-4 my-10 text-point-green-dark">
        鋭意開発中。ご期待ください。
        <br />
        ご要望は
        <Link href="/inquiry">
          <span className="font-bold text-point-green-light underline">
            お問い合わせ
          </span>
        </Link>
        からお願いします。
      </p>
      <RankingList ranking={ranking} />
    </>
  );
}
