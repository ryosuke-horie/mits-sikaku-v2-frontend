import { NextRequest, NextResponse } from "next/server";
import prisma from "../../_lib/prisma";
import { SIKAKU_LIST } from "../../_lib/define/sikaku";

/**
 * すべての記事を取得する
 * @param req
 * @param res
 * @return　すべての記事と資格リストを含むオブジェクト
 */
export async function GET(req: NextRequest, res: NextResponse) {
  const allArticles = await prisma.article.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  // allArticlesとotherDataを含むオブジェクトを作成
  const responseData = {
    articles: allArticles,
    sikakuList: SIKAKU_LIST,
  };

  return NextResponse.json(responseData);
}

/**
 * 記事を作成する
 * @param req
 * @param res
 * @return　作成した記事を含むオブジェクト
 */
export async function POST(request: NextRequest) {
  const req = await request.json();
  try {
    await prisma.article.create({ data: req });
  } catch (error) {
    console.error("Error creating article: ", error);
  }
  return NextResponse.json(req);
}
