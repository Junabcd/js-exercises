# AI 利用記録 (ch06/ex04)

- 日付: 2026-10-21
- 使用 AI: Claude Code (Opus 5.5)
- 用途: strict モードで TypeError が出ても処理を続ける方法、ブラケット記法でのプロパティアクセス、`try...catch` の実行の流れ、関数の戻り値、自作コードが課題の意図を満たしているかの確認、ESLint の `no-prototype-builtins` と `call` の使い方の相談。解答コードの生成は依頼せず、ヒントと小さな例をもとに自力で実装した。

## 質問したプロンプトと得られた回答の要約

1. **「問題6.4でtypeerrorが出ても処理を続けられるようにしてコードを書きたい」**
   - `package.json` に `"type": "module"` があるので、`index.js` は strict モードで動く。strict モードでは `writable: false` のプロパティへの代入と、`configurable: false` のプロパティの `delete` が `TypeError` になる。
   - 失敗しそうな操作を `try...catch` で囲めば、例外を受け止めて後ろの処理を続けられる。1 つの `try` に複数の操作をまとめると、最初の失敗で残りが飛ばされるので「1 操作 = 1 try」にする。
   - 同じ形の `try...catch` が並ぶならヘルパー関数にまとめる、列挙の確認は例外を投げないので `try` は不要、`delete` した後の確認は順番に注意する、と助言された。
   - `checkProp()` の呼び出しが無く、実行しても何も出力されないことも指摘された。

2. **「オブジェクトとプロパティを引数として渡して、オブジェクト.プロパティみたいに書きたい」**
   - プロパティ名を変数で扱うときは、ドット記法 `obj.prop` ではなくブラケット記法 `obj[prop]` を使う。`obj.prop` は `"prop"` という名前そのものを探してしまう。
   - 代入 `obj[prop] = 値` や `delete obj[prop]` も同じ書き方でできる。プロパティ名は `"w"` のように文字列で渡す。

3. **「tryとcatchを順番に書いていけば、それぞれのtryは実行される?」「手前でcatchして例外が起きなければ次のtryには進むんだよね?」**
   - `try...catch` はそれぞれ独立していて、例外を `catch` で受け止めれば次の文へ進む。
   - ただし同じ `try` の中では、例外が起きた行より後は実行されない。
   - 次の `try` に進めないのは、`catch` の中で例外が起きた (`throw e;` など) ときだけ。`try` で例外が起きなければ `catch` は飛ばされて、そのまま次へ進む。

4. **「`console.log("プロパティの変更（writable 属性）",ValidEntity(obj,"w"));` と書いたら undefined になった。ヘルパー関数の中でログを出すと呼び出し元は undefined になるの?」**
   - 原因はログ出力ではなく、関数に `return` が無いこと。`return` しない関数は `undefined` を返し、`console.log` は表示するだけで戻り値にはならない。
   - `console.log` は引数を先に評価するので、関数の中のログが先に出て、見出しが最後に表示される。
   - 直し方は「見出しと関数呼び出しを分ける」か「結果を `return` して呼び出し元で表示する」の 2 通り。

5. **「これで課題の意図は満たせている? もっと網羅的にやった方がいいのかな?」**
   - 課題文 (README) は「変更、削除、`hasOwnProperty`、`propertyIsEnumerable` の結果にどう影響するか確認する」こと。ヘルパー関数は 4 項目すべてを確認できている。
   - `"w"` に対してしか関数を呼んでいなかったので、`"e"` と `"c"` にも呼ぶ必要があると指摘された。
   - 変更は writable、削除は configurable、`propertyIsEnumerable` は enumerable で決まり、`hasOwnProperty` は属性に影響されないので、8 通りの組み合わせを全部試す必要はない。
   - 関数名は小文字始まりで中身が分かる名前にする、削除後の `hasOwnProperty` も確認する、と助言された。

6. **「index.jsも書き直しているからもう一度チェックして問題の意図を満たしているか確認して」**
   - 実行結果から、次のことが確認できており、課題の意図は満たしている。
     - 代入できるのは writable が true のときだけ。
     - 削除できるのは configurable が true のときだけ。
     - `propertyIsEnumerable` が true になるのは enumerable が true のときだけ。
     - `hasOwnProperty` は属性に関係なく true。
   - 次の点を指摘された。
     - `obj.hasOwnProperty(...)` / `obj.propertyIsEnumerable(...)` が ESLint の `no-prototype-builtins` でエラーになる。
     - Prettier の整形が通っていない (`npm run format` で直る)。
     - 見出しが「プロパティの変更」になっているが、実際は削除や列挙も試しているので文言を合わせるとよい (任意)。
     - `削除成功: undefined` だけでは消えたかどうか区別できないので、削除後に `hasOwnProperty` を見るとよい (任意)。

7. **「obj.hasOwnProperty(...)はダメなの?」**
   - 今回の `obj` は `{}` から作ったので正しく動き、間違いではない。
   - `Object.create(null)` で作ったオブジェクトはメソッドを持たず、`hasOwnProperty` という名前のプロパティで上書きされている場合もあるので、ESLint は直接呼ぶ書き方を禁止している。
   - 課題の指定どおり `hasOwnProperty` を使いつつ lint も通すなら、`Object.prototype.hasOwnProperty.call(obj, prop)` の形がよい。`Object.hasOwn` もあるが、`propertyIsEnumerable` には同じようなものが無い。

8. **「enumerableのみtrueの場合、`Object.prototype.propertyIsEnumerable(obj, prop)` が true にならない」**
   - `.call` が抜けていた。この書き方では `this` が `Object.prototype` になり、`obj` が文字列 `"[object Object]"` に変換されてプロパティ名として扱われるので、常に `false` になる (`prop` は無視される)。
   - `Object.prototype.propertyIsEnumerable.call(obj, prop)` のように `call` を挟むと、第 1 引数の `obj` が `this` になり、`obj.propertyIsEnumerable(prop)` と同じ動きになる。
   - `hasOwnProperty` の行も同じく `.call` が必要と指摘された。

9. **「ai-usage.md に記載」**
   - この記録ファイルを AI に作成してもらった。

## 備考

解答コード (`index.js`) は AI に生成させず、ヒントと小さな例、自作コードへの指摘をもとに自分で作成した。項目 6 の任意の改善点を反映するかどうかは自分で判断する。
