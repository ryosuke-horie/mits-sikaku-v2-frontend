import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../_lib/prisma";

/**
 * 記事を更新する
 * @param request
 * @return 更新した記事のIDを含むオブジェクト
 */
export async function PUT(request: NextRequest) {
  const req = await request.json();
  console.log(req);
  let updatedId;
  try {
    // prismaを使ってDBから記事を更新する
    const updatedArticle = await prisma.article.update({
      where: { id: req.id },
      data: {
        user_id: req.user_id,
        name: req.name,
        big_classify: req.big_classify,
        small_classify: req.small_classify,
        title: req.title,
        body: req.body,
        method: req.method,
        updatedAt: new Date(),
      },
    });
    updatedId = updatedArticle.id;
  } catch (error) {
    console.error("Error updating article: ", error);
  }
  // 更新した記事のIDをJSONとして返す
  return NextResponse.json({ updatedId: updatedId });
}
