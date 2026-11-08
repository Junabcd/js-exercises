function makeFixedSizeArray(size) {
  const array = new Array(size);
  return {
    get(index) {
      if (index < 0 || array.length <= index) {
        throw new Error(`Array index out of range: ${index}`);
      }
      return array[index];
    },
    set(index, value) {
      if (index < 0 || array.length <= index) {
        throw new Error(`Array index out of range: ${index}`);
      }
      array[index] = value;
    },
    length() {
      return array.length;
    },
  };
}

export class DynamicSizeArray {
  static INITIAL_SIZE = 4; // 初期サイズ

  constructor() {
    this.len = 0;
    this.array = makeFixedSizeArray(DynamicSizeArray.INITIAL_SIZE);
  }
  get(index) {
    if (index < 0 || this.len <= index) {
        throw new Error(`Array index out of range: ${index}`);
    }
    return this.array.get(index);
  }
  set(index, value) {
    if (index < 0 || this.len <= index) {
        throw new Error(`Array index out of range: ${index}`);
    }
    this.array.set(index,value);
  }
  length() {
    return this.len;
  }
  push(value) {
    // this.array に空きが無い場合は「再配置」を行う
    if (this.len >= this.array.length()) {
        // 新しい固定長配列を作成
        const old = this.array;
        this.array = makeFixedSizeArray(old.length() * 2);
        // 古い配列 (old) の要素を新しい配列にコピー
        for(let i = 0; i < old.length(); i++){
            this.array.set(i, old.get(i));
        }
    }
    this.array.set(this.len, value);
    this.len++;
  }
}

// 関数作成のために途中段階で実行した確認用のもの
/*
const a = new DynamicSizeArray();
a.len = 1;
a.set(0, "hello");
console.log(a.get(0)); // "hello" になれば OK

try {
  a.set(1, "x"); // len が 1 なので範囲外
} catch (e) {
  console.log("エラーを捕まえた:", e.message);
}
*/