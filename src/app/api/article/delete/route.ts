import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../_lib/prisma";

/**
 * 記事を削除する
 * @param request
 * @return 削除した記事のIDを含むオブジェクト
 */
export async function DELETE(request: NextRequest) {
  const req = await request.json();
  let deletedId;
  try {
    // prismaを使ってDBから記事を削除する
    const deletedArticle = await prisma.article.delete({
      where: { id: req.id },
    });
    deletedId = deletedArticle.id;
  } catch (error) {
    console.error("Error deleting article: ", error);
  }
  // 削除した記事のIDをJSONとして返す
  return NextResponse.json({ deletedId: deletedId });
}
