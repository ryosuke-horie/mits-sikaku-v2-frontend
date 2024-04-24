"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import axios from "axios"; // axiosをインポート
import PageTitle from "./_components/page_title";
import PostButton from "./_components/post_button"; // 投稿ボタン
import SearchButton from "./_components/search_button"; // 検索バー用ボタン
import PostsCard from "./_components/post_card"; // 検索結果表示欄
import { SIKAKU_LIST } from "./_lib/define/sikaku"; // 資格名の定義
import { Article } from "./_lib/define/types"; // 体験記の型定義
import SliderComponent from "./_components/slider_component";

// 資格種別のリストを取得する
const big_classify: string[] = Object.keys(SIKAKU_LIST);

// 資格種別に対応する資格名のリストを取得する
function getSmallClassify(bigClassify: string): string[] {
  const smallClassifyList = SIKAKU_LIST[bigClassify];
  return smallClassifyList.slice(1); // 選択肢の先頭は「選択してください」なので除外する
}

// ホームページコンポーネントの定義
export default function Home() {
  // 記事データを格納するarticlesステートを定義
  const [articles, setArticles] = useState<Article[]>([]);
  // 選択されている資格種別を格納するactiveClassificationステートを定義
  const [activeClassification, setActiveClassification] =
    useState<string>("すべて");
  // 資格名表示部分の表示状態の管理
  const [isActiveQualificationComponent, setActiveQualificationComponent] =
    useState<boolean>(false);
  // 資格名のリストを格納するqualificationListステートを定義
  const [qualificationList, setQualificationList] = useState<string[]>([]);
  // 資格名の選択状態を格納するactiveQualificationステートを定義
  const [activeQualification, setActiveQualification] = useState<string>("");

  // すべての記事を取得する
  function getAllArticles() {
    axios
      .get("/api/article")
      .then((response) => {
        setArticles(response.data.articles);
      })
      .catch((error) => console.error(error));
  }

  // 初期処理
  // 記事データを全件取得する
  useEffect(() => {
    getAllArticles();
  }, []);

  // 資格種別に対応するボタンクリック時のコールバック関数
  function clickedClassification(classification: string) {
    // 資格名のボタンを非活性にする
    setActiveQualification("");

    // 「すべて」ボタンとそのほかの種別ボタンで処理を分ける
    if (classification === "すべて") {
      // 資格種別の選択状態を更新する
      setActiveClassification("すべて");

      // 資格名表示部分の表示状態を管理するステートを更新する
      setActiveQualificationComponent(false);

      // 全記事を取得する
      getAllArticles();
    } else {
      // 資格種別の選択状態を更新する
      setActiveClassification(classification);

      // 資格名表示部分の表示状態を管理するステートを更新する
      setActiveQualificationComponent(true);

      // 選択された資格種別に紐づく資格名のリストを取得する
      setQualificationList(getSmallClassify(classification));

      const url =
        classification === ""
          ? `/api/article`
          : `/api/search?big_classify=${classification}`;

      axios
        .get(url)
        .then((response) => {
          // APIのレスポンスデータが常にarticlesプロパティを持つように修正
          const articlesData = response.data.articles
            ? response.data.articles
            : response.data;
          setArticles(articlesData);
        })
        .catch((error) => console.error(error));
    }
  }

  // 資格に対応するボタンクリック時のコールバック関数
  function clickedQualification(qualification: string) {
    // 選択された資格名の表示状態を更新する
    setActiveQualification(qualification);

    const url =
      qualification === ""
        ? `/api/article`
        : `/api/search?small_classify=${qualification}`;

    axios
      .get(url)
      .then((response) => {
        // APIのレスポンスデータが常にarticlesプロパティを持つように修正
        const articlesData = response.data.articles
          ? response.data.articles
          : response.data;
        setArticles(articlesData);
      })
      .catch((error) => console.error(error));
  }

  const searchParams = useSearchParams();
  const getBigClassifyParam = searchParams.get("big_classify");
  const getSmallClassifyParam = searchParams.get("small_classify");
  // Modal visibility state
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (getBigClassifyParam || getSmallClassifyParam) {
      setShowModal(true);
    }
  }, [getBigClassifyParam, getSmallClassifyParam]);

  const [sliderValue, setSliderValue] = useState(0);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const payload = {
      sikaku_name: getSmallClassifyParam,
      level: Number(sliderValue),
    };

    try {
      const response = await axios.post("/api/ranking", payload);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    alert("ご協力ありがとうございました！");

    setShowModal(false);
  };

  // HTMLを返す
  return (
    <div className="flex flex-col items-start">
      {/* 資格ランキング用のモーダル */}
      {showModal && (
        <div
          className="fixed inset-0 z-10 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <h2
                  className="text-lg font-medium leading-6 text-gray-900"
                  id="modal-title"
                >
                  「{getSmallClassifyParam}」の難易度を教えていただけますか？
                </h2>
                <SliderComponent
                  value={sliderValue}
                  setValue={setSliderValue}
                />
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                >
                  送信
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  キャンセル
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-2 mt-2 flex items-center">
        {/* ページタイトル */}
        <PageTitle title="資格受験体験記" />
        {/* 投稿ボタン */}
        <PostButton />
      </div>
      {/* --------------------------------------検索ボードここから-------------------------------------- */}
      {/* --------------------------------------検索ボードPC用-------------------------------------- */}
      <div className="pb-2 hidden h-auto w-96 flex-wrap bg-point-green-dark lg:flex lg:w-full">
        <SearchButton
          key={"すべて"}
          name={"すべて"}
          active={activeClassification === "すべて"}
          onClick={() => clickedClassification("すべて")}
        />
        {big_classify &&
          big_classify.map((classification) => (
            <SearchButton
              key={classification}
              name={classification}
              active={activeClassification === classification}
              onClick={() => clickedClassification(classification)}
            />
          ))}
      </div>

      {/* 資格名表示部分 */}
      {/* isActiveQualificationComponentがtrueのときに表示する */}
      {isActiveQualificationComponent && (
        <div className="pt-2 border-t hidden h-auto w-96 flex-wrap bg-point-green-dark lg:flex lg:w-full">
          {qualificationList &&
            qualificationList.map((qualification) => (
              <SearchButton
                key={qualification}
                name={qualification}
                active={activeQualification === qualification}
                onClick={() => clickedQualification(qualification)}
              />
            ))}
        </div>
      )}

      {/* --------------------------------------検索ボードSP用-------------------------------------- */}
      <div className="mx-4 mb-4 flex-wrap justify-center rounded-lg bg-point-green-dark px-10 lg:hidden">
        <div className="flex flex-row justify-center">
          <SearchButton
            key={"すべて"}
            name={"すべて"}
            active={activeClassification === "すべて"}
            onClick={() => clickedClassification("すべて")}
          />
          <div>
            <div>
              <select
                className="m-2 block w-full rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-point-green-dark hover:bg-gray-100 hover:text-point-green-light focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                onChange={(event) => clickedClassification(event.target.value)}
              >
                <option>資格種別</option>
                {big_classify &&
                  big_classify.map((classification) => (
                    <option key={classification} value={classification}>
                      {classification}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <select
                className="m-2 block w-full rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-point-green-dark hover:bg-gray-100 hover:text-point-green-light focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                onChange={(event) => clickedQualification(event.target.value)}
              >
                <option>資格名</option>
                {qualificationList &&
                  qualificationList.map((qualification) => (
                    <option key={qualification} value={qualification}>
                      {qualification}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* --------------------------------------検索ボードここまで-------------------------------------- */}

      <hr className="border-1 h-1 w-full border-point-green-light" />
      {/* 検索結果表示欄 */}
      <div className="mt-2 flex w-full flex-col bg-white">
        {articles &&
          articles.map((article: Article) => (
            <PostsCard key={article.id} article={article} />
          ))}
      </div>
    </div>
  );
}
