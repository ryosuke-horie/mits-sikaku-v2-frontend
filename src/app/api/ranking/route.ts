import { NextRequest, NextResponse } from "next/server";
import prisma from "../../_lib/prisma";

/**
 * お問い合わせ内容を登録する
 * @param req
 * @param res
 * @return　登録したお問い合わせ内容を含むオブジェクト
 */
export async function POST(request: NextRequest) {
  const req = await request.json();
  await prisma.ranking.create({ data: req });
  return NextResponse.json(req);
}

/**
 * すべての記事を取得する
 * @param req
 * @param res
 * @return　すべての記事と資格リストを含むオブジェクト
 */
export async function GET(req: NextRequest, res: NextResponse) {
  const results = await prisma.$queryRaw`
                    SELECT sikaku_name, AVG(level) as average_level
                    FROM ranking
                    GROUP BY sikaku_name
                    ORDER BY average_level DESC;
                  `;

  // allArticlesとotherDataを含むオブジェクトを作成
  const responseData = {
    ranking: results,
  };

  return NextResponse.json(responseData);
}
