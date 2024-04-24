import Link from "next/link";

export default function PostButton() {
  return (
    <div className="mx-8 mb-2 mr-2 flex h-12 items-center justify-center rounded-lg bg-point-green-light p-2 text-2xl font-semibold text-white hover:bg-point-green-dark focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 lg:mx-12 lg:mb-4 lg:px-5 lg:py-4">
      <Link href="/post">投稿する</Link>
    </div>
  );
}
