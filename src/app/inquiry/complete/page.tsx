import Link from "next/link";
import PageTitle from "../../_components/page_title";

export default function Page() {
  return (
    <div>
      <PageTitle title="要望・お問い合わせ送信完了" />
      <p className="my-10 text-point-green-dark">
        お問い合わせありがとうございました。
      </p>
      <Link className="text-xl font-semibold text-point-green-light" href={"/"}>
        トップページへ戻る
      </Link>
    </div>
  );
}
