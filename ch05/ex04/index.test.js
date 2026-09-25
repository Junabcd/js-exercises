import { fibWhile, fibDoWhile, fibFor } from "./index.js";

describe("ch05-ex04", () => {
  it("while文でのフィボナッチ数列", () => {
    expect(fibWhile()).toEqual([1,1,2,3,5,8,13,21,34,55]);
  });

  it("do/while文でのフィボナッチ数列", () => {
    expect(fibDoWhile()).toEqual([1,1,2,3,5,8,13,21,34,55]);
  });

  it("for文でのフィボナッチ数列", () => {
    expect(fibFor()).toEqual([1,1,2,3,5,8,13,21,34,55]);
  });
});