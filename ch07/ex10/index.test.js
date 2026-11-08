import { DynamicSizeArray } from "./index.js";

test("初期状態", () => { //	length()が0
    const arr = new DynamicSizeArray();
    expect(arr.length()).toBe(0);
});

test("push1回、get", () => { //pushした値をgetで取り出せる、length()が増える
    const arr = new DynamicSizeArray();
    arr.push(5);
    expect(arr.get(0)).toBe(5);
    expect(arr.length()).toBe(1);
});

test("push5回、get", () => { //5回以上pushしても、全要素が順番どおりgetできる
    const arr = new DynamicSizeArray();
    arr.push(1);
    arr.push(2);
    arr.push(3);
    arr.push(4);
    arr.push(5);
    expect(arr.get(0)).toBe(1);
    expect(arr.get(1)).toBe(2);
    expect(arr.get(2)).toBe(3);
    expect(arr.get(3)).toBe(4);
    expect(arr.get(4)).toBe(5);
    expect(arr.length()).toBe(5);
});

test("push1回、get、set", () => { //既存の要素を書き換えられる、length()は変わらない
    const arr = new DynamicSizeArray();
    arr.push(5);
    arr.set(0,10)
    expect(arr.get(0)).toBe(10);
    expect(arr.length()).toBe(1);
});

test("範囲外", () => { //get,setはindexが0より小さいかlength()を超えるとエラー
    const arr = new DynamicSizeArray();
    expect(() => {arr.get(-1);}).toThrowError();
    expect(() => {arr.set(-1,10);}).toThrowError();
    expect(() => {arr.get(5);}).toThrowError();
    expect(() => {arr.set(5,10);}).toThrowError();
});

test("容量内でも範囲外", () => { //初期で箱が4箱用意されているが、取り出せないようになっている。
    const arr = new DynamicSizeArray();
    arr.push(5);
    expect(() => {arr.get(1);}).toThrowError();
});

test("容量は2倍に増える", () => { //初期で箱が4箱用意され、そのあとは2倍ずつ増える。
    const arr = new DynamicSizeArray();
    expect(arr.array.length()).toBe(4);
    arr.push(1);
    arr.push(2);
    arr.push(3);
    arr.push(4);
    arr.push(5);
    expect(arr.array.length()).toBe(8);
});