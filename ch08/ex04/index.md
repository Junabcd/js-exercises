# 問題8.4
## 予想と結果
入れ子の関数とアロー関数のコード実行結果を以下のように予想した。
```
false true
true false
```

実際に実行した場合、結果は以下のようになり予想したとおりになった。
```
false true
true false
```

## 処理内容
以下の処理について説明する。
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
上記では```obj```が一番外側に定義されており、```obj```の中で```nest```が定義されている。  
```obj```には```om```メソッドがあり、```nest```には```nm```メソッドと```arrow```メソッドがある。  
```nest.nm()```を実行した場合、```nm```メソッドは入れ子の関数で定義されているため、```this```の値を継承しない。  
よって、```this```を呼んだ際に、nestが入ることになるので、```this === obj```は```false```になり、```this === nest```は```true```になる。  
一方、```nest.arrow()```を実行した場合、```arrow```メソッドはアロー関数で定義されているため、```this```の値を継承する。  
よって、```this```を呼んだ際に、外側で定義されている```obj```が入ることになるので、```this === obj```は```true```になり、```this === nest```は```false```になる。  
結果、```obj.om()```で```nest.nm()```と```nest.arrow()```を実行した場合、以下のような出力になる。
```
false true
true false
```