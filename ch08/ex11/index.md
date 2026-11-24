# 問題8.11
## 組み込み関数と自作関数のtoString()の出力結果
```index.js```に記載されている4つの関数に関してそれぞれ```toString()```を実行し、```console.log()```で出力結果を確認した。  
それぞれの出力結果を以下に記載する。

### 組み込み関数
今回は```Array.isArray```に対して```toString()```を実行し、```console.log()```で出力結果を確認した。  
出力結果は以下のようになった。
```
function isArray() { [native code] }
```

### 自作関数（function）
関数宣言文で作成した、引数を足し合わせる```add```関数に対して```toString()```を実行し、```console.log()```で出力結果を確認した。  
出力結果は以下のようになった。
```
function： function add(a, b) { //足し算
  return a + b;
}
```

### 自作関数（アロー関数）
アロー関数で作成した、引数の合計値を算出する```sum```関数に対して```toString()```を実行し、```console.log()```で出力結果を確認した。  
出力結果は以下のようになった。
```
(x, y) => { return x + y; }
```

### 自作関数（メソッド）
オブジェクト```calculator```のメソッドとして作成した、引数を足し合わせる```add```メソッドに対して```toString()```を実行し、```console.log()```で出力結果を確認した。  
出力結果は以下のようになった。
```
add() {
    this.result = this.operand1 + this.operand2;
}
```

## 組み込み関数と自作関数での違い
ユーザー定義の```Function```オブジェクトの場合、```toString```メソッドは関数を定義する際に使用したソーステキストの範囲を含む文字列を返すので、自作関数を作成した場合は関数定義した部分の文字列がそのまま返される。一方、組み込み関数の場合はソーステキストがないため、```toString```の仕様で決められている形で返される。この形が```function 名前() { [native code] }```である。  
今回使用した組み込み関数は```Array.isArrsy()```なので、名前に```isArray```が入り、出力が```function isArray() { [native code] }```となった。  
ちなみに、``````toString```メソッドは関数を定義する際に使用したソーステキストの範囲の文字列を返すので、コメント文なども記載した場合は出力される。

## 参考文献
- [ECMAScript® 2027 Language Specification](https://tc39.es/ecma262/#sec-function.prototype.tostring)
- [マジでどうでもいいWebKitのバグを修正した(Function.prototype.toString編)](https://zenn.dev/sosukesuzuki/articles/98a2ae44a373e0)
- [Function.prototype.toString()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Function/toString)