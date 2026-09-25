import { filterEven } from "./index.js";

afterEach(() => {
    vi.restoreAllMocks();
});

describe("ch05-ex05", () => {
    const obj = { x: 1, y: 2, z: 3 };
    it("関数から返ってきた値をチェック", () => {
        expect(filterEven(obj)).toEqual({ y: 2 });
    });

    it("元のオブジェクトは変わっていないことの確認", () => {
        const spy = vi.spyOn(console, "log").mockImplementation(() => {});
        filterEven(obj);
        expect(spy).toHaveBeenCalledWith({ x: 1, y: 2, z: 3 });
    });

    it("オブジェクトのキーの値に偶数がない場合", () => {
        const notEvenObj = { x: 1, y: 3, z: 5 }
        expect(filterEven(notEvenObj)).toEqual({});
    });
});