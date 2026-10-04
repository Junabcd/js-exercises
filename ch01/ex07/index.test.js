import { Point } from "./index.js";

describe("ch01-ex07", () => {
    let p1 = new Point(1, 1);
    let p2 = new Point(3, 5);
    it("add()", () => {
        expect(p1.add(p2)).toEqual(new Point(4, 6));
    });
});