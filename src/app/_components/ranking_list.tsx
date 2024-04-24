"use client";
import { useState, useEffect } from "react";

export default function RankingList({ ranking }) {
  const [rankings, setRankings] = useState(ranking);

  useEffect(() => {
    setRankings(ranking);
  }, [ranking]);

  return (
    <div className="mx-4 mt-6">
      {rankings &&
        rankings.map((ranking, index) => (
          <div key={index} className="mb-4 rounded border p-4 shadow-sm">
            <span>{index + 1}位</span>
            <h2 className="mb-2 text-xl font-bold">{ranking.sikaku_name}</h2>
            <p>難易度: {ranking.average_level}</p>
          </div>
        ))}
    </div>
  );
}
