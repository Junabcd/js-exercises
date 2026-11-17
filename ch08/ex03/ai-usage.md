# AI 利用記録 (ch08/ex03)

- 日付: 2026-11-17
- 使用ツール: Claude Code (モデル: Claude Opus 5.5)
- 利用方針: 解答の作成は依頼せず、Firefox で検証したときに出たエラーが設定ミスによるものかどうかを確認した。index.md の解答は自分で書いた。

## プロンプトと得られたヒントの概要

### 1. Firefox で too much recursion になるのは設定ミスか

> 再帰関数の末尾最適化の検証でFirefoxで試したんだけど、[ERR]: too much recursion ってなった。なんかサイトの設定間違えた？

得られた回答:

- サイトの設定ミスではなく、Firefox ではこの結果が正しい。
- TypeScript Playground は、TS を JS に変換したあと、開いているブラウザの JavaScript エンジンでコードを実行する。そのため、サイト側の設定 (target など) を変えても、末尾再帰最適化が効くかどうかは変わらない。
- `too much recursion` は、Firefox のエンジン (SpiderMonkey) でコールスタックがあふれたときのエラーメッセージ (`InternalError`)。Chrome では `RangeError: Maximum call stack size exceeded` と表示される。
- 末尾再帰最適化は ES2015 の仕様 (Proper Tail Calls) に含まれているが、実装しているブラウザはごく一部で、Firefox は実装していない。

得られたヒント (対応している処理系は自分で調べる):

- [ECMAScript compatibility table](https://compat-table.github.io/compat-table/es6/) の「proper tail calls (tail call optimisation)」の行で、どのエンジンが対応しているかを確認する。
- 対応しているエンジンのブラウザで同じ URL を開いて、エラーが出ないことを確かめる。
- V8 (Chrome) が一度実装したのに取りやめた理由 (デバッグ時にスタックトレースが消えるなど) も調べると、回答に厚みが出る。
- 問題 1 は「再帰呼び出しから戻ってきたあとに、呼び出し元でまだやることが残っているか」を考えるのが手がかり。
