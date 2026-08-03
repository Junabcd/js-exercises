# 練習問題解答プリセット

JavaScript および TypeScript の開発では一般にテストフレームワーク、フォーマッタ、Linter の OSS をダウンロードして実行できるようにします。このディレクトリは練習問題の解答用にそれぞれのデファクト OSS である Vitest & Playwright、Prettier、ESLint を使えるようにしたプロジェクトのプリセットを提供します。フォーマッタと Linter の説明は本の 17 章に記載されています。テストフレームワークについて本の 17 章では Jest が紹介されていますが、このプリセットでは後発でより高速な [Vitest](https://vitest.dev/) を採用しています。Vitest の API (`describe`, `it`, `expect` など) は Jest とほぼ互換のため、本の説明はそのまま参考にできます。ただし Jest と異なり、テスト API はグローバル変数ではなく `import { describe, it, expect } from "vitest";` のように明示的にインポートして使います (`ch00/ex01` のサンプルを参照)。また、モック関数は `jest.fn()` ではなく `vi.fn()` を使います。Playwright の使い方は[公式ページ等](https://playwright.dev/docs/intro)を確認してください。

JavaScript 版と TypeScript 版のプリセットを用意しています。どちらを使っても構いません。

また、これらのプリセットに従うことは強制ではありません。ルールを独自に追加変化除外しても構いません。また、慣れている、この際だから使ってみたい等の理由で、別のテストフレームワーク、フォーマッタ、Linter を使っても構いません。

## AI の利用について

演習における AI の利用ルールは [exercises/README.md](../exercises/README.md) を確認してください。各プリセットには AI コーディングアシスタント向けの指示ファイル (`CLAUDE.md`, `AGENTS.md`) が含まれており、アシスタントが解答を丸ごと生成するのではなく学習を支援するよう指示しています。

## 動作要件

サプライチェーン攻撃対策のため、**npm 12 以上**を必須としています (`.npmrc` の `engine-strict=true` と package.json の `engines` で強制しています)。npm 12 は依存パッケージの install script が承認制になる、git やリモート tarball の依存インストールが既定で無効になるなど、セキュリティの既定値が強化されています。古い npm では `npm install` が `EBADENGINE` エラーで失敗します。その場合は Node.js ごと更新するか、`npm install -g npm@latest` で npm を更新してください。

また、`.npmrc` の `min-release-age=3` により、公開から 3 日未満のパッケージバージョンはインストールされません (dependency cooldown)。侵害されたパッケージは公開から数日以内に発見・削除されることが多いため、公開直後のバージョンを避けることで被害に遭うリスクを下げられます。新しいパッケージを追加した際に `ENOVERSIONS` エラーが出た場合は、公開から 3 日経つのを待つか、そのパッケージを `min-release-age-exclude` に追加してください。

## 動かし方

```sh
cd ts # もしくはcd js
npm install # 依存ライブラリのインストール
npx playwright install chromium # ブラウザテスト用のブラウザのインストール
npm run test # Node.jsのテスト(Vitest)実行
npm run test:browser # ブラウザのテスト(Playwright)実行
```

## コマンド

- npm run test: Vitest による Node.js の自動テストが実行されます
- npm run test:browser: Playwright によるブラウザの自動テストが実行されます
- npm run format: Prettier によるソースコードのフォーマットが実行されます
- npm run lint: ESLint によるソースコードの Lint が実行されます
- npm run server: ブラウザでアクセスするためのウェブサーバが起動します。 http://localhost:3000 でアクセスできます
- npx ts-node <実行したい ts ファイルのパス>: TypeScript のコードを JavaScript にトランスパイルせず Node.js 上で直接実行します (TypeScript 版プリセットのみ)

## Prettier と ESLint の適用除外設定

このプリセットの設定で Prettier や ESLint を使うと、問題によってはフォーマットされて解答できないことや、警告が回避できないことがあります。その場合それぞれ以下などを参考にして、ソース中のコメントや設定ファイルでフォーマットや警告の対象外にしてください。

- Prettier
  - [Ignoring Code · Prettier](https://prettier.io/docs/en/ignore.html)
- ESLint
  - [Configure Rules \- ESLint \- Pluggable JavaScript Linter](https://eslint.org/docs/latest/use/configure/rules#disabling-rules)
  - [Ignore Files \- ESLint \- Pluggable JavaScript Linter](https://eslint.org/docs/latest/use/configure/ignore)

## ts ファイルをブラウザ向けビルド対象にする設定

tsconfig.front.json を開き、[include](https://www.typescriptlang.org/tsconfig/#include)、[exclude](https://www.typescriptlang.org/tsconfig/#exclude)を編集して対象にしたいファイルが包含されるようにしてください。
