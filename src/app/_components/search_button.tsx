// propsの型定義
type SearchButtonProps = {
  name: string; // ボタン名
  active: boolean; // アクティブかどうか
  onClick: () => void; // クリック時の処理
};

export default function SearchButton({
  name,
  active,
  onClick,
}: SearchButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`my-2 h-10 overflow-hidden whitespace-nowrap rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium hover:bg-gray-100 hover:text-point-green-dark focus:outline-none focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700 lg:m-2 ${
        active
          ? "bg-white text-point-green-dark"
          : "bg-point-green-dark text-white"
      }`}
    >
      {name}
    </button>
  );
}
