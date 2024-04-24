/**
 * 認証
 * Topページとそこで利用するAPIのみ認証を必要としない
 * @package Clerk
 */
import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  // ログインを必要としないページのパスを指定
  publicRoutes: ["/", "/api/article", "/api/search", "/api/small_classify"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
