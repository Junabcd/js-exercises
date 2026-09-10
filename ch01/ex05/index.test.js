import { expect } from "vitest";
import { abs, sum, factorial } from "./index.js";

// TypeScript の場合は以下:
// import { abs, sum, factorial } from "./index.ts";

describe("math", () => {
  describe("abs", () => {
    it("returns same value when positive value given", () => {
      expect(abs(42)).toBe(42);
    });

    it("returns negated value when negative value given", () => {
      expect(abs(-42)).toBe(42);
    });

    it("returns zero value when zero given", () => {
      expect(abs(0)).toBe(0);
    });
  });

  // 以下に sum, factorial のテストを記載せよ
  describe("sum", () => {
    it("配列の中身の合計",() => {
      expect(sum([2,3,5,7,11])).toBe(28);
    });
  });

  describe("factorial", () => {
    it("階乗を計算",() => {
      let primes = [2,3,5,7,11];
      expect(factorial(4)).toBe(24);
    });
  });
});
