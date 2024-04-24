"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import PageTitle from "../_components/page_title";

type FormData = {
  content: string;
};

export default function Page() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: data.content,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // お問い合わせ完了ページに遷移する
      router.push("/inquiry/complete");
    } catch (error) {
      console.error("An error occurred while submitting the form:", error);
    }
  };

  return (
    <>
      <PageTitle title="要望・お問い合わせ" />
      <p className="mx-4 my-10 text-point-green-dark">
        サービス改善のため、要望等がございましたら、こちらのフォームからお願いいたします。
      </p>

      <h2 className="mx-4 text-2xl font-semibold text-point-green-dark">
        内容
      </h2>
      <form
        className="flex flex-col justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        {errors.content && (
          <p className="pb-2 pl-3 pt-4 text-red-700">
            {errors.content.message}
          </p>
        )}
        <textarea
          {...register("content", {
            required: { value: true, message: "内容を入力してください" },
            maxLength: {
              value: 5000,
              message: "5000文字以内で入力してください。",
            },
          })}
          rows={10}
          cols={80}
          className="m-2 mb-4 h-40 resize-none rounded-3xl border-2 border-solid border-point-green-light p-4 outline-none"
        ></textarea>
        <button
          type="submit"
          className="m-4 w-auto rounded border border-point-green-light bg-transparent px-16 py-8 text-xl font-bold text-point-green-light hover:border-transparent hover:bg-point-green-dark hover:text-white lg:text-3xl"
        >
          送信する
        </button>
      </form>
    </>
  );
}
