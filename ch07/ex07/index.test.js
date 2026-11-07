import { merge, mergeSort } from "./index.js";

test("merge（小さい順）", () => {
    const arr1 = [1,3,5,7];
    const arr2 = [2,4,6];
    const compare = (a, b) => a - b;
    expect(merge(arr1, arr2, compare)).toEqual([1,2,3,4,5,6,7]);
});

test("merge（大きい順）", () => {
    const arr1 = [100,70,10];
    const arr2 = [50,40,30];
    const compare = (a, b) => b - a;
    expect(merge(arr1, arr2, compare)).toEqual([100,70,50,40,30,10]);
});

test("mergeSort（文字列を渡す）", () => {
    expect(() => {mergeSort("str");}).toThrowError();
});

test("mergeSort（空配列を渡す）", () => {
    expect(mergeSort([])).toEqual([]);
});

test("mergeSort（要素数が1）", () => {
    expect(mergeSort([1])).toEqual([1]);
});

test("mergeSort（配列だけ渡す）", () => {
    const arr = [1,3,2,5,4,6,7];
    expect(mergeSort(arr)).toEqual([1,2,3,4,5,6,7]);
});

test("mergeSort（小さい順）", () => {
    const arr = [1,3,2,5,4,6,7];
    const compare = (a, b) => a - b;
    expect(mergeSort(arr, compare)).toEqual([1,2,3,4,5,6,7]);
});

test("mergeSort（大きい順）", () => {
    const arr = [1,3,2,5,4,6,7];
    const compare = (a, b) => b - a;
    expect(mergeSort(arr, compare)).toEqual([7,6,5,4,3,2,1]);
});

test("mergeSort（文字列の小さい順）", () => {
    const arr = ["a","d","b","c","e"];
    expect(mergeSort(arr)).toEqual(["a","b","c","d","e"]);
});