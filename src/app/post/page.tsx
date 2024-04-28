"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import PageTitle from "../_components/page_title";
import InputField from "./_components/input_field";
import TextArea from "./_components/textarea";
import SelectField from "./_components/select_field";
import { SIKAKU_LIST } from "../_lib/define/sikaku";
import { useCookies } from "next-client-cookies";

type FormData = {
  user_id: string;
  name: string;
  title: string;
  body: string;
  method: string;
  bigClassify: string;
  smallClassify: string;
};

export const runtime = 'edge';

export default function Post() {
  const cookies = useCookies();

  // ユーザーIDを取得
  const userId = cookies.get("user_id");
  const token = cookies.get("token");

  const router = useRouter();
  const PostApi = `${process.env.NEXT_PUBLIC_API_URL}/api/post`;

  const defaultBigClassify = Object.keys(SIKAKU_LIST)[0];
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      bigClassify: defaultBigClassify,
    },
  });
  const bigClassify = watch("bigClassify");

  // 連続クリックによる複数回の投稿を防ぐ状態管理
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: FormData) => {
    if (isSubmitting) return; // すでに投稿が進行中の場合は何もしない

    setIsSubmitting(true); // 投稿が開始されたことを示すフラグを立てる

    try {
      const response = await fetch(PostApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: userId,
          big_category: data.bigClassify,
          small_category: data.smallClassify,
          title: data.title,
          body: data.body,
          method: data.method,
        }),
      });

      console.log(userId);
      console.log(data.bigClassify);
      console.log(data.smallClassify);
      console.log(data.title);
      console.log(data.body);
      console.log(data.method);

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageTitle title="資格受験体験記 投稿" />

      <div className="mx-2 my-8 w-auto lg:my-12">
        <form
          className="flex flex-col items-start lg:mx-20"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="pb-2 pl-5 text-red-700">
            ※全ての項目が「必須入力」となります。
          </p>

          <Controller
            control={control}
            name="bigClassify"
            rules={{ required: "大分類は必須です" }}
            render={({ field }) => (
              <SelectField
                options={Object.keys(SIKAKU_LIST)}
                onChange={(value) => {
                  field.onChange(value);
                }}
                value={field.value}
              />
            )}
          />

          <p className="pl-5 text-red-700">{errors.smallClassify?.message}</p>
          <Controller
            control={control}
            name="smallClassify"
            rules={{
              required: "小分類は必須です",
              validate: (value) => value !== "選択してください",
            }}
            render={({ field }) => (
              <SelectField
                options={SIKAKU_LIST[bigClassify]}
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                }}
              />
            )}
          />

          <p className="pl-5 text-red-700">{errors.title?.message}</p>
          <Controller
            control={control}
            name="title"
            rules={{
              required: "タイトルは必須です",
              maxLength: {
                value: 100,
                message: "100文字を超えることはできません",
              },
            }}
            render={({ field }) => (
              <InputField
                type="text"
                placeholder="タイトル（一言で資格の感想など記入してください）"
                {...field}
              />
            )}
          />

          <p className="pl-5 text-red-700">{errors.body?.message}</p>
          <Controller
            control={control}
            name="body"
            rules={{
              required: "本文は必須です",
              maxLength: {
                value: 3000,
                message: "3000文字を超えることはできません",
              },
            }}
            render={({ field }) => (
              <TextArea
                placeholder="活用した教材についてこちらにお書きください。"
                {...field}
              />
            )}
          />

          <p className="pl-5 text-red-700">{errors.method?.message}</p>
          <Controller
            control={control}
            name="method"
            rules={{
              required: "学習方法・アドバイスなどは必須です",
              maxLength: {
                value: 3000,
                message: "3000文字を超えることはできません",
              },
            }}
            render={({ field }) => (
              <TextArea
                placeholder="学習方法・アドバイスなどをこちらにお書きください。"
                {...field}
              />
            )}
          />

          {/* 投稿ボタン */}
          <div className="flex w-11/12 justify-center">
            <button
              type="submit"
              className="m-4 rounded border border-point-green-light bg-transparent px-20 py-8 text-xl font-bold text-point-green-light hover:border-transparent hover:bg-point-green-dark hover:text-white lg:text-3xl"
              disabled={isSubmitting}
            >
              {"投稿する"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
