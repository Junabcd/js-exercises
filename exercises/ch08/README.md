# 練習問題: 8 章

## 問題 8.1 💻🧪

以下のアロー関数を簡潔に記載しなさい。なお、引数や戻り値の括弧の要否などをコードコメントで説明しなさい。

1. 自然数`n`と英数文字`c`を引数にとり、文字`c`を`n`回コンソール出力してから文字`c`を`n`個含む配列を返す
2. 数値`x`を引数にとり、`x`の二乗の数値を返す
3. 引数なしで、現在時刻のプロパティ`now`を含むオブジェクトを返す

**出題範囲**: 8.1.3

## 問題 8.2 💻🧪

べき乗 ($x^n$) を計算する関数を、べき乗演算子 (`**`) を使わずに [時間計算量](https://atcoder.jp/contests/apg4b/tasks/APG4b_w?lang=ja) が $O(\log n)$ となるように再帰およびループでそれぞれ実装しなさい。$n$ は正の整数とする。

**ヒント**:

$b^8$ の計算は以下の乗算 3 回で計算可能である:

- $b^8 = b^4 * b^4$
- $b^4 = b^2 * b^2$
- $b^2 = b * b$

$b^{11}$ の計算は以下の乗算 5 回で計算可能である:

- $b^{11} = b * b^{10}$
- $b^{10} = b^5 * b^5$
- $b^5 = b * b^4$
- $b^4 = b^2 * b^2$
- $b^2 = b * b$

これは一般の場合だと以下のように考えられる:

- $b^n = (b^{n/2})^2$ (n が偶数の時)
- $b^n = b * b^{n - 1}$ (n が奇数の時)

上記のように計算を行えば $b^{2n}$ の計算には $b^n$ の計算と比べて乗算を追加で 1 回しか必要としない。そのため $n$ に対して必要な乗算の数は 2 を底とする $n$ の対数の程度に増加し、時間計算量は $O(\log n)$ となる。

**出題範囲**: 8.2.1

## 問題 8.3 🖋️

書籍 8.2.1 の 「再帰関数とスタック」には、関数が自身を数千回呼び出した場合はエラーが発生すると書かれている。

1. プログラミング言語や処理系によっては、再帰呼び出しを関数の処理の末尾にする(末尾再帰)ことで、スタックオーバーフローが起こらないよう最適化できるものがある。末尾再帰は何故そのような最適化ができるのか答えなさい。

2. JavaScript で末尾再帰最適化を実装している処理系を答えなさい。
   利用できる環境があれば、実際に以下の URL を表示・実行してエラーが発生しないことを確認しなさい。
   https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABMAhtOAnGKA2AKMALkTBAFsAjAUwwEpEBvAWAChFlxp4kYoa8ADhjgATENGKlKNADSIIccHwyTy1Oo1bt2MYIjwKlNRAD4S9Zm23sMVKCAxIho8VADcW7QF9PNuw55lQWExaEQAKnlFMGU5QxjjAGpEAEZaDysfK1t7R0RefhS5NIys1gUwAGc4HCoAOhw4AHM8VHQsXDwUgAZe3tp01iA

**出題範囲**: 8.2.1

## 問題 8.4 🖋️

以下の入れ子の関数とアロー関数のコード実行結果を予想してから実行し、結果を説明しなさい。

```js
const obj = {
  om: function () {
    const nest = {
      nm: function () {
        console.log(this === obj, this === nest);
      },
      arrow: () => {
        console.log(this === obj, this === nest);
      },
    };
    nest.nm();
    nest.arrow();
  },
};
obj.om();
```

**出題範囲**: 8.2.2

## 問題 8.5 💻🧪

可変長引数を受け取り、以下の仕様でオブジェクトを返却する関数 `sequenceToObject(...values)`を作成しなさい。

1. 奇数番に string の値を受け取り、偶数番に任意の値を受け取り、各奇数偶数のペアで `{奇数番の値: 偶数番の値}`の形式になるオブジェクトを返却する。例えば`sequenceToObject("a", 1, "b", 2)`は`{a: 1, b: 2}`を返却する
2. いずれかの奇数番の値が string でない場合、または値の個数の合計が偶数ではない場合は例外を発生させる

また作成した sequenceToObject に対してスプレッド演算子で配列を与えられることを確認しなさい。

**出題範囲**: 8.3.2, 8.3.4

## 問題 8.6 💻

[MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions/arguments) には「ES6 互換のコードを書く場合は、残余引数が推奨されます」とある。しかし、現実には `arguments` を使ったコードは世の中に存在する ([例](https://developers.google.com/analytics/devguides/collection/ga4/event-parameters))。

そのような関数を書き直す練習として、以下の関数 `call` を `arguments` を使わないように書き直しなさい。

```js
const args = [];
function call() {
  args.push(Array.from(arguments));
}

call(1, 2, 3);
call("A", "B");

console.log(args[0]); // [1, 2, 3]
console.log(args[1]); // ["A", "B"]
```

**出題範囲**: 8.3.2

## 問題 8.7 🖋️

https://www.ricoh.co.jp を開き、ロードされている js ファイル中で名前空間としての関数の即時実行関数式を使っている js ファイルを 1 つ以上見つけて URL を記載しなさい。

ヒント: ロードされている js ファイル一覧は Chrome ではデベロッパーツールを開き"ソース"タブから確認できる

**出題範囲**: 8.5

## 問題 8.8 💻📄

書籍 8.6 の counter をグループ化したクロージャを持つ関数 counterGroup を実装しなさい。
具体的には counterGroup は以下のメソッドを持つオブジェクトを返却しなさい。

- counterGroup#newCounter(): 書籍 8.6 の count と reset 同等の機能を持つ counter オブジェクトを返却する
- counterGroup#total(): これまで返却された counter が保持しているカウントの合計を返却する
- counterGroup#average(): これまで返却された counter が保持しているカウントの平均を返却する。counterGroup に属する counter が 1 つも存在しない場合 TypeError をスローする
- counterGroup#variance(): これまで返却された counter が保持しているカウントの分散を返却する。counterGroup に属する counter が 2 つ未満の場合 TypeError をスローする

**出題範囲**: 8.6

## 問題 8.9 💻📄

以下のようなクラス `Resource` を考える。このクラスを利用する際は、必ず最後に `close` を呼ぶ必要がある。

```js
class Resource {
  ...
  /** リソース解放のため利用終了時に呼び出すこと */
  close() { ... }
}

const resource = new Resource(...);
resource.doA();
resource.doB();
resource.close(); // これを忘れるとリソースがリークする
```

解放処理の呼び出し忘れによるリソースのリークを防ぐため、終了時に必ず close が呼ばれるようにする `withResource` 関数を書きなさい。

```js
withResource(new Resource(), resource => {
  resource.doA();
  resource.doB();
}); // 終了時に resource.close が自動で呼ばれる
```

**出題範囲**: 8.6

## 問題 8.10 💻📄

関数を引数に受け取り、 call 相当の動きをするプロパティ myCall を追加する関数 addMyCall(f)を実装しなさい。実装には bind を使い call や apply は使わないこと

```js
// 例
const square = (n) => n * n;

addMyCall(square);

console.log(square.myCall(null, 5)); // 25

function Product(name, price) {
  this.name = name;
  this.price = price;
}

addMyCall(Product);

const that = {};
Product.myCall(that, "Apple", 100);
console.log(that); // { name: 'Apple', price: 100 }
```

**出題範囲**: 8.7.4, 8.7.5

## 問題 8.11 🖋️

組み込み関数と自作関数の `toString()` の出力内容を確認しなさい

**出題範囲**: 8.7.6

## 問題 8.12 💻📄

プログラミング言語によっては無名関数の引数名を省略し、短く書けるものがある。
例えば以下のような処理の場合、 `(a, b) => a + b` 相当の無名関数を、 Swift では `{ $0 + $1 }` 、 Elixir では `&(&1 + &2)` のように書ける。

```js
console.log(arr.reduce((a, b) => a + b, 0));
console.log(arr.sort((a, b) => a - b));
```

JavaScript で同様の書き方ができるよう、 `Function` コンストラクタを用いて以下のコードが動作するような 関数 `f` を作成しなさい。

```js
console.log(arr.reduce(f("$1 + $2"), 0));
console.log(arr.sort(f("$1 - $2")));
```

- `f` は引数に関数の本体を文字列として受け取る
- 関数の本体で使用する引数は `$1`, `$2`, ... のように記載し、 `$10` までサポートする

**出題範囲**: 8.7.7

## 問題 8.13 🖋️💻

以下のコードが Web サービスの一部で使われており、引数の `input` には Web サービスの利用者が入力した文字列が渡されるものとする。

```js
function f(input) {
  const f = new Function(`return "Hello, " + ${input}`);
  console.log(f());
}
```

このコードには重大な問題が含まれている。何が問題と考えられるか記述しなさい。
また問題を実証できるコードも記載しなさい。

**出題範囲**: 8.7.7

## 問題 8.14 💻🧪

以下の高階関数を実装しなさい

1. 残余パラメータとして任意の数の関数を受け取り、いずれかの関数が true を返せば true を返す新たな関数を返す`any` 関数

```js
const isNonZero = any(
  (n) => n > 0,
  (n) => n < 0
);

console.log(isNonZero(0)); // => false
console.log(isNonZero(42)); // => true
console.log(isNonZero(-0.5)); // => true
```

2.  引数として 2 つの関数を受け取り、1 つ目の関数で発生した例外を 2 つ目の関数の引数として処理し結果を返す新たな関数を返す`catching` 関数

```js
const safeJsonParse = catching(JSON.parse, (e) => {
  return { error: e.toString() };
});

console.log(safeJsonParse('{"a": 1}')); // => {a: 1}
console.log(safeJsonParse("{Invalid Json}")); // => {error: "SyntaxError: ..."}
```

**出題範囲**: 8.8.2
