# AI 利用記録 (ch06/ex06)

- 日付: 2026-10-23
- 使用 AI: Claude Code (Opus 5.5)
- 用途: `for/in` だけでは要件を満たせない理由、独自プロパティを取る API (`getOwnPropertyNames` / `getOwnPropertySymbols`) の違い、配列の結合方法、継承プロパティの判定 (`Object.hasOwn`) とシャドーイングの理解、テストケースの洗い出しと Vitest のマッチャー (`expect.arrayContaining` / `toHaveLength`) の使い方、Symbol を使ったテストで出たエラーの原因の確認。解答コードの生成は依頼せず、ヒントと小さな例をもとに自力で実装した。

## 質問したプロンプトと得られた回答の要約

1. **「6.6 で列挙するプロパティには列挙不可のプロパティも出るようにしなければいけないから、for/in だけで終わる簡単なものではないってことだよね?」**
   - その通り。`for/in` で取れるのは列挙可能な文字列キー (独自・継承) だけで、列挙不可の独自プロパティと Symbol キーは取れない。
   - 「独自プロパティすべて」は別の API で集め、「列挙可能な継承プロパティ」には `for/in` が使える。
   - `Object.keys` / `Object.getOwnPropertyNames` / `Object.getOwnPropertySymbols` / `Reflect.ownKeys` の違いを MDN で比べるよう助言された。
   - `for/in` は独自の列挙可能プロパティも返すので、そのままつなげると重複することに注意。

2. **「getOwnPropertyNames() は継承元も取れるの? その場合はほとんどのものが getOwnPropertyNames() だけで済む気がするけど」**
   - 取れない。名前の "Own" のとおり、独自プロパティだけを返す。
   - `Object.getPrototypeOf()` でチェーンをたどって各段で `getOwnPropertyNames()` を呼ぶこともできるが、`toString` などの列挙不可の継承プロパティまで取れてしまうので、絞り込みが必要になる。
   - 継承側は `for/in` で取って独自のものを除くのが素直。

3. **「getOwnPropertyNames() は Symbol は取らない + getOwnPropertySymbols() はシンボル用に特化しているから、この 2 つは重複しない?」**
   - 重複しない。プロパティキーは文字列か Symbol のどちらかしかない (数値キーも文字列に変換される)。
   - 2 つをつなげた結果は `Reflect.ownKeys()` と同じになる。

4. **「const って配列を定義した場合って、中身取り除いたり自由にできるんだっけ?」**
   - できる。`const` が禁止するのは変数への再代入だけで、`push` / `pop` / `splice` などで中身は変更できる。
   - 中身も変更できないようにしたい場合は `Object.freeze()` を使う (1 階層のみ)。

5. **「getOwnPropertyNames(obj) とかってすでに配列になっているから、さらに for 文とかで中身を push する必要がある?」**
   - 必要ない。`result.push(...a)`、`[...a, ...b]`、`a.concat(b)` などでまとめて追加できる。
   - 継承プロパティの部分は条件を見て 1 つずつ入れるので、ループの中で `push` するのが自然。

6. **「スプレッド構文で新しい配列を作る場合、中身が空だとスルーされる?」**
   - 空配列を展開しても何も追加されず、エラーにもならない。
   - `undefined` や `null` を展開すると `TypeError` になるが、`getOwnPropertyNames()` などは必ず配列を返すので心配ない。

7. **「ここに継承プロパティを加えたい場合は、hasOwnProperty() が false のものを push すればいいってことか」**
   - その考え方で合っている。
   - ただし `obj.hasOwnProperty(key)` は、`Object.create(null)` のオブジェクトでは `TypeError` になる。また、自分で同名のプロパティを定義しているオブジェクトでは正しく判定できない。
   - `Object.hasOwn(obj, key)` か `Object.prototype.hasOwnProperty.call(obj, key)` を使うのが安全。

8. **「Object.hasOwn(obj, key) だとシャドーイングにも null にも対応できるの? なんで?」**
   - `obj.hasOwnProperty` は `obj` のプロトタイプチェーンからメソッドを探すので、プロトタイプが無いと見つからず、同名の独自プロパティがあると偽物が呼ばれる。
   - `Object.hasOwn` は `Object` の静的メソッドで、`obj` は引数として渡すだけなので、`obj` の中身に左右されない。
   - ただし `obj` 自体が `null` / `undefined` の場合は `TypeError` になる。

9. **「(メソッド名のシャドーイングと、6.5 のプロパティ名のシャドーイングと for/in の違いについて) わかりやすく教えて」**
   - どちらも「独自プロパティに同じ名前があると、継承側が隠れる」という同じ仕組み。
   - ケース A (メソッド名): 隠れるのは判定に使う道具。`Object.hasOwn` で回避する。
   - ケース B (`for/in`): 列挙不可の独自プロパティが列挙可能な継承プロパティを隠し、`for/in` に出てこなくなる。仕様どおりの動きなので受け入れればよい。

10. **「テストとしては null から作られたものでエラーにならない、シャドーイングでも大丈夫、継承する、独自、シンボルくらい?」**
    - その方向でよいとされた。追加候補として、列挙不可の独自プロパティを含む、列挙不可の継承プロパティを含まない、同名の独自・継承プロパティが 1 回だけ出る、プロトタイプチェーン 2 段以上、空オブジェクトを挙げられた。
    - Symbol を含む配列に `sort()` を使うと `TypeError` になるので、順序に依存しない比較には `expect.arrayContaining()` と `toHaveLength()` を調べるよう助言された。

11. **「null とシャドーイングはオブジェクト分けて、あとはまとめてか、すべて 1 個のオブジェクトにするかどっちがいいだろう…」**
    - ケースごとに `it` を分けるのがおすすめ。失敗したときに原因がすぐわかり、ケース同士が干渉せず、期待値も短くなる。
    - 全部入りのオブジェクトは、分けたテストに加える「総合テスト」として使うとよい。

12. **「`expect(getObjectProp(o)).toEqual([Symbol(a)]);` これだとだめなの?」**
    - だめ。`Symbol()` は説明文が同じでも呼ぶたびに別の値を作るので、オブジェクトに入れた Symbol と一致しない (Vitest で実際に確認してもらった)。
    - Symbol は変数に入れ、オブジェクトを作るときと期待値の両方で同じ変数を使う。

13. **「expect.arrayContaining() + toHaveLength() の使い方教えて」**
    - `expect.arrayContaining()` は指定した要素がすべて含まれていれば成功する (順番は問わない) が、余計な要素があっても成功してしまう。
    - `toHaveLength()` で要素数も確認すれば、「全部あって、それ以外はない」ことを確認できる。長さは `expected.length` を使うと直し忘れを防げる。

14. **「列挙不可の場合、それを継承しても for/in だと出てこないってこと?」**
    - その通り。`for/in` に出るのは列挙可能なものだけで、独自か継承かは関係ない。
    - `Object.prototype` の `toString` などが `for/in` に出てこないのも、列挙不可だから。

15. **「列挙不可のものも継承自体はできるの?」**
    - できる。`enumerable` は列挙する操作 (`for/in`、`Object.keys`、`JSON.stringify`、スプレッドなど) に出るかどうかだけを決める。
    - 継承、`obj.prop` での読み取り、`in` 演算子には影響しない。

16. **「`const o = { hasOwnProperty: () => true };` これって hasOwnProperty もプロパティになるの?」**
    - なる。値が関数なだけで、列挙可能な独自プロパティ。
    - このオブジェクトをテストに使う場合、`"hasOwnProperty"` が結果に含まれるのが正しい動きなので、期待値に入れる必要がある。

17. **「メソッドを `o.hasOwnProperty() = true` のように書ける?」**
    - 書けない。`o.hasOwnProperty()` は呼び出した結果 (値) なので代入先にならず、`ReferenceError: Invalid left-hand side in assignment` になる。
    - `o.hasOwnProperty = () => true;` のように、括弧なしのプロパティに関数を代入する。

18. **「TypeError: Cannot convert a Symbol value to a string (`expect.arrayContaining(["x", "y", Symbol(a), "hasOwnProperty"])`)」**
    - `a` がすでに Symbol なのに `Symbol(a)` と書いたため、Symbol を説明文 (文字列) に変換しようとしてエラーになっていた。
    - 期待値には `Symbol()` で包まず、変数 `a` をそのまま書けばよい (19 行目のテストと同じ書き方)。
    - 空配列になるケースは `toEqual([])` の 1 行でもよい (任意)、と助言された。

19. **「ch06/ex06/ai-usage.md に記録して」**
    - この記録ファイルを AI に作成してもらった。

## 備考

解答コード (`index.js`) とテスト (`index.test.js`) は AI に生成させず、ヒントと小さな例、自作コードへの指摘をもとに自分で作成した。項目 18 の修正と任意の改善点を反映するかどうかは自分で判断する。
