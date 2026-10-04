# AI 利用記録 (ch05/ex12)

- 日付: 2026-10-03 〜 2026-10-04
- 使用 AI: Claude Code (Fable 5)
- 用途: 問題の意図の確認、strict / 非 strict モードの仕組みに関する疑問の解消、CJS と ESM のエクスポート・インポート方法、Vitest でのテスト方法の調査。解答コードの生成は依頼せず、ヒントと小さな例をもとに自力で実装した。

## 質問したプロンプトと得られた回答の要約

1. **「strict-fixed.js が修正版なら strict.js は何のために書くの？not-strict.js と無関係なコードでいいの？」**
   - 「それぞれ」は同じコードを 2 ファイルに置くという意味。実行モードはコードの中身ではなくファイル種別・環境で決まる (`"type": "module"` 下の `.js` は常に strict、`.cjs` は非 strict) ため、同じコードの「非 strict では動く」「strict では落ちる」の対比を実行して見せるには 2 ファイル必要。strict.js と strict-fixed.js はモードが同じでコードだけ修正されている、という 3 点セット。

2. **「テストコードも非 strict じゃないとエラーになるのでは？」**
   - ならない。strict かどうかは呼び出し側ではなく定義されたモジュールごとに決まり、呼び出し元のモードは伝播しない。strict な ESM テストから非 strict の `.cjs` の関数を呼んでも、関数本体は非 strict のまま動く。

3. **「CJS のエクスポートと、テスト側でのインポート方法は？」**
   - CJS は `module.exports = { f }`。ESM 側は `import { f } from "./not-strict.cjs"` で名前付き import できる。`module.exports = f` (オブジェクトでない形) だと default import のみ。関数が 1 つでも `{ f }` で包めば named import 可。どちらの形でも最終的に受け取るのは同じ関数。

4. **「重複プロパティと重複パラメータを非 strict で試したら上書きされた。そういう仕組み？」**
   - その通り、後のものが勝つ。ただし重複プロパティは ES2015 以降 strict モードでも合法になったため、この課題の題材としては成立しない (strict.js が正常に動いてしまう)。重複パラメータは今でも strict で SyntaxError になるので有効。

5. **「strict.js を実行したら with の SyntaxError しか出なかった」**
   - SyntaxError はパース時に最初の 1 つで即中断するため。構文エラーを全部消して初めて実行され、そこで実行時エラー系の違反 (未宣言変数への代入 → ReferenceError) が出る、という層の違いがある。

6. **「`return a, obj` で 2 つ返したかったが片方しか返らない」**
   - カンマ演算子は最後の値だけを返すため実質 `return obj`。複数返すには `return [a, obj]` か `return { a, obj }` にまとめる。

7. **「グローバル変数は `globalThis.プロパティ名` で見られる？」**
   - 暗黙のグローバル (非 strict での宣言なし代入) は globalThis のプロパティになるので見える。関数内で var/let/const 宣言したものはローカル変数、CJS/ESM のトップレベル var はモジュールスコープなので globalThis には付かない。

8. **「暗黙のグローバルを作る関数を書いたのに globalThis が undefined」**
   - 関数を定義しただけで呼び出していなかったのが原因。代入はその行が実行された瞬間に起きる。

9. **「strict モードの関数内でグローバル変数を宣言するヒントがほしい」「`let globalThis.x` はエラーになる」**
   - strict が禁止するのは宣言なしの裸の変数への代入であって、プロパティ代入は合法というヒントを得た。let/var/const の後ろに置けるのは識別子だけで、プロパティ代入に宣言キーワードは不要 (`globalThis.x = 10` のように代入するだけ)。

10. **「module.exports は何も import せず使える？」**
    - 使える。Node が CJS ファイルをモジュールラッパー関数で包んで実行する際に引数として渡される変数のため。require や \_\_dirname も同様。ESM 側では存在しないので使えない。

11. **「配列の比較は toEqual だよね？」**
    - 正しい。toBe は参照の同一性 (Object.is 相当)、toEqual は中身の再帰的比較。配列から取り出したプリミティブは toBe で比較する。

12. **「Vitest で CJS を import したら `SyntaxError: Strict mode code may not include a with statement`」**
    - Vitest (Vite) はプロジェクト内のファイルを変換パイプラインに通して ESM (= strict) として扱うため、with を含むファイルは変換時点で落ちる。回避策として `createRequire(import.meta.url)` で Node ネイティブの require を作れば変換を迂回して非 strict のまま読み込める。この方式は `node` 直接実行と同条件になるため、テストとしてむしろ忠実に成立する。これを採用し、ソース分割せずに with 入りの関数もテストした。