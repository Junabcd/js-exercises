import { powRecursive, powIterative } from "./index.js";

test("powRecursiveの引数エラー（x）", () => {
    expect(() => {powRecursive("a",4);}).toThrowError();
    expect(() => {powRecursive(NaN,4);}).toThrowError();
});

test("powRecursiveの引数エラー（n）", () => {
    expect(() => {powRecursive(2,"b");}).toThrowError();
    expect(() => {powRecursive(2,-1);}).toThrowError();
    expect(() => {powRecursive(2,0);}).toThrowError();
    expect(() => {powRecursive(2,2.5);}).toThrowError();
});

test("powRecursiveの引数エラー（x, n）", () => {
    expect(() => {powRecursive(Infinity,NaN);}).toThrowError();
});

test("powRecursiveでnが2のべき乗", () => {
    expect(powRecursive(2,8)).toBe(256);
});

test("powRecursiveがエラーにならない自由な引数", () => {
    expect(powRecursive(3,5)).toBe(243);
});

test("powIterativeの引数エラー（x）", () => {
    expect(() => {powIterative("a",4);}).toThrowError();
    expect(() => {powIterative(NaN,4);}).toThrowError();
});

test("powIterativeの引数エラー（n）", () => {
    expect(() => {powIterative(2,"b");}).toThrowError();
    expect(() => {powIterative(2,-1);}).toThrowError();
    expect(() => {powIterative(2,0);}).toThrowError();
    expect(() => {powIterative(2,2.5);}).toThrowError();
});

test("powIterativeの引数エラー（x, n）", () => {
    expect(() => {powIterative(Infinity,NaN);}).toThrowError();
});

test("powIterativeでnが2のべき乗", () => {
    expect(powIterative(2,8)).toBe(256);
});

test("powIterativeがエラーにならない自由な引数", () => {
    expect(powIterative(3,5)).toBe(243);
});