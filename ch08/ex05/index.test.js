import { sequenceToObject } from "./index.js";

test("値の合計個数が偶数個ではない場合", () => {
    expect(() => {sequenceToObject("a",1,"b",2,"c");}).toThrow(RangeError);
});

test("奇数番の引数が文字列でない場合", () => {
    expect(() => {sequenceToObject(1,2,3,4);}).toThrow(TypeError);
});

test("引数なし", () => {
    expect(sequenceToObject()).toEqual({});
});

test("偶数番の値が数字", () => {
    expect(sequenceToObject("a",1,"b",2)).toEqual({a:1, b:2});
});

test("偶数番の値が配列", () => {
    expect(sequenceToObject("a",[1,2,3])).toEqual({a:[1,2,3]});
});

test("偶数番の値がオブジェクト", () => {
    expect(sequenceToObject("a",{b:2,c:3})).toEqual({a:{b:2,c:3}});
});