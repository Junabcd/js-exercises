import {sub, add, neg} from "./index.js";

describe("ch04-ex03", () => {
    it("足し算の確認", () => {
        expect(add(3, 1)).toBe(4); //3 = 011, 1 = 001
        expect(add(4, 1)).toBe(5); //4 = 100, 1 = 001 → 繰り上がりが起きない計算
    });

    it("2の補数ができているかの確認", () => {
        expect((neg(1) >>> 0).toString(2)).toBe("11111111111111111111111111111111");
        expect((neg(5) >>> 0).toString(2)).toBe("11111111111111111111111111111011");
    });

    it("引き算の確認", () => {
        expect(sub(4, 1)).toBe(3);
        expect(sub(5, 5)).toBe(0);
        expect(sub(3, 5)).toBe(-2);
    });
});