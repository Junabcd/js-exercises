import { logAndRepeat, square, dateNow } from "./index.js";

afterEach(() => {
    vi.restoreAllMocks(); // テストごとに console.log を元に戻す
});

test("問題8.1の1、nが0以下", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    expect(logAndRepeat(0, "a")).toEqual([]);
    expect(logAndRepeat(-3, "a")).toEqual([]);
    expect(spy).not.toHaveBeenCalled();
});

test("問題8.1の1、nが0より大きい", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    expect(logAndRepeat(3, "b")).toEqual(["b", "b", "b"]);
    expect(spy).toHaveBeenCalledTimes(3);
});

test("問題8.1の2", () => {
    expect(square(5)).toBe(25);
});

test("問題8.1の3", () => {
    expect(dateNow()).toHaveProperty("now"); // now というキーがある
     expect(dateNow().now).toBeDefined(); // undefined ではない
});