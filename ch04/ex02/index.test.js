import { FizzBuzzOld, FizzBuzzNew } from "./index.js";

afterEach(() => {
  vi.restoreAllMocks();
});

test("リファクタリング前後の出力一致テスト", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    
    FizzBuzzOld();
    const oldCalls = [...spy.mock.calls]; // ここまでの記録をコピー

    spy.mockClear(); // 記録だけリセット（すり替えは維持）

    FizzBuzzNew();
    const newCalls = [...spy.mock.calls];

    expect(newCalls).toEqual(oldCalls);
});