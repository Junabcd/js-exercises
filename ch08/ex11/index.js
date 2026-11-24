// 組み込み関数
console.log("組み込み：",Array.isArray.toString());

// 自作関数
function add(a, b) { //足し算
  return a + b;
}
console.log("function：",add.toString());

// アロー関数での自作関数
const sum = (x, y) => { return x + y; };
console.log("アロー関数：",sum.toString());

// オブジェクトでのメソッド
let calculator = {
    operand1: 1,
    operand2: 1,
    add() {
        this.result = this.operand1 + this.operand2;
    }
};
console.log("メソッド：",calculator.add.toString());