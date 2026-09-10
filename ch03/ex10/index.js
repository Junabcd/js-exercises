const key1 = Symbol("hello");
const key2 = Symbol("hello");
const obj1 = {[key1]:"aaa",[key2]:"bbb"};
console.log(obj1[key1],obj1[key2]); //aaa bbb

const key3 = Symbol.for("hello");
const key4 = Symbol.for("hello");
const obj2 = {[key3]:"aaa",[key4]:"bbb"};
console.log(obj2[key3],obj2[key4]); //bbb bbb