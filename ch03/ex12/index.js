class Example {
  valueOf() {
    // TODO
    return 10;
  }

  toString() {
    // TODO
    return "this method is tostring";
  }
}

let obj = new Example();
console.log(obj*5); //算術演算を使用すると数値が優先された。
console.log(`${obj}`); //テンプレートリテラル``を使用すると文字列が優先された。
console.log(obj+"!!!"); //+を使用すると優先度なしアルゴリズムが使用され、Dateオブジェクトではないので、数値優先アルゴリズムになる。