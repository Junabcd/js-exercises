function fizzbuzz(n) {
    const arr = Array.from({ length: n }, (v, i) => i + 1); //1~nまでの数字が入った配列を作成。vはundefined。
    arr.forEach(i => {console.log(((i % 3 == 0 ? "Fizz" : "") + (i % 5 == 0 ? "Buzz" : "")) || i);});
}
fizzbuzz(15); //FizzBuzzが出ることを確認。

function sumOfSquaredDifference(f, g) {
  let result = 0;
  f.forEach((value, i) => {result += (value - g[i]) ** 2}); //fの要素を第一引数に、fのインデックスを第二引数にして計算。
  return result;
}
console.log(sumOfSquaredDifference([1,2],[3,4])); //8

function sumOfEvensIsLargerThan42(array) {
  let sum = 0;
  const evens = array.filter(x => x % 2 === 0); //filterで偶数だけにする。
  evens.forEach(value => { sum += value; }); //フィルタリングされた配列の合計を計算。
  return sum >= 42;
}
console.log(sumOfEvensIsLargerThan42([1,2,3,4,5])); //false
console.log(sumOfEvensIsLargerThan42([100,101,102])); //true