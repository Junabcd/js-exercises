# AI 利用記録 (ch02/ex08)

- 日付: 2026-08-24
- 使用ツール: Claude Code (モデル: Claude Fable 5)
- 利用方針: 解答コードの生成は依頼せず、考え方のヒント・参考資料の紹介のみを受けた。解答 (index.js / index2.js / JSON / 図) は自分で作成した。

## プロンプトと得られたヒントの概要

### 1. acorn で複数行のコードをパースする方法

> acornライブラリを初めて使用するが、コマンドラインとかでは1行のものをパースしたりはすぐできそうだが、複数行のものをパースするには？ヒントください。

得られたヒント:

- `acorn.parse()` は文字列を受け取るだけなので、改行を含む文字列をそのまま渡せばよい。
- CLI なら `npx acorn ファイル名.js` でファイルごとパースできる。
- プログラムからは `fs.readFileSync` でファイルを読んで渡す、またはテンプレートリテラルで複数行文字列を書く。
- `import`/`export` を含むコードは `sourceType: "module"` の指定が必要。

### 2. AST の学習リソースと acorn の出力の調べ方

> そもそもASTに関する知識が欠けているので、参考になるサイトとacornが出力した各値の意味についても調査方法のヒントをください。

得られたヒント:

- AST Explorer (https://astexplorer.net/) でコードとノードの対応を目で確認する。
- acorn の出力形式は ESTree 仕様 (https://github.com/estree/estree) に準拠しており、各ノードの `type` 名で仕様を引ける。
- `console.dir(ast, { depth: null })` や `JSON.stringify(ast, null, 2)` で全体を表示する。
- 小さな入力から少しずつ複雑にして出力の差分を見る。

### 3. AST とプログラムの関係を学ぶ資料

> そもそもASTとプログラムの関係性などについて知識として勉強したい。参考になるサイトを教えてください。

紹介された資料: Wikipedia「抽象構文木」、azu さんの AST 入門記事、the-super-tiny-compiler、Babel Plugin Handbook、ESLint Custom Rules ドキュメント、Crafting Interpreters など。

### 4. start / end の値の読み方

> 5行しかないプログラムをASTにした際に、なんでendが30なんてことになるのか全然わからない。

得られたヒント:

- `start` / `end` は行番号ではなく、ソース全体を 1 本の文字列と見たときの 0 始まりの文字オフセット (改行も 1 文字として数える)。
- `code.slice(node.start, node.end)` で確認できる。
- 行・桁が欲しい場合は `locations` オプションで `loc` プロパティが得られる。

### 5. AST を木の図として描く作法

> ASTを実際に図にする作法やルールとして参考になるものはありますか？

得られたヒント:

- 厳密な標準はない。「`type` を持つオブジェクト = ノード」「値がノード (またはノードの配列) になっているプロパティ = プロパティ名をラベルにした線」というルールで機械的に描ける。
- `start` / `end` は図では省略し、`name` や `value` はノード内に書き添える。
- 描画には Mermaid (GitHub でレンダリング可) や draw.io が使える。

### 6. object / property / expression / callee の描き方

> object と propertyは線として書けばいいのかな？expressionやcalleeも同様かな？

得られた回答: いずれも値が `type` 付きオブジェクトのプロパティなので、線 (エッジ) としてプロパティ名をラベルに描く。`name` や `operator` のような単なる値はノード内に書く。
