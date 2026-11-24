# AI 利用記録 (ch08/ex11)

- 日付: 2026-11-24
- 使用ツール: Claude Code (モデル: Claude Opus 5.5)
- 利用方針: 解答の文章や考察の生成は依頼せず、問題の意味、試す組み込み関数の例、表示が違う理由を調べるための検索キーワードと参考記事、ECMAScript 仕様の読み方、用語 (ソーステキスト) の意味について質問した。index.js と index.md は自分で書く。

## プロンプトと得られたヒントの概要

### 1. 問題の意味 (toString を自作・オーバーライドするのか)

> 問題8.11はtoString()を関数として自作するわけではない？
> 自作したものと本来あるものをどう区別すればいいんだ？オーバーライドするんだよね？

得られた回答:

- toString を自作・オーバーライドする問題ではない。「組み込み関数」と「自作関数」は toString を呼ぶ相手の関数のこと。
- 既存の `Function.prototype.toString()` を両方に対して呼び、出力の違いを確認する。

得られたヒント:

- 観察するポイント: 組み込み関数の本体はどう表示されるか、自作関数のコメントや改行は残るか、定義の書き方 (アロー関数、クラス、メソッド) で出力は変わるか、なぜ表示が違うのか。
- 参考資料: MDN「Function.prototype.toString()」、書籍 8.7.6。

### 2. よく使われる組み込み関数の例

> 組み込み関数でよく使われるものって？それで試そうかなと

得られた回答:

- グローバル関数 (`parseInt`, `isNaN` など)、静的メソッド (`Math.max`, `JSON.parse` など)、インスタンスメソッド (`Array.prototype.map` など)、コンストラクタ (`Array`, `Date` など) の例。
- インスタンスメソッドは `Array.prototype.map.toString()` のように関数そのものを取り出して呼ぶ。

### 3. 考察として何を書けばよいか

> 一応自作も3つそれぞれ作ったけど、作ったものがそのまま出てきたことが確認できた。
> 表示が違う理由を書けば後はいいのかな？

得られた回答:

- 「何を試したか」「出力結果」「違いとその理由」が書けていれば十分。

得られたヒント:

- 組み込み関数は何の言語で書かれているか (V8 について調べる)。
- 組み込み関数の本体に表示された文字そのものがヒント。
- 発展: `bind` した自作関数を toString するとどうなるか。

### 4. 検索キーワード (「ネイティブ関数文字列」で見つからない)

> 組み込み関数のMDNでの表現でのネイティブ関数文字列で検索してもいいのが出てこなかった。どういうキーワードで検索をすればいい？

得られた回答:

- 「ネイティブ関数文字列」は MDN の訳語なのでヒットしにくい。表示された文字列 (`"[native code]"`) や英語で検索する。
- キーワード例: `"[native code]" JavaScript`, `V8 builtins`, `ECMAScript Function.prototype.toString NativeFunction`。

### 5. toString の挙動の違いを調べるキーワード

> toStringについて調べたい、どうして挙動が違うのかについて調べるためのキーワードはなんだろう？

得られた回答:

- `Function.prototype.toString ECMAScript 仕様`, `[[SourceText]] ECMAScript`, `Function.prototype.toString revision proposal` (ES2019 の TC39 提案)。
- 仕様は該当節だけ読み、「自作関数の場合」と「組み込み関数の場合」に何を返すと書いてあるかを探す。

### 6. わかりやすい解説記事

> qiitaとかでわかりやすく解説しているものない？

得られた回答 (Web 検索の結果。Qiita には該当記事が見つからず、Zenn を紹介された):

- [マジでどうでもいいWebKitのバグを修正した(Function.prototype.toString編)](https://zenn.dev/sosukesuzuki/articles/98a2ae44a373e0)
- [Annex Bを読む、の補足と附録](https://zenn.dev/qnighy/articles/550be3a1f42707)

### 7. 自分の理解の確認 (ソースコードがあるかないか)

> メソッドは関数を定義する際に使用したソーステキストの範囲を含む文字列を返します。
> ってあるけど、これは関数を定義するソースコードが存在するからそれを文字列で返して、組み込み関数にはそれがないってこと？

得られた回答:

- 理解は合っている。正確には、組み込み関数にも実装はあるが C++ などエンジン内部の言語で書かれており、返せる「JavaScript のソーステキスト」を持っていない。

### 8. 「JavaScript のソーステキストを持っていない」ことの解説記事

> JavaScript のソーステキストを持っていないということを解説したqiitaとかある？

得られた回答 (Web 検索の結果):

- そのものずばりの記事は見つからなかった。組み込み関数が JavaScript 以外で実装されていることが分かる記事を紹介された。
  - [V8の奥に潜むプログラミング言語 Torqueを触ってみた (Qiita)](https://qiita.com/Syuparn/items/44fe0f6dd3b4c29865b5)
  - [Chromium(V8)のArray.prototype.fillを最大約7倍高速化した (Zenn)](https://zenn.dev/dinii/articles/5b8edc7856c25b)
- 「事実 (C++ / Torque で実装されている)」と「仕様 (ソーステキストがない関数は `[native code]` 形式)」をつなげて説明するとよい。

### 9. ECMAScript 仕様の文章の意味

> func が組み込み関数オブジェクトの場合、func の実装定義の String ソースコード表現を返します。この表現は NativeFunction の構文を持つ必要があります。さらに、func に [[InitialName]] 内部スロットがあり、func.[[InitialName]] が String である場合、返される String のうち NativeFunctionAccessoropt PropertyName に一致する部分は func.[[InitialName]] でなければなりません。
> これecmaScriptだけど、何言ってるの？

得られた回答:

- 「実装定義」: 空白などの細部はエンジンが決めてよい。
- 「NativeFunction の構文」: 全体の形は `function [get/set] [名前] ( 引数 ) { [native code] }` に従う (`opt` は省略可の意味)。
- 「[[InitialName]]」: 関数が最初に作られたときの名前。名前部分にはそれを入れる (例: `Math.max` → `function max() { [native code] }`)。
- 発展: `Object.defineProperty` で `name` を書き換えてから toString すると名前はどうなるか。

### 10. ソーステキストとは

> ソーステキストって何？

得られた回答:

- 書いたプログラムの文字そのもの。関数のソーステキストは、その関数を定義している文字の範囲。
- エンジンはそれを内部情報 [[SourceText]] として覚えており、toString はそれを返すため、コメントや改行も書いたとおりに出る。
