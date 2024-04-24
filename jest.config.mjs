import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  dir: './',
})
 
/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jest-environment-jsdom',
}
 
export default createJestConfig(config)


// どんな設定か以下に解説してください。
// 1. nextJest を import しています。
// 2. nextJest を実行して、Jest の設定を生成しています。
// 3. Jest の設定を返す関数を export しています。

