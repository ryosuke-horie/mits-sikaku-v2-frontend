import { NextRequest, NextResponse } from "next/server";
import prisma from "../../_lib/prisma";
import { Article } from "../../_lib/define/types";

type ResponseData = {
  article: Article;
};

/**
 * 体験記詳細ページの取得処理
 * @param req
 * @param res
 * @return　指定したIDの記事を含むオブジェクト
 */
export async function GET(req: NextRequest, res: NextResponse) {
  // URLのクエリパラメータからidを取得
  const id: number = Number(req.nextUrl.searchParams.get("id"));

  if (!id) {
    throw new Error("ID is required");
  }
  // 指定したIDの記事を取得
  const rawArticle = await prisma.article.findUnique({
    where: {
      id: id,
    },
  });

  // エラーハンドリング: 記事が見つからなかった場合
  if (!rawArticle) {
    return NextResponse.json({ error: "Article not found" });
  }

  const article: Article = {
    ...rawArticle,
    createdAt: rawArticle.createdAt.toISOString(), // Date to string conversion
    updatedAt: rawArticle.updatedAt.toISOString(), // Date to string conversion
  };

  // 記事を含むオブジェクトを作成
  const responseData: ResponseData = {
    article: article,
  };

  return NextResponse.json(responseData);
}
