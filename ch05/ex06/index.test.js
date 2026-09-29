import { orderCheck } from "./index.js";

afterEach(() => {
    vi.restoreAllMocks();
});

describe("ch05-ex06", () => {
    it("順番チェック", () => {
        const spy = vi.spyOn(console, "log").mockImplementation(() => {});
        orderCheck(1);
        expect(spy.mock.calls).toEqual([
            ["tryを通過しました"],
            ["catchを通過しました"],
            ["finallyを通過しました"],
        ]);
    });

    it("catchを通らない場合のチェック", () => {
        const spy = vi.spyOn(console, "log").mockImplementation(() => {});
        orderCheck(0);
        expect(spy.mock.calls).toEqual([
            ["tryを通過しました"],
            ["finallyを通過しました"],
        ]);
    });
});