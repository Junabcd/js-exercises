import { add, multiply } from "./index.js";

describe("ch07-ex01", () => {
    it("引数が配列か", () => {
        const table1 = "aaa";
        const table2 = [[1]];
        expect(() => {add(table1, table2);}).toThrow(TypeError);
    });

    it("行数が1以上か", () => {
        const table1 = [];
        const table2 = [[1]];
        expect(() => {add(table1, table2);}).toThrow(TypeError);
    });

    it("各行が配列か", () => {
        const table1 = [[1,2],3,[4,5]];
        const table2 = [[1]];
        expect(() => {add(table1, table2);}).toThrow(TypeError);
    });

    it("列数が1以上か", () => {
        const table1 = [[]];
        const table2 = [[1]];
        expect(() => {add(table1, table2);}).toThrow(TypeError);
    });

    it("全行の長さがそろっているか", () => {
        const table1 = [[1,2,3],[], [4,5,6]];
        const table2 = [[1]];
        expect(() => {add(table1, table2);}).toThrow(TypeError);
    });

    it("全要素が数値か", () => {
        const table1 = [[1,2,3],[4,5,NaN], [6,7,8]];
        const table2 = [[1]];
        expect(() => {add(table1, table2);}).toThrow(TypeError);
    });

    it("add関数 サイズが同じか", () => {
        const table1 = [[1,2,3],[4,5,6]];
        const table2 = [[1]];
        expect(() => {add(table1, table2);}).toThrow(RangeError);
    });

    it("add関数 足し算の結果", () => {
        const table1 = [[1,2,3],[4,5,6]];
        const table2 = [[7,8,9],[10,11,12]];
        expect(add(table1, table2)).toEqual([[8,10,12],[14,16,18]]);
    });

    it("multiply関数 サイズが同じか", () => {
        const table1 = [[1,2,3],[4,5,6]];
        const table2 = [[1]];
        expect(() => {multiply(table1, table2);}).toThrow(RangeError);
    });

    it("multiply関数 同じサイズ同士の掛け算の結果", () => {
        const table1 = [[1,2],[3,4]];
        const table2 = [[5,6],[7,8]];
        expect(multiply(table1, table2)).toEqual([[19,22],[43,50]]);
    });

    it("multiply関数 違うサイズ同士の掛け算の結果", () => {
        const table1 = [[1,2,3],[4,5,6]];
        const table2 = [[7,8],[9,10],[11,12]];
        expect(multiply(table1, table2)).toEqual([[58,64],[139,154]]);
    });
});