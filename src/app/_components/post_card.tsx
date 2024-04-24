import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import gokakuImage from "../../../public/gokaku.png";
import { useAuth } from "@clerk/nextjs";
import { DeleteButton } from "./button/deleteButton";
import { EditButton } from "./button/editButton";

type Article = {
  id: number;
  user_id: string;
  name: string;
  title: string;
  body: string;
  big_classify: string;
  small_classify: string;
  createdAt: string;
  updatedAt: string;
};

type PostsCardProps = {
  article: Article;
};

// カードホバーで上に浮かび上がるアニメーション
const hoverAnimation =
  "transition-transform duration-300 ease-in-out transform hover:-translate-y-2";

export default function PostsCard({ article }: PostsCardProps) {
  const router = useRouter();
  const { userId } = useAuth();
  const isUserArticle = userId === article.user_id;

  // 編集機能
  const handleEdit = () => {
    // 編集ページへのルートを生成
    const editRoute = `/edit/${article.id}`;
    // ルートにリダイレクト
    router.push(editRoute);
  };

  // 削除機能
  const handleDelete = (event: any) => {
    event.stopPropagation();

    // APIエンドポイントにDELETEリクエストを送る
    fetch("/api/article/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: article.id, // 削除する記事のID
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // 削除した記事のIDを表示（あるいは他の処理）
        console.log("Deleted article ID:", data.deletedId);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // SPAでは記事が削除されないため、リロードを行う
    window.location.href = "/";
  };

  const createdAt = new Date(article.createdAt).toLocaleDateString();

  return (
    <>
      <article
        className={`mx-4 my-4 flex w-auto bg-white shadow-md ${hoverAnimation}`}
      >
        <div className="flex w-full flex-row justify-between">
          <Link href={`/detail/${article.id}`}>
            <div className="flex flex-row">
              <div className="ml-4 mt-4 flex flex-col">
                <p className="w-150 overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {article.name}
                </p>
                <p>{createdAt}</p>
                <Image
                  src={gokakuImage}
                  alt="gokaku"
                  width={100}
                  height={100}
                />
              </div>
              <div className="mx-8 flex flex-col">
                <p className="my-4 text-gray-500">
                  {article.big_classify}
                  <span>&nbsp;&gt;&nbsp;</span>
                  {article.small_classify}
                </p>
                <h3 className="my-4 text-xl font-bold text-point-green-dark">
                  {article.title}
                </h3>
              </div>
            </div>
          </Link>
          {/* ユーザーが記事のオーナーであれば、編集・削除ボタンを表示 */}
          {isUserArticle && (
            <div className="mr-4 flex items-center">
              <EditButton onClick={handleEdit} userId={article.user_id}>
                編集
              </EditButton>
              <DeleteButton onClick={handleDelete} userId={article.user_id}>
                削除
              </DeleteButton>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
