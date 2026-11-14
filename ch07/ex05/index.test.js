import { pop, push, shift, unshift, sort } from "./index_20261113.js";

test("pop", () => {
    const seq = [1, 2, 3, 4, 5];
    expect(() => {pop("str");}).toThrowError();
    expect(pop(seq)).toEqual([1,2,3,4]);
    expect(pop(seq)).not.toBe(seq);
    expect(seq).toEqual([1,2,3,4,5]);
});

test("push", () => {
    const seq = [1, 2, 3, 4, 5];
    expect(() => {push("str");}).toThrowError();
    expect(push(seq)).toEqual([1,2,3,4,5]);
    expect(push(seq)).not.toBe(seq);
    expect(push(seq,6)).toEqual([1,2,3,4,5,6]);
    expect(push(seq,7,8,9)).toEqual([1,2,3,4,5,7,8,9]);
    expect(push(seq,[10,11])).toEqual([1,2,3,4,5,[10,11]]);
    expect(seq).toEqual([1,2,3,4,5]);
});

test("shift", () => {
    const seq = [1, 2, 3, 4, 5];
    expect(() => {shift("str");}).toThrowError();
    expect(shift(seq)).toEqual([2,3,4,5]);
    expect(shift(seq)).not.toBe(seq);
    expect(seq).toEqual([1,2,3,4,5]);
});

test("unshift", () => {
    const seq = [1, 2, 3, 4, 5];
    expect(() => {unshift("str");}).toThrowError();
    expect(unshift(seq)).toEqual([1,2,3,4,5]);
    expect(unshift(seq)).not.toBe(seq);
    expect(unshift(seq,6)).toEqual([6,1,2,3,4,5]);
    expect(unshift(seq,7,8,9)).toEqual([7,8,9,1,2,3,4,5]);
    expect(unshift(seq,[10,11])).toEqual([[10,11],1,2,3,4,5]);
    expect(seq).toEqual([1,2,3,4,5]);
});

test("sort", () => {
    const seq = [1, 2, 3, 4, 5];
    expect(() => {sort("str");}).toThrowError();
    expect(sort(seq)).toEqual([1,2,3,4,5]);
    expect(sort(seq)).not.toBe(seq);
    expect(sort(seq, (a, b) => b - a)).toEqual([5,4,3,2,1]);
    expect(sort(seq, (a, b) => a - b)).toEqual([1,2,3,4,5]);
    expect(seq).toEqual([1,2,3,4,5]);
});