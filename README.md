# MITS用資格取得応援サイト

## 概要
MITS用資格取得応援サイトは、MITS社内の資格取得を促進するサイトです。

## 機能
- 資格受験体験記
  - 投稿
  - 閲覧
  - 検索

## 開発環境
- メインフレームワーク:Next.js (ver. 13.4.16)
  - TypeScript
  - React.js
  - Node.js (ver. 18.16.0)
  - npm
- CSSフレームワーク:Tailwind CSS
- DB:PlanetScale(MySQL互換)
  - prisma
- デザイン:Figma
- リポジトリ:GitHub
- CI/CD:GitHub Actions
- ホスティング:Vercel

## 開発環境構築
1. リポジトリをクローン
   - `git clone git@github.com:ryosuke-horie/mits-sikaku.git`
2. Node.jsのバージョンを指定
   - nvm等を利用し、18.16.0をインストール
3. npmパッケージをインストール
   - `npm install`
4. 環境変数のファイルを作成
5. .env.localを作成
6. prisma/.envに以下を記載
   ```
      env: .env.local
   ```
7. ターミナルで`export $(cat .env.local | xargs)`実行
8. `npx prisma generate`実行
9. 開発サーバーを起動
   - `npm run dev`

## デザインの確認・指示・修正はこちら
Figma : https://www.figma.com/file/ZIBcUKgiXey7kGLzJfq2EA/%E8%B3%87%E6%A0%BC%E5%8F%96%E5%BE%97%E5%BF%9C%E6%8F%B4%E3%82%B5%E3%82%A4%E3%83%88MITS_sample?type=design&node-id=8%3A116&t=WCyX40Q9toPkQOO2-1

## Github Actionsによるコードの自動成型について
Github Actionsによって、コードの自動成型を行っています。
mainブランチにプッシュすると、Github Actionsによって`npm run format`を実行します。
npm run formatは、ESLintとPrettierを実行し、コードの成型を行います。
Pretterにprettier-plugin-tailwindcssを導入しているため、Tailwind CSSのクラス名も自動成型されます。
