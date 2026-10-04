import { fib } from "./index.js";

describe("ch01-ex06", () => {
    it("fib(5)", () => {
        expect(fib(5)).toBe(5);
    });

    it("fib(75)", () => {
        expect(fib(75)).toBe(2111485077978050);
    });
});