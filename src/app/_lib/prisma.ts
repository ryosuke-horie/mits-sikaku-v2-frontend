import { PrismaClient } from "@prisma/client";

// Node.jsのグローバルオブジェクトを拡張して、Prisma Clientのインスタンスを保持できるようにします。
// これにより、Prisma Clientのインスタンスがすでに存在する場合はそれを再利用し、存在しない場合は新たに作成します。
declare const global: NodeJS.ProcessEnv &
  typeof globalThis & { prisma?: PrismaClient };

// グローバルオブジェクトにPrisma Clientのインスタンスが存在する場合はそれを使用し、存在しない場合は新たに作成します。
const prisma = global.prisma || new PrismaClient();

// 開発環境の場合、作成したPrisma Clientのインスタンスをグローバルオブジェクトに保存します。
// これにより、次回のリクエストで同じインスタンスを再利用できます。
if (process.env.NODE_ENV === "development") global.prisma = prisma;

// Prisma Clientのインスタンスをエクスポートします。
// これにより、他のファイルからこのインスタンスをインポートして使用できます。
export default prisma;
