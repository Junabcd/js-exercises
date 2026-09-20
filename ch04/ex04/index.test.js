import {bitCount} from "./index.js";

describe("ch04-ex04", () => {
    it("正の数の確認", () => {
        expect(bitCount(5)).toBe(2); //5 = 0b101
    });

    it("0の確認", () => {
        expect(bitCount(0)).toBe(0);
    });

    it("負の数の確認", () => {
        expect(bitCount(-5)).toBe(31); //5 = 0b11111111111111111111111111111011
    });

    it("32ビット以上の数の確認", () => {
        expect(bitCount(2 ** 32 + 1)).toBe(1);
    });
});