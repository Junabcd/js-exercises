# AI 利用記録 (問題 4.8)

- 日付: 2026-09-24
- 使用ツール: Claude Code (Fable 5)
- 用途: 自分で調べた内容の事実確認と、関連概念の理解のための質問。解答 (index.md) の文章は自分で作成。

## プロンプト 1

> ECMAScript3っていつの時代？ECMAScript5からUndefinedが読み込み専用になったみたいだけど、ECMAScript3まではUndefinedが上書き可能だったと調べたので、正しい情報を知りたい。Undefinedが予約語になったのもECMAScript5から？

### 回答の要点

- ES3 は 1999 年 12 月標準化。ES4 は破棄され、次は ES5 (2009 年 12 月)。
- 「ES3 まで `undefined` が上書き可能」は正しい。`undefined` はグローバルオブジェクトのプロパティで、ES3 では書き込み可能だった。ES5 で `{ [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }` に変更され読み取り専用になった (非 strict では代入が黙って無視、strict では TypeError)。
- 「ES5 で予約語になった」は誤り。`undefined` は現在も予約語ではなく、ただのグローバルプロパティ。そのためローカルスコープでは今もシャドーイング可能。

## プロンプト 2

> ローカルスコープでは今も合法的にシャドーイングできるとあるが、実際はエラーになるの？

### 回答の要点

Node.js での実行結果つきで確認:

| コード | 結果 |
| --- | --- |
| `function f() { const undefined = 1; }` | エラーなし (strict モードでも動く) |
| `undefined = 123;` (グローバル、非 strict) | エラーなし、黙って無視される |
| `'use strict'; undefined = 123;` (グローバル) | `TypeError: Cannot assign to read only property 'undefined'` |
| `let undefined = 1;` (グローバルスクリプト直下) | `SyntaxError: Identifier 'undefined' has already been declared` |

- 最後の SyntaxError は予約語だからではなく、グローバルの non-configurable プロパティと `let`/`const` 宣言の衝突によるもの (`NaN` や `Infinity` でも同じ)。
- ESLint の `no-shadow-restricted-names` ルールは `undefined` のシャドーイングをエラー扱いにする (言語仕様上のエラーではなく lint ルール)。

## プロンプト 3

> シャドーイングってどういうものなの？

### 回答の要点

- シャドーイングは、内側のスコープで外側と同じ名前の変数を宣言すると、内側ではその名前が内側の変数を指し、外側の変数が「隠れて」見えなくなる現象。上書き (再代入) とは別物で、外側の変数は変化しない。
- 仕組みはスコープチェーン: 変数名は内側から外側へ探索され、最初に見つかったもので解決されるため、内側に同名宣言があると外側に到達しない。
- `const undefined = ...` が動くのもこれで、グローバルの `undefined` を書き換えたのではなく別変数で隠しているだけ。事故防止のため ESLint の `no-shadow-restricted-names` (一般変数は `no-shadow`) で制限するのが実務上の慣習。