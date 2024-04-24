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
  await prisma.inquiry.create({ data: req });
  return NextResponse.json(req);
}
