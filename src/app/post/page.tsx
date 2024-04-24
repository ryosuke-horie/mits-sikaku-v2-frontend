"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import PageTitle from "../_components/page_title";
import InputField from "./_components/input_field";
import TextArea from "./_components/textarea";
import SelectField from "./_components/select_field";
import { SIKAKU_LIST } from "../_lib/define/sikaku";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";

type FormData = {
  user_id: string;
  name: string;
  title: string;
  body: string;
  method: string;
  bigClassify: string;
  smallClassify: string;
};

export default function Post() {
  const { userId } = useAuth();
  const router = useRouter();
  const defaultBigClassify = Object.keys(SIKAKU_LIST)[0];
  const {
    register,
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
      const response = await fetch("/api/article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          name: data.name,
          big_classify: data.bigClassify,
          small_classify: data.smallClassify,
          title: data.title,
          body: data.body,
          method: data.method,
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      });

      // エンコードしてパラメータに付与する
      const bigClassify = encodeURIComponent(data.bigClassify);
      const smallClassify = encodeURIComponent(data.smallClassify);

      router.push(
        `/?big_classify=${bigClassify}&small_classify=${smallClassify}`,
      );
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
          <p className="pl-5 text-red-700">{errors.name?.message}</p>
          <Controller
            control={control}
            name="name"
            rules={{
              required: "名前は必須です",
              maxLength: {
                value: 30,
                message: "30文字を超えることはできません",
              },
            }}
            render={({ field }) => (
              <InputField type="text" placeholder="お名前" {...field} />
            )}
          />

          <Controller
            control={control}
            name="bigClassify"
            rules={{ required: "大分類は必須です" }}
            render={({ field }) => (
              <SelectField
                options={Object.keys(SIKAKU_LIST)}
                onChange={(value) => {
                  field.onChange(value);
                  console.log(value);
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
                  console.log(value);
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
