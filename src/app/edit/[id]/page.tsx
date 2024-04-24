"use client";

import useSWR from "swr";
import { SIKAKU_LIST } from "../../_lib/define/sikaku";
import { EditForm } from "./_components/edit_form";

// SWRで使用するfetcher関数。urlを受け取り、jsonを返す。
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// export default function Post() {
export default function Edit({ params }: { params: { id: string } }) {
  const url = `/api/detail?id=${params.id}`;
  const { data, error } = useSWR(url, fetcher);
  const defaultBigClassify = Object.keys(SIKAKU_LIST)[0];

  if (!data) return <div>Loading...</div>; // ここで処理を止めてLoading...を表示します
  if (error) return <div>Error: {error.message}</div>; // エラーが発生した場合の処理

  return <EditForm data={data} defaultBigClassify={defaultBigClassify} />;
}
