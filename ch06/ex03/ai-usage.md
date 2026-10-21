# AI 利用記録 (ch06/ex03)

- 日付: 2026-10-16 〜 2026-10-21
- 使用 AI: Claude Code (Opus 5.5)
- 用途: `isPrototypeOf` の向きと探索方法の理解、null / undefined を渡したときの挙動の確認、自作コードの確認、Object / Array / Date / Map の継承関係を示すコードの考え方の相談、組み合わせの数え方の整理。解答コードの生成は依頼せず、ヒントと小さな例をもとに自力で実装した。

## 質問したプロンプトと得られた回答の要約

1. **「`Object.prototype.isPrototypeOf()` について、プロトタイプチェーンを探す際にどっちが親でどっちが継承していてどういうチェーンの探し方をしているか混乱しています」**
   - `A.isPrototypeOf(B)` は「A は B の祖先か?」と読む。A (レシーバ) が祖先の候補で、B (引数) が子孫側。
   - 探索は B の親 (`Object.getPrototypeOf(B)`) から始まり、A と `===` で一致すれば `true`。違えば一段ずつ上がり、`null` に着いたら `false`。B 自身からは始めないので、`q.isPrototypeOf(q)` は `false`。
   - `q instanceof Foo` は `Foo.prototype.isPrototypeOf(q)` と同じ意味で、語順が逆なので混同しやすい。
   - 自作関数の型チェックで、引数に無い `str` を参照していることも指摘された。

2. **「null か undefined のときにエラーするのって、祖先が null とかのときであっている?」**
   - エラーになるのは親側 (レシーバ) が null / undefined のときだけ。
   - チェーンが終端の `null` に着くのは普通の終わり方で `false`。子側 (引数) が null / undefined やプリミティブのときも、チェーンをたどる前に `false` を返す。
   - `Object.create(null)` で作ったオブジェクトはメソッド自体を持たないので、`isPrototypeOf is not a function` になる、という別の罠も教わった。

3. **「今の実装を見て、エラーにする方あってるよね?」**
   - `parent` が null / undefined のときに `TypeError` を投げる実装は、本物の挙動と合っている。
   - 細かい差として、本物は「子がオブジェクトでなければ false」のチェックが先なので、`Object.prototype.isPrototypeOf.call(null, 1)` はエラーにならない。演習としてはどちらでもよい。

4. **「`isPrototypeOf` を使うから、どうせエラーが投げられるんだけど、書かなくてもよかったかな?」「じゃあ残してもいいか」**
   - `parent.isPrototypeOf(child)` の形なら、書かなくても TypeError になる。
   - 自分でチェックを書くと、エラーメッセージが分かりやすくなり、仕様として決めたことがコードから読み取れる。動作上は消しても問題ないが、残すことにした。

5. **「Object, Array, Date, Map のプロトタイプチェーンの継承関係を確認するためのコードも書きなさい、とあるが、テストコード用の関数は利用できる?」**
   - そのまま使える。ただし `Object` などはコンストラクタ関数で、継承関係の本体は `.prototype` 同士のつながりなので、何を渡すかに注意する。
   - テストに `false` になるケース (親子を逆にしたもの) が無いので、入れておくとよいと助言された。

6. **「全パターンテストするのが正解なのかな?」「テストコードを書く問題じゃないので、console とかで出して分かるようにすべきなのかな」**
   - 問題は「継承関係が分かるコード」なので、`console.log` で結果を出す形が自然。自作のテストはおまけとして持っておけばよい。
   - 結果だけでなく、何と何を比べたかをラベルとして一緒に出すと、出力だけで読み取れる。
   - `index.test.js` が `index.js` を import しているので、`index.js` に `console.log` を書くと `npm test` の出力に混ざる。確認用のコードは別ファイルに分けるとよい。

7. **「`Object.getPrototypeOf()` で console すれば分かるってこと?」**
   - `isPrototypeOf` は「祖先か?」に yes / no で答え、`getPrototypeOf` は「直接の親」を取り出す、という別のアプローチ。
   - プロトタイプオブジェクトをそのまま `console.log` すると `[Object: null prototype] {}` のように表示されて誰なのか分からないので、候補と `===` で比べて出すとよい。

8. **「継承関係を示すやり方が浮かばない。Object だけとっても 6 通りあって、36 通り全部書くのか?」「逆向きで 3 通り、4 つで計 36 通りでは?」「Object.prototype は Array.prototype の祖先か? と Array.prototype は Object.prototype の祖先か? は違う話では?」**
   - 比べる対象は `.prototype` の 4 つに絞る。
   - 36 通りの数え方は同じ質問を重複して数えていた。「行は列の祖先か?」の表にすると、自分同士を除いて 4 × 3 = 12 通り。ご指摘の 2 つは別の質問で、どちらも 12 通りの中に 1 回ずつ入っている。
   - どのオブジェクトにも直接の親は 1 つだけなので、4 つそれぞれの直接の親を示せば継承の図が確定し、12 通り全部を出す必要はない。

9. **「`isPrototypeChain(Object, Array)` という書き方でコンソールに出せばいい?」**
   - 関数そのものを渡すと「関数 `Array` のチェーン上に関数 `Object` があるか?」を調べることになり、`false` になる。`isPrototypeChain(Object.prototype, Array.prototype)` のように `.prototype` を渡す。

10. **自作コードの結果確認 (「Object が親でそれ以外は兄弟分の関係性なしってなったけどあってるのかな?」)**
    - 12 通りすべてを出力しており、結論は正しい。Array.prototype、Date.prototype、Map.prototype はどれも Object.prototype を祖先に持ち、3 つの間に継承関係は無い。
    - 改善点として次の 3 つを指摘された。
      - 出力が `true` / `false` だけなので、何を比べたかのラベルを付ける。
      - `isPrototypeOf` で分かるのは「祖先」までで、「直接の親」と言い切るには `Object.getPrototypeOf(Array.prototype) === Object.prototype` のような確認が必要。
      - `index.js` の `console.log` が `npm test` 実行時にも出力されるので、別ファイルへの分離を検討する。

11. **「ch06/ex03/ai-usage.md に記録して」**
    - この記録ファイルを AI に作成してもらった。

## 備考

解答コード (`index.js`) とテストコード (`index.test.js`) は AI に生成させず、ヒントと小さな例、自作コードへの指摘をもとに自分で作成した。項目 10 の改善点を反映するかどうかは自分で判断する。
