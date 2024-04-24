import { NextRequest, NextResponse } from "next/server";
import prisma from "../../_lib/prisma";

/**
 * 資格種別もしくは資格名で検索し体験記のリストを返す。
 * Topページで使用する。
 */
async function searchArticleList(req: NextRequest) {
  // URLのクエリパラメータから資格種別・資格名を取得
  const condition = getSearchCondition(req);

  // 指定したsmall_classifyを含む記事を取得
  const articles = await prisma.article.findMany({
    where: condition,
    orderBy: {
      createdAt: "desc",
    },
  });

  // articlesを含むJSONレスポンスを返す
  return NextResponse.json({ articles });
}

/**
 * prismaのWhereに相当する形で、URLのクエリパラメータから検索条件を取得する。
 * @param req NextRequest
 * @returns
 */
function getSearchCondition(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const big_classify = searchParams.get("big_classify") as string;
  const small_classify = searchParams.get("small_classify") || undefined;

  let condition = {};

  if (small_classify === undefined) {
    condition = {
      big_classify: {
        contains: big_classify,
      },
    };
  } else {
    condition = {
      small_classify: {
        contains: small_classify,
      },
    };
  }

  return condition;
}

export { searchArticleList as GET };
