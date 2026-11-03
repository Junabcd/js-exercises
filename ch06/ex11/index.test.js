import { p } from "./index.js";

describe("ch06-ex11", () => {
    beforeEach(() => { //各テストの前に初期状態に戻す
        p.r = 0;
        p.theta = 0;
    });

    it("数値以外の場合にエラーになる", () => {
        expect(() => {p.x = "10";}).toThrow(RangeError);
        expect(p.r).toBe(0);
        expect(p.theta).toBe(0);
        expect(() => {p.y = "30";}).toThrow(RangeError);
        expect(p.r).toBe(0);
        expect(p.theta).toBe(0);
    });

    it("x,yがNaNの場合にエラーになる", () => {
        expect(() => {p.x = NaN;}).toThrow(RangeError);
        expect(p.r).toBe(0);
        expect(p.theta).toBe(0);
        expect(() => {p.y = NaN;}).toThrow(RangeError);
        expect(p.r).toBe(0);
        expect(p.theta).toBe(0);
    });

    it("x,yがInfinityの場合にエラーになる", () => {
        expect(() => {p.x = Infinity;}).toThrow(RangeError);
        expect(p.r).toBe(0);
        expect(p.theta).toBe(0);
        expect(() => {p.y = -Infinity;}).toThrow(RangeError);
        expect(p.r).toBe(0);
        expect(p.theta).toBe(0);
    });

    it("xを変更した場合", () => {
        p.x = 5;
        expect(p.r).toBeCloseTo(5);
        expect(p.theta).toBeCloseTo(0);
        expect(p.y).toBeCloseTo(0);
    });

    it("yを変更した場合", () => {
        p.y = 5;
        expect(p.r).toBeCloseTo(5);
        expect(p.theta).toBeCloseTo(Math.PI / 2);
        expect(p.x).toBeCloseTo(0);
    });

    it("x,yを変更した場合", () => {
        p.x = 3;
        p.y = 4;
        expect(p.r).toBeCloseTo(5);
        expect(p.theta).toBeCloseTo(Math.atan2(4,3));
    });
});